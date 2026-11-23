'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import type { ActionLink } from '@/domain';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ButtonLink } from './ButtonLink';

interface MobileNavProps {
  links: ReadonlyArray<ActionLink>;
  cta?: ActionLink;
  email: string;
}

/**
 * Mobile menu. The sheet is controlled with plain open state, so it works
 * whichever primitive library the installed shadcn components sit on.
 */
export function MobileNav({ links, cta, email }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="inline-flex size-11 items-center justify-center rounded-md text-pine-evergreen transition-colors hover:bg-moss-tint"
      >
        <Menu className="size-6" aria-hidden="true" />
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="gap-6">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>Explore Sulyap Homes &amp; Leasing</SheetDescription>
          </SheetHeader>

          <nav aria-label="Mobile" className="px-4">
            <ul className="grid gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    className="flex min-h-12 items-center rounded-md px-3 font-display text-xl text-pine-evergreen transition-colors hover:bg-moss-tint"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid gap-4 px-4 pb-6">
            {cta ? (
              <ButtonLink href={cta.href} size="lg" onClick={close}>
                {cta.label}
              </ButtonLink>
            ) : null}
            <a href={`mailto:${email}`} className="text-center text-pine-soft underline">
              {email}
            </a>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
