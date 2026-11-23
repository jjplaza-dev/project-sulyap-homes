import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { PropertyCategory } from '@/domain';
import {
  getCategoryCounts,
  getEditorialBlock,
  getFeaturedProperties,
  getFilterOptions,
  getNeighborhoodsByAgent,
  getPropertiesByAgent,
  getPropertiesByPurpose,
  getPublicAgents,
  getRecentProperties,
} from '@/data/selectors';
import { AgentCard } from '@/components/agents/AgentCard';
import { Petal, PineBranch, WindowFrame } from '@/components/brand/Botanical';
import { PlaceholderArt } from '@/components/brand/PlaceholderArt';
import { Section } from '@/components/layout/Container';
import { EditorialActions, EditorialHeading } from '@/components/layout/EditorialHeading';
import { CursorZone } from '@/components/motion/CursorZone';
import { Parallax } from '@/components/motion/Parallax';
import { Reveal } from '@/components/motion/Reveal';
import { CategoryTile } from '@/components/property/CategoryTile';
import { PropertyCard } from '@/components/property/PropertyCard';
import { HeroSearch } from '@/components/search/HeroSearch';
import { FeaturedTrack } from '@/components/sections/FeaturedTrack';
import { NeighborhoodGrid } from '@/components/sections/NeighborhoodGrid';
import { pluralize } from '@/lib/format';

const categories: ReadonlyArray<PropertyCategory> = ['house', 'condominium', 'apartment', 'townhouse', 'lot'];

