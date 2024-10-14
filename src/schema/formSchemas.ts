import { z } from "zod";

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
