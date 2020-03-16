import MapboxGL from "mapbox-gl";

import sampleData from "./sample.json";

const addLocations = map => {
  map.on("load", () => {
    map.addSource("points", { type: "geojson", data: sampleData });
    map.addLayer({
      id: "bc-locations",
      type: "symbol",
      source: "points",
      layout: {
        // get the icon name from the source's "icon" property
        // concatenate the name to get an icon from the style's sprite sheet
        "icon-image": ["concat", ["get", "icon"], "-15"],
        // get the title name from the source's "title" property
        "text-field": ["get", "title"],
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.6],
        "text-anchor": "top"
      }
    });

    map.on("click", "bc-locations", e => {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const description = e.features[0].properties.description;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new MapboxGL.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
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
