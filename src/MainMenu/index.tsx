import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      width: "18em",
      padding: "1em",
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
        height: "1.4em",
      },
    },
    list: {
      fontVariant: "all-small-caps",
      fontSize: "1.3em",
      fontWeight: "bold",
    },
    "& li": {},
  })
);

const ListItemLink: React.FC<{ href: string }> = (props) => (
  <ListItem button component="a" {...props} />
);

const MainMenu = ({ isOpen, handleClose }) => {
  const classes = useStyles();
  return (
    <Drawer anchor="left" open={isOpen} onClose={handleClose}>
      <div className={classes.wrapper}>
        <div className={classes.heading}>
          <IconButton onClick={handleClose}>
            <CancelIcon />
          </IconButton>
          <span>MENU</span>
        </div>
        <List className={classes.list}>
          <ListItemLink href="https://kohlecountdown.de/about-us/who-we-are/">
            Über uns
          </ListItemLink>
          <ListItemLink href="https://kohlecountdown.de/why-end-coal/">
            5 Gründe für den Kohleausstieg
          </ListItemLink>
          <ListItemLink href="https://kohlecountdown.de/why-end-coal/protestaktivitaten-gegen-kohle/">
            Protestaktivitäten
          </ListItemLink>
          <ListItemLink href="https://kohlecountdown.de/media-centre/">
            Presse
          </ListItemLink>
        </List>
      </div>
    </Drawer>
  );
};

export default MainMenu;
