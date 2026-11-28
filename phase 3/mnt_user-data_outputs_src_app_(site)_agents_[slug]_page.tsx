import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Mail, Phone } from 'lucide-react';
import { getContent } from '@/lib/content';
import { TourBookingPanel } from '@/components/booking/TourBookingPanel';
import { WindowFrame } from '@/components/brand/Botanical';
import { MediaView } from '@/components/brand/MediaView';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Section } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { PropertyCard } from '@/components/property/PropertyCard';
import { mailtoHref, telHref } from '@/lib/format';

interface AgentPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { getPublicAgents } = await getContent();
  return getPublicAgents().map((agent) => ({ slug: agent.slug }));
}

export async function generateMetadata({ params }: AgentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { getAgentBySlug } = await getContent();
  const agent = getAgentBySlug(slug);
  return agent ? { title: agent.name, description: agent.bio } : { title: 'Agent not found' };
}

export default async function AgentPage({ params }: AgentPageProps) {
  const { slug } = await params;
  const { getAgentBySlug, getBookableProperty, getBookingPreview, getNeighborhoodsByAgent, getPropertiesByAgent } =
    await getContent();
  // Public-only selector: an inactive agent's page is a 404.
  const agent = getAgentBySlug(slug);
  if (!agent) notFound();

  const listings = getPropertiesByAgent(agent.id);
  const open = listings.filter((p) => p.status === 'available' || p.status === 'reserved');
  const areas = getNeighborhoodsByAgent(agent);
  const firstOpen = open[0];
  const preview = firstOpen ? getBookingPreview(firstOpen.id) : undefined;

  return (
    <>
      <Section grid labelledBy="agent-title">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Agents', href: '/agents' },
            { label: agent.name },
          ]}
        />
        <div className="mt-8 grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="mx-auto w-full max-w-xs pb-3 pr-3 lg:col-span-4 lg:max-w-none">
            <WindowFrame className="aspect-[4/5]">
              <MediaView image={agent.photo} />
            </WindowFrame>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-8">
            <p className="text-eyebrow mb-4 text-berry-deep">Your agent</p>
            <h1 id="agent-title" className="text-display-lg">
              {agent.name}
            </h1>
            <p className="reading-width mt-5 text-lg">{agent.bio}</p>

            <ul className="mt-6 grid gap-1">
              <li>
                <a href={mailtoHref(agent.email)} className="inline-flex min-h-11 items-center gap-3 underline">
                  <Mail className="size-5 text-berry-deep" aria-hidden="true" />
                  {agent.email}
                </a>
              </li>
              {agent.phone ? (
                <li>
                  <a href={telHref(agent.phone)} className="inline-flex min-h-11 items-center gap-3 underline">
                    <Phone className="size-5 text-berry-deep" aria-hidden="true" />
                    {agent.phone}
                  </a>
                </li>
              ) : null}
            </ul>

            {areas.length > 0 ? (
              <div className="mt-6">
                <p className="text-sm font-semibold text-pine-evergreen">Serves</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {areas.map((area) => (
                    <li key={area.id}>
                      <Link
                        href={`/areas/${area.slug}`}
                        className="inline-flex min-h-11 items-center rounded-md border border-moss-deep bg-surface px-4 text-sm font-medium text-pine-evergreen transition-colors hover:bg-moss-tint"
                      >
                        {area.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-8">
              {preview && open.length > 0 ? (
                <TourBookingPanel
                  preview={preview}
                  agentName={agent.name}
                  properties={open.map(getBookableProperty)}
                  triggerLabel="Schedule a Viewing"
                />
              ) : (
                <p className="rounded-md bg-moss-tint p-4 text-pine-evergreen">
                  {agent.name} has no open listings in this preview.
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </Section>

      {listings.length > 0 ? (
        <Section tone="tint" labelledBy="agent-listings-title">
          <h2 id="agent-listings-title" className="text-display-md">
            Listings with {agent.name.split(' ')[0]}
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((property) => (
              <li key={property.id}>
                <PropertyCard property={property} className="h-full" />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
    </>
  );
}
