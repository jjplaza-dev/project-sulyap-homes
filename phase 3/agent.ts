import { defineArrayMember, defineField, defineType } from 'sanity';

export const agent = defineType({
  name: 'agent',
  title: 'Agent',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full name', type: 'string', validation: (Rule) => Rule.required().max(80) }),
    defineField({
      name: 'slug',
      title: 'Web address (slug)',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Turn off to hide this agent everywhere and stop assigning new listings to them.',
      initialValue: true,
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Portrait, ideally 4:5. Only upload photos the agent has agreed to share.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'For example “Portrait of Isabel Bautista”.',
          validation: (Rule) => Rule.required().max(200),
        }),
      ],
    }),
    defineField({ name: 'bio', title: 'Short bio', type: 'text', rows: 4, validation: (Rule) => Rule.required().max(600) }),
    defineField({ name: 'email', title: 'Public email', type: 'string', validation: (Rule) => Rule.required().email() }),
    defineField({ name: 'phone', title: 'Public phone (optional)', type: 'string', description: 'Shown on the site only if filled in.' }),
    defineField({
      name: 'serviceAreas',
      title: 'Neighborhoods served',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'neighborhood' }] })],
    }),
    defineField({
      name: 'calBookingLink',
      title: 'Cal.com booking link',
      type: 'url',
      description: 'This agent’s own link for the 30-minute in-person viewing event. Used from Phase 6.',
      validation: (Rule) => Rule.required().uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'calEventType',
      title: 'Cal.com event type',
      type: 'string',
      description: 'The event type slug, for example “in-person-viewing”.',
      initialValue: 'in-person-viewing',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backupBookingLink',
      title: 'Backup booking link (optional)',
      type: 'url',
      validation: (Rule) => Rule.uri({ scheme: ['https'] }),
    }),
  ],
  preview: {
    select: { title: 'name', active: 'isActive', media: 'photo' },
    prepare: ({ title, active, media }) => ({ title, subtitle: active === false ? 'Inactive' : 'Active', media }),
  },
});
