import type { Metadata } from 'next';
import type { PlaceholderArtKey } from '@/domain';
import { PlaceholderArt } from '@/components/brand/PlaceholderArt';
import { LogoHorizontal, LogoMono, LogoSquare, LogoSymbol } from '@/components/brand/Logo';
import { Petal, PineBranch } from '@/components/brand/Botanical';
import { buttonClasses } from '@/components/layout/button-styles';
import { Section } from '@/components/layout/Container';
import { SampleTag, StatusBadge } from '@/components/property/Badges';
import { PropertyCardSkeleton, GallerySkeleton } from '@/components/states/Skeletons';
import { EmptyState, ErrorState, PreviewNote, SuccessState } from '@/components/states/StatusMessages';

export const metadata: Metadata = {
  title: 'Design review',
  description: 'Internal review sheet for the Sulyap design system. Not part of the public site.',
  robots: { index: false, follow: false },
};

const brand = [
  ['Cloud Mist', '--cloud-mist', '#F4F3EC'],
  ['Pine Evergreen', '--pine-evergreen', '#28483B'],
  ['Highland Moss', '--highland-moss', '#899B78'],
  ['Panagbenga Sunflower', '--panagbenga-sunflower', '#E4B64B'],
  ['Petal Berry', '--petal-berry', '#C96580'],
] as const;

const derived = [
  ['Surface', '--surface', '#FAF9F4'],
  ['Moss tint', '--moss-tint', '#E3E8DC'],
  ['Moss deep', '--moss-deep', '#6F8261'],
  ['Sunflower soft', '--sunflower-soft', '#F6E7BD'],
  ['Berry deep', '--berry-deep', '#9E3F5B'],
  ['Pine ink', '--pine-ink', '#2E4C40'],
  ['Pine soft', '--pine-soft', '#55685D'],
  ['Success', '--success', '#2D6A4F'],
  ['Danger', '--danger', '#A4343A'],
] as const;

const artKeys: ReadonlyArray<PlaceholderArtKey> = [
  'ridge-dawn',
  'ridge-mist',
  'window-arch',
  'category-house',
  'category-condominium',
  'category-apartment',
  'category-townhouse',
  'category-lot',
  'interior-living',
  'interior-kitchen',
  'interior-bedroom',
  'interior-bath',
  'garden-terrace',
  'street-frontage',
  'floor-plan-compact',
  'floor-plan-multilevel',
  'agent-portrait',
  'neighborhood-streetscape',
  'brand-logo',
];

const motionNotes = [
  'Reveal: fade and lift once on scroll; plain fade for reduced motion.',
  'Parallax (hero): transform only; removed for reduced motion.',
  'Magnetic (header CTA): mouse and trackpad only.',
  'Tilt and image zoom (featured cards): hover-capable pointers only.',
  'Cursor ring (hero, call-to-action band): the native cursor is never hidden.',
  'Timing: micro 0.18 s, standard 0.42 s, reveal 0.8 s, ease power3.out.',
];

function Swatch({ name, token, hex }: { name: string; token: string; hex: string }) {
  return (
    <li className="overflow-hidden rounded-lg border border-pine-evergreen/12 bg-surface">
      <div className="h-20" style={{ backgroundColor: `var(${token})` }} />
      <div className="p-3 text-sm">
        <p className="font-semibold text-pine-evergreen">{name}</p>
        <p className="numeric-tabular text-pine-soft">{hex}</p>
        <p className="text-pine-soft">{token}</p>
      </div>
    </li>
  );
}

