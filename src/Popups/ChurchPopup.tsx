import React from "react";
import { useStyles } from ".";

const ChurchPopup = ({ title, constructed, community }) => {
  const classes = useStyles();
  return (
    <span className={classes.base}>
      <h1>{title}</h1>
      <ul>
        <li>
          <strong>Baudatum</strong> {constructed}
        </li>
        {community && (
          <li>
            <strong>Gemeinde:</strong> {community}
          </li>
        )}
      </ul>
    </span>
  );
};

export default ChurchPopup;
