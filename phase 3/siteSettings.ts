import { defineArrayMember, defineField, defineType } from 'sanity';

/**
 * Singleton. The central administrator email is deliberately NOT here: a public
 * dataset can be read by anyone, so it lives in the server-only
 * CENTRAL_ADMIN_EMAIL environment variable.
 */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({ name: 'businessName', title: 'Business name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({
      name: 'serviceArea',
      title: 'Service area',
      type: 'string',
      description: 'For example “Baguio City and selected nearby communities in Benguet”.',
    }),
    defineField({ name: 'contactEmail', title: 'Public email', type: 'string', validation: (Rule) => Rule.required().email() }),
    defineField({ name: 'contactPhone', title: 'Public phone', type: 'string' }),
    defineField({ name: 'contactAddress', title: 'Office address', type: 'text', rows: 2, description: 'Leave empty if there is no public office.' }),
    defineField({ name: 'contactHours', title: 'Business hours', type: 'text', rows: 2, description: 'Leave empty to hide.' }),
    defineField({
      name: 'social',
      title: 'Social links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'url', title: 'Address', type: 'url', validation: (Rule) => Rule.required().uri({ scheme: ['https'] }) }),
          ],
          preview: { select: { title: 'label', subtitle: 'url' } },
        }),
      ],
    }),
    defineField({
      name: 'homepageFeatured',
      title: 'Homepage featured properties',
      type: 'array',
      description: 'In display order. Properties marked “Feature on the homepage” that are not listed here appear after these.',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'property' }] })],
      validation: (Rule) => Rule.max(8),
    }),
    defineField({ name: 'footerAbout', title: 'Footer introduction', type: 'text', rows: 3 }),
    defineField({ name: 'footerCopyright', title: 'Copyright line', type: 'string' }),
    defineField({
      name: 'sampleDataNotice',
      title: 'Sample-data notice',
      type: 'text',
      rows: 2,
      description: 'Shown in the footer. Clear this field before launch, once only real content remains.',
    }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
});
