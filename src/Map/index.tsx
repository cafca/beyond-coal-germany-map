import React, { useEffect, useRef, useState, CSSProperties } from "react";
import MapboxGL from "mapbox-gl";

import config from "../config";
import FilterMenu from "../FilterMenu";
import MapControls from "../MapControls";

import utils from "./utils";

const styles: CSSProperties = {
  width: "100vw",
  height: "100vh",
  position: "absolute",
};

type ContainerType = React.MutableRefObject<null | HTMLDivElement>;

let onZoomOut = () => console.log("Map not loaded yet");
let onZoomIn = () => console.log("Map not loaded yet");

const initMap = ({ setMap, mapContainer }) => {
  const map = new MapboxGL.Map({
    container: mapContainer.current,
    style: config.mapbox.style,
  });

  map.on("load", () => {
    setMap(map);
    map.resize();
    // map.addControl(new MapboxGL.NavigationControl(), "bottom-right");
    // map.addControl(new MapboxGL.GeolocateControl(), "bottom-left");

    utils.configureMouseCursor(map);
  });
  utils.configurePopup(map);
  onZoomOut = () =>
    map.easeTo({
      zoom: map.getZoom() - 1,
    });
  onZoomIn = () =>
    map.easeTo({
      zoom: map.getZoom() + 1,
    });
};

const Map = ({ isFilterOpen, handleFilterClose }) => {
  const [map, setMap] = useState(null);
  const mapContainer: ContainerType = useRef(null);

  useEffect(() => {
    MapboxGL.accessToken = config.mapbox.token;
    if (map == null) initMap({ setMap, mapContainer });
  }, [map]);

  return (
    <div
      ref={(el) => {
        if (mapContainer != null) mapContainer.current = el;
      }}
      style={styles}
    >
      <MapControls
        handleZoomIn={() => onZoomIn()}
        handleZoomOut={() => onZoomOut()}
      />
      <FilterMenu
        isOpen={isFilterOpen}
        handleClose={handleFilterClose}
        map={map}
      />
    </div>
  );
};

export default Map;
