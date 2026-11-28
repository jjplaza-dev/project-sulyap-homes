import type { StructureResolver } from 'sanity/structure';

const SINGLETONS = ['siteSettings'];

/** Properties first, then people and places, then the one-off site settings. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('property').title('Properties'),
      S.documentTypeListItem('agent').title('Agents'),
      S.documentTypeListItem('neighborhood').title('Neighborhoods'),
      S.divider(),
      S.listItem()
        .title('Site settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      // Anything added later still appears, except the singleton above.
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return id !== undefined && !['property', 'agent', 'neighborhood', ...SINGLETONS].includes(id);
      }),
    ]);

export const singletonTypes = SINGLETONS;
