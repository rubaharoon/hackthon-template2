import { defineType, defineField } from "sanity";

export const coupon = defineType({
  name: "coupon",
  title: "Coupon Code",
  type: "document",
  fields: [
    defineField({
      name: "code",
      title: "Coupon Code",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
   
    defineField({
      name: "expirationDate",
      title: "Expiration Date",
      type: "datetime",
    }),
    defineField({
      name: "minimumPurchase",
      title: "Minimum Purchase Amount",
      type: "number",
    }),
    defineField({
      name: "applicableProducts",
      title: "Applicable Products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
  ],
});
