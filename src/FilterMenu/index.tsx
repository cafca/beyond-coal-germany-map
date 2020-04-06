import React, { useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import PinIcon from "@material-ui/icons/Room";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";

import config from "../config";
import GruppeIcon from "../Icons/Gruppe.svg";
import GruppeKlagenIcon from "../Icons/Gruppe Klage.svg";
import GruppeZUIcon from "../Icons/Gruppe ZU.svg";

import DorfIcon from "../Icons/Dörfer.svg";
import DorfKircheIcon from "../Icons/Kirche.svg";

import TagebauIcon from "../Icons/Tagebau.svg";

import KraftwerkIcon from "../Icons/Kraftwerk.svg";
import KraftwerkSteinkohleIcon from "../Icons/Steinkohle.svg";
import KraftwerkBraunkohleIcon from "../Icons/Braunkohle.svg";
import KraftwerkGasIcon from "../Icons/Gas.svg";

import KraftwerkInBauIcon from "../Icons/In Bau.svg";
import KraftwerkAktivIcon from "../Icons/Aktiv.svg";
import KraftwerkAbschaltungIcon from "../Icons/Vor Absch.svg";
import KraftwerkAbgeschaltetIcon from "../Icons/Abgeschaltet.svg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      width: "12em",
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
    list: {
      fontWeight: "bold",
    },
    filterListing: {
      marginTop: "2em",
    },
    spacer: {
      marginBottom: "1em",
    },
    info: {
      fontSize: "0.9em",
    },
    svgIcon: {
      "& > img": {
        height: "1.5em",
        width: "1.25em",
      },
    },
    sectionChip: {
      marginTop: "1em",
      "& > span": {
        textTransform: "uppercase",
        fontWeight: "bold",
      },
    },
    optionItem: {
      "& > div": {
        minWidth: "2em",
      },
    },
  })
);

const contents = [
  {
    title: "Gruppe",
    icon: GruppeIcon,
    options: [
      { title: "Klagen", icon: GruppeKlagenIcon },
      { title: "Ziviler Ungehorsam", icon: GruppeZUIcon },
    ],
  },
  {
    title: "Dorf",
    icon: DorfIcon,
    options: [{ title: "Mit Kirche", icon: DorfKircheIcon }],
  },
  {
    title: "Tagebau",
    icon: TagebauIcon,
  },
  {
    title: "Kraftwerk",
    icon: KraftwerkIcon,
    options: [
      { title: "Steinkohle", icon: KraftwerkSteinkohleIcon },
      { title: "Braunkohle", icon: KraftwerkBraunkohleIcon },
      { title: "Gas", icon: KraftwerkGasIcon },
    ],
    variants: [
      { title: "In Bau", icon: KraftwerkInBauIcon },
      { title: "Aktiv", icon: KraftwerkAktivIcon },
      { title: "Vor Abschaltung", icon: KraftwerkAbschaltungIcon },
      { title: "Abgeschaltet", icon: KraftwerkAbgeschaltetIcon },
    ],
  },
];

interface OptionProps {
  title: string;
  icon?: string;
  variant?: boolean;
}

interface FilterSectionProps {
  title: string;
  icon: string;
  options?: OptionProps[];
  variants?: OptionProps[];
}

const Option: React.FC<OptionProps> = ({ title, icon }) => {
  const classes = useStyles();
  return (
    <ListItem className={classes.optionItem}>
      <ListItemIcon className={classes.svgIcon}>
        {icon == null ? <PinIcon /> : <img src={icon} alt="" />}
      </ListItemIcon>
      <ListItemText>{title}</ListItemText>
    </ListItem>
  );
};

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  icon,
  options,
  variants,
}) => {
  const classes = useStyles();
  const optionEntries =
    options == null
      ? []
      : options.map((option) => (
          <Option {...option} key={`option-${option.title}`} />
        ));
  const variantEntries =
    variants == null
      ? []
      : variants.map((variant) => (
          <Option
            {...variant}
            key={`variant-${variant.title}`}
            variant={true}
          />
        ));
  return (
    <div>
      <Chip
        label={title}
        variant="outlined"
        className={classes.sectionChip}
        avatar={<Avatar alt="" src={icon} className={classes.svgIcon} />}
      />
      {optionEntries.length > 0 && (
        <List className={classes.list} dense={true}>
          {optionEntries}
        </List>
      )}
      {variantEntries.length > 0 && (
        <List className={classes.list} dense={true}>
          {variantEntries}
        </List>
      )}
      {optionEntries.length === 0 && <div className={classes.spacer}></div>}
    </div>
  );
};

const FilterMenu = ({ isOpen, handleClose, map }) => {
  const classes = useStyles();
  const filterEntries = contents.map((section) => (
    <FilterSection {...section} key={`filtersection-${section.title}`} />
  ));
  const filters = [["==", ["get", "fuel"], "Hard coal"]];

  useEffect(() => {
    if (map != null)
      map.setFilter(config.mapbox.layers.plants, ["any", ...filters], {
        validate: config.debug,
      });
  }, [filters, map]);

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
