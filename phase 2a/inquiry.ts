import type { EntityId } from './common';
import type { FavoritesPreviewVariant } from './enums';

interface InquiryInputBase {
  readonly name: string;
  readonly email: string;
  readonly contactNumber?: string;
  readonly message: string;
}

/** Input for a question about one listing (R10). */
export interface PropertyInquiryInput extends InquiryInputBase {
  readonly propertyId: EntityId;
}

/** Input for a general question (R16). */
export type ContactInquiryInput = InquiryInputBase;

/**
 * Static sample for `/favorites` in Phase 2. Never persisted.
 * Real favorites (Phase 4) are an array of property IDs in browser storage.
 */
export interface FavoritesPreview {
  readonly variant: FavoritesPreviewVariant;
  readonly propertyIds: ReadonlyArray<EntityId>;
}
