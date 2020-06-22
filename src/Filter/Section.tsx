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
      paddingLeft: theme.spacing(4),
    },
    optionDivider: {
      fontWeight: "bold",
      fontSize: "0.9em",
      color: "#666",
      paddingLeft: theme.spacing(6),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    spacer: {
      marginBottom: "1em",
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
  const classes = useStyles();
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

  const isVisible =
    options.length === 0
      ? !hidden
      : options.find((o) => o.hidden === true) == null;
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
        <ListItemText>{title}</ListItemText>
        <ListItemSecondaryAction onClick={onToggle}>
          {isVisible ? (
            <CheckOn style={sectionStyle} aria-label="aktiv" />
          ) : (
            <CheckOff style={sectionStyle} aria-label="inaktiv" />
          )}
        </ListItemSecondaryAction>
      </ListItem>
      {optionEntries.length > 0 && (
        <List className={classes.nested} dense={true} disablePadding>
          {optionEntries}
        </List>
      )}
      {variantEntries.length > 0 && (
        <>
          <div className={classes.optionDivider}>oder</div>
          <List className={classes.nested} dense={true} disablePadding>
            {variantEntries}
          </List>
        </>
      )}
      {optionEntries.length === 0 && <div className={classes.spacer}></div>}
    </>
  );
};

export default Section;
