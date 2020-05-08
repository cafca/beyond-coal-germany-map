import React from "react";
import MapboxGL from "mapbox-gl";
import { renderToString } from "react-dom/server";

import config from "../config";
import PopupContent from "../Popups";

const configureMouseCursor = (map, layer) => {
  // Change the cursor to a pointer when the mouse is over the places layer.
  map.on("mouseenter", layer, function () {
    map.getCanvas().style.cursor = "pointer";
  });

  // Change it back to a pointer when it leaves.
  map.on("mouseleave", layer, function () {
    map.getCanvas().style.cursor = "";
  });
};

const configurePopup = (map) => {
  map.on("load", () => {
    map.on("click", (e) => {
      var bbox = [
        [e.point.x - 2, e.point.y - 2],
        [e.point.x + 2, e.point.y + 2],
      ];
      var features = map.queryRenderedFeatures(bbox, {
        layers: ["groups", "plants"],
      });

      const feature = features[0];

      if (feature == null) return;

      const coordinates = feature.geometry.coordinates.slice();

      new MapboxGL.Popup()
        .setLngLat(coordinates)
        .setHTML(renderToString(<PopupContent feature={feature} />))
        .addTo(map);
    });
  });
};

export default {
  configureMouseCursor,
  configurePopup,
};
