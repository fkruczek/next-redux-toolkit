import { z } from "zod";

export const AppErrorResponse = z.object({
  error: z.object({
    data: z.object({
      message: z.string(),
    }),
    status: z.number().min(400).max(599),
  }),
});

export type AppErrorResponse = z.infer<typeof AppErrorResponse>;

export function createSuccessResponseSchemaFor<DataType extends z.ZodTypeAny>(
  data: DataType
) {
  return z.object({
    data,
  });
}