export default function HomePage() {
  const hero = getEditorialBlock('home-hero');
  const buyEntry = getEditorialBlock('home-buy-entry');
  const rentEntry = getEditorialBlock('home-rent-entry');
  const categoriesBlock = getEditorialBlock('home-categories');
  const featuredBlock = getEditorialBlock('home-featured');
  const recentBlock = getEditorialBlock('home-recent');
  const areasBlock = getEditorialBlock('home-neighborhoods');
  const introBlock = getEditorialBlock('home-intro');
  const agentBlock = getEditorialBlock('home-agent');
  const ctaBlock = getEditorialBlock('home-viewing-cta');

  const counts = getCategoryCounts();
  const saleCounts = getCategoryCounts('sale');
  const rentCounts = getCategoryCounts('rent');
  const agents = getPublicAgents();

  const entries = [
    { block: buyEntry, count: getPropertiesByPurpose('sale').length, art: 'category-house' as const },
    { block: rentEntry, count: getPropertiesByPurpose('rent').length, art: 'category-condominium' as const },
  ];

  return (
    <>
      {/* S1 — Editorial hero with search */}
      <Section grid labelledBy="hero-title">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <EditorialHeading block={hero} level={1} size="xl" headingId="hero-title" />
            </Reveal>
            <Reveal delay={0.1} className="mt-8">
              <HeroSearch options={{ sale: getFilterOptions('sale'), rent: getFilterOptions('rent') }} />
            </Reveal>
            <Reveal delay={0.2} className="mt-6">
              <EditorialActions block={{ ...hero, primaryAction: undefined }} />
              {hero.secondaryAction ? (
                <Link
                  href={hero.secondaryAction.href}
                  className="inline-flex min-h-11 items-center gap-2 font-medium text-pine-evergreen underline underline-offset-4"
                >
                  {hero.secondaryAction.label}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              ) : null}
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:col-span-6">
            <CursorZone className="relative mx-auto aspect-[4/5] w-full max-w-md pb-3 pr-3 lg:max-w-none">
              <Petal className="absolute -right-1 -top-7 z-10 w-9 text-petal-berry" />
              <WindowFrame className="h-full">
                <Parallax distance={56} className="absolute inset-x-0 -top-[8%] h-[116%]">
                  <PlaceholderArt
                    art="ridge-dawn"
                    alt="Illustrative placeholder: highland ridge at dawn seen through an arched window"
                  />
                </Parallax>
                <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                  <span className="absolute inset-y-0 left-1/2 w-px bg-cloud-mist/70" />
                  <span className="absolute inset-x-0 top-[46%] h-px bg-cloud-mist/70" />
                </div>
              </WindowFrame>
              <div className="absolute -bottom-5 -left-3 z-10 w-40 overflow-hidden rounded-lg border-4 border-cloud-mist shadow-lg sm:w-52">
                <div className="aspect-[4/3]">
                  <PlaceholderArt art="category-house" alt="Illustrative placeholder: front of a family house" />
                </div>
              </div>
            </CursorZone>
          </Reveal>
        </div>
      </Section>

      {/* S2 — Buy / Rent entry and browse by category */}
      <Section labelledBy="entry-title">
        <h2 id="entry-title" className="sr-only">
          Browse properties
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {entries.map((entry, index) => (
            <Reveal key={entry.block.id} delay={index * 0.1}>
              <div className="group relative grid h-full gap-4 overflow-hidden rounded-lg border border-pine-evergreen/12 bg-surface p-6 shadow-sm sm:grid-cols-[1fr_9rem] sm:p-8">
                <div>
                  <p className="text-eyebrow mb-3 text-berry-deep">{entry.block.eyebrow}</p>
                  <h3 className="text-display-md">{entry.block.heading}</h3>
                  <p className="mt-3">{entry.block.body[0]}</p>
                  <p className="numeric-tabular mt-3 text-sm text-pine-soft">
                    {pluralize(entry.count, 'listing')} in the preview
                  </p>
                  {entry.block.primaryAction ? (
                    <Link
                      href={entry.block.primaryAction.href}
                      className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-pine-evergreen underline underline-offset-4 after:absolute after:inset-0 after:content-['']"
                    >
                      {entry.block.primaryAction.label}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  ) : null}
                </div>
                <div className="hidden aspect-square overflow-hidden rounded-md sm:block">
                  <PlaceholderArt art={entry.art} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <EditorialHeading block={categoriesBlock} />
        </Reveal>
        <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((category, index) => (
            <li key={category}>
              <Reveal delay={index * 0.06} className="h-full">
                <CategoryTile
                  category={category}
                  count={counts[category]}
                  href={rentCounts[category] > saleCounts[category] ? '/rent' : '/buy'}
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* S3 — Featured properties */}
      <Section tone="tint" labelledBy="featured-title">
        <Reveal>
          <EditorialHeading block={featuredBlock} headingId="featured-title" />
        </Reveal>
        <div className="mt-8">
          <FeaturedTrack properties={getFeaturedProperties()} />
        </div>
      </Section>

      {/* S4 — Recently added */}
      <Section labelledBy="recent-title">
        <Reveal>
          <EditorialHeading block={recentBlock} headingId="recent-title" />
        </Reveal>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {getRecentProperties(6).map((property, index) => (
            <li key={property.id}>
              <Reveal delay={(index % 3) * 0.08} className="h-full">
                <PropertyCard property={property} className="h-full" />
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* S5 — Explore neighborhoods */}
      <Section tone="tint" labelledBy="areas-title">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <Reveal className="max-w-2xl">
            <EditorialHeading block={areasBlock} headingId="areas-title" />
          </Reveal>
          <EditorialActions block={areasBlock} />
        </div>
        <NeighborhoodGrid />
      </Section>

      {/* S6 — Introduction to Sulyap */}
      <Section grid labelledBy="intro-title">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <Reveal className="mx-auto w-full max-w-sm pb-3 pr-3 lg:col-span-5 lg:max-w-none">
            <WindowFrame className="aspect-[4/5]">
              <PlaceholderArt art="ridge-mist" alt="Illustrative placeholder: misty pine ridge" />
            </WindowFrame>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <EditorialHeading block={introBlock} headingId="intro-title" />
            <EditorialActions block={introBlock} className="mt-8" />
            <PineBranch className="mt-10 w-52 text-highland-moss" />
          </Reveal>
        </div>
      </Section>

      {/* S7 — Meet the agents */}
      <Section tone="soft" labelledBy="agents-title">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <Reveal className="max-w-2xl">
            <EditorialHeading block={agentBlock} headingId="agents-title" />
          </Reveal>
          <EditorialActions block={agentBlock} />
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {agents.map((agent, index) => (
            <li key={agent.id}>
              <Reveal delay={index * 0.08} className="h-full">
                <AgentCard
                  agent={agent}
                  areaNames={getNeighborhoodsByAgent(agent).map((n) => n.name)}
                  listingCount={getPropertiesByAgent(agent.id).length}
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* S8 — Viewing call to action */}
      <Section tone="pine" grid labelledBy="cta-title">
        <CursorZone>
          <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <EditorialHeading block={ctaBlock} tone="onPine" size="lg" headingId="cta-title" className="lg:col-span-7" />
            <EditorialActions block={ctaBlock} tone="onPine" className="lg:col-span-5 lg:justify-end" />
          </Reveal>
        </CursorZone>
      </Section>
    </>
  );
}
