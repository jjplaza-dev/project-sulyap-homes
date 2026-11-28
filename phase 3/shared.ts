import { defineArrayMember, defineField } from 'sanity';

const COORDINATE_HELP =
  'Type this by hand. Place the point deliberately about 150–300 m away from the real location, so a public map never pinpoints the home. ' +
  'Never copy the coordinates of the address and never use an address-to-coordinates (geocoding) tool for this field.';

/** Approximate map latitude: manual entry, validated to the Philippine range. */
export const latitudeField = (group?: string) =>
  defineField({
    name: 'publicMapLat',
    title: 'Public map latitude (approximate)',
    type: 'number',
    group,
    description: `${COORDINATE_HELP} Example: 16.4118`,
    validation: (Rule) =>
      Rule.required().min(4).max(21).error('Enter a latitude between 4 and 21, as a number such as 16.4118.'),
  });

/** Approximate map longitude: manual entry, validated to the Philippine range. */
export const longitudeField = (group?: string) =>
  defineField({
    name: 'publicMapLng',
    title: 'Public map longitude (approximate)',
    type: 'number',
    group,
    description: `${COORDINATE_HELP} Example: 120.6045`,
    validation: (Rule) =>
      Rule.required().min(116).max(127).error('Enter a longitude between 116 and 127, as a number such as 120.6045.'),
  });

/** Image with hotspot, required alt text and an optional caption. */
export const photoMember = defineArrayMember({
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      description: 'Describe what the photo shows, for people using screen readers. Required.',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
  ],
});
