"use client";

import * as z from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email({
    message: "invalid email",
  }),
  password: z.string().min(8, {
    message: "password should be more 8 characters",
  }),
});
