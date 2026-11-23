import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MapPin } from 'lucide-react';
import type { EstablishmentType } from '@/domain';
import {
  getAgentsByNeighborhood,
  getNeighborhoodBySlug,
  getNeighborhoods,
  getNeighborhoodsByAgent,
  getPropertiesByAgent,
  getPropertiesByNeighborhood,
} from '@/data/selectors';
import { establishmentTypeLabels, transportModeLabels } from '@/data/fixtures/labels';
import { AgentCard } from '@/components/agents/AgentCard';
import { MediaView } from '@/components/brand/MediaView';
import { WindowFrame } from '@/components/brand/Botanical';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Section } from '@/components/layout/Container';
import { ApproxMap } from '@/components/map/ApproxMap';
import { Reveal } from '@/components/motion/Reveal';
import { PropertyCard } from '@/components/property/PropertyCard';
import { pluralize } from '@/lib/format';

interface AreaPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getNeighborhoods().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: AreaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const neighborhood = getNeighborhoodBySlug(slug);
  return neighborhood
    ? { title: neighborhood.name, description: neighborhood.summary }
    : { title: 'Area not found' };
}

const nearbyOrder: ReadonlyArray<EstablishmentType> = ['school', 'hospital', 'shopping', 'restaurant', 'cafe'];

export default async function AreaPage({ params }: AreaPageProps) {
  const { slug } = await params;
  const neighborhood = getNeighborhoodBySlug(slug);
  if (!neighborhood) notFound();

  const properties = getPropertiesByNeighborhood(neighborhood.id);
  const agents = getAgentsByNeighborhood(neighborhood.id);
  const [mainPhoto, secondPhoto, thirdPhoto] = neighborhood.photos;

  return (
    <>
      <Section grid labelledBy="area-title">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Areas', href: '/areas' },
            { label: neighborhood.name },
          ]}
        />
        <div className="mt-8 grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="text-eyebrow mb-4 text-berry-deep">Area guide</p>
            <h1 id="area-title" className="text-display-lg">
              {neighborhood.name}
            </h1>
            <p className="reading-width mt-5 text-lg">{neighborhood.summary}</p>
            <p className="reading-width mt-4">{neighborhood.lifestyle}</p>
            <p className="mt-6 flex items-start gap-2 text-sm text-pine-soft">
              <MapPin className="mt-0.5 size-4 shrink-0 text-berry-deep" aria-hidden="true" />
              {neighborhood.generalLocation}
            </p>
          </Reveal>
          {mainPhoto ? (
            <Reveal delay={0.1} className="mx-auto w-full max-w-sm pb-3 pr-3 lg:col-span-5 lg:max-w-none">
              <WindowFrame className="aspect-[4/5]">
                <MediaView image={mainPhoto} />
              </WindowFrame>
            </Reveal>
          ) : null}
        </div>
      </Section>

      <Section tone="tint" labelledBy="nearby-title">
        <h2 id="nearby-title" className="text-display-md">
          What’s nearby
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {nearbyOrder.map((type) => {
            const items = neighborhood.establishments.filter((e) => e.type === type);
            if (items.length === 0) return null;
            return (
              <Reveal key={type}>
                <div className="h-full rounded-lg border border-pine-evergreen/12 bg-surface p-5 shadow-sm">
                  <h3 className="text-xl">{establishmentTypeLabels[type]}</h3>
                  <ul className="mt-3 grid gap-2">
                    {items.map((item) => (
                      <li key={item.id}>
                        <span className="font-medium text-pine-evergreen">{item.name}</span>
                        {item.note ? <span className="block text-sm text-pine-soft">{item.note}</span> : null}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
          {neighborhood.landmarks.length > 0 ? (
            <Reveal>
              <div className="h-full rounded-lg border border-pine-evergreen/12 bg-surface p-5 shadow-sm">
                <h3 className="text-xl">{establishmentTypeLabels.landmark}</h3>
                <ul className="mt-3 grid gap-2">
                  {neighborhood.landmarks.map((item) => (
                    <li key={item.id}>
                      <span className="font-medium text-pine-evergreen">{item.name}</span>
                      {item.note ? <span className="block text-sm text-pine-soft">{item.note}</span> : null}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ) : null}
        </div>
      </Section>

      <Section labelledBy="getting-around-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 id="getting-around-title" className="text-display-md">
              Getting around
            </h2>
            <ul className="mt-6 grid gap-5">
              {neighborhood.transport.map((entry) => (
                <li key={entry.id}>
                  <p className="font-semibold text-pine-evergreen">{transportModeLabels[entry.mode]}</p>
                  <p className="text-pine-ink">{entry.description}</p>
                </li>
              ))}
            </ul>
            {secondPhoto && thirdPhoto ? (
              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="aspect-[3/2] overflow-hidden rounded-lg">
                  <MediaView image={secondPhoto} />
                </div>
                <div className="aspect-[3/2] overflow-hidden rounded-lg">
                  <MediaView image={thirdPhoto} />
                </div>
              </div>
            ) : null}
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <ApproxMap
              markers={properties.map((p) => ({
                id: p.id,
                label: p.title,
                lat: p.location.publicMap.lat,
                lng: p.location.publicMap.lng,
              }))}
              areas={[
                {
                  id: neighborhood.id,
                  name: neighborhood.name,
                  lat: neighborhood.publicMap.lat,
                  lng: neighborhood.publicMap.lng,
                },
              ]}
              ariaLabel={`Approximate map preview of ${pluralize(properties.length, 'listing')} in ${neighborhood.name}`}
            />
          </Reveal>
        </div>
      </Section>

      <Section tone="tint" labelledBy="area-listings-title">
        <h2 id="area-listings-title" className="text-display-md">
          Listings in {neighborhood.name}
        </h2>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <li key={property.id}>
              <PropertyCard property={property} className="h-full" />
            </li>
          ))}
        </ul>
      </Section>

      {agents.length > 0 ? (
        <Section labelledBy="area-agents-title">
          <h2 id="area-agents-title" className="text-display-md">
            Agents for this area
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {agents.map((agent) => (
              <li key={agent.id}>
                <AgentCard
                  agent={agent}
                  areaNames={getNeighborhoodsByAgent(agent).map((n) => n.name)}
                  listingCount={getPropertiesByAgent(agent.id).length}
                />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
    </>
  );
}
