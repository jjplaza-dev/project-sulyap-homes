/**
 * SAMPLE SITE SETTINGS.
 * Contact details are fictional placeholders on the reserved `.example`
 * domain, to be replaced with Sulyap’s real details (open item in the plan).
 */
import type { SiteSettings } from '@/domain';
import { placeholderImage } from './media';

export const siteSettings: SiteSettings = {
  businessName: 'Sulyap Homes & Leasing',
  tagline: 'A closer look at where you could belong.',
  logo: placeholderImage('logo-sulyap', 'brand-logo', 'Sulyap Homes & Leasing'),
  nav: [
    { label: 'Buy', href: '/buy' },
    { label: 'Rent', href: '/rent' },
    { label: 'Areas', href: '/areas' },
    { label: 'Agents', href: '/agents' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Favorites', href: '/favorites' },
  ],
  contact: {
    email: 'hello@sulyaphomes.example',
    phone: '+63 900 000 0100',
    address: 'Office address to be confirmed by Sulyap — Baguio City, Benguet, Philippines',
    hours: 'Business hours to be confirmed by Sulyap.',
  },
  social: [
    { label: 'Facebook', href: 'https://facebook.example/sulyaphomes', external: true },
    { label: 'Instagram', href: 'https://instagram.example/sulyaphomes', external: true },
  ],
  serviceArea: 'Baguio City and selected nearby communities in Benguet',
  homepageFeaturedIds: ['prop-s01', 'prop-r01', 'prop-s05', 'prop-r03', 'prop-s08'],
  footer: {
    about:
      'Sulyap Homes & Leasing is a locally managed agency offering thoughtfully selected homes and residential properties in Baguio City and nearby communities.',
    linkGroups: [
      {
        id: 'footer-explore',
        heading: 'Explore',
        links: [
          { label: 'Homes for sale', href: '/buy' },
          { label: 'Places to rent', href: '/rent' },
          { label: 'Areas', href: '/areas' },
          { label: 'Favorites', href: '/favorites' },
        ],
      },
      {
        id: 'footer-sulyap',
        heading: 'Sulyap',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Agents', href: '/agents' },
          { label: 'FAQ', href: '/faq' },
          { label: 'Contact', href: '/contact' },
        ],
      },
      {
        id: 'footer-legal',
        heading: 'Legal',
        links: [{ label: 'Privacy Notice', href: '/privacy' }],
      },
    ],
    copyright: '© 2026 Sulyap Homes & Leasing',
    sampleDataNotice:
      'Design preview: every listing, agent, price, address and detail on this site is a fictional sample. No message, booking or save is actually sent.',
  },
  centralAdminEmail: 'admin@sulyaphomes.example',
};
