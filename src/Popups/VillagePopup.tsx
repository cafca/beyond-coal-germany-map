import React from "react";

const VillagePopup = ({ title, relocations, relocations_status }) => (
  <span className="popup">
    <h1>{title}</h1>
    <ul>
      <li>Umsiedlungen: {relocations}</li>
      <li>Umsiedlungsstatus: {relocations_status}</li>
    </ul>
  </span>
);

export default VillagePopup;
