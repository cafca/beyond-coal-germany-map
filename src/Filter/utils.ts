import { SectionType, OptionType } from "../types";

const collectVariantFilters = (variants: OptionType[]) =>
  variants
    ?.filter((v) => v.hidden !== true && v.filter != null)
    .map((v) => v.filter);

const collectActiveFilters = (filterConfig: SectionType[]) => {
  const activeFilters = [];

  Object.values(filterConfig).forEach((section) => {
    if (section.options == null) return;

    const variantFilters = collectVariantFilters(section.variants);

    section.options.forEach((option) => {
      if (option.hidden === true || option.filter == null) return;

      if (section.variants) {
        activeFilters.push(["all", option.filter, ["any", ...variantFilters]]);
      } else {
        activeFilters.push(option.filter);
      }
    });
  });
  return activeFilters;
};

export default { collectActiveFilters };
