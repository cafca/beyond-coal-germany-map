import React, { useEffect, useRef, useState, CSSProperties } from "react";
import MapboxGL from "mapbox-gl";
import addLocations from "./locations";

import config from "../config";

const styles: CSSProperties = {
  width: "100vw",
  height: "100vh",
  position: "absolute"
};

type ContainerType = React.MutableRefObject<null | HTMLDivElement>;

const Map = () => {
  const [map, setMap] = useState(null);
  const mapContainer: ContainerType = useRef(null);

  useEffect(() => {
    MapboxGL.accessToken = config.mapbox.token;
    const initMap = ({ setMap, mapContainer }) => {
      const map = new MapboxGL.Map({
        container: mapContainer.current,
        style: config.mapbox.style
      });

      map.on("load", () => {
        setMap(map);
        map.resize();
      });
      addLocations(map);
    };

    if (map == null) initMap({ setMap, mapContainer });
  }, [map]);

  return (
    <div
      ref={el => {
        if (mapContainer != null) mapContainer.current = el;
      }}
      style={styles}
    ></div>
  );
};

export default Map;
