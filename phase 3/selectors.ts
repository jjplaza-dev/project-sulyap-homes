/**
 * `createContentApi` turns one loaded snapshot of Sanity content into the read
 * API every page uses. The function names match the Phase 2 selectors, so pages
 * only changed where they get them from.
 *
 * Content that is not in Sanity (FAQ, privacy draft, brand values, page copy,
 * filter vocabulary, sample tour slots) still comes from `src/data/fixtures`,
 * behind this same facade.
 */
import type {
  Agent,
  BookableProperty,
  BookingPreviewState,
  EditorialBlock,
  EntityId,
  FavoritesPreview,
  FavoritesPreviewVariant,
  Neighborhood,
  Property,
  PropertyCategory,
  PropertyFilterOptions,
  PropertyPurpose,
  PublicSiteSettings,
  SearchCriteria,
  SiteSettings,
  Slug,
  TourBookingPreview,
} from '@/domain';
import {
  editorialBlocks,
  faqItems,
  legalSections,
  valueItems,
  type EditorialBlockId,
} from '@/data/fixtures/content';
import { defaultSearchCriteria, filterOptions, sampleActiveCriteria } from '@/data/fixtures/filters';
import { sampleTourSlots } from '@/data/fixtures/preview';

export interface ContentSnapshot {
  /** False until the Sanity project ID and dataset are set. */
  configured: boolean;
  /** Set when Sanity was configured but could not be read. */
  error: string | null;
  properties: ReadonlyArray<Property>;
  agents: ReadonlyArray<Agent>;
  neighborhoods: ReadonlyArray<Neighborhood>;
  settings: SiteSettings;
  /** False when no `siteSettings` document exists yet and defaults are shown. */
  settingsFromSanity: boolean;
  /** Published properties skipped because a neighborhood or agent was missing. */
  skippedProperties: number;
}

const byNewest = (a: Property, b: Property): number =>
  Date.parse(b.publishedAt) - Date.parse(a.publishedAt);

const isOpen = (p: Property): boolean => p.status === 'available' || p.status === 'reserved';

