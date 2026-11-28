import type { PropertyPurpose } from '@/domain';
import { getContent } from '@/lib/content';
import { Section } from '@/components/layout/Container';
import { EditorialHeading } from '@/components/layout/EditorialHeading';
import { ListingBrowser } from '@/components/search/ListingBrowser';
import { EmptyState } from '@/components/states/StatusMessages';

/** `/buy` and `/rent`: same experience, different purpose. */
export async function ListingsPage({ purpose }: { purpose: PropertyPurpose }) {
  const {
    getDefaultSearchCriteria,
    getEditorialBlock,
    getFilterOptions,
    getNeighborhoods,
    getPropertiesByPurpose,
    getSampleActiveCriteria,
  } = await getContent();
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
        {properties.length === 0 ? (
          <EmptyState
            title="No properties here yet"
            body="Published listings will appear on this page. Add and publish a property in the Studio."
          />
        ) : (
        <ListingBrowser
          purpose={purpose}
          properties={properties}
          options={getFilterOptions(purpose)}
          defaults={getDefaultSearchCriteria(purpose)}
          sample={getSampleActiveCriteria(purpose)}
          areas={areas}
        />
        )}
      </div>
    </Section>
  );
}
