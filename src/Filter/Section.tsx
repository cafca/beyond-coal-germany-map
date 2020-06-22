import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import PinIcon from "@material-ui/icons/Room";
import CheckOn from "@material-ui/icons/CheckCircle";
import CheckOff from "@material-ui/icons/CheckCircleOutline";

import Option from "./Option";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      fontWeight: "bold",
      paddingLeft: theme.spacing(2),
    },
    optionDivider: {
      fontWeight: "bold",
      fontSize: "0.9em",
      color: "#666",
      paddingLeft: theme.spacing(4),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    spacer: {
      marginBottom: theme.spacing(2),
    },
    svgIcon: {
      "& > img": {
        height: "2.2em",
        width: "1.84em",
      },
    },
    title: {
      "text-transform": "uppercase",
      // @ts-ignore
      "font-weight": (props) => (props.isVisible ? "bold" : "initial"),
    },
  })
);

const Section = ({
  title,
  icon,
  color = null,
  filter = null,
  hidden = null,
  options = [],
  variants = [],
  onToggle,
  onToggleOption,
}) => {
  const isVisible =
    options.length === 0
      ? !hidden
      : options.find((o) => o.hidden === true) == null;
  const classes = useStyles({ isVisible });
  const optionEntries = options.map((option, i) => (
    <Option
      {...option}
      key={`option-${option.title}`}
      disabled={option.filter == null}
      checked={option.hidden !== true}
      onToggle={() => onToggleOption(i, false)}
    />
  ));
  const variantEntries = variants.map((variant, i) => (
    <Option
      {...variant}
      key={`variant-${variant.title}`}
      variant={true}
      disabled={variant.filter == null}
      checked={variant.hidden !== true}
      onToggle={() => onToggleOption(i, true)}
    />
  ));

  const sectionStyle = color ? { color } : null;
  return (
    <>
      <ListItem button onClick={onToggle}>
        <ListItemIcon className={classes.svgIcon}>
          {icon == null ? (
            <PinIcon />
          ) : (
            <img src={icon} alt={`Icon ${title}`} aria-hidden />
          )}
        </ListItemIcon>

        <ListItemText classes={{ primary: classes.title }} primary={title} />

        <ListItemSecondaryAction onClick={onToggle}>
          {isVisible ? (
            <CheckOn style={sectionStyle} aria-label="aktiv" />
          ) : (
            <CheckOff style={sectionStyle} aria-label="inaktiv" />
          )}
        </ListItemSecondaryAction>
      </ListItem>

      <div className={classes.spacer}></div>

      {optionEntries.length > 0 && (
        <List className={classes.nested} dense={true} disablePadding>
          {optionEntries}
        </List>
      )}

      {variantEntries.length > 0 && (
        <>
          <div className={classes.optionDivider}>oder</div>
          <List className={classes.nested} dense disablePadding>
            {variantEntries}
          </List>
        </>
      )}
    </>
  );
};

export default Section;
