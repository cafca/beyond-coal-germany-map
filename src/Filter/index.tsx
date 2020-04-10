import React, { useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";

import config from "../config";
import utils from "./utils";
import Section from "./Section";

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
    info: {
      fontSize: "0.9em",
    },
  })
);

const FilterMenu = ({ isOpen, handleClose, map }) => {
  const classes = useStyles();
  const [filterMenu, setfilterMenu] = useState(config.filters);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    setFilters(utils.collectActiveFilters(filterMenu));
  }, [filterMenu]);

  useEffect(() => {
    if (map != null) {
      map.setFilter(config.mapbox.layers.plants, ["any", ...filters], {
        validate: config.debug,
      });
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
    const allAreHidden =
      filterMenu[i].options.find((o) => o.hidden !== true) == null;
    newFilterMenu[i].options?.forEach(
      (_, j) => (newFilterMenu[i].options[j].hidden = !allAreHidden)
    );
    setfilterMenu(newFilterMenu);
  };

  const filterEntries = config.filters.map((section, i) => (
    <Section
      {...section}
      key={`filtersection-${section.title}`}
      onToggle={(option, isVariant) => handleFilterToggle(i, option, isVariant)}
      onToggleAll={() => handleToggleSection(i)}
    />
  ));

  return (
    <Drawer anchor="right" open={isOpen} onClose={handleClose}>
      <div className={classes.wrapper}>
        <div className={classes.heading}>
          <IconButton onClick={handleClose}>
            <CancelIcon />
          </IconButton>
          <span>FILTER</span>
        </div>
        <div className={classes.filterListing}>{filterEntries}</div>
        <p className={classes.info}>
          <em>Du kannst die einzelnen Kategorien aus- und einblenden!</em>
        </p>
      </div>
    </Drawer>
  );
};

export default FilterMenu;
