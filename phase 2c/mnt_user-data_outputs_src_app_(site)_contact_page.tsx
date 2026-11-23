import type { Metadata } from 'next';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { getEditorialBlock, getPublicSiteSettings } from '@/data/selectors';
import { ContactForm } from '@/components/forms/ContactForm';
import { Section } from '@/components/layout/Container';
import { EditorialHeading } from '@/components/layout/EditorialHeading';
import { Reveal } from '@/components/motion/Reveal';
import { mailtoHref, telHref } from '@/lib/format';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Send Sulyap Homes & Leasing a question, or reach the agency directly.',
};

export default function ContactPage() {
  const intro = getEditorialBlock('contact-intro');
  const { contact, social, serviceArea } = getPublicSiteSettings();

  return (
    <Section grid labelledBy="contact-title">
      <Reveal>
        <EditorialHeading block={intro} level={1} headingId="contact-title" />
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <div className="rounded-lg border border-pine-evergreen/12 bg-surface p-6 shadow-md sm:p-8">
            <h2 className="mb-6 text-2xl">Send a message</h2>
            <ContactForm />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5">
          <h2 className="text-2xl">Contact details</h2>
          <ul className="mt-6 grid gap-5">
            <li className="flex gap-4">
              <Mail className="mt-1 size-5 shrink-0 text-berry-deep" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-pine-evergreen">Email</p>
                <a href={mailtoHref(contact.email)} className="underline">
                  {contact.email}
                </a>
              </div>
            </li>
            {contact.phone ? (
              <li className="flex gap-4">
                <Phone className="mt-1 size-5 shrink-0 text-berry-deep" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-pine-evergreen">Phone</p>
                  <a href={telHref(contact.phone)} className="underline">
                    {contact.phone}
                  </a>
                </div>
              </li>
            ) : null}
            {contact.address ? (
              <li className="flex gap-4">
                <MapPin className="mt-1 size-5 shrink-0 text-berry-deep" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-pine-evergreen">Office</p>
                  <p>{contact.address}</p>
                </div>
              </li>
            ) : null}
            {contact.hours ? (
              <li className="flex gap-4">
                <Clock className="mt-1 size-5 shrink-0 text-berry-deep" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-pine-evergreen">Business hours</p>
                  <p>{contact.hours}</p>
                </div>
              </li>
            ) : null}
          </ul>

          <div className="mt-8 rounded-lg bg-moss-tint p-6">
            <h3 className="text-xl">Where we work</h3>
            <p className="mt-2">{serviceArea}.</p>
            <ul className="mt-4 flex flex-wrap gap-x-5">
              {social.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center font-medium underline"
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
