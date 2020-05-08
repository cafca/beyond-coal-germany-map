import { SectionType, OptionType } from "../types";

const collectVariantFilters = (variants: OptionType[]) =>
  variants
    ?.filter((v) => v.hidden !== true && v.filter != null)
    .map((v) => v.filter);

const collectActiveFilters = (filterConfig: SectionType[]) => {
  const activeFilters = {};

  Object.values(filterConfig).forEach((section) => {
    if (section.options == null) return;
    if (section.layer == null) return;

    if (activeFilters[section.layer] == null) activeFilters[section.layer] = [];

    const variantFilters = collectVariantFilters(section.variants);

    section.options.forEach((option) => {
      if (option.hidden === true || option.filter == null) return;

      if (section.variants) {
        activeFilters[section.layer].push([
          "all",
          option.filter,
          ["any", ...variantFilters],
        ]);
      } else {
        activeFilters[section.layer].push(option.filter);
      }
    });
  });
  return activeFilters;
};

export default { collectActiveFilters };
