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
    .min(11, "Please enter complete phone Number"),
  services: z.enum(["Service_Type_1", "Service_Type_2", "Service_Type_3"], {
    required_error: "Please select at least one service",
  }),
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
