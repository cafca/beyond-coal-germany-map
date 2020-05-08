import React from "react";

const GroupPopup = ({ title, note, city, website, contact, plants, news }) => (
  <span className="popup">
    <h1>{title}</h1>
    {note != "" && <p>{note}</p>}
    <ul>
      <li>Webseite: {website}</li>
      <li>
        Kontakt: <a href="mailto:{contact}">{contact}</a>
      </li>
    </ul>
  </span>
);

export default GroupPopup;
