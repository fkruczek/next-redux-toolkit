import { z } from "zod";
import { createSuccessResponseSchemaFor } from "./api";

export const User = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  city: z.string(),
});

export type User = z.infer<typeof User>;

export const UserArray = z.array(User);

export type UserArray = z.infer<typeof UserArray>;

export const UserInput = z.object({
  id: z.string().optional(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  city: z.string(),
});

export type UserInput = z.infer<typeof UserInput>;

export const UserResponse = createSuccessResponseSchemaFor(User);

export type UserResponse = z.infer<typeof UserResponse>;
