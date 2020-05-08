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
  const handleClick = (e) => {
    // Events are not DOM events, they don't support e.stopPropagation()
    // so here an attribute is stored on the event that can be used to
    // identify if the event has been seen the first time (upmost layer)
    // or later

    if (e.originalEvent.cancelled) {
      return;
    }
    e.originalEvent.cancelled = true;

    const feature = e.features[0];
    const coordinates = feature.geometry.coordinates.slice();

    new MapboxGL.Popup()
      .setLngLat(coordinates)
      .setHTML(renderToString(<PopupContent feature={feature} />))
      .addTo(map);
    return false;
  };

  map.on("load", () => {
    map.on("click", config.mapbox.layers.plants, handleClick);
    map.on("click", config.mapbox.layers.groups, handleClick);
  });
};

export default {
  configureMouseCursor,
  configurePopup,
};
