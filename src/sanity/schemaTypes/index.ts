import { type SchemaTypeDefinition } from 'sanity';
import { product } from './product';
import { Category } from './category';
import orders from './orders';
import reviewSchema from './review';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, Category, reviewSchema, orders],
};