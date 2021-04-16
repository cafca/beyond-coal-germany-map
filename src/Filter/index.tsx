import React, { useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";

import config from "../config";
import utils from "./utils";
import Section from "./Section";
import { List } from "@material-ui/core";
import { BranchingSection, SingleSection } from "../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      width: "14em",
      padding: "1em",
    },
    heading: {
      fontVariant: "all-caps",
      fontSize: "1.4em",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontWeight: "bold",
      paddingRight: "8px",
      "& svg": {
        width: "1.4em",
        height: "1.4em",
      },
    },
    filterListing: {
      marginTop: "2em",
    },
    faqLink: {
      color: '#666',
      fontSize: ".9em",
      textAlign: 'center',
      "& a": {
        textDecoration: 'none',
        color: 'black',
        borderBottom: '1px solid #666',
        "&:hover": {
          borderColor: '#aaa'
        }
      }
    }
  })
);

const FilterMenu = ({ isOpen, handleClose, map }) => {
  const classes = useStyles();
  const [filterMenu, setfilterMenu] = useState(config.filters);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    setFilters(utils.collectActiveFilters(filterMenu));
  }, [filterMenu]);

  useEffect(() => {
    if (map != null) {
      console.log("set filter", filters);
      Object.keys(filters).forEach((layer) =>
        map.setFilter(layer, ["any", ...filters[layer]], {
          validate: config.debug,
        })
      );
    }
  }, [filters, map]);

  /**
   * Toggle the value of one of the filters by setting its `hidden` prop
   *
   * @param section index of section
   * @param option index of option or variant
   * @param isVariant true if param option is the index of a variant
   */
  const handleFilterToggle = (
    section: number,
    option: number,
    isVariant: boolean
  ) => {
    const newFilterMenu = [...filterMenu];
    const selection = isVariant ? "variants" : "options";
    newFilterMenu[section][selection][option].hidden = !(
      newFilterMenu[section][selection][option].hidden === true
    );
    setfilterMenu(newFilterMenu);
  };

  /**
   * Toggle all options in a section on or off
   *
   * @param i index of the section in `filterMenu`
   */
  const handleToggleSection = (i: number) => {
    const newFilterMenu = [...filterMenu];

    if ("options" in filterMenu[i]) {
      // Handle BranchingSection
      const curOptions = (filterMenu[i] as BranchingSection).options;
      const newOptions = (newFilterMenu[i] as BranchingSection).options;

      const allAreHidden = curOptions.find((o) => o.hidden !== true) == null;
      newOptions?.forEach((_, j) => (newOptions[j].hidden = !allAreHidden));
    } else {
      // Handle SingleSection
      (newFilterMenu[i] as SingleSection).hidden = !(newFilterMenu[
        i
      ] as SingleSection).hidden;
    }
    setfilterMenu(newFilterMenu);
  };

  const filterEntries = filterMenu.map((section, i) => (
    <Section
      {...section}
      key={`filtersection-${section.title}`}
      onToggleOption={(option, isVariant) =>
        handleFilterToggle(i, option, isVariant)
      }
      onToggle={() => handleToggleSection(i)}
    />
  ));

  return (
    <Drawer anchor="right" open={isOpen} onClose={handleClose}>
      <div className={classes.wrapper}>
        <div className={classes.heading}>
          <IconButton
            onClick={handleClose}
            role="button"
            aria-label="Filtermenü schließen"
          >
            <CancelIcon aria-hidden />
          </IconButton>
          <span id="filter-header">FILTER</span>
        </div>
        <List
          className={classes.filterListing}
          dense
          aria-labelledby="filter-header"
        >
          {filterEntries}
        </List>
      <p className={classes.faqLink}>
        <a href="https://kohlecountdown.de/faq/">
          Was bedeuten diese Begriffe?
        </a>
      </p>
      </div>
    </Drawer>
  );
};

export default FilterMenu;
