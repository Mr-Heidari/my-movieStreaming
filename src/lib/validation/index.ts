import { z } from "zod";

export const SinginValidation = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be atleast 8 characters ." }),
  });
  
  export const SingupValidation = z.object({
    name: z.string().min(2, { message: "Too Short" }),
    username: z.string().min(2, { message: "Too Short" }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be atleast 8 characters ." }),
  });