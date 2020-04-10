import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import PinIcon from "@material-ui/icons/Room";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    svgIcon: {
      "& > img": {
        height: "1.5em",
        width: "1.25em",
      },
    },
  })
);

const Option = ({ title, icon, checked, onToggle, disabled }) => {
  const classes = useStyles();
  return (
    <ListItem>
      <ListItemIcon className={classes.svgIcon}>
        {icon == null ? <PinIcon /> : <img src={icon} alt="" />}
      </ListItemIcon>
      <ListItemText>{title}</ListItemText>
      <ListItemSecondaryAction>
        <Switch
          edge="end"
          checked={checked}
          onChange={onToggle}
          disabled={disabled}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Option;
