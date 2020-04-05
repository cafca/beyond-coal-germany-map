import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mapControls: {
      position: "absolute",
      right: theme.spacing(1),
      bottom: theme.spacing(5),
      "z-index": 1,
      display: "flex",
      "flex-direction": "column"
    },
    iconWrapper: {
      "background-color": "#fafafa",
      "border-radius": "50%",
      margin: theme.spacing(1)
    }
  })
);

interface Props {
  handleZoomIn: () => void;
  handleZoomOut: () => void;
}

const MapControls: React.FC<Props> = ({ handleZoomOut, handleZoomIn }) => {
  const classes = useStyles();
  return (
    <div className={classes.mapControls}>
      <div className={classes.iconWrapper}>
        <IconButton aria-label="zoom in" onClick={handleZoomIn}>
          <AddIcon />
        </IconButton>
      </div>
      <div className={classes.iconWrapper}>
        <IconButton aria-label="zoom out" onClick={handleZoomOut}>
          <RemoveIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default MapControls;
