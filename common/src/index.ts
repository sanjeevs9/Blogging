import  zod from "zod"

export const signupInput= zod.object({
    email:zod.string().email(),
    password:zod.string().min(5),
    name:zod.string().min(1)
})

export type SignupInput = zod.infer<typeof signupInput>;

export const signinInput = zod.object({
    email:zod.string().email(),
    password:zod.string().min(5)
})

export type SigninInput= zod.infer<typeof signinInput>;

export const createPostInput=zod.object({
    title:zod.string().min(1),
    content:zod.string().min(1)
})

export type CreatePostInput=zod.infer<typeof createPostInput>;

export const updatePostInput=zod.object({
    title:zod.string().optional(),
    content:zod.string().optional()
})

export type UpdatePostInput=zod.infer<typeof updatePostInput>;