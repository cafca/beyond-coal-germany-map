import React from "react";
import MapboxGL from "mapbox-gl";
import { renderToString } from "react-dom/server";

import config from "../config";
import Popup from "../Popup";

const configureMouseCursor = (map) => {
  // Change the cursor to a pointer when the mouse is over the places layer.
  map.on("mouseenter", config.mapbox.layers.plants, function () {
    map.getCanvas().style.cursor = "pointer";
  });

  // Change it back to a pointer when it leaves.
  map.on("mouseleave", config.mapbox.layers.plants, function () {
    map.getCanvas().style.cursor = "";
  });
};

const configurePopup = (map) => {
  map.on("load", () => {
    map.on("click", config.mapbox.layers.plants, (e) => {
      const feature = e.features[0];
      const coordinates = feature.geometry.coordinates.slice();

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new MapboxGL.Popup()
        .setLngLat(coordinates)
        .setHTML(renderToString(<Popup {...feature.properties}></Popup>))
        .addTo(map);
    });
  });
};

export default {
  configureMouseCursor,
  configurePopup,
};
