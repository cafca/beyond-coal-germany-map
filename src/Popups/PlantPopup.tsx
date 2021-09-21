import React from "react";
import { useStyles } from ".";
import debug from "debug";

const log = debug("bcg:PlantPopup");

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
    case "Cancelled":
      return "Neubau verhindert";
    default:
      return "-";
  }
};

const getAge = (construction: string): string => {
  let age;
  try {
    age = new Date().getFullYear() - parseInt(construction);
    if (isNaN(age)) {
      log("Age is NaN", { construction });
      return "-";
    }
    return `${age} Jahr${age === 1 ? "" : "e"}`;
  } catch (err) {
    log("Error parsing age", { err, construction });
    return "-";
  }
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
  const ageStr = getAge(construction);

  return (
    <span className={classes.base}>
      <h1>{title}</h1>
      <p>
        Installierte Leistung ({date}): {capacity}
      </p>
      <p>CO2-Emissionen: {emissions} Mt</p>
      <ul>
        <li>
          <strong>Alter:</strong> {ageStr}
        </li>
        <li>
          <strong>Eigentümer / Betreiber:</strong> {owner}
        </li>
        <li>
          <strong>Brennstoff:</strong> {translate(fuel)}
        </li>
        {status !== "Cancelled" && (
          <li>
            <strong>
              {status === "Retired" ? "Stillgelegt" : "Geplante Stilllegung"}:
            </strong>{" "}
            {[0, "0"].includes(retirement) ? "-" : retirement}
          </li>
        )}
        <li>
          <strong>Kraftwerksstatus:</strong>{" "}
          {translate(status, conversion_note)}
        </li>
      </ul>
      <p>
        <a href={maps} target="_blank" rel="noopener noreferrer">
          Auf Google Maps anschauen
        </a>
      </p>
    </span>
  );
};

export default PlantPopup;
