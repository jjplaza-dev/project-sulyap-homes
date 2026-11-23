import type { BookableProperty, Property } from '@/domain';
import { getAgentById } from './people-places';

/**
 * Serializable booking view of a property. The assigned agent is never
 * swapped: a backup is only OFFERED, with the alternative named.
 */
export function getBookableProperty(property: Property): BookableProperty {
  const { backup } = property;
  if (!backup) return { id: property.id, title: property.title };

  if (backup.kind === 'agent') {
    return {
      id: property.id,
      title: property.title,
      backup: {
        kind: 'agent',
        agentName: getAgentById(backup.agentId)?.name,
        contactHref: backup.contactHref,
      },
    };
  }

  return {
    id: property.id,
    title: property.title,
    backup: { kind: 'central', contactHref: backup.contactHref },
  };
}
