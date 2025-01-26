import { type SchemaTypeDefinition } from 'sanity';
import { product } from './product';
import { Category } from './category';
import orders from './orders';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, Category, orders],
};