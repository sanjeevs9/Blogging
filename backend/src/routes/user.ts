import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { sign } from "hono/jwt"
import {signupInput,signinInput} from "sanjeev100x"


export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,

    }
}>()

//signup
userRouter.post('/signup', async (c: any) => {

    const body = await c.req.json();
    console.log(body)
    const result = signupInput.safeParse(body);
    if(!result.success){
        c.status(401);
		return c.json({ error: "Invlaid Inputs" });
    }

    try {
        const user = await c.prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name
            }
        })
        console.log(user)

        const token = await sign({ id: user.id }, c.env.JWT_SECRET)
        return c.json({
            token: token
        })
    } catch (e) {
        console.log(e)
        c.status(403);
        return c.json({
            error: "error while signing up"
        })
    }


})

//signin
userRouter.post('/signin', async (c: any) => {
    const body = await c.req.json();

    const {success} =signinInput.safeParse(body)
    if(!success){
        c.status(401)
        return c.json({
            error:"Invalid Inputs"
        })
    }

    const user = await c.prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password
        }
    })

    if (!user) {
        c.status(403);
        return c.json({
            error: "user not found"
        })
    }
    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({
        token: token
    })
})