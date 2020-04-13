import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import Tune from "@material-ui/icons/Tune";
import { Button, IconButton, InputBase } from "@material-ui/core";

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
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 1),
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

interface Props {
  handleMenuClick: () => void;
  handleFilterClick: () => void;
}

const search = console.log;

const SearchBar: React.FC<Props> = ({ handleMenuClick, handleFilterClick }) => {
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  useEffect(() => setResults(search(query)), [query]);

  return (
    <div className={classes.wrapper}>
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
        <InputBase
          placeholder="Was suchst du?"
          fullWidth={true}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          autoFocus={true}
          inputProps={{ "aria-label": "search" }}
          value={query}
          onChange={({ target: { value } }) => setQuery(value)}
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

export default SearchBar;
