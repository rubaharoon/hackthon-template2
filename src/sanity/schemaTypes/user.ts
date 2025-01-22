import { defineType, defineField } from "sanity";

export const user = defineType({
  name: "user",
  title: "User",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "ID",
      type: "string",
      readOnly: true,
      validation: (rule) => rule.required(),
      description: "Unique identifier for the user",}),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required(),
      description: "Email of the user",
    }),
    defineField({
      name: "firstname",
      title: "First Name",
      type: "string",
      validation: (rule) => rule.required(),
      description: "First name of the user",
    }),
    defineField({
      name: "LastName",
      title: "Last Name",
      type: "string",
      validation: (rule) => rule.required(),
      description: "Last name of the user",
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      description: "Profile image of the user",
    }),
   
  ],
});