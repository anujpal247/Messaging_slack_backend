import { z } from "zod"

export const createUserSchema = z.object({
  username: z.string().min(3).max(16, "Username must be 3-16 characters long"),
  email: z.string().email("Please add a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  avatar: z.string().optional()
})


export const updateUserSchema = z.object({
  username: z.string().min(3).max(16, "Username must be 3-16 characters long").optional(),
  email: z.string().email().optional(),
  password: z.string().min(6, "Password must be at least 6 characters long").optional(),
  avatar: z.string().optional()
})

export const loginUserSchema = z.object({
  email: z.string().email("Please add a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})

export type CreateUserDTO = z.infer<typeof createUserSchema>
export type UpdateUserDTO = z.infer<typeof updateUserSchema>
export type LoginUserDTO = z.infer<typeof loginUserSchema>