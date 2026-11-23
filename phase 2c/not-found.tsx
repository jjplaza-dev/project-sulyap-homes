import Link from 'next/link';
import { LogoHorizontal } from '@/components/brand/Logo';
import { PineBranch } from '@/components/brand/Botanical';
import { ButtonLink } from '@/components/layout/ButtonLink';
import { Container } from '@/components/layout/Container';

/** Sits at the app root, outside the site shell, so it carries its own mark. */
export default function NotFound() {
  return (
    <main id="main" className="relative flex min-h-dvh items-center overflow-hidden py-16">
      <div aria-hidden="true" className="bg-grid-lines pointer-events-none absolute inset-0" />
      <Container className="relative">
        <Link href="/" aria-label="Sulyap Homes & Leasing — home" className="inline-block rounded-md">
          <LogoHorizontal className="h-11 w-auto" />
        </Link>
        <p className="text-eyebrow mt-16 text-berry-deep">Page not found</p>
        <h1 className="text-display-lg mt-4 max-w-2xl">We couldn’t find that page.</h1>
        <p className="reading-width mt-5 text-lg">
          The link may be out of date, or the page may have moved. Head back to the homepage, or start
          browsing homes.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/" size="lg">
            Back to the homepage
          </ButtonLink>
          <ButtonLink href="/buy" size="lg" variant="outline">
            Explore Properties
          </ButtonLink>
        </div>
        <PineBranch className="mt-16 w-56 text-highland-moss" />
      </Container>
    </main>
  );
}
