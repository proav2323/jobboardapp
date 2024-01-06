import * as z from "zod";
export const AddJobSchema = z.object({
  title: z.string().min(1, {
    message: "title is required",
  }),
  description: z.string().min(1, {
    message: "add one key point to description",
  }),
  requirements: z.string().min(1, {
    message: "add one key point to requirements",
  }),
  deadline: z.date(),
  descriptionText: z.string().optional(),
  requirementText: z.string().optional(),
});
