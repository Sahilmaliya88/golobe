import { z } from "zod";

export const loginSchema = z.object({
    email:z.string().email({message:'please enter valid email'}),
    password:z.string().min(6,{message:'please enter minimum 6 characters'})
})
