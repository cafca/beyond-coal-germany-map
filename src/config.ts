import GruppeIcon from "./Icons/Gruppe.svg";
// import GruppeKlagenIcon from "./Icons/Gruppe Klage.svg";
// import GruppeZUIcon from "./Icons/Gruppe ZU.svg";

import DorfIcon from "./Icons/Dörfer.svg";
// import DorfKircheIcon from "./Icons/Kirche.svg";

import TagebauIcon from "./Icons/Tagebau.svg";

import KraftwerkIcon from "./Icons/Kraftwerk.svg";
import KraftwerkSteinkohleIcon from "./Icons/Steinkohle.svg";
import KraftwerkBraunkohleIcon from "./Icons/Braunkohle.svg";
// import KraftwerkGasIcon from "./Icons/Gas.svg";

import KraftwerkInBauIcon from "./Icons/In Bau.svg";
import KraftwerkAktivIcon from "./Icons/Aktiv.svg";
import KraftwerkAbschaltungIcon from "./Icons/Vor Absch.svg";
import KraftwerkAbgeschaltetIcon from "./Icons/Abgeschaltet.svg";
import { SectionType } from "./types";

const styles = {
  ramin: "mapbox://styles/daydreaming101/ck7bmt24v0hxj1itfln4af2l9",
  vincent: "mapbox://styles/atlasblau/ck7uzuyo904ew1ipnafk3r4zg?fresh=true",
  klimaallianz:
    "mapbox://styles/fabian-huebner/ck98l6ypr18u71io6v1afp8vz?fresh=true",
};

interface Config {
  debug: boolean;
  mapbox: {
    token: string;
    style: string;
    layers: {
      [name: string]: string;
    };
    bounds: [[number, number], [number, number]];
  };
  search: {
    source: string;
    query: (string) => any[];
  };
  filters: SectionType[];
}

const config: Config = {
  debug: process.env.NODE_ENV !== "production",
  mapbox: {
    token: process.env.REACT_APP_MAPBOX_TOKEN || "",
    style: styles.klimaallianz,
    layers: {
      plants: "plants",
    },
    bounds: [
      [1.52, 44.161239], //ws
      [19.2, 58.03824], //en
    ],
  },
  search: {
    source: "plants-b9vr5h",
    query: (query) => [
      "in",
      ["downcase", query],
      ["downcase", ["get", "title"]],
    ],
  },
  filters: [
    {
      title: "Gruppe",
      icon: GruppeIcon,
    },
    {
      title: "Dorf",
      icon: DorfIcon,
    },
    {
      title: "Tagebau",
      icon: TagebauIcon,
    },
    {
      title: "Kraftwerk",
      icon: KraftwerkIcon,
      options: [
        {
          title: "Steinkohle",
          icon: KraftwerkSteinkohleIcon,
          filter: ["==", ["get", "fuel"], "Hard coal"],
        },
        {
          title: "Braunkohle",
          icon: KraftwerkBraunkohleIcon,
          filter: ["==", ["get", "fuel"], "Lignite"],
        },
      ],
      variants: [
        {
          title: "In Bau",
          icon: KraftwerkInBauIcon,
          filter: ["==", ["get", "status"], "Construction"],
        },
        {
          title: "Aktiv",
          icon: KraftwerkAktivIcon,
          filter: ["==", ["get", "status"], "Open"],
        },
        {
          title: "Vor Abschaltung",
          icon: KraftwerkAbschaltungIcon,
          filter: ["==", ["get", "status"], "Retiring"],
        },
        {
          title: "Abgeschaltet",
          icon: KraftwerkAbgeschaltetIcon,
          filter: ["==", ["get", "status"], "Retired"],
        },
      ],
    },
  ],
};

export default config;
