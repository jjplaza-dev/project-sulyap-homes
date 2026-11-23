import Link from 'next/link';
import { Heart } from 'lucide-react';
import { getEditorialBlock, getPublicSiteSettings } from '@/data/selectors';
import { LogoHorizontal } from '@/components/brand/Logo';
import { Magnetic } from '@/components/motion/Magnetic';
import { ButtonLink } from './ButtonLink';
import { Container } from '@/components/layout/Container';
import { MobileNav } from './MobileNav';
import { NavLinks } from './NavLinks';

/**
 * Persistent header. `favoritesCount` is reserved for Phase 4 (real saved
 * homes): Phase 2 never shows a count, so nothing implies that a save happened.
 */
export function Header({ favoritesCount }: { favoritesCount?: number }) {
  const settings = getPublicSiteSettings();
  const cta = getEditorialBlock('header-cta').primaryAction;
  const primaryLinks = settings.nav.filter((link) => link.href !== '/favorites');
  const favoritesLink = settings.nav.find((link) => link.href === '/favorites');

  return (
      <header className="sticky top-0 z-40 border-b border-pine-evergreen/10 bg-cloud-mist/90 backdrop-blur-md">
        <Container className="flex h-[72px] items-center justify-between gap-2 sm:gap-6">
          <Link
              href="/public"
              aria-label={`${settings.businessName} — home`}
              className="min-w-0 shrink rounded-md sm:shrink-0"
          >
            <LogoHorizontal className="h-8 w-auto max-w-[170px] sm:h-10 sm:max-w-none" />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <NavLinks links={primaryLinks} />
          </nav>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            {favoritesLink ? (
                <Link
                    href={favoritesLink.href}
                    aria-label={
                      favoritesCount ? `${favoritesLink.label}, ${favoritesCount} saved` : favoritesLink.label
                    }
                    className="relative inline-flex size-10 items-center justify-center rounded-md text-pine-evergreen transition-colors hover:bg-moss-tint sm:size-11"
                >
                  <Heart className="size-5" aria-hidden="true" />
                  {favoritesCount ? (
                      <span
                          aria-hidden="true"
                          className="numeric-tabular absolute top-1 right-1 inline-flex min-w-5 items-center justify-center rounded-sm bg-panagbenga-sunflower px-1 text-xs font-semibold text-pine-evergreen"
                      >
                  {favoritesCount}
                </span>
                  ) : null}
                </Link>
            ) : null}

            {cta ? (
                <Magnetic className="hidden lg:inline-block">
                  <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
                </Magnetic>
            ) : null}

            <div className="flex items-center lg:hidden">
              <MobileNav links={settings.nav} cta={cta} email={settings.contact.email} />
            </div>
          </div>
        </Container>
      </header>
  );
}