import type { EntityId, Slug } from './common';
import type { MediaImage } from './media';

/**
 * A Sulyap agent. Phase 2 agents are fictional sample data.
 * Inactive agents are excluded by `getPublicAgents` and never shown publicly.
 */
export interface Agent {
  readonly id: EntityId;
  readonly slug: Slug;
  readonly name: string;
  readonly photo: MediaImage;
  readonly bio: string;
  readonly email: string;
  /** Shown only if the agent has chosen to make it public. */
  readonly phone?: string;
  /** Neighborhood IDs this agent serves. */
  readonly serviceAreaIds: ReadonlyArray<EntityId>;
  /** This agent's own Cal.com booking link (Phase 6 embed source). */
  readonly calBookingLink: string;
  /** Cal.com event type identifier for the 30-minute in-person viewing. */
  readonly calEventType: string;
  readonly backupBookingLink?: string;
  readonly isActive: boolean;
}
