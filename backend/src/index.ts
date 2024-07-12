import { Context, Hono, Next } from "hono";
import { json } from "react-router-dom";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { jwt, sign, verify, decode } from "hono/jwt";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();
app.use("/*",cors());

//connection
app.use("*", async (c: any, next: Next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  console.log(c.env.DATABASE_URL)

  c.prisma = prisma;

  await next();
});


//middleware
app.use("/api/v1/blog/*", async (c:any, next:Next) => {
  const res = c.req.header("Authorization");
console.log(res+"resss")
  if (!res?.startsWith("Bearer")) {
    c.status(403);
    return c.json({
      message: "You are not Signned",
    });
  }
  const token = res.split(" ")[1];

  const decode = await verify(token, c.env.JWT_SECRET);
  if (!decode) {
    c.status(403);
    return c.json({
      message: "wrong token! Please signin",
    });
  }
  c.set("userId", decode.id);
  
  await next();
});


app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);




export default app;
