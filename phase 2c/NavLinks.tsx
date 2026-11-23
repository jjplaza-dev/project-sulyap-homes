'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ActionLink } from '@/domain';
import { cx } from '@/lib/cx';

/** Primary navigation list; marks the current section with `aria-current`. */
export function NavLinks({
  links,
  className,
}: {
  links: ReadonlyArray<ActionLink>;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <ul className={cx('flex items-center gap-1', className)}>
      {links.map((link) => {
        const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={active ? 'page' : undefined}
              className={cx(
                'relative inline-flex min-h-11 items-center rounded-md px-3 text-[0.95rem] font-medium text-pine-evergreen transition-colors hover:bg-moss-tint',
                active &&
                  'after:absolute after:inset-x-3 after:bottom-1.5 after:h-0.5 after:rounded-sm after:bg-panagbenga-sunflower',
              )}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
