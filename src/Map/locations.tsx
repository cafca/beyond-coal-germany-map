import React from "react";
import { renderToString } from "react-dom/server";
import MapboxGL from "mapbox-gl";

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
  retirement
}) => (
  <span className="popup">
    <h1>{title}</h1>
    <p>
      Kapazität ({date}): {capacity}
    </p>
    <p>CO2 emissions: {emissions}</p>
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

const addLocations = map => {
  map.on("load", () => {
    map.on("click", "plants", e => {
      const coordinates = e.features[0].geometry.coordinates.slice();

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new MapboxGL.Popup()
        .setLngLat(coordinates)
        .setHTML(renderToString(<PopupContent {...e.features[0].properties} />))
        .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on("mouseenter", "places", function() {
      map.getCanvas().style.cursor = "pointer";
    });

    // Change it back to a pointer when it leaves.
    map.on("mouseleave", "places", function() {
      map.getCanvas().style.cursor = "";
    });
  });
};

export default addLocations;
