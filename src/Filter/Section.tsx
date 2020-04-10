import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import List from "@material-ui/core/List";

import Option from "./Option";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      fontWeight: "bold",
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
  options = [],
  variants = [],
  onToggle,
  onToggleAll,
}) => {
  const classes = useStyles();
  const optionEntries = options.map((option, i) => (
    <Option
      {...option}
      key={`option-${option.title}`}
      disabled={option.filter == null}
      checked={option.hidden !== true}
      onToggle={() => onToggle(i, false)}
    />
  ));
  const variantEntries = variants.map((variant, i) => (
    <Option
      {...variant}
      key={`variant-${variant.title}`}
      variant={true}
      disabled={variant.filter == null}
      checked={variant.hidden !== true}
      onToggle={() => onToggle(i, true)}
    />
  ));

  const hasNoFilters = options.find((option) => option.filter != null) == null;
  return (
    <div>
      <Chip
        label={title}
        variant="outlined"
        disabled={hasNoFilters}
        className={classes.sectionChip}
        onClick={onToggleAll}
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

export default Section;
