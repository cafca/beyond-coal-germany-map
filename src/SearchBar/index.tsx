import React, { useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";
import MapboxGL from "mapbox-gl";
import Fuse from "fuse.js";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Popper } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputElement from "./InputElement";
import Popup from "../Popup";
import config from "../config";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popper: {
      margin: "-20px 0 0 11px",
      width: "100% !important",
      [theme.breakpoints.up("md")]: {
        "max-width": "30em",
      },
      "& .MuiAutocomplete-paper": {
        borderRadius: 0,
        margin: "0 20px 0 10px",
        [theme.breakpoints.up("md")]: {
          margin: "initial",
        },
      },
    },
  })
);

interface Props {
  handleMenuClick: () => void;
  handleFilterClick: () => void;
  map?: MapboxGL.Map;
}

const sortResults = (a, b) =>
  a.properties.status.localeCompare(b.properties.status);

const SearchBar: React.FC<Props> = ({
  handleMenuClick,
  handleFilterClick,
  map,
}) => {
  const classes = useStyles();
  const refContainer = useRef(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [features, setFeatures] = useState(null);
  const [timer, setTimer] = useState(null);

  const attemptLoading = () => {
    if (map?.isStyleLoaded()) {
      const results = map
        ?.querySourceFeatures("composite", {
          sourceLayer: config.search.source,
        })
        .sort(sortResults);
      setFeatures(results);
    } else {
      clearTimeout(timer);
      setTimer(setTimeout(attemptLoading, 300));
    }
  };

  useEffect(() => {
    if (features == null) return;
    const fuse = new Fuse(features, {
      keys: ["properties.title"],
    });
    setResults(fuse.search(query));
  }, [features, query]);

  // Execute search when query changes
  useEffect(() => {
    if (map) {
      attemptLoading();
    }
  }, [map]);

  // Handle selecting a search result
  const onResultSelect = (_, feature) => {
    if (feature == null) return;

    setQuery("");
    const coordinates = feature.geometry.coordinates.slice();

    map.flyTo({ center: coordinates, zoom: 11 });

    new MapboxGL.Popup()
      .setLngLat(coordinates)
      .setHTML(renderToString(<Popup {...feature.properties}></Popup>))
      .addTo(map);
  };

  return (
    <Autocomplete
      disabled={features == null}
      freeSolo
      inputValue={query}
      blurOnSelect={true}
      onInputChange={(_, value) => setQuery(value)}
      onChange={onResultSelect}
      options={results == null ? [] : results.map((res) => res.item)}
      getOptionLabel={(option) => option.properties.title}
      autoHighlight={true}
      PopperComponent={(props) => (
        <Popper
          {...props}
          className={classes.popper}
          anchorEl={refContainer.current}
          placement="bottom-start"
        />
      )}
      renderInput={(params) => (
        <InputElement
          refContainer={refContainer}
          handleMenuClick={handleMenuClick}
          handleFilterClick={handleFilterClick}
          {...params}
        />
      )}
    />
  );
};

export default SearchBar;
