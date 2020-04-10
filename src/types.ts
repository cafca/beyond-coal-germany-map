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
  options?: OptionType[];
  variants?: OptionType[];
}
