import { MapboxGeoJSONFeature } from "mapbox-gl";

export interface OptionType {
  title: string;
  icon?: string;
  variant?: boolean;
  filter?: any[];
  hidden?: boolean;
  color?: string;
}

export type BaseSection = {
  title: string;
  icon: string;
  layer?: string;
  color?: string;
};

export interface SingleSection extends BaseSection {
  filter?: any[];
  hidden?: boolean;
}

export interface BranchingSection extends BaseSection {
  options?: OptionType[];
  variants?: OptionType[];
}

export type SectionType = BranchingSection | SingleSection;

export type Status = "Open" | "Retiring" | "Retired" | "Construction";

export interface MapFeature extends MapboxGeoJSONFeature {
  properties: {
    title: string;
    status: Status;
  };
}
