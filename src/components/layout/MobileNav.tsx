'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Mail, Menu } from 'lucide-react';
import type { ActionLink } from '@/domain';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ButtonLink } from '@/components/layout/ButtonLink';

interface MobileNavProps {
  links: ReadonlyArray<ActionLink>;
  cta?: ActionLink;
  email: string;
}

/**
 * Mobile navigation drawer styled with Sulyap architectural tokens.
 * Uses controlled open state for compatibility across underlying sheet primitives.
 */
export function MobileNav({ links, cta, email }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  const isActive = (href: string) =>
      href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
      <>
        <button
            type="button"
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="inline-flex size-11 items-center justify-center rounded-md border border-pine-evergreen/15 bg-surface/80 text-pine-evergreen transition-colors hover:bg-moss-tint"
        >
          <Menu className="size-5" aria-hidden="true" />
        </button>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent
              side="right"
              className="flex w-full max-w-sm flex-col justify-between gap-0 border-l border-pine-evergreen/15 bg-surface p-0 text-pine-ink"
          >
            <div>
              <SheetHeader className="bg-grid-lines border-b border-pine-evergreen/12 px-6 pt-7 pb-5 text-left">
                <span className="text-eyebrow text-moss-deep">Baguio &amp; Benguet</span>
                <SheetTitle className="mt-1 font-display text-2xl font-medium tracking-tight text-pine-evergreen">
                  Sulyap Homes &amp; Leasing
                </SheetTitle>
                <SheetDescription className="text-sm text-pine-soft">
                  Thoughtfully selected residences and personal viewings.
                </SheetDescription>
              </SheetHeader>

              <nav aria-label="Mobile" className="px-4 py-5">
                <ul className="grid gap-1.5">
                  {links.map((link, index) => {
                    const active = isActive(link.href);

                    return (
                        <li key={link.href}>
                          <Link
                              href={link.href}
                              onClick={close}
                              aria-current={active ? 'page' : undefined}
                              className={`group flex min-h-13 items-center justify-between rounded-md px-3.5 transition-colors ${
                                  active
                                      ? 'bg-moss-tint/80 text-pine-evergreen'
                                      : 'text-pine-ink hover:bg-moss-tint/50 hover:text-pine-evergreen'
                              }`}
                          >
                        <span className="flex items-baseline">
                          <span
                              className={`numeric-tabular text-xs font-medium transition-colors ${
                                  active
                                      ? 'text-pine-evergreen'
                                      : 'text-moss-deep group-hover:text-pine-evergreen'
                              }`}
                          >
                          </span>
                          <span className="font-display text-2xl leading-tight font-medium">
                            {link.label}
                          </span>
                        </span>

                            <span className="flex items-center gap-2">
                          {active ? (
                              <span
                                  aria-hidden="true"
                                  className="size-2 rounded-full bg-panagbenga-sunflower ring-2 ring-pine-evergreen/20"
                              />
                          ) : null}
                        </span>
                          </Link>
                        </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            <div className="mt-auto grid gap-3.5 border-t border-pine-evergreen/12 bg-cloud-mist/75 px-6 py-6">
              {cta ? (
                  <ButtonLink href={cta.href} size="lg" onClick={close} className="w-full justify-center">
                    {cta.label}
                  </ButtonLink>
              ) : null}

              <a
                  href={`mailto:${email}`}
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-2 text-sm text-pine-soft transition-colors hover:text-pine-evergreen"
              >
                <Mail className="size-4 text-moss-deep" aria-hidden="true" />
                <span className="underline underline-offset-4">{email}</span>
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </>
  );
}