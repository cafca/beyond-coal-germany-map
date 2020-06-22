import React, { useState } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import "./App.css";

import MainMenu from "./MainMenu";
import Map from "./Map";
import SearchBar from "./SearchBar";

const theme = createMuiTheme({
  typography: {
    fontFamily:
      '"Open Sans", --apple-system, "Helvetica Neue", Arial, sans-serif',
  },
});

function App() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isFilterOpen, setFilterOpen] = useState(true);
  const [map, setMap] = useState(null);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <SearchBar
          handleMenuClick={() => setMenuOpen(!isMenuOpen)}
          handleFilterClick={() => setFilterOpen(!isFilterOpen)}
          map={map}
        />
        <MainMenu isOpen={isMenuOpen} handleClose={() => setMenuOpen(false)} />
        <Map
          isFilterOpen={isFilterOpen}
          handleFilterClose={() => setFilterOpen(false)}
          onMapInit={setMap}
        />
      </ThemeProvider>
    </div>
  );
}

export default App;
