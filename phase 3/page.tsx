import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';
import { isSanityConfigured } from '../../../../sanity/env';

// Studio assets are static; content is edited live in the browser.
export const dynamic = 'force-static';
export { metadata, viewport } from 'next-sanity/studio';

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main style={{ maxWidth: 640, margin: '12vh auto', padding: 24, fontFamily: 'system-ui, sans-serif', lineHeight: 1.6 }}>
        <h1 style={{ fontSize: 24 }}>Sanity is not configured yet</h1>
        <p>
          Create a Sanity project and dataset, then add <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{' '}
          <code>NEXT_PUBLIC_SANITY_DATASET</code> to <code>.env.local</code> and restart the dev server.
        </p>
        <p>See <code>.env.example</code> for the full list of names.</p>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
