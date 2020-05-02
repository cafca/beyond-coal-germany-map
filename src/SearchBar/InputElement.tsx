import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import Tune from "@material-ui/icons/Tune";
import { Button, IconButton, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      position: "absolute",
      width: "100%",
      "z-index": 10,
    },
    search: {
      display: "flex",
      margin: theme.spacing(2),
      "text-align": "initial",
      "background-color": "white",
      [theme.breakpoints.up("md")]: {
        "max-width": "30em",
      },
    },
    inputRoot: {
      color: "red",
      fieldset: {
        border: "none",
      },
    },
    menuButton: {
      borderRadius: 0,
    },
    filterButton: {
      paddingLeft: theme.spacing(4),
    },
    filterButtonLabel: {
      paddingRight: theme.spacing(3),
    },
  })
);

const InputElement = (params) => {
  const classes = useStyles();
  const {
    refContainer,
    handleMenuClick,
    handleFilterClick,
    ...htmlParams
  } = params;
  return (
    <div className={classes.wrapper} ref={refContainer}>
      <div className={classes.search}>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menü öffnen"
          onClick={handleMenuClick}
          classes={{
            root: classes.menuButton,
          }}
        >
          <MenuIcon />
        </IconButton>
        <TextField
          {...htmlParams}
          placeholder="Was suchst du?"
          fullWidth={true}
          classes={{
            root: classes.inputRoot,
          }}
          variant="outlined"
          autoFocus={true}
        />
        <Button
          aria-label="Kartenfilter"
          onClick={handleFilterClick}
          color="inherit"
          startIcon={<Tune />}
          classes={{
            root: classes.filterButton,
            label: classes.filterButtonLabel,
          }}
        >
          Filter
        </Button>
      </div>
    </div>
  );
};

export default InputElement;
