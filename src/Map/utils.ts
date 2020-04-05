import config from "../config";

const configureMouseCursor = map => {
  // Change the cursor to a pointer when the mouse is over the places layer.
  map.on("mouseenter", config.mapbox.layers.plants, function() {
    map.getCanvas().style.cursor = "pointer";
  });

  // Change it back to a pointer when it leaves.
  map.on("mouseleave", config.mapbox.layers.plants, function() {
    map.getCanvas().style.cursor = "";
  });
};

export default {
  configureMouseCursor
};
