import { z } from "zod";
import { createSuccessResponseSchemaFor } from "./api";

export const User = z.object({
  id: z.string(),
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
  name: z.string().min(2).max(40),
  username: z.string().min(3).max(40),
  email: z.string().email(),
  city: z.string().min(2).max(40),
});

export type UserInput = z.infer<typeof UserInput>;

export const UserResponse = createSuccessResponseSchemaFor(User);

export type UserResponse = z.infer<typeof UserResponse>;

export const SortBy = z.union([z.literal("id"), z.literal("username")]);

export type SortBy = z.infer<typeof SortBy>;
