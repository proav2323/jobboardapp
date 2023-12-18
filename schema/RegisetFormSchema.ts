"use client";

import { UserRole } from "@prisma/client";
import * as z from "zod";

export const RegisterFormSchema = z.object({
  email: z.string().email({
    message: "invalid email",
  }),
  password: z.string().min(8, {
    message: "password should be more 8 characters",
  }),
  role: z.nativeEnum(UserRole),
  Name: z.string().min(2, {
    message: "Name is required",
  }),
  resume: z.string().optional(),
  companyName: z.string().optional(),
  companyDescription: z.string().optional(),
  companyIndustry: z.string().optional(),
  companyId: z.string().optional(),
});
