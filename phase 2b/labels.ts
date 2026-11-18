/**
 * Display vocabulary for the domain's literal unions.
 * `Record<Union, string>` makes missing labels a type error.
 */
import type {
  EstablishmentType,
  FurnishingLevel,
  ListingStatus,
  PricePeriod,
  PropertyCategory,
  PropertyCondition,
  PropertyPurpose,
  SortOption,
  TransportMode,
} from '@/domain';

export const purposeLabels: Record<PropertyPurpose, string> = {
  sale: 'For sale',
  rent: 'For rent',
};

export const categoryLabels: Record<PropertyCategory, string> = {
  house: 'House',
  condominium: 'Condominium',
  apartment: 'Apartment',
  townhouse: 'Townhouse',
  lot: 'Residential lot',
};

export const categoryPluralLabels: Record<PropertyCategory, string> = {
  house: 'Houses',
  condominium: 'Condominiums',
  apartment: 'Apartments',
  townhouse: 'Townhouses',
  lot: 'Residential lots',
};

export const statusLabels: Record<ListingStatus, string> = {
  available: 'Available',
  reserved: 'Reserved',
  sold: 'Sold',
  rented: 'Rented',
};

export const sortLabels: Record<SortOption, string> = {
  newest: 'Newest first',
  'price-asc': 'Price: low to high',
  'price-desc': 'Price: high to low',
};

/** Appended after a formatted price: `₱15,000` + ` / month`. */
export const pricePeriodSuffix: Record<PricePeriod, string> = {
  total: '',
  month: ' / month',
};

export const establishmentTypeLabels: Record<EstablishmentType, string> = {
  school: 'Schools',
  hospital: 'Hospitals & clinics',
  shopping: 'Shopping',
  restaurant: 'Restaurants',
  cafe: 'Cafés',
  landmark: 'Landmarks',
};

export const transportModeLabels: Record<TransportMode, string> = {
  walking: 'On foot',
  jeepney: 'Jeepney',
  taxi: 'Taxi',
  bus: 'Bus',
  'private-vehicle': 'Private vehicle',
};

export const furnishingLabels: Record<FurnishingLevel, string> = {
  unfurnished: 'Unfurnished',
  'semi-furnished': 'Semi-furnished',
  'fully-furnished': 'Fully furnished',
};

export const conditionLabels: Record<PropertyCondition, string> = {
  'brand-new': 'Brand new',
  excellent: 'Excellent',
  good: 'Good',
  fair: 'Fair',
  'needs-renovation': 'Needs renovation',
};
