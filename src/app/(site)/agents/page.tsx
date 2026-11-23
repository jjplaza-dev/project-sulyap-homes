import type { Metadata } from 'next';
import {
  getEditorialBlock,
  getNeighborhoodsByAgent,
  getPropertiesByAgent,
  getPublicAgents,
} from '@/data/selectors';
import { AgentCard } from '@/components/agents/AgentCard';
import { Section } from '@/components/layout/Container';
import { EditorialActions, EditorialHeading } from '@/components/layout/EditorialHeading';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'Our agents',
  description: 'Meet the agents behind Sulyap Homes & Leasing listings in Baguio City and nearby Benguet.',
};

export default function AgentsPage() {
  const intro = getEditorialBlock('agents-intro');
  const cta = getEditorialBlock('home-viewing-cta');
  const agents = getPublicAgents();

  return (
    <>
      <Section grid labelledBy="agents-title">
        <Reveal>
          <EditorialHeading block={intro} level={1} headingId="agents-title" />
        </Reveal>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {agents.map((agent, index) => (
            <li key={agent.id}>
              <Reveal delay={index * 0.08} className="h-full">
                <AgentCard
                  agent={agent}
                  areaNames={getNeighborhoodsByAgent(agent).map((n) => n.name)}
                  listingCount={getPropertiesByAgent(agent.id).length}
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="pine" grid labelledBy="agents-cta-title">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 id="agents-cta-title" className="text-display-md">
              {cta.heading}
            </h2>
            <p className="reading-width mt-5 text-lg text-cloud-mist/85">{cta.body[0]}</p>
          </div>
          <EditorialActions block={cta} tone="onPine" className="lg:col-span-5 lg:justify-end" />
        </Reveal>
      </Section>
    </>
  );
}
