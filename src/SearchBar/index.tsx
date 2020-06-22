import React, { useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";
import MapboxGL from "mapbox-gl";
import Fuse from "fuse.js";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Popper, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputElement from "./InputElement";
import config from "../config";
import PopupContent from "../Popups";
import { MapFeature } from "../types";

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

const getCategoryLabel: (item: MapFeature) => string = ({
  properties: { kind },
}) =>
  ({
    church: "Kirche",
    village: "Bedrohtes Dorf",
    group: "Aktive Gruppe",
    mine: "Tagebau",
    plant: "Kohlekraftwerk",
  }[kind]);

interface Props {
  handleMenuClick: () => void;
  handleFilterClick: () => void;
  map?: MapboxGL.Map;
}

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
  const [popup, setPopup] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Initialize search engine
  useEffect(() => {
    if (features == null) return;
    const fuse = new Fuse(features, {
      keys: ["properties.title"],
    });
    const byGroup = (a, b) =>
      getCategoryLabel(a.item).localeCompare(getCategoryLabel(b.item));
    setResults(fuse.search(query).sort(byGroup));
  }, [features, query]);

  // Load map features from Mapbox once the style is loaded,
  useEffect(() => {
    let timer;
    // calls itself repeatedly until style is loaded.
    const waitForFeatures = () => {
      const attemptLoading = (resolve, reject, ttl = 1000) => {
        if (map?.isStyleLoaded()) {
          let results = [];
          config.search.sources.forEach((source) => {
            // Mapbox `querySourceFeatures` may return duplicate results
            // so these are deduped by assigning them to `newFeatures`
            // by title
            const newFeatures = {};
            map
              ?.querySourceFeatures("composite", {
                sourceLayer: source,
              })
              .forEach(
                (feature) => (newFeatures[feature.properties.title] = feature)
              );
            results = results.concat(Object.values(newFeatures));
          });

          resolve(results);
        } else {
          if (ttl === 0) reject("Timeout loading source features");
          clearTimeout(timer);
          timer = setTimeout(
            () => attemptLoading(resolve, reject, ttl - 1),
            50
          );
        }
      };

      return new Promise(attemptLoading);
    };

    const doLoad = async () => {
      if (map) {
        try {
          const results = await waitForFeatures();
          setFeatures(results);
        } catch (e) {
          console.error(e);
          setErrorMessage(
            "Leider konnten nicht alle Karteninhalte geladen werden"
          );
        }
      }
    };
    doLoad();
  }, [map]);

  // Handle selecting a search result
  const onResultSelect = (_, feature) => {
    if (feature == null) return;
    setQuery("");
    if (popup) popup.remove();

    const coordinates = feature.geometry.coordinates.slice();
    map.flyTo({ center: coordinates, zoom: 11 });
    setPopup(
      new MapboxGL.Popup()
        .setLngLat(coordinates)
        .setHTML(renderToString(<PopupContent feature={feature} />))
        .addTo(map)
    );
  };

  return (
    <>
      <Autocomplete
        disabled={features == null}
        freeSolo
        inputValue={query}
        blurOnSelect={true}
        onInputChange={(_, value) => setQuery(value)}
        onChange={onResultSelect}
        options={results == null ? [] : results.map((res) => res.item)}
        getOptionLabel={(option) => option.properties.title}
        groupBy={(option) => getCategoryLabel(option)}
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
      <Snackbar open={errorMessage}>
        <MuiAlert elevation={6} variant="filled" severity="error">
          {errorMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default SearchBar;
