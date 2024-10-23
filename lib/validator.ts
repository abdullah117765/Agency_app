import * as z from "zod";
export const getQuoteSchema = z.object({
  firstName: z.string().min(1, "Please enter your first name"),
  lastName: z.string().min(1, "Please enter your last name"),
  email: z
    .string()
    .email("Please enter a valid email")
    .min(1, "Please enter email"),
  phone: z
    .string()
    .regex(/^\+?\d+$/, { message: "Please enter a valid phone number" })
    .min(11, "Please enter complete phone number"),
  services: z.string().min(1, "Please specify a service"), // Changed from enum to string
  NoOfServices: z
    .number()
    .min(1, { message: "Please enter a valid number for No Of Services" }),
  comments: z.string().min(1, "Please add comments"),
});
export const getTouchSchema = z.object({
  fullName: z.string().min(1, "Please enter your full name"),
  email: z
    .string()
    .email("Please enter a valid email")
    .min(1, "Please enter email"),
  phone: z
    .string()
    .regex(/^\+?\d+$/, { message: "Please enter a valid phone number" })
    .min(11, "Please enter complete phone Number"),
  message: z.string().min(1, "Please Add Comments"),
});
