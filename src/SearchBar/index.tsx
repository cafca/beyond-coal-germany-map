import React, { useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";
import MapboxGL from "mapbox-gl";
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

  // Execute search when query changes
  useEffect(() => {
    if (query.length === 0) return setResults([]);
    const results = map
      ?.querySourceFeatures("composite", {
        sourceLayer: config.search.source,
        filter: config.search.query(query),
      })
      .sort(sortResults);
    setResults(results);
  }, [query, map]);

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
      freeSolo
      inputValue={query}
      blurOnSelect={true}
      onInputChange={(_, value) => setQuery(value)}
      onChange={onResultSelect}
      options={results == null ? [] : results}
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
