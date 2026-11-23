import type { Metadata } from 'next';
import { ListingsPage } from '@/components/sections/ListingsPage';

export const metadata: Metadata = {
  title: 'Homes and lots for sale',
  description: 'Residential properties for sale in Baguio City and nearby communities in Benguet.',
};

export default function BuyPage() {
  return <ListingsPage purpose="sale" />;
}
