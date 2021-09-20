import React, { useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import Tune from "@material-ui/icons/Tune";
import { Button, IconButton, TextField, Tooltip } from "@material-ui/core";
import config from "../config";

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
      backgroundColor: theme.palette.primary.main,
      "border-top-left-radius": 0,
      "border-bottom-left-radius": 0,
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
      },
    },
    filterButtonLabel: {
      paddingRight: theme.spacing(3),
      color: "white",
    },
    tooltip: {
      fontSize: "0.9em",
    },
  })
);

const InputElement = (props) => {
  const classes = useStyles();
  const {
    refContainer,
    handleMenuClick,
    handleFilterClick,
    isMapLoaded,
    ...htmlParams
  } = props;

  const [isTooltipOpen, setTooltipOpen] = useState(false);
  // hasBeenTouched is true when the input element has been interacted with
  const [hasBeenTouched, setHasBeenTouched] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    // Tooltip should not appear as long as the map is loading or after
    // InputElement has been interacted with.
    if (hasBeenTouched || !isMapLoaded) {
      setTooltipOpen(false);
    } else {
      // Wait for some time after map has been loaded, then fade in the tooltip
      // if InputElement still hasn't been interacted with.
      timer = setTimeout(() => {
        if (hasBeenTouched) {
          setTooltipOpen(false);
        } else {
          setTooltipOpen(true);
        }
      }, config.tooltipDelay);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [hasBeenTouched, isMapLoaded]);

  return (
    <div
      className={classes.wrapper}
      ref={refContainer}
      onClick={() => setHasBeenTouched(true)}
    >
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
        <Tooltip
          title="Im Filter-Menü kannst du Karteninhalte ein- und ausblenden."
          arrow
          placement="bottom-end"
          open={isTooltipOpen}
          classes={{
            tooltip: classes.tooltip,
          }}
          onClick={() => setHasBeenTouched(true)}
        >
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
        </Tooltip>
      </div>
    </div>
  );
};

export default InputElement;
