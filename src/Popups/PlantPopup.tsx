import React from "react";
import { useStyles } from ".";

const translate = (str) => {
  switch (str) {
    case "Hard coal":
      return "Steinkohle";
    case "Lignite":
      return "Braunkohle";
    case "Open":
      return "In Betrieb";
    case "Planned":
      return "In Planung";
    case "Construction":
      return "Wird gebaut";
    case "Retired":
      return "Stillgelegt";
    case "Retiring":
      return "Wird stillgelegt";
    default:
      return "-";
  }
};

const PlantPopup = ({
  title,
  date,
  capacity,
  emissions,
  age,
  owner,
  fuel,
  maps,
  status,
  retirement,
}) => {
  const classes = useStyles();
  return (
    <span className={classes.base}>
      <h1>{title}</h1>
      <p>
        Installierte Leistung ({date}): {capacity}
      </p>
      <p>CO2-Emissionen: {emissions} Mt</p>
      <ul>
        <li>
          <strong>Alter:</strong> {age}
        </li>
        <li>
          <strong>Eigentümer / Betreiber:</strong> {owner}
        </li>
        <li>
          <strong>Brennstoff:</strong> {translate(fuel)}
        </li>
        <li>
          <strong>geplante Stilllegung:</strong>{" "}
          {retirement === 0 ? "-" : retirement}
        </li>
        <li>
          <strong>Kraftwerksstatus:</strong> {translate(status)}
        </li>
      </ul>
      <p>
        <a href={maps}>Auf Google Maps anschauen</a>
      </p>
    </span>
  );
};

export default PlantPopup;
