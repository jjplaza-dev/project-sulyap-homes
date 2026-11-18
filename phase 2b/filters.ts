/**
 * Filter option sets and sample criteria for the static search panel.
 * In Phase 2 these only drive visual selection; the result grid is fixed.
 */
import type {
  FilterOption,
  PropertyCategory,
  PropertyFilterOptions,
  PropertyPurpose,
  SearchCriteria,
  SortOption,
} from '@/domain';
import { categoryLabels, sortLabels } from './labels';
import { neighborhoods } from './neighborhoods';

const categoryOption = (value: PropertyCategory): FilterOption<PropertyCategory> => ({
  value,
  label: categoryLabels[value],
});

const sortOption = (value: SortOption): FilterOption<SortOption> => ({
  value,
  label: sortLabels[value],
});

const neighborhoodOptions: PropertyFilterOptions['neighborhoods'] = neighborhoods.map((n) => ({
  value: n.id,
  label: n.name,
}));

const sortOptions: PropertyFilterOptions['sortOptions'] = [
  sortOption('newest'),
  sortOption('price-asc'),
  sortOption('price-desc'),
];

export const filterOptions: Record<PropertyPurpose, PropertyFilterOptions> = {
  sale: {
    purpose: 'sale',
    categories: (['house', 'condominium', 'apartment', 'townhouse', 'lot'] as const).map(categoryOption),
    neighborhoods: neighborhoodOptions,
    price: { min: 1_500_000, max: 20_000_000, step: 100_000 },
    bedrooms: [1, 2, 3, 4],
    bathrooms: [1, 2, 3],
    floorAreaSqm: { min: 20, max: 300, step: 10 },
    lotAreaSqm: { min: 100, max: 2500, step: 50 },
    sortOptions,
  },
  rent: {
    purpose: 'rent',
    // Residential lots are not offered for rent.
    categories: (['house', 'condominium', 'apartment', 'townhouse'] as const).map(categoryOption),
    neighborhoods: neighborhoodOptions,
    price: { min: 5_000, max: 50_000, step: 1_000 },
    bedrooms: [1, 2, 3, 4],
    bathrooms: [1, 2, 3],
    floorAreaSqm: { min: 20, max: 200, step: 10 },
    lotAreaSqm: { min: 100, max: 500, step: 50 },
    sortOptions,
  },
};

/** Nothing selected: the neutral starting state of the panel. */
export const defaultSearchCriteria: Record<PropertyPurpose, SearchCriteria> = {
  sale: { purpose: 'sale', categories: [], neighborhoodIds: [], sort: 'newest' },
  rent: { purpose: 'rent', categories: [], neighborhoodIds: [], sort: 'newest' },
};

/**
 * Example selections used to show active chips, selected toggles and filled
 * sliders in the static panel. Presentation only.
 */
export const sampleActiveCriteria: Record<PropertyPurpose, SearchCriteria> = {
  sale: {
    purpose: 'sale',
    categories: ['house', 'townhouse'],
    neighborhoodIds: ['nb-aurora-hill', 'nb-loakan'],
    priceMin: 5_000_000,
    priceMax: 13_000_000,
    bedroomsMin: 3,
    bathroomsMin: 2,
    sort: 'price-asc',
  },
  rent: {
    purpose: 'rent',
    categories: ['condominium', 'apartment'],
    neighborhoodIds: ['nb-pacdal'],
    priceMin: 8_000,
    priceMax: 30_000,
    bedroomsMin: 1,
    sort: 'newest',
  },
};
