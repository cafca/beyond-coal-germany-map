import { SectionType, OptionType, BranchingSection } from "../types";

const collectVariantFilters = (variants: OptionType[]) =>
  variants
    ?.filter((v) => v.hidden !== true && v.filter != null)
    .map((v) => v.filter);

/**
 * Return an object containing Mapbox filters indexed by layer name
 *
 * @param filterConfig sections, options and variants with `hidden` properties
 */
const collectActiveFilters = (filterConfig: SectionType[]) => {
  const activeFilters = {};

  Object.values(filterConfig).forEach((section) => {
    section.layers?.forEach((layer) => {
      if (activeFilters[layer] == null) activeFilters[layer] = [];

      // Handle SingleSection
      if ("filter" in section) {
        if (section.hidden) return;
        activeFilters[layer].push(section.filter);
        return;
      }

      // Handle BranchingSection
      const bSection = section as BranchingSection;

      if (bSection.options == null) return;
      if (layer == null) return;

      const variantFilters = collectVariantFilters(bSection.variants);

      (bSection as BranchingSection).options.forEach((option) => {
        if (option.hidden === true || option.filter == null) return;

        if ((bSection as BranchingSection).variants) {
          activeFilters[layer].push([
            "all",
            option.filter,
            ["any", ...variantFilters],
          ]);
        } else {
          activeFilters[layer].push(option.filter);
        }
      });
    });
  });
  return activeFilters;
};

export default { collectActiveFilters };
