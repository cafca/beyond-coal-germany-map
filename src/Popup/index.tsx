import React from "react";

const PopupContent = ({
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
}) => (
  <span className="popup">
    <h1>{title}</h1>
    <p>
      Kapazität ({date}): {capacity}
    </p>
    <p>CO2 emissions: {emissions} Mt</p>
    <ul>
      <li>Alter: {age}</li>
      <li>Besitzer: {owner}</li>
      <li>Rohstoff: {fuel}</li>
      <li>Geplante Abstellung: {retirement === 0 ? "-" : retirement}</li>
      <li>Kraftwerksstatus: {status}</li>
    </ul>
    <p>
      <a href={maps}>Auf Google Maps anschauen</a>
    </p>
  </span>
);

export default PopupContent;
