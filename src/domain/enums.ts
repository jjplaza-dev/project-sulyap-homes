/**
 * Literal unions for the Sulyap Homes & Leasing domain.
 *
 * Types only (no runtime arrays). Display labels, option lists, and ordering
 * live with the fixtures (Phase 2B) and later with the content layer, not here.
 *
 * Values marked [PROPOSED] were chosen by the plan and are finalized here in 2A.
 * Changing any union later means updating every consumer in the same change.
 */

/** Is the listing for sale or for rent? */
export type PropertyPurpose = 'sale' | 'rent';

/** The five residential property types Sulyap lists. */
export type PropertyCategory =
  | 'house'
  | 'condominium'
  | 'apartment'
  | 'townhouse'
  | 'lot';

/**
 * Listing availability (assumption A2).
 * Draft/archived are NOT statuses: they are Sanity publish state.
 * See `SaleStatus` / `RentStatus` in `property.ts` for the purpose-specific subsets.
 */
export type ListingStatus = 'available' | 'reserved' | 'sold' | 'rented';

/** `total` = one-off sale price; `month` = monthly rent. */
export type PricePeriod = 'total' | 'month';

/** Result ordering on `/buy` and `/rent`. */
export type SortOption = 'newest' | 'price-asc' | 'price-desc';

/** Kinds of nearby places shown on neighborhood and property pages. */
export type EstablishmentType =
  | 'school'
  | 'hospital'
  | 'shopping'
  | 'restaurant'
  | 'cafe'
  | 'landmark';

/** Who to offer when the assigned agent has no availability. */
export type BackupKind = 'agent' | 'central';

/** [PROPOSED] Public transport / access modes described per neighborhood. */
export type TransportMode =
  | 'walking'
  | 'jeepney'
  | 'taxi'
  | 'bus'
  | 'private-vehicle';

/** [PROPOSED] Review-only switch for the static booking panel (Phase 2). */
export type BookingPreviewState = 'slots' | 'success' | 'failure' | 'backup';

/** Phase 5 — lifecycle of a notification email for a stored inquiry. */
export type EmailDeliveryStatus = 'pending' | 'sent' | 'partial' | 'failed';

/** Phase 6 — whether the exact address was written to the Cal.com booking. */
export type LocationUpdateStatus = 'pending' | 'successful' | 'failed';

// ---------------------------------------------------------------------------
// Additions required by the blueprint's field lists ([PROPOSED])
// ---------------------------------------------------------------------------

/** What a `MediaImage` depicts. */
export type MediaKind = 'photo' | 'floor-plan' | 'portrait' | 'logo';

/**
 * [PROPOSED] Keys for the original SVG/CSS placeholder art that stands in for
 * photography in Phase 2. Every key must have a matching illustration in the
 * placeholder-art component (2C onward). Extending this union means adding art.
 */
export type PlaceholderArtKey =
  | 'ridge-dawn'
  | 'ridge-mist'
  | 'window-arch'
  | 'category-house'
  | 'category-condominium'
  | 'category-apartment'
  | 'category-townhouse'
  | 'category-lot'
  | 'interior-living'
  | 'interior-kitchen'
  | 'interior-bedroom'
  | 'interior-bath'
  | 'garden-terrace'
  | 'street-frontage'
  | 'floor-plan-compact'
  | 'floor-plan-multilevel'
  | 'agent-portrait'
  | 'neighborhood-streetscape'
  | 'brand-logo';

/** [PROPOSED] `PropertySpecs.condition`. */
export type PropertyCondition =
  | 'brand-new'
  | 'excellent'
  | 'good'
  | 'fair'
  | 'needs-renovation';

/** [PROPOSED] `LeaseTerms.furnishing` for rentals. */
export type FurnishingLevel =
  | 'unfurnished'
  | 'semi-furnished'
  | 'fully-furnished';

/** [PROPOSED] Review-only states of the static inquiry/contact forms (Phase 2). */
export type FormPreviewState =
  | 'idle'
  | 'error-preview'
  | 'success-preview'
  | 'disabled';

/** [PROPOSED] Which sample variant the static `/favorites` page shows. */
export type FavoritesPreviewVariant = 'saved' | 'empty';
