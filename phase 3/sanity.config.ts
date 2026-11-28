'use client';

/**
 * Sanity Studio configuration, embedded in the Next.js app at /studio (assumption A1).
 * Only the Studio route imports this file; the website never does.
 */
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { dataset, projectId } from './sanity/env';
import { schemaTypes } from './sanity/schemaTypes';
import { singletonTypes, structure } from './sanity/structure';

export default defineConfig({
  name: 'sulyap-homes',
  title: 'Sulyap Homes & Leasing',
  basePath: '/studio',
  // Placeholder keeps the module importable before .env.local is filled in (U-01);
  // the /studio route shows setup instructions instead of the Studio in that case.
  projectId: projectId || 'unconfigured',
  dataset: dataset || 'production',
  schema: {
    types: schemaTypes,
    // Site settings is a one-off document: hide it from "Create new".
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.includes(schemaType)),
  },
  plugins: [structureTool({ structure })],
  document: {
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === 'global' ? prev.filter((item) => !singletonTypes.includes(item.templateId)) : prev,
  },
});
