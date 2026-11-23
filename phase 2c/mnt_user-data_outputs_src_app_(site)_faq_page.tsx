import type { Metadata } from 'next';
import { getEditorialBlock, getFaqItems } from '@/data/selectors';
import { Section } from '@/components/layout/Container';
import { EditorialActions, EditorialHeading } from '@/components/layout/EditorialHeading';
import { Reveal } from '@/components/motion/Reveal';
import { FaqList } from '@/components/sections/FaqList';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'How in-person tours, favorites, listings and privacy work at Sulyap Homes & Leasing.',
};

export default function FaqPage() {
  const intro = getEditorialBlock('faq-intro');
  const cta = getEditorialBlock('faq-cta');
  const items = getFaqItems();

  return (
    <>
      <Section grid labelledBy="faq-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <EditorialHeading block={intro} level={1} headingId="faq-title" />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <FaqList items={items} />
          </Reveal>
        </div>
      </Section>

      <Section tone="tint" labelledBy="faq-cta-title">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-center">
          <EditorialHeading block={cta} headingId="faq-cta-title" className="lg:col-span-8" />
          <EditorialActions block={cta} className="lg:col-span-4 lg:justify-end" />
        </Reveal>
      </Section>
    </>
  );
}
