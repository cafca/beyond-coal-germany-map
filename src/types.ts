import { MapboxGeoJSONFeature } from "mapbox-gl";

export interface OptionType {
  title: string;
  icon?: string;
  variant?: boolean;
  filter?: any[];
  hidden?: boolean;
}

export interface SectionType {
  title: string;
  icon: string;
  layer?: string;
  options?: OptionType[];
  variants?: OptionType[];
}

export type Status = "Open" | "Retiring" | "Retired" | "Construction";

export interface MapFeature extends MapboxGeoJSONFeature {
  properties: {
    title: string;
    status: Status;
  };
}
