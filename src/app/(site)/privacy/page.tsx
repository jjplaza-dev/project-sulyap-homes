import type { Metadata } from 'next';
import { getEditorialBlock, getLegalSections } from '@/data/selectors';
import { Container, Section } from '@/components/layout/Container';
import { EditorialHeading } from '@/components/layout/EditorialHeading';
import { PreviewNote } from '@/components/states/StatusMessages';

export const metadata: Metadata = {
  title: 'Privacy Notice',
  description: 'Draft privacy notice for Sulyap Homes & Leasing. Not yet reviewed.',
};

export default function PrivacyPage() {
  const intro = getEditorialBlock('privacy-intro');
  const sections = getLegalSections();

  return (
    <Section labelledBy="privacy-title">
      <EditorialHeading block={intro} level={1} headingId="privacy-title" />
      <PreviewNote className="mt-6 max-w-2xl">
        Draft: this notice requires review by Sulyap and a qualified legal professional. It makes no claim
        of legal compliance.
      </PreviewNote>

      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16">
        <nav aria-label="On this page" className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="text-eyebrow mb-3 text-berry-deep">On this page</p>
            <ol className="grid">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="inline-flex min-h-11 items-center text-pine-evergreen underline-offset-4 hover:underline"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <Container className="grid gap-12 px-0 sm:px-0 lg:col-span-8 lg:px-0">
          {sections.map((section) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-28">
              <h2 id={`${section.id}-title`} className="text-2xl">
                {section.title}
              </h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="reading-width mt-3">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </Container>
      </div>
    </Section>
  );
}
