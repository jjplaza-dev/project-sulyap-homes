import { createClient, type QueryParams } from 'next-sanity';
import { apiVersion, dataset, isSanityConfigured, projectId } from '../../../sanity/env';

/** Assumption A9: content refreshes at most every 60 seconds. */
export const REVALIDATE_SECONDS = 60;

/**
 * Server-side client. Reads published documents only. The optional read token
 * is needed only for a private dataset and is never exposed to the browser.
 */
const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: 'published',
      token: process.env.SANITY_API_READ_TOKEN || undefined,
    })
  : null;

/**
 * Runs a GROQ query. Returns `null` when Sanity is not configured.
 * Always pass values through `params`; never build a query by joining user text.
 */
export async function sanityFetch<T>(query: string, params: QueryParams = {}): Promise<T | null> {
  if (!client) return null;
  return client.fetch<T>(query, params, { next: { revalidate: REVALIDATE_SECONDS } });
}
