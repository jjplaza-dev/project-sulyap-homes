import type { Metadata, Viewport } from 'next';
import { DM_Sans, Fraunces } from 'next/font/google';
import './globals.css';

// Display / headings. Optical-size and softness axes are intentionally not used:
// support in the installed Next.js font API is unverified.
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

// Body, navigation, prices, forms.
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Sulyap Homes & Leasing',
    template: '%s | Sulyap Homes & Leasing',
  },
  description:
    'Thoughtfully selected homes and residential properties in Baguio City and nearby communities in Benguet. Arrange a personal viewing.',
  // Design preview: every listing is fictional sample content. Remove in Phase 7.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: '#F4F3EC',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <head>
        {/* Without JavaScript, scroll-reveal content must still be visible. */}
        <noscript>
          <style>{'[data-reveal]{opacity:1 !important}'}</style>
        </noscript>
      </head>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
