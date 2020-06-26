import React, { ReactElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { blue, grey } from "@material-ui/core/colors";

import ChurchPopup from "./ChurchPopup";
import GroupPopup from "./GroupPopup";
import MinePopup from "./MinePopup";
import PlantPopup from "./PlantPopup";
import VillagePopup from "./VillagePopup";

export const useStyles = makeStyles({
  base: {
    "& h1": {
      fontSize: "1.2em",
      maxWidth: "80%",
    },
    "& ul": {
      listStyle: "none",
      paddingLeft: 0,
    },
    "& ul > li": {
      marginBottom: ".5em",
    },
    "& a": {
      color: grey["900"],
      textDecoration: "none",
      borderBottom: "1px solid",
      borderBottomColor: blue["500"],
      transition: "border .3s",
    },
    "& a:hover": {
      borderBottomColor: grey["900"],
    },
  },
  numbered: {
    "& li + li": {
      listStyle: "disc !important",
      marginLeft: "1.5em",
    },
  },
});

const PopupContent = ({ feature }) => {
  let content: ReactElement;
  switch (feature.properties.kind) {
    case "church":
      content = <ChurchPopup {...feature.properties} />;
      break;
    case "group":
      content = <GroupPopup {...feature.properties} />;
      break;
    case "mine":
      content = <MinePopup {...feature.properties} />;
      break;
    case "plant":
      content = <PlantPopup {...feature.properties} />;
      break;
    case "village":
      content = <VillagePopup {...feature.properties} />;
      break;
    default:
      console.error("No popup defined for", feature.properties.kind);
      return <p>No kind defined</p>;
  }
  return content;
};

export default PopupContent;
