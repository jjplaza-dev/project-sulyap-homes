/**
 * Sanity connection values, shared by the Studio config and the content client.
 * Only public identifiers live here. Tokens are read where they are used,
 * on the server only.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? '';

/** Falls back to a version date taken from Sanity's own Next.js quickstart. */
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-05-15';

/** False until the project ID and dataset are set in `.env.local` (U-01). */
export const isSanityConfigured = Boolean(projectId && dataset);
