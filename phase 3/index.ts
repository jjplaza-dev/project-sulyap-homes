import type { SchemaTypeDefinition } from 'sanity';
import { agent } from './agent';
import { neighborhood } from './neighborhood';
import { property } from './property';
import { siteSettings } from './siteSettings';

export const schemaTypes: SchemaTypeDefinition[] = [property, agent, neighborhood, siteSettings];
