import React from "react";
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      width: "14em",
      padding: "1em"
    },
    heading: {
      fontVariant: "all-caps",
      fontSize: "1.8em",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontWeight: "bold",
      paddingRight: "8px",
      "& svg": {
        width: "1.4em",
        height: "1.4em"
      }
    },
    list: {
      fontWeight: "bold"
    },
    filterListing: {
      marginTop: "3em"
    },
    spacer: {
      marginBottom: "1em"
    },
    info: {
      fontSize: "0.9em"
    }
  })
);

const contents = [
  {
    title: "Gruppe",
    options: [{ title: "Klagen" }, { title: "Ziviler Ungehorsam" }]
  },
  {
    title: "Dorf",
    options: [{ title: "Mit Kirche" }]
  },
  {
    title: "Tagebau"
  },
  {
    title: "Kraftwerk",
    options: [
      { title: "Steinkohle" },
      { title: "Braunkohle" },
      { title: "Gas" }
    ]
  }
];

interface OptionProps {
  title: string;
}

interface FilterSectionProps {
  title: string;
  options?: OptionProps[];
}

const Option: React.FC<OptionProps> = ({ title }) => {
  return (
    <ListItem>
      <ListItemIcon>
        <PinIcon />
      </ListItemIcon>
      <ListItemText>{title}</ListItemText>
    </ListItem>
  );
};

const FilterSection: React.FC<FilterSectionProps> = ({ title, options }) => {
  const classes = useStyles();
  const optionEntries =
    options == null ? [] : options.map(option => <Option {...option} />);
  return (
    <div>
      <Chip
        label={title}
        variant="outlined"
        avatar={<Avatar>{title[0]}</Avatar>}
      />
      {optionEntries.length > 0 && (
        <List className={classes.list}>{optionEntries}</List>
      )}
      {optionEntries.length === 0 && <div className={classes.spacer}></div>}
    </div>
  );
};

const FilterMenu = ({ isOpen, handleClose }) => {
  const classes = useStyles();
  const filterEntries = contents.map(section => <FilterSection {...section} />);

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
