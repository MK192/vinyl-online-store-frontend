import { z } from "zod";

export const editProfileSchema = z.object({
  firstName: z.string().min(1, { message: "no value" }),
  lastName: z.string().min(1, { message: "no value" }),
  birthday: z.string().date(),
});
