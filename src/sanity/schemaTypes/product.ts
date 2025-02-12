import { defineType, defineField } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [
        {
          type: "category",
        },
      ],
    }),
    defineField({
      name: "name",
      title: "Title",
      validation: (rule) => rule.required(),
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      validation: (rule) => rule.required(),
      type: "slug",
    }),
    defineField({
      name: "image",
      type: "image",
      validation: (rule) => rule.required(),
      title: "Product Image",
    }),
    defineField({
      name: "price",
      type: "number",
      validation: (rule) => rule.required(),
      title: "Price",
    }),
    // New discount field
    defineField({
      name: "discount",
      title: "Discount Percentage",
      type: "number",
      description: "Discount percentage on this product (if any)",
      validation: (rule) => rule.min(0).max(100),
    }),
    defineField({
      name: "quantity",
      title: "Quantity",
      type: "number",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "tags",
      type: "array",
      title: "Tags",
      of: [
        {
          type: "string",
        },
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Detailed description of the product",
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
      description: "List of key features of the product",
    }),
    defineField({
      name: "dimensions",
      title: "Dimensions",
      type: "object",
      fields: [
        { name: "height", title: "Height", type: "string" },
        { name: "width", title: "Width", type: "string" },
        { name: "depth", title: "Depth", type: "string" },
      ],
      description: "Dimensions of the product",
    }),
    defineField({
      name: "stock",
      title: "Stock",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "inStock",
      title: "In Stock",
      type: "boolean",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price_id",
      title: "Stripe Price ID",
      type: "string",
    }),
    defineField({
      name: "reviews",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", type: "string" }),
            defineField({ name: "rating", type: "number" }),
            defineField({ name: "comment", type: "string" }),
            defineField({ name: "date", type: "string" }),
          ],
          validation: (rule) => rule.required(),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
      subtitle: "price",
      inStock: "inStock",
      stock: "stock",
    },
    prepare(selection) {
      const { title, subtitle, media, inStock, stock } = selection;
      return {
        title,
        subtitle: `${subtitle} | ${inStock ? `In Stock (${stock})` : "Out of Stock"}`,
        media,
      };
    },
  },
});
