import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import Tune from "@material-ui/icons/Tune";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      position: "absolute",
      width: "100%",
      "z-index": 10
    },
    menuButton: {},
    search: {
      display: "flex",
      margin: theme.spacing(2),
      "text-align": "initial",
      "background-color": "white",
      [theme.breakpoints.up("md")]: {
        "max-width": "30em"
      }
    },
    inputRoot: {
      color: "inherit"
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0)
    }
  })
);

interface Props {
  handleMenuClick: () => void;
  handleFilterClick: () => void;
}

const SearchBar: React.FC<Props> = ({ handleMenuClick, handleFilterClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.search}>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menü öffnen"
          onClick={handleMenuClick}
          disableFocusRipple={true}
        >
          <MenuIcon />
        </IconButton>
        <InputBase
          placeholder="Was suchst du?"
          fullWidth={true}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          autoFocus={true}
          inputProps={{ "aria-label": "search" }}
        />
        <IconButton
          aria-label="Kartenfilter"
          onClick={handleFilterClick}
          color="inherit"
          disableFocusRipple={true}
        >
          <Tune />
        </IconButton>
      </div>
    </div>
  );
};

export default SearchBar;
