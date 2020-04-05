import React from "react";
import { renderToString } from "react-dom/server";
import MapboxGL from "mapbox-gl";

import config from "../config";
import utils from "./utils";
import Popup from "../Popup";

const addLocations = map => {
  map.on("load", () => {
    map.on("click", config.mapbox.layers.plants, e => {
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
        .setHTML(renderToString(<Popup {...feature.properties} />))
        .addTo(map);
    });

    utils.configureMouseCursor(map);
  });
};

export default addLocations;