export default function PreviewPage() {
  return (
    <>
      <Section grid labelledBy="review-title">
        <p className="text-eyebrow mb-4 text-berry-deep">Internal</p>
        <h1 id="review-title" className="text-display-lg">
          Design review sheet
        </h1>
        <p className="reading-width mt-5 text-lg">
          Palette, type, logo family, component states and placeholder art in one place. This page is not linked from
          the site and is hidden from search engines. It is removed before launch.
        </p>
      </Section>

      <Section tone="tint" labelledBy="palette-title">
        <h2 id="palette-title" className="text-display-md">
          Palette
        </h2>
        <h3 className="mt-8 text-xl">Brand colors</h3>
        <ul className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-5">
          {brand.map(([name, token, hex]) => (
            <Swatch key={token} name={name} token={token} hex={hex} />
          ))}
        </ul>
        <h3 className="mt-10 text-xl">Derived tints and shades</h3>
        <ul className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-5 lg:grid-cols-9">
          {derived.map(([name, token, hex]) => (
            <Swatch key={token} name={name} token={token} hex={hex} />
          ))}
        </ul>
        <p className="mt-6 text-sm text-pine-soft">Contrast ratios are listed in docs/DESIGN_TOKENS.md.</p>
      </Section>

      <Section labelledBy="type-title">
        <h2 id="type-title" className="text-display-md">
          Typography
        </h2>
        <div className="mt-8 grid gap-6">
          <p className="text-display-xl">Find a place that feels like yours.</p>
          <p className="text-display-lg">Homes in Baguio and Benguet</p>
          <p className="text-display-md">A closer look at where you could belong</p>
          <p className="text-eyebrow text-berry-deep">Eyebrow label</p>
          <p className="reading-width text-lg">
            Body text in DM Sans, 17 px with generous leading, kept to about 64 characters per line so it stays easy to
            read on every screen.
          </p>
          <p className="numeric-tabular font-display text-3xl text-pine-evergreen">₱12,800,000 · ₱45,000 / month · 2,400 sqm</p>
        </div>
      </Section>

      <Section tone="tint" labelledBy="logo-title">
        <h2 id="logo-title" className="text-display-md">
          Logo family: the Highland Window
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="grid place-items-center rounded-lg bg-surface p-10">
            <LogoHorizontal className="h-16 w-auto" title="Sulyap Homes & Leasing, horizontal logo" />
          </div>
          <div className="on-pine grid place-items-center rounded-lg bg-pine-evergreen p-10 text-cloud-mist">
            <LogoMono className="h-16 w-auto" title="Sulyap Homes & Leasing, single-color logo" />
          </div>
          <div className="grid place-items-center rounded-lg bg-surface p-10">
            <LogoSymbol className="h-24 w-auto" title="Sulyap symbol" />
          </div>
          <div className="grid place-items-center rounded-lg bg-surface p-10">
            <LogoSquare className="size-24" title="Sulyap compact square logo" />
          </div>
        </div>
        <div className="mt-8 flex items-end gap-10 text-pine-evergreen">
          <PineBranch className="w-48" />
          <Petal className="w-10 text-petal-berry" />
          <LogoSymbol className="h-8 w-auto" title="Sulyap symbol at small size" />
          <LogoSymbol className="h-5 w-auto" title="Sulyap symbol at favicon size" />
        </div>
      </Section>

      <Section labelledBy="states-title">
        <h2 id="states-title" className="text-display-md">
          Buttons, badges and states
        </h2>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className={buttonClasses({ variant: 'primary' })}>Primary</span>
          <span className={buttonClasses({ variant: 'secondary' })}>Secondary</span>
          <span className={buttonClasses({ variant: 'outline' })}>Outline</span>
          <span className={buttonClasses({ variant: 'ghost' })}>Ghost</span>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <StatusBadge status="available" />
          <StatusBadge status="reserved" />
          <StatusBadge status="sold" />
          <StatusBadge status="rented" />
          <SampleTag />
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <SuccessState title="Success" body="Used after a message is sent or a tour is booked (live behavior arrives later)." />
          <ErrorState title="Error" body="Used when something could not be completed, with a way to try again." />
          <EmptyState title="Empty" body="Used for no results and no saved homes." className="md:col-span-2" />
          <PreviewNote className="md:col-span-2">Preview note: marks content that is a design preview.</PreviewNote>
          <PropertyCardSkeleton />
          <GallerySkeleton />
        </div>
      </Section>

      <Section tone="tint" labelledBy="art-title">
        <h2 id="art-title" className="text-display-md">
          Placeholder art
        </h2>
        <p className="reading-width mt-4">
          Every placeholder art key, shown at the crop its real photograph will use. All art here is original.
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {artKeys.map((key) => (
            <li key={key} className="rounded-lg border border-pine-evergreen/12 bg-surface p-3">
              <div className="aspect-[3/2] overflow-hidden rounded-md">
                <PlaceholderArt art={key} alt={`Illustrative placeholder: ${key}`} />
              </div>
              <p className="mt-2 text-sm text-pine-soft">{key}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="motion-title">
        <h2 id="motion-title" className="text-display-md">
          Motion notes
        </h2>
        <ul className="reading-width mt-6 grid gap-3">
          {motionNotes.map((note) => (
            <li key={note} className="flex gap-3">
              <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-sm bg-panagbenga-sunflower" />
              {note}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
