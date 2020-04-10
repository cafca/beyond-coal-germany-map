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
  const [isFilterOpen, setFilterOpen] = useState(false);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <SearchBar
          handleMenuClick={() => setMenuOpen(!isMenuOpen)}
          handleFilterClick={() => setFilterOpen(!isFilterOpen)}
        />
        <MainMenu isOpen={isMenuOpen} handleClose={() => setMenuOpen(false)} />
        <Map
          isFilterOpen={isFilterOpen}
          handleFilterClose={() => setFilterOpen(false)}
        />
      </ThemeProvider>
    </div>
  );
}

export default App;
