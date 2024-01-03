"use client";

import { UserRole } from "@prisma/client";
import * as z from "zod";

export const upadtePrfoileSchema = z.object({
  Name: z.string().min(2, {
    message: "Name is required",
  }),
  resume: z.string().optional(),
  companyName: z.string().optional(),
  companyDescription: z.string().optional(),
  companyIndustry: z.string().optional(),
});
