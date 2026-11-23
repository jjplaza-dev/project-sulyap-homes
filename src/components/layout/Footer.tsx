import Link from 'next/link';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { getPublicSiteSettings } from '@/data/selectors';
import { LogoMono } from '@/components/brand/Logo';
import { PineBranch } from '@/components/brand/Botanical';
import { mailtoHref, telHref } from '@/lib/format';
import { Container } from '@/components/layout/Container';

const linkClass =
  'inline-flex min-h-11 items-center text-cloud-mist/80 underline-offset-4 transition-colors hover:text-cloud-mist hover:underline';

export function Footer() {
  const { businessName, footer, contact, social, serviceArea } = getPublicSiteSettings();

  return (
    <footer className="on-pine relative bg-pine-evergreen text-cloud-mist">
      <div aria-hidden="true" className="bg-grid-lines-light pointer-events-none absolute inset-0 opacity-60" />
      <Container className="relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/public" aria-label={`${businessName} — home`} className="inline-block rounded-md">
              <LogoMono className="h-11 w-auto text-cloud-mist" />
            </Link>
            <p className="mt-5 max-w-sm text-cloud-mist/80">{footer.about}</p>
            <PineBranch className="mt-8 w-40 text-highland-moss" />
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-4">
            {footer.linkGroups.map((group) => (
              <div key={group.id}>
                <h2 className="text-eyebrow mb-3 text-panagbenga-sunflower">{group.heading}</h2>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="lg:col-span-4">
            <h2 className="text-eyebrow mb-3 text-panagbenga-sunflower">Get in touch</h2>
            <ul className="grid gap-1 text-cloud-mist/85">
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-highland-moss" aria-hidden="true" />
                <a href={mailtoHref(contact.email)} className={linkClass}>
                  {contact.email}
                </a>
              </li>
              {contact.phone ? (
                <li className="flex items-center gap-3">
                  <Phone className="size-4 shrink-0 text-highland-moss" aria-hidden="true" />
                  <a href={telHref(contact.phone)} className={linkClass}>
                    {contact.phone}
                  </a>
                </li>
              ) : null}
              {contact.address ? (
                <li className="flex gap-3 py-2">
                  <MapPin className="mt-1 size-4 shrink-0 text-highland-moss" aria-hidden="true" />
                  <span>{contact.address}</span>
                </li>
              ) : null}
              {contact.hours ? (
                <li className="flex gap-3 py-2">
                  <Clock className="mt-1 size-4 shrink-0 text-highland-moss" aria-hidden="true" />
                  <span>{contact.hours}</span>
                </li>
              ) : null}
            </ul>
            <p className="mt-4 text-cloud-mist/75">Serving {serviceArea}.</p>
            <ul className="mt-2 flex flex-wrap gap-x-4">
              {social.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={linkClass}
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 grid gap-4 border-t border-cloud-mist/15 pt-8 text-sm">
          {footer.sampleDataNotice ? (
            <p className="max-w-3xl rounded-md border border-cloud-mist/25 p-3 text-cloud-mist/90">
              {footer.sampleDataNotice}
            </p>
          ) : null}
          <p className="text-cloud-mist/75">{footer.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
