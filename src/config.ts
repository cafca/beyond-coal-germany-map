import GruppeIcon from "./Icons/Gruppe.svg";

import DorfIcon from "./Icons/Dörfer.svg";

import TagebauIcon from "./Icons/Tagebau.svg";

import KraftwerkIcon from "./Icons/Filter-Kohlekraftwerke.svg";
import KraftwerkSteinkohleIcon from "./Icons/Steinkohle.svg";
import KraftwerkBraunkohleIcon from "./Icons/Braunkohle.svg";

import KraftwerkNeubauVerhindertIcon from "./Icons/Neubau verhindert.svg";
import KraftwerkInBauIcon from "./Icons/In Bau.svg";
import KraftwerkAktivIcon from "./Icons/Aktiv.svg";
import KraftwerkAbschaltungIcon from "./Icons/Vor Absch.svg";
import KraftwerkAbgeschaltetIcon from "./Icons/Abgeschaltet.svg";
import { SectionType } from "./types";

const styles = {
  ramin: "mapbox://styles/daydreaming101/ck7bmt24v0hxj1itfln4af2l9",
  vincent: "mapbox://styles/atlasblau/ck7uzuyo904ew1ipnafk3r4zg",
  klimaallianz: "mapbox://styles/fabian-huebner/ck98l6ypr18u71io6v1afp8vz",
  v2: "mapbox://styles/fabian-huebner/ckmkkv91p5osx17nrda8t6s9c",
};

/**
 * Return one of the configured Mapbox styles, disabling map caching when
 * NODE_ENV != production
 *
 * @param name one of the styles defined in `styles` above
 * @returns Mapbox API style URL
 */
const getStyle = (name: keyof typeof styles): string =>
  `${styles[name]}${
    process.env.NODE_ENV === "production" ? "" : "?fresh=true"
  }`;

interface Config {
  debug: boolean;
  mapbox: {
    token: string;
    style: string;
    layers: string[];
    bounds: [[number, number], [number, number]];
  };
  search: {
    sources: string[];
    query: (string) => any[];
  };
  filters: SectionType[];
  tooltipDelay: number;
}

const config: Config = {
  debug: process.env.NODE_ENV !== "production",
  mapbox: {
    token: process.env.REACT_APP_MAPBOX_TOKEN || "",
    style: getStyle("v2"),
    layers: ["plants", "groups", "villages", "churches", "mines"],
    bounds: [
      [1.52, 44.161239], //ws
      [19.2, 58.03824], //en
    ],
  },
  search: {
    sources: ["plants-v2", "groups", "villages", "mines", "churches"],
    query: (query) => [
      "in",
      ["downcase", query],
      ["downcase", ["get", "title"]],
    ],
  },
  tooltipDelay: 1500,
  filters: [
    {
      title: "Aktive Gruppen",
      icon: GruppeIcon,
      layers: ["groups"],
      filter: ["has", "title"],
      color: "#03ACEC",
    },
    {
      title: "Bedrohte Dörfer",
      icon: DorfIcon,
      layers: ["villages", "churches"],
      filter: ["has", "title"],
      color: "#F8CA30",
    },
    {
      title: "Braunkohle-Tagebaue",
      icon: TagebauIcon,
      layers: ["mines"],
      filter: ["has", "title"],
      color: "#A52317",
    },
    {
      title: "Kohle-Kraftwerke",
      icon: KraftwerkIcon,
      layers: ["plants"],
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
          color: "#5F2C00",
        },
      ],
      variants: [
        {
          title: "Aktiv",
          icon: KraftwerkAktivIcon,
          filter: ["==", ["get", "status"], "Open"],
        },
        {
          title: "Neubau verhindert",
          icon: KraftwerkNeubauVerhindertIcon,
          filter: ["==", ["get", "status"], "Cancelled"],
        },
        {
          title: "Konversion / Ersatz",
          icon: KraftwerkInBauIcon,
          filter: ["==", ["get", "status"], "Conversion"],
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
