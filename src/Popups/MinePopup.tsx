import React from "react";
import { useStyles } from ".";

const MinePopup = ({
  title,
  territory,
  owner,
  volume,
  note,
  size,
  status,
  plants,
  villages,
}) => {
  const classes = useStyles();

  const plantComps = plants
    .split(",")
    .filter((plant) => plant != null && plant.length > 0)
    .map((plant) => <li key={`mine-plant-${plant}`}>{plant.trim()}</li>);

  const villageComps = villages
    .split(",")
    .filter((village) => village != null && village.length > 0)
    .map((village) => (
      <li key={`mine-village-${village}`}>{village.trim()}</li>
    ));
  return (
    <span className={classes.base}>
      <h1>{title}</h1>
      {note !== "" && <p>{note}</p>}
      <ul>
        <li>
          <strong>Revier:</strong> {territory}
        </li>
        <li>
          <strong>Unternehmen:</strong> {owner}
        </li>
        {plantComps.length > 0 && (
          <ul className={classes.numbered}>
            <li>
              <strong>Kraftwerke:</strong>
            </li>
            {plantComps}
          </ul>
        )}
        {villageComps.length > 0 && (
          <ul className={classes.numbered}>
            <li>
              <strong>Bedrohte Dörfer:</strong>
            </li>
            {villageComps}
          </ul>
        )}
      </ul>
    </span>
  );
};

export default MinePopup;
