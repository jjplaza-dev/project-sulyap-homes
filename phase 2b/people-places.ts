/**
 * Agent and neighborhood selectors: pure, synchronous, read-only.
 * Agent selectors are PUBLIC-ONLY: inactive agents are never returned.
 */
import type { Agent, EntityId, Neighborhood, Slug } from '@/domain';
import { agents } from '../fixtures/agents';
import { neighborhoods } from '../fixtures/neighborhoods';

// ------------------------------------------------------------------ agents

export function getPublicAgents(): ReadonlyArray<Agent> {
  return agents.filter((agent) => agent.isActive);
}

export function getAgentBySlug(slug: Slug): Agent | undefined {
  return getPublicAgents().find((agent) => agent.slug === slug);
}

export function getAgentById(id: EntityId): Agent | undefined {
  return getPublicAgents().find((agent) => agent.id === id);
}

/** Active agents who serve a neighborhood. */
export function getAgentsByNeighborhood(neighborhoodId: EntityId): ReadonlyArray<Agent> {
  return getPublicAgents().filter((agent) => agent.serviceAreaIds.includes(neighborhoodId));
}

// ----------------------------------------------------------- neighborhoods

export function getNeighborhoods(): ReadonlyArray<Neighborhood> {
  return neighborhoods;
}

export function getNeighborhoodBySlug(slug: Slug): Neighborhood | undefined {
  return neighborhoods.find((n) => n.slug === slug);
}

export function getNeighborhoodById(id: EntityId): Neighborhood | undefined {
  return neighborhoods.find((n) => n.id === id);
}

/** Neighborhoods an agent serves, in the agent's own order. */
export function getNeighborhoodsByAgent(agent: Agent): ReadonlyArray<Neighborhood> {
  return agent.serviceAreaIds.flatMap((id) => {
    const neighborhood = getNeighborhoodById(id);
    return neighborhood ? [neighborhood] : [];
  });
}
