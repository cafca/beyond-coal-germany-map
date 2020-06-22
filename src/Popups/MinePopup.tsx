import React from "react";

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
}) => (
  <span className="popup">
    <h1>{title}</h1>
    {note !== "" && <p>{note}</p>}
    <ul>
      <li>Unternehmen: {owner}</li>
      <li>Abbaumenge: {volume}</li>
    </ul>
  </span>
);

export default MinePopup;
