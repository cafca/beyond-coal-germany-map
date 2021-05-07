import React from "react";
import { useStyles } from ".";

const translate = (str, conversion_note = "Umbauprojekt") => {
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
    case "Conversion":
      return conversion_note;
    case "Retired":
      return "Stillgelegt";
    case "Retiring":
      return "Wird stillgelegt";
    default:
      return "-";
  }
};

const getAge = (construction: string) => {
  let age;
  try {
    age = new Date().getFullYear() - parseInt(construction);
    if (isNaN(age)) {
      age = "-";
    }
  } catch (err) {
    age = "-";
  }
  return age;
};

const PlantPopup = ({
  title,
  date,
  capacity,
  emissions,
  construction,
  owner,
  fuel,
  maps,
  status,
  retirement,
  conversion_note,
}) => {
  const classes = useStyles();
  const age = getAge(construction);

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
          <strong>Kraftwerksstatus:</strong>{" "}
          {translate(status, conversion_note)}
        </li>
      </ul>
      <p>
        <a href={maps}>Auf Google Maps anschauen</a>
      </p>
    </span>
  );
};

export default PlantPopup;
