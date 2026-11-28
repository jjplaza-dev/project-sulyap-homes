import Link from 'next/link';
import { getContent } from '@/lib/content';

/**
 * Shows nothing when content is healthy. Otherwise it says plainly why the
 * site looks empty, so a missing setup step is never mistaken for a bug.
 */
export async function ContentStatusNotice() {
  const content = await getContent();

  let message: string | null = null;
  if (!content.configured) {
    message =
      'Sanity is not configured yet, so no properties, agents or neighborhoods can load. Add the project ID and dataset to .env.local, then restart the dev server.';
  } else if (content.error) {
    message = `Sanity is configured but could not be read (${content.error}). Check the project ID, dataset, CORS origins and, for a private dataset, the read token.`;
  } else if (!content.hasProperties) {
    message = 'No published properties yet. Add content in the Studio and publish it.';
  } else if (!content.settingsFromSanity) {
    message = 'Site settings have not been published yet, so default contact details are shown.';
  }

  if (!message) return null;

  return (
    <div role="status" className="border-b border-dashed border-petal-berry/60 bg-surface px-4 py-3 text-center text-sm text-berry-deep">
      {message}{' '}
      <Link href="/studio" className="font-semibold underline">
        Open the Studio
      </Link>
    </div>
  );
}
