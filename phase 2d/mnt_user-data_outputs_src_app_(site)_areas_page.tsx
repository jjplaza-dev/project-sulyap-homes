import type { Metadata } from 'next';
import { getEditorialBlock } from '@/data/selectors';
import { Section } from '@/components/layout/Container';
import { EditorialHeading } from '@/components/layout/EditorialHeading';
import { NeighborhoodGrid } from '@/components/sections/NeighborhoodGrid';

export const metadata: Metadata = {
  title: 'Areas and neighborhoods',
  description: 'Explore the neighborhoods Sulyap Homes & Leasing covers in Baguio City and nearby Benguet.',
};

export default function AreasPage() {
  const intro = getEditorialBlock('areas-intro');

  return (
    <Section grid labelledBy="areas-title">
      <EditorialHeading block={intro} level={1} headingId="areas-title" />
      <div className="mt-12">
        <NeighborhoodGrid />
      </div>
    </Section>
  );
}
