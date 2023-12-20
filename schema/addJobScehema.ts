import * as z from "zod";
export const AddJobSchema = z.object({
  title: z.string().min(1, {
    message: "title is required",
  }),
  description: z.string().min(1, {
    message: "description is required",
  }),
  requirements: z.string().min(1, {
    message: "requirements is required",
  }),
  deadline: z.date(),
});
