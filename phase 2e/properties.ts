/**
 * Property selectors: pure, synchronous, read-only.
 * UI code reads fixtures only through selectors, so Phase 3 can swap the source
 * to Sanity without touching components.
 */
import type { EntityId, Property, PropertyCategory, PropertyPurpose, Slug } from '@/domain';
import { properties } from '../fixtures/properties';
import { siteSettings } from '../fixtures/site-settings';

const byNewest = (a: Property, b: Property): number =>
  Date.parse(b.publishedAt) - Date.parse(a.publishedAt);

const isOpen = (property: Property): boolean =>
  property.status === 'available' || property.status === 'reserved';

/** Every listing, newest first. Used for static route generation. */
export function getAllProperties(): ReadonlyArray<Property> {
  return [...properties].sort(byNewest);
}

/** All listings for one purpose, newest first (sold/rented listings stay visible, labelled). */
export function getPropertiesByPurpose(purpose: PropertyPurpose): ReadonlyArray<Property> {
  return properties.filter((p) => p.purpose === purpose).sort(byNewest);
}

/** Featured listings in the order set by `SiteSettings.homepageFeaturedIds`. */
export function getFeaturedProperties(limit?: number): ReadonlyArray<Property> {
  const order = siteSettings.homepageFeaturedIds;
  const rank = (id: EntityId): number => {
    const index = order.indexOf(id);
    return index === -1 ? Number.MAX_SAFE_INTEGER : index;
  };
  const featured = properties
    .filter((p) => p.featured)
    .sort((a, b) => rank(a.id) - rank(b.id) || byNewest(a, b));
  return limit === undefined ? featured : featured.slice(0, limit);
}

/** Newest open listings (excludes sold and rented). */
export function getRecentProperties(limit = 6): ReadonlyArray<Property> {
  return properties.filter(isOpen).sort(byNewest).slice(0, limit);
}

export function getPropertyBySlug(slug: Slug): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getPropertyById(id: EntityId): Property | undefined {
  return properties.find((p) => p.id === id);
}

export function getPropertiesByNeighborhood(neighborhoodId: EntityId): ReadonlyArray<Property> {
  return properties.filter((p) => p.neighborhoodId === neighborhoodId).sort(byNewest);
}

export function getPropertiesByAgent(agentId: EntityId): ReadonlyArray<Property> {
  return properties.filter((p) => p.agentId === agentId).sort(byNewest);
}

/** Listings by id, in the order given. Unknown ids are skipped. */
export function getPropertiesByIds(ids: ReadonlyArray<EntityId>): ReadonlyArray<Property> {
  return ids.flatMap((id) => {
    const property = getPropertyById(id);
    return property ? [property] : [];
  });
}

/**
 * Number of AVAILABLE listings per category, optionally for one purpose.
 * Used by the homepage category tiles.
 */
export function getCategoryCounts(purpose?: PropertyPurpose): Record<PropertyCategory, number> {
  const counts: Record<PropertyCategory, number> = {
    house: 0,
    condominium: 0,
    apartment: 0,
    townhouse: 0,
    lot: 0,
  };
  for (const property of properties) {
    if (property.status === 'available' && (purpose === undefined || property.purpose === purpose)) {
      counts[property.category] += 1;
    }
  }
  return counts;
}

/**
 * Deterministic "similar listings" rule (same purpose, never the listing itself):
 *   tier 0: same neighborhood and same category
 *   tier 1: same category, price within ±30%
 *   tier 2: same neighborhood
 * Ordered by tier, then newest first. Default maximum of 4.
 */
export function getSimilarProperties(property: Property, limit = 4): ReadonlyArray<Property> {
  const withinThirtyPercent = (amount: number): boolean =>
    Math.abs(amount - property.price.amount) / property.price.amount <= 0.3;

  const tierOf = (candidate: Property): number => {
    const sameNeighborhood = candidate.neighborhoodId === property.neighborhoodId;
    const sameCategory = candidate.category === property.category;
    if (sameNeighborhood && sameCategory) return 0;
    if (sameCategory && withinThirtyPercent(candidate.price.amount)) return 1;
    if (sameNeighborhood) return 2;
    return -1;
  };

  return properties
    .filter((p) => p.id !== property.id && p.purpose === property.purpose)
    .map((candidate) => ({ candidate, tier: tierOf(candidate) }))
    .filter((entry) => entry.tier >= 0)
    .sort((a, b) => a.tier - b.tier || byNewest(a.candidate, b.candidate))
    .slice(0, limit)
    .map((entry) => entry.candidate);
}
