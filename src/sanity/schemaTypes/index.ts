import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import { Category } from './category'
import { user } from './user'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product,Category,user],
}
