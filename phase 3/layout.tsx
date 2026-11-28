import type { ReactNode } from 'react';

/**
 * The Studio sits outside the `(site)` shell: no header, footer or skip link.
 * The data attribute lets global styles step aside (see "Studio isolation" in
 * src/styles/sulyap.css).
 */
export default function StudioLayout({ children }: { children: ReactNode }) {
  return <div data-studio="">{children}</div>;
}
