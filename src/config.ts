const styles = {
  ramin: "mapbox://styles/daydreaming101/ck7bmt24v0hxj1itfln4af2l9",
  vincent: "mapbox://styles/atlasblau/ck7uzuyo904ew1ipnafk3r4zg?fresh=true"
};

export default {
  mapbox: {
    token: process.env.REACT_APP_MAPBOX_TOKEN || "",
    style: styles.vincent,
    layers: {
      plants: "plants"
    }
  }
};
