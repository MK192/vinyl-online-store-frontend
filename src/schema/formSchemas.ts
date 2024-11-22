import { z } from "zod";

//regex
import { phoneRegex, zipRegex } from "regex";

export const editProfileSchema = z.object({
  firstName: z.string().min(1, { message: "no value" }),
  lastName: z.string().min(1, { message: "no value" }),
  birthday: z.string().date(),
});

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "required field" })
    .email("This is not a valid email."),
  password: z.string(),
});

export const registrationFormSchema = z.object({
  firstName: z.string().min(1, { message: "required field" }),
  lastName: z.string().min(1, { message: "required field" }),
  email: z
    .string()
    .min(1, { message: "required field" })
    .email("This is not a valid email."),
  password: z.string().min(4, { message: "password too short" }),
  terms: z.literal<boolean>(true, {
    errorMap: () => ({ message: "not checked" }),
  }),
});

export const changePasswordFormSchema = z.object({
  currentPassword: z.string().min(4, { message: "password too short" }),
  newPassword: z.string().min(4, { message: "password too short" }),
});

export const editAddressFormSchema = z.object({
  apartment: z.string().optional(),
  city: z.string().min(1, { message: "required field" }),
  company: z.string().optional(),
  country: z.string().min(1, { message: "select option" }),
  firstName: z.string().min(1, { message: "required field" }),
  isDefault: z.boolean(),
  lastName: z.string().min(1, { message: "required field" }),
  phone: z
    .union([
      z.string().min(4, { message: "min 4 numbers" }),
      z.string().length(0),
    ])
    .optional()
    .transform((val) => (val === "" ? undefined : val)),

  postalCode: z.string().min(1, { message: "required field" }),
  // state: z.string().min(1, { message: "select option" }),
  state: z.union([
    z.string().min(4, { message: "select option" }),
    z.null().optional(),
  ]),
  streetAddress: z.string().min(1, { message: "required field" }),
});
