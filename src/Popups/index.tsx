import React, { ReactElement } from "react";

import PlantPopup from "./plants";
import GroupPopup from "./groups";

const PopupContent = ({ feature }) => {
  let content: ReactElement;
  switch (feature.properties.kind) {
    case "plant":
      content = <PlantPopup {...feature.properties}></PlantPopup>;
      break;
    case "group":
      content = <GroupPopup {...feature.properties}></GroupPopup>;
      break;
    default:
      console.error("No popup defined for", feature.properties.kind);
      return <p>No kind defined</p>;
  }
  return content;
};

export default PopupContent;
