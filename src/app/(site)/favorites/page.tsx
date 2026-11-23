import type { Metadata } from 'next';
import { getEditorialBlock, getFavoritesPreview, getPropertiesByIds } from '@/data/selectors';
import { Section } from '@/components/layout/Container';
import { EditorialHeading } from '@/components/layout/EditorialHeading';
import { FavoritesBrowser } from '@/components/property/FavoritesBrowser';

export const metadata: Metadata = {
  title: 'Favorites',
  description: 'Homes you have saved, stored only in your browser.',
};

export default function FavoritesPage() {
  const intro = getEditorialBlock('favorites-intro');
  const empty = getEditorialBlock('favorites-empty');
  const saved = getPropertiesByIds(getFavoritesPreview('saved').propertyIds);

  return (
    <Section grid labelledBy="favorites-title">
      <EditorialHeading block={intro} level={1} headingId="favorites-title" />
      <div className="mt-10">
        <FavoritesBrowser saved={saved} emptyBlock={empty} />
      </div>
    </Section>
  );
}
