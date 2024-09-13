import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "required field" })
    .email("This is not a valid email."),
  password: z.string().min(4, { message: "password too short" }),
});
