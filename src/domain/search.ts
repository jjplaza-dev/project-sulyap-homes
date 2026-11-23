import type { EntityId, NumberRange, NumericBounds } from './common';
import type { PropertyCategory, PropertyPurpose, SortOption } from './enums';

/**
 * What a visitor has asked for. Phase 2 shows this as visual selection only;
 * Phase 4 round-trips it through URL search params.
 */
export interface SearchCriteria {
  readonly purpose: PropertyPurpose;
  readonly categories: ReadonlyArray<PropertyCategory>;
  readonly neighborhoodIds: ReadonlyArray<EntityId>;
  /** Pesos. For rentals this is the monthly amount. */
  readonly priceMin?: number;
  readonly priceMax?: number;
  readonly bedroomsMin?: number;
  readonly bathroomsMin?: number;
  readonly floorAreaSqm?: NumberRange;
  readonly lotAreaSqm?: NumberRange;
  readonly sort: SortOption;
}

/** One selectable option in a filter control. */
export interface FilterOption<TValue extends string> {
  readonly value: TValue;
  readonly label: string;
  /** Number of matching listings, when known. */
  readonly count?: number;
}

/** The choices a filter panel offers for one purpose. Derived from `Property`. */
export interface PropertyFilterOptions {
  readonly purpose: PropertyPurpose;
  readonly categories: ReadonlyArray<FilterOption<PropertyCategory>>;
  readonly neighborhoods: ReadonlyArray<FilterOption<EntityId>>;
  readonly price: NumericBounds;
  /** Minimum-bedroom choices, e.g. 1, 2, 3, 4. */
  readonly bedrooms: ReadonlyArray<number>;
  readonly bathrooms: ReadonlyArray<number>;
  readonly floorAreaSqm: NumericBounds;
  readonly lotAreaSqm: NumericBounds;
  readonly sortOptions: ReadonlyArray<FilterOption<SortOption>>;
}
