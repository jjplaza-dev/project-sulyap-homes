/**
 * SAMPLE AGENTS — fictional people for the design preview.
 * Names, bios, emails, phone numbers and booking links are invented
 * (all on reserved `.example` domains). One agent is inactive and must never
 * appear in public selectors.
 */
import type { Agent } from '@/domain';
import { placeholderImage } from '@/data/fixtures/media';

export const agentIds = {
  isabel: 'ag-isabel-bautista',
  rafael: 'ag-rafael-dumlao',
  maricel: 'ag-maricel-balangan',
  joaquin: 'ag-joaquin-pascua',
  theresa: 'ag-theresa-lacanilao',
} as const;

/** Placeholder Cal.com link on a clearly fake domain. */
export const sampleCalLink = (agentSlug: string): string =>
  `https://cal.example/sample-${agentSlug}/in-person-viewing`;

const SAMPLE_TAG = ' (Sample profile for the design preview.)';

export const agents: ReadonlyArray<Agent> = [
  {
    id: agentIds.isabel,
    slug: 'isabel-bautista',
    name: 'Isabel Bautista',
    photo: placeholderImage('ag-isabel-photo', 'agent-portrait', 'Isabel Bautista'),
    bio:
      'Isabel walks buyers and renters through each viewing, answers questions as they come up, and keeps every step clear from the first message to tour day.' +
      SAMPLE_TAG,
    email: 'isabel.bautista@sulyaphomes.example',
    phone: '+63 900 000 0101',
    serviceAreaIds: ['nb-aurora-hill', 'nb-quezon-hill', 'nb-pacdal'],
    calBookingLink: sampleCalLink('isabel-bautista'),
    calEventType: 'in-person-viewing',
    backupBookingLink: sampleCalLink('maricel-balangan'),
    isActive: true,
  },
  {
    id: agentIds.rafael,
    slug: 'rafael-dumlao',
    name: 'Rafael Dumlao',
    photo: placeholderImage('ag-rafael-photo', 'agent-portrait', 'Rafael Dumlao'),
    bio:
      'Rafael focuses on helping families compare neighborhoods, from quiet hillside streets to communities just outside the city, before they commit to a viewing.' +
      SAMPLE_TAG,
    email: 'rafael.dumlao@sulyaphomes.example',
    serviceAreaIds: ['nb-camp-7', 'nb-loakan', 'nb-la-trinidad'],
    calBookingLink: sampleCalLink('rafael-dumlao'),
    calEventType: 'in-person-viewing',
    isActive: true,
  },
  {
    id: agentIds.maricel,
    slug: 'maricel-balangan',
    name: 'Maricel Balangan',
    photo: placeholderImage('ag-maricel-photo', 'agent-portrait', 'Maricel Balangan'),
    bio:
      'Maricel looks after condominium and rental listings, and likes to make sure each tenant knows the lease terms before the tour begins.' +
      SAMPLE_TAG,
    email: 'maricel.balangan@sulyaphomes.example',
    phone: '+63 900 000 0103',
    serviceAreaIds: ['nb-pacdal', 'nb-la-trinidad', 'nb-aurora-hill'],
    calBookingLink: sampleCalLink('maricel-balangan'),
    calEventType: 'in-person-viewing',
    isActive: true,
  },
  {
    id: agentIds.joaquin,
    slug: 'joaquin-pascua',
    name: 'Joaquin Pascua',
    photo: placeholderImage('ag-joaquin-photo', 'agent-portrait', 'Joaquin Pascua'),
    bio:
      'Joaquin works with clients who are building or buying land, and walks each lot with them so boundaries, access and surroundings are clear.' +
      SAMPLE_TAG,
    email: 'joaquin.pascua@sulyaphomes.example',
    serviceAreaIds: ['nb-loakan', 'nb-camp-7', 'nb-quezon-hill'],
    calBookingLink: sampleCalLink('joaquin-pascua'),
    calEventType: 'in-person-viewing',
    isActive: true,
  },
  {
    // Inactive: excluded by `getPublicAgents`; has no assigned listings.
    id: agentIds.theresa,
    slug: 'theresa-lacanilao',
    name: 'Theresa Lacanilao',
    photo: placeholderImage('ag-theresa-photo', 'agent-portrait', 'Theresa Lacanilao'),
    bio: 'Inactive sample profile. Never shown publicly.',
    email: 'theresa.lacanilao@sulyaphomes.example',
    phone: '+63 900 000 0105',
    serviceAreaIds: ['nb-aurora-hill', 'nb-loakan'],
    calBookingLink: sampleCalLink('theresa-lacanilao'),
    calEventType: 'in-person-viewing',
    isActive: false,
  },
];
