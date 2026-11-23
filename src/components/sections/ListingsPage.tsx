import type { PropertyPurpose } from '@/domain';
import {
  getDefaultSearchCriteria,
  getEditorialBlock,
  getFilterOptions,
  getNeighborhoods,
  getPropertiesByPurpose,
  getSampleActiveCriteria,
} from '@/data/selectors';
import { Section } from '@/components/layout/Container';
import { EditorialHeading } from '@/components/layout/EditorialHeading';
import { ListingBrowser } from '@/components/search/ListingBrowser';

/** `/buy` and `/rent`: same experience, different purpose. */
export function ListingsPage({ purpose }: { purpose: PropertyPurpose }) {
  const intro = getEditorialBlock(purpose === 'sale' ? 'buy-intro' : 'rent-intro');
  const properties = getPropertiesByPurpose(purpose);
  const areas = getNeighborhoods().map((n) => ({
    id: n.id,
    name: n.name,
    lat: n.publicMap.lat,
    lng: n.publicMap.lng,
  }));

  return (
    <Section grid labelledBy="listings-title">
      <EditorialHeading block={intro} level={1} headingId="listings-title" />
      <div className="mt-10">
        <ListingBrowser
          purpose={purpose}
          properties={properties}
          options={getFilterOptions(purpose)}
          defaults={getDefaultSearchCriteria(purpose)}
          sample={getSampleActiveCriteria(purpose)}
          areas={areas}
        />
      </div>
    </Section>
  );
}
