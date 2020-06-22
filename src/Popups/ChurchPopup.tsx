import React from "react";

const ChurchPopup = ({ title, constructed, community }) => (
  <span className="popup">
    <h1>{title}</h1>
    <ul>
      <li>Baudatum: {constructed}</li>
      <li>Gemeinde: {community}</li>
    </ul>
  </span>
);

export default ChurchPopup;
