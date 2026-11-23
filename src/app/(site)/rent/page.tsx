import type { Metadata } from 'next';
import { ListingsPage } from '@/components/sections/ListingsPage';

export const metadata: Metadata = {
  title: 'Places to rent',
  description: 'Houses, condominiums, apartments and townhouses to lease in Baguio City and nearby Benguet.',
};

export default function RentPage() {
  return <ListingsPage purpose="rent" />;
}
