import React, { ReactElement } from "react";

import ChurchPopup from "./ChurchPopup";
import GroupPopup from "./GroupPopup";
import MinePopup from "./MinePopup";
import PlantPopup from "./PlantPopup";
import VillagePopup from "./VillagePopup";

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
