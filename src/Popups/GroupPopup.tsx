import React from "react";
import { useStyles } from ".";

const getDomainName = (url) =>
  url.match(/(https?:\/\/)?(www\.)?(?<name>.+)?/).groups.name;

const Website = ({ url, className = "" }) => (
  <li className={className}>
    <a href={url} target="_blank" rel="noopener noreferrer">
      {getDomainName(url)}
    </a>
  </li>
);

const GroupPopup = ({ title, city, website, contact, plants, note, news }) => {
  const classes = useStyles();
  const websites = website
    .split("\n")
    .filter((url) => url != null)
    .map((url) => <Website url={url.trim()} />);

  const plantComps = plants
    .split("\n")
    .filter((plant) => plant != null)
    .map((plant) => <li key={`group-plant-${plant}`}>{plant}</li>);

  return (
    <span className={classes.base}>
      <h1>{title}</h1>
      {note !== "" && <p>{note}</p>}
      <ul>
        {plants !== "" && plantComps.length > 1 && (
          <ul className={classes.numbered}>
            <li>
              <strong>Kraftwerke:</strong>
            </li>
            {plantComps}
          </ul>
        )}
        {websites}
        <li>
          <a href={`mailto:${contact}`}>Kontakt</a>
        </li>
      </ul>
    </span>
  );
};

export default GroupPopup;
