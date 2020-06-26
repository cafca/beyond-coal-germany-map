import React from "react";
import { useStyles } from ".";

const VillagePopup = ({ title, relocations, relocations_status }) => {
  const classes = useStyles();
  return (
    <span className={classes.base}>
      <h1>{title}</h1>
      <ul>
        <li>
          <strong>Umsiedlungen:</strong> {relocations}
        </li>
        <li>
          <strong>Umsiedlungsstatus:</strong> {relocations_status}
        </li>
      </ul>
    </span>
  );
};

export default VillagePopup;
