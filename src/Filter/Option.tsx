import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import PinIcon from "@material-ui/icons/Room";
import CheckOn from "@material-ui/icons/CheckCircle";
import CheckOff from "@material-ui/icons/CheckCircleOutline";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pinIcon: {
      "& > img": {
        height: "1.32em",
        width: "1.1em",
      },
    },
    toggleWrapper: {
      "& > svg": {
        height: "0.7em",
        width: "0.7em",
      },
    },
  })
);

const Option = ({ title, icon, checked, onToggle }) => {
  const classes = useStyles();
  return (
    <ListItem button onClick={onToggle}>
      <ListItemIcon className={classes.pinIcon}>
        {icon == null ? (
          <PinIcon />
        ) : (
          <img src={icon} alt={`Icon ${title}`} aria-hidden />
        )}
      </ListItemIcon>
      <ListItemText>{title}</ListItemText>
      <ListItemSecondaryAction className={classes.toggleWrapper}>
        {checked ? <CheckOn /> : <CheckOff />}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Option;
