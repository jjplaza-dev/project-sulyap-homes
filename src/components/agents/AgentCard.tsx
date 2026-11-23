import Link from 'next/link';
import type { Agent } from '@/domain';
import { MediaView } from '@/components/brand/MediaView';
import { pluralize } from '@/lib/format';

interface AgentCardProps {
  agent: Agent;
  /** Names of the neighborhoods this agent serves. */
  areaNames: ReadonlyArray<string>;
  listingCount: number;
}

export function AgentCard({ agent, areaNames, listingCount }: AgentCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-pine-evergreen/12 bg-surface shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="aspect-[4/5] overflow-hidden bg-moss-tint">
        <MediaView
          image={agent.photo}
          alt=""
          className="transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
        />
      </div>
      <div className="grid gap-2 p-5">
        <h3 className="text-xl leading-snug">
          <Link href={`/agents/${agent.slug}`} className="rounded-sm after:absolute after:inset-0 after:content-['']">
            {agent.name}
          </Link>
        </h3>
        {areaNames.length > 0 ? <p className="text-sm text-pine-soft">Serves {areaNames.join(', ')}</p> : null}
        <p className="numeric-tabular text-sm text-pine-ink">{pluralize(listingCount, 'listing')}</p>
      </div>
    </article>
  );
}
