/**
 * Content, filter and preview selectors: pure, synchronous, read-only.
 */
import type {
  EditorialBlock,
  EntityId,
  FavoritesPreview,
  FavoritesPreviewVariant,
  FaqItem,
  LegalSection,
  PropertyFilterOptions,
  PropertyPurpose,
  PublicSiteSettings,
  SearchCriteria,
  BookingPreviewState,
  TourBookingPreview,
  ValueItem,
} from '@/domain';
import {
  editorialBlocks,
  faqItems,
  legalSections,
  valueItems,
  type EditorialBlockId,
} from '../fixtures/content';
import { defaultSearchCriteria, filterOptions, sampleActiveCriteria } from '../fixtures/filters';
import { favoritesPreviews, sampleTourSlots } from '../fixtures/preview';
import { siteSettings } from '../fixtures/site-settings';
import { properties } from '../fixtures/properties';

const byOrder = <T extends { readonly order: number }>(a: T, b: T): number => a.order - b.order;

/**
 * Site settings safe for client components. Built field by field so the
 * server-only `centralAdminEmail` can never leak through a spread.
 */
const publicSiteSettings: PublicSiteSettings = {
  businessName: siteSettings.businessName,
  tagline: siteSettings.tagline,
  logo: siteSettings.logo,
  nav: siteSettings.nav,
  contact: siteSettings.contact,
  social: siteSettings.social,
  serviceArea: siteSettings.serviceArea,
  homepageFeaturedIds: siteSettings.homepageFeaturedIds,
  footer: siteSettings.footer,
};

export function getPublicSiteSettings(): PublicSiteSettings {
  return publicSiteSettings;
}

export function getEditorialBlock(id: EditorialBlockId): EditorialBlock {
  return editorialBlocks[id];
}

export function getFaqItems(): ReadonlyArray<FaqItem> {
  return [...faqItems].sort(byOrder);
}

export function getLegalSections(): ReadonlyArray<LegalSection> {
  return [...legalSections].sort(byOrder);
}

export function getValueItems(): ReadonlyArray<ValueItem> {
  return [...valueItems].sort(byOrder);
}

export function getFilterOptions(purpose: PropertyPurpose): PropertyFilterOptions {
  return filterOptions[purpose];
}

export function getDefaultSearchCriteria(purpose: PropertyPurpose): SearchCriteria {
  return defaultSearchCriteria[purpose];
}

/** Example selections for showing active chips in the static panel. */
export function getSampleActiveCriteria(purpose: PropertyPurpose): SearchCriteria {
  return sampleActiveCriteria[purpose];
}

export function getFavoritesPreview(variant: FavoritesPreviewVariant): FavoritesPreview {
  return favoritesPreviews[variant];
}

/**
 * Static stand-in for the Cal.com embed. Always uses the property's ASSIGNED
 * agent. Returns `undefined` for an unknown property.
 */
export function getBookingPreview(
  propertyId: EntityId,
  previewState: BookingPreviewState = 'slots',
): TourBookingPreview | undefined {
  const property = properties.find((p) => p.id === propertyId);
  if (!property) return undefined;
  return {
    propertyId: property.id,
    agentId: property.agentId,
    durationMinutes: 30,
    timezone: 'Asia/Manila',
    sampleSlots: sampleTourSlots,
    previewState,
  };
}
