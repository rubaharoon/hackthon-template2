import type { Rule } from 'sanity';

interface ReviewField {
  name: string;
  type: string;
  title: string;
  description: string;
  to?: { type: string }[];
  validation?: (Rule: Rule) => Rule;
  initialValue?: string;
}

interface ReviewSchema {
  name: string;
  type: string;
  title: string;
  fields: ReviewField[];
}

const reviewSchema: ReviewSchema = {
  name: 'review',
  type: 'document',
  title: 'Review',
  fields: [
    {
      name: 'productId',
      type: 'reference',
      to: [{ type: 'product' }],
      title: 'Product',
      description: 'The product this review is for',
    },
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      description: 'Name of the reviewer',
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Rating',
      description: 'Rating from 1 to 5',
      validation: (Rule) => Rule.min(1).max(5),
    },
    {
      name: 'comment',
      type: 'text',
      title: 'Comment',
      description: 'Review comment',
    },
    {
      name: 'date',
      type: 'datetime',
      title: 'Date',
      description: 'Date of the review',
      initialValue: new Date().toISOString(),
    },
  ],
};

export default reviewSchema;