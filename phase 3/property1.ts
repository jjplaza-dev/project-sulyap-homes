import type {
  CurrencyCode,
  EntityId,
  GeoPoint,
  IsoDateString,
  IsoDateTimeString,
  Slug,
} from './common';
import type {
  FurnishingLevel,
  ListingStatus,
  PricePeriod,
  PropertyCategory,
  PropertyCondition,
} from './enums';
import type { BackupContact } from './booking';
import type { FloorPlan, MediaImage } from './media';

export interface Price {
  readonly amount: number;
  readonly currency: CurrencyCode;
  readonly period: PricePeriod;
}

/** A sale price is a one-off total. */
export interface SalePrice extends Price {
  readonly period: 'total';
}

/** A rental price is per month. */
export interface RentPrice extends Price {
  readonly period: 'month';
}

/** All fields optional: residential lots omit beds/baths, etc. */
export interface PropertySpecs {
  readonly bedrooms?: number;
  readonly bathrooms?: number;
  readonly floorAreaSqm?: number;
  readonly lotAreaSqm?: number;
  readonly floors?: number;
  readonly parkingSpaces?: number;
  readonly condition?: PropertyCondition;
}

export interface PropertyLocation {
  /** Shown as text on the detail page only. Never in map data, marker titles, or links. */
  readonly exactAddress: string;
  readonly barangay: string;
  readonly neighborhoodName?: string;
  readonly city: string;
  readonly province: string;
  /**
   * Manually entered, deliberately approximate map point.
   * Never geocoded and never derived from `exactAddress`.
   */
  readonly publicMap: GeoPoint;
}

/** [PROPOSED] Rental terms shown on `/rent` listings and detail pages. */
export interface LeaseTerms {
  readonly minimumLeaseMonths?: number;
  readonly securityDepositMonths?: number;
  readonly advanceRentMonths?: number;
  readonly furnishing?: FurnishingLevel;
  readonly petsAllowed?: boolean;
  readonly utilitiesNote?: string;
  readonly availableFrom?: IsoDateString;
}

/** [PROPOSED] A document the agent can share on request (no file hosting in Phase 2). */
export interface PropertyDocument {
  readonly id: EntityId;
  readonly title: string;
  readonly description?: string;
  /** Present only once real files exist (Phase 3+). */
  readonly href?: string;
}

/** Statuses valid for a listing that is for sale. */
export type SaleStatus = Exclude<ListingStatus, 'rented'>;

/** Statuses valid for a listing that is for rent. */
export type RentStatus = Exclude<ListingStatus, 'sold'>;

interface PropertyBase {
  readonly id: EntityId;
  readonly slug: Slug;
  readonly title: string;
  readonly category: PropertyCategory;
  readonly featured: boolean;
  readonly publishedAt: IsoDateTimeString;
  /** Short lede shown near the top of the detail page and on cards. */
  readonly overview: string;
  /** Full description (plain text; paragraphs separated by blank lines). */
  readonly description: string;
  readonly amenities: ReadonlyArray<string>;
  readonly pricingNotes?: string;
  readonly documents?: ReadonlyArray<PropertyDocument>;
  /**
   * True only for fictional design-preview listings. Controls the visible
   * "Sample listing" tag. Real listings leave it unset.
   */
  readonly isSample?: boolean;

  readonly specs: PropertySpecs;
  readonly location: PropertyLocation;
  readonly images: ReadonlyArray<MediaImage>;
  readonly floorPlans: ReadonlyArray<FloorPlan>;

  /** Relationships, by ID. Selectors resolve them. */
  readonly neighborhoodId: EntityId;
  /** The assigned (primary) agent. Tours are always booked with this agent. */
  readonly agentId: EntityId;
  readonly backup?: BackupContact;
}

export interface SaleProperty extends PropertyBase {
  readonly purpose: 'sale';
  readonly status: SaleStatus;
  readonly price: SalePrice;
  readonly leaseTerms?: undefined;
}

export interface RentProperty extends PropertyBase {
  readonly purpose: 'rent';
  readonly status: RentStatus;
  readonly price: RentPrice;
  readonly leaseTerms?: LeaseTerms;
}

/** A residential listing. Discriminate on `purpose`. */
export type Property = SaleProperty | RentProperty;
