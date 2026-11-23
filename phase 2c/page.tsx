import type { Metadata } from 'next';
import { getEditorialBlock, getValueItems } from '@/data/selectors';
import { PlaceholderArt } from '@/components/brand/PlaceholderArt';
import { PineBranch, WindowFrame } from '@/components/brand/Botanical';
import { EditorialActions, EditorialHeading } from '@/components/layout/EditorialHeading';
import { Section } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Sulyap Homes & Leasing is a locally managed agency helping people find residential spaces in Baguio City and nearby communities in Benguet.',
};

export default function AboutPage() {
  const intro = getEditorialBlock('about-intro');
  const background = getEditorialBlock('about-background');
  const approach = getEditorialBlock('about-approach');
  const valuesBlock = getEditorialBlock('about-values');
  const help = getEditorialBlock('about-help');
  const cta = getEditorialBlock('about-cta');
  const values = getValueItems();

  return (
    <>
      <Section grid labelledBy="about-title">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <EditorialHeading block={intro} level={1} headingId="about-title" />
          </Reveal>
          <Reveal delay={0.1} className="mx-auto w-full max-w-sm pb-3 pr-3 lg:col-span-5 lg:max-w-none">
            <WindowFrame className="aspect-[4/5]">
              <PlaceholderArt art="window-arch" alt="Illustrative placeholder: arched window looking out to a highland ridge" />
            </WindowFrame>
          </Reveal>
        </div>
      </Section>

      <Section tone="tint">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <EditorialHeading block={background} />
          </Reveal>
          <Reveal delay={0.1}>
            <EditorialHeading block={approach} />
          </Reveal>
        </div>
      </Section>

      <Section labelledBy="values-title">
        <Reveal>
          <EditorialHeading block={valuesBlock} headingId="values-title" />
        </Reveal>
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <li key={value.id} className={index % 2 === 1 ? 'lg:translate-y-10' : undefined}>
              <Reveal delay={index * 0.08} className="h-full">
                <div className="h-full rounded-lg border border-pine-evergreen/12 bg-surface p-6 shadow-sm">
                  <p aria-hidden="true" className="numeric-tabular font-display text-3xl text-berry-deep">
                    {String(value.order).padStart(2, '0')}
                  </p>
                  <h3 className="mt-4 text-xl">{value.title}</h3>
                  {value.body.map((paragraph) => (
                    <p key={paragraph} className="mt-3 text-pine-ink">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="soft" className="lg:pt-36">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <EditorialHeading block={help} />
          </Reveal>
          <PineBranch className="hidden w-full text-pine-evergreen/50 lg:col-span-5 lg:block" />
        </div>
      </Section>

      <Section tone="pine" grid labelledBy="about-cta-title">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <EditorialHeading block={cta} tone="onPine" headingId="about-cta-title" className="lg:col-span-7" />
          <EditorialActions block={cta} tone="onPine" className="lg:col-span-5 lg:justify-end" />
        </Reveal>
      </Section>
    </>
  );
}