export function createContentApi(snapshot: ContentSnapshot) {
  const { properties, agents, neighborhoods, settings } = snapshot;
  const publicAgents = agents.filter((agent) => agent.isActive);

  // ------------------------------------------------------------ properties
  const getAllProperties = (): ReadonlyArray<Property> => [...properties].sort(byNewest);

  const getPropertiesByPurpose = (purpose: PropertyPurpose): ReadonlyArray<Property> =>
    properties.filter((p) => p.purpose === purpose).sort(byNewest);

  const getFeaturedProperties = (limit?: number): ReadonlyArray<Property> => {
    const order = settings.homepageFeaturedIds;
    const rank = (id: EntityId): number => {
      const index = order.indexOf(id);
      return index === -1 ? Number.MAX_SAFE_INTEGER : index;
    };
    const chosen = properties
      .filter((p) => p.featured || order.includes(p.id))
      .sort((a, b) => rank(a.id) - rank(b.id) || byNewest(a, b));
    return limit === undefined ? chosen : chosen.slice(0, limit);
  };

  const getRecentProperties = (limit = 6): ReadonlyArray<Property> =>
    properties.filter(isOpen).sort(byNewest).slice(0, limit);

  const getPropertyBySlug = (slug: Slug): Property | undefined => properties.find((p) => p.slug === slug);
  const getPropertyById = (id: EntityId): Property | undefined => properties.find((p) => p.id === id);

  const getPropertiesByNeighborhood = (neighborhoodId: EntityId): ReadonlyArray<Property> =>
    properties.filter((p) => p.neighborhoodId === neighborhoodId).sort(byNewest);

  const getPropertiesByAgent = (agentId: EntityId): ReadonlyArray<Property> =>
    properties.filter((p) => p.agentId === agentId).sort(byNewest);

  const getPropertiesByIds = (ids: ReadonlyArray<EntityId>): ReadonlyArray<Property> =>
    ids.flatMap((id) => {
      const property = getPropertyById(id);
      return property ? [property] : [];
    });

  const getCategoryCounts = (purpose?: PropertyPurpose): Record<PropertyCategory, number> => {
    const counts: Record<PropertyCategory, number> = { house: 0, condominium: 0, apartment: 0, townhouse: 0, lot: 0 };
    for (const p of properties) {
      if (p.status === 'available' && (purpose === undefined || p.purpose === purpose)) counts[p.category] += 1;
    }
    return counts;
  };

  /**
   * Same purpose, never itself. Tier 0: same neighborhood and category.
   * Tier 1: same category within ±30% of the price. Tier 2: same neighborhood.
   * Ordered by tier, then newest. Default maximum 4.
   */
  const getSimilarProperties = (property: Property, limit = 4): ReadonlyArray<Property> => {
    const within = (amount: number): boolean =>
      property.price.amount > 0 && Math.abs(amount - property.price.amount) / property.price.amount <= 0.3;
    const tierOf = (c: Property): number => {
      const sameArea = c.neighborhoodId === property.neighborhoodId;
      const sameCategory = c.category === property.category;
      if (sameArea && sameCategory) return 0;
      if (sameCategory && within(c.price.amount)) return 1;
      if (sameArea) return 2;
      return -1;
    };
    return properties
      .filter((p) => p.id !== property.id && p.purpose === property.purpose)
      .map((candidate) => ({ candidate, tier: tierOf(candidate) }))
      .filter((entry) => entry.tier >= 0)
      .sort((a, b) => a.tier - b.tier || byNewest(a.candidate, b.candidate))
      .slice(0, limit)
      .map((entry) => entry.candidate);
  };

  // ------------------------------------------------- agents and neighborhoods
  /** Public-only: inactive agents are never returned. */
  const getPublicAgents = (): ReadonlyArray<Agent> => publicAgents;
  const getAgentBySlug = (slug: Slug): Agent | undefined => publicAgents.find((a) => a.slug === slug);
  const getAgentById = (id: EntityId): Agent | undefined => publicAgents.find((a) => a.id === id);
  const getAgentsByNeighborhood = (neighborhoodId: EntityId): ReadonlyArray<Agent> =>
    publicAgents.filter((a) => a.serviceAreaIds.includes(neighborhoodId));

  const getNeighborhoods = (): ReadonlyArray<Neighborhood> => neighborhoods;
  const getNeighborhoodBySlug = (slug: Slug): Neighborhood | undefined => neighborhoods.find((n) => n.slug === slug);
  const getNeighborhoodById = (id: EntityId): Neighborhood | undefined => neighborhoods.find((n) => n.id === id);
  const getNeighborhoodsByAgent = (agent: Agent): ReadonlyArray<Neighborhood> =>
    agent.serviceAreaIds.flatMap((id) => {
      const neighborhood = getNeighborhoodById(id);
      return neighborhood ? [neighborhood] : [];
    });

  // ---------------------------------------------------------------- booking
  /** The assigned agent is never swapped: a backup is only OFFERED, by name. */
  const getBookableProperty = (property: Property): BookableProperty => {
    const { backup } = property;
    if (!backup) return { id: property.id, title: property.title };
    if (backup.kind === 'agent') {
      return {
        id: property.id,
        title: property.title,
        backup: { kind: 'agent', agentName: getAgentById(backup.agentId)?.name, contactHref: backup.contactHref },
      };
    }
    return { id: property.id, title: property.title, backup: { kind: 'central', contactHref: backup.contactHref } };
  };

  /** Static stand-in for the Cal.com embed until Phase 6. */
  const getBookingPreview = (
    propertyId: EntityId,
    previewState: BookingPreviewState = 'slots',
  ): TourBookingPreview | undefined => {
    const property = getPropertyById(propertyId);
    if (!property) return undefined;
    return {
      propertyId: property.id,
      agentId: property.agentId,
      durationMinutes: 30,
      timezone: 'Asia/Manila',
      sampleSlots: sampleTourSlots,
      previewState,
    };
  };

  // ------------------------------------------------- site and static content
  /** Built field by field so the server-only administrator email can never leak. */
  const publicSettings: PublicSiteSettings = {
    businessName: settings.businessName,
    tagline: settings.tagline,
    logo: settings.logo,
    nav: settings.nav,
    contact: settings.contact,
    social: settings.social,
    serviceArea: settings.serviceArea,
    homepageFeaturedIds: settings.homepageFeaturedIds,
    footer: settings.footer,
  };
  const getPublicSiteSettings = (): PublicSiteSettings => publicSettings;

  const getEditorialBlock = (id: EditorialBlockId): EditorialBlock => editorialBlocks[id];
  const getFaqItems = () => [...faqItems].sort((a, b) => a.order - b.order);
  const getLegalSections = () => [...legalSections].sort((a, b) => a.order - b.order);
  const getValueItems = () => [...valueItems].sort((a, b) => a.order - b.order);

  const getFilterOptions = (purpose: PropertyPurpose): PropertyFilterOptions => ({
    ...filterOptions[purpose],
    neighborhoods: neighborhoods.map((n) => ({ value: n.id, label: n.name })),
  });
  const getDefaultSearchCriteria = (purpose: PropertyPurpose): SearchCriteria => defaultSearchCriteria[purpose];
  const getSampleActiveCriteria = (purpose: PropertyPurpose): SearchCriteria => ({
    ...sampleActiveCriteria[purpose],
    neighborhoodIds: neighborhoods[0] ? [neighborhoods[0].id] : [],
  });

  /** Preview-only sample set for `/favorites` (real favorites arrive in Phase 4). */
  const getFavoritesPreview = (variant: FavoritesPreviewVariant): FavoritesPreview =>
    variant === 'empty'
      ? { variant: 'empty', propertyIds: [] }
      : { variant: 'saved', propertyIds: getFeaturedProperties(4).map((p) => p.id) };

  return {
    // status
    configured: snapshot.configured,
    error: snapshot.error,
    settingsFromSanity: snapshot.settingsFromSanity,
    skippedProperties: snapshot.skippedProperties,
    hasProperties: properties.length > 0,
    // properties
    getAllProperties,
    getPropertiesByPurpose,
    getFeaturedProperties,
    getRecentProperties,
    getPropertyBySlug,
    getPropertyById,
    getPropertiesByNeighborhood,
    getPropertiesByAgent,
    getPropertiesByIds,
    getCategoryCounts,
    getSimilarProperties,
    // agents and neighborhoods
    getPublicAgents,
    getAgentBySlug,
    getAgentById,
    getAgentsByNeighborhood,
    getNeighborhoods,
    getNeighborhoodBySlug,
    getNeighborhoodById,
    getNeighborhoodsByAgent,
    // booking
    getBookableProperty,
    getBookingPreview,
    // site and static content
    getPublicSiteSettings,
    getEditorialBlock,
    getFaqItems,
    getLegalSections,
    getValueItems,
    getFilterOptions,
    getDefaultSearchCriteria,
    getSampleActiveCriteria,
    getFavoritesPreview,
  };
}

export type ContentApi = ReturnType<typeof createContentApi>;
