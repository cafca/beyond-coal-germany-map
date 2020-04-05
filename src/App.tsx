import React from "react";
import "./App.css";

import Map from "./Map";
import Menu from "./Menu";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  typography: {
    fontFamily:
      '"Open Sans", --apple-system, "Helvetica Neue", Arial, sans-serif'
  }
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Menu />
        <Map />
      </ThemeProvider>
    </div>
  );
}

export default App;
