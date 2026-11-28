/**
 * The ONLY place pages and server components get content from.
 *
 *   const { getFeaturedProperties } = await getContent();
 *
 * One request loads published properties, agents, neighborhoods and site
 * settings from Sanity (cached for 60 s, assumption A9). React's `cache`
 * shares that load between every component rendering the same request.
 *
 * Nothing falls back to sample fixtures silently: with Sanity unconfigured or
 * unreachable, the site renders empty states and the status banner explains why.
 */
import { cache } from 'react';
import { isSanityConfigured } from '../../../sanity/env';
import { sanityFetch } from './client';
import {
  mapAgent,
  mapNeighborhood,
  mapProperty,
  mapSettings,
  type RawAgent,
  type RawNeighborhood,
  type RawProperty,
  type RawSettings,
} from './mappers';
import { AGENTS_QUERY, NEIGHBORHOODS_QUERY, PROPERTIES_QUERY, SETTINGS_QUERY } from './queries';
import { createContentApi, type ContentApi, type ContentSnapshot } from './selectors';

function emptySnapshot(configured: boolean, error: string | null): ContentSnapshot {
  return {
    configured,
    error,
    properties: [],
    agents: [],
    neighborhoods: [],
    settings: mapSettings(null),
    settingsFromSanity: false,
    skippedProperties: 0,
  };
}

async function loadSnapshot(): Promise<ContentSnapshot> {
  if (!isSanityConfigured) return emptySnapshot(false, null);

  try {
    const [rawProperties, rawAgents, rawNeighborhoods, rawSettings] = await Promise.all([
      sanityFetch<RawProperty[]>(PROPERTIES_QUERY),
      sanityFetch<RawAgent[]>(AGENTS_QUERY),
      sanityFetch<RawNeighborhood[]>(NEIGHBORHOODS_QUERY),
      sanityFetch<RawSettings | null>(SETTINGS_QUERY),
    ]);

    const neighborhoods = (rawNeighborhoods ?? []).map(mapNeighborhood);
    const agents = (rawAgents ?? []).map(mapAgent);
    const context = {
      neighborhoods: new Map(neighborhoods.map((n) => [n.id, n])),
      agents: new Map(agents.map((a) => [a.id, a])),
    };

    const mapped = (rawProperties ?? []).map((raw) => mapProperty(raw, context));
    const properties = mapped.flatMap((p) => (p ? [p] : []));
    const skipped = mapped.length - properties.length;
    if (skipped > 0) {
      console.warn(`[content] Skipped ${skipped} published property document(s) with no neighborhood or agent.`);
    }

    return {
      configured: true,
      error: null,
      properties,
      agents,
      neighborhoods,
      settings: mapSettings(rawSettings ?? null),
      settingsFromSanity: Boolean(rawSettings),
      skippedProperties: skipped,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`[content] Could not read Sanity: ${message}`);
    return emptySnapshot(true, message);
  }
}

/** Per-request cached content API. Call from server components only. */
export const getContent = cache(async (): Promise<ContentApi> => createContentApi(await loadSnapshot()));

export type { ContentApi };
