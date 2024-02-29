import { Hono } from 'hono'
import { sign } from "hono/jwt"
import { connect } from 'mongoose'

export const blogRouter=new Hono<{
    
}>()

//create post
blogRouter.post('',async (c:any)=>{

    const id=c.get("userId")
    const body=await c.req.json()
    try{
      const blog=await c.prisma.post.create({
        data:{
          authorId:id,
          title:body.title,
          content:body.content
        }
      })
     return c.json({
        message:"Your blog is added",
        id:blog.id
      })
  
    }catch{
        c.status(403)
        return c.json({
          "message":"something went wrong"
        })
    }
  
  //update
  }).put(async(c:any)=>{
    const id=c.get("userId")
    const body=await c.req.json();
    console.log(id)
    console.log(body)
    try{
      const update=await c.prisma.post.update({
        where:{
          authorId:id,
          id:body.id
        },
        data:{
          title:body.title,
          content:body.content
        }
      })
      return c.json({
        "message":"your blog is updated"
      })

    }catch(e){
      c.status(403)
      console.log(e)
      return c.json({
        "message":"something went wrong"
      })
    }
  })

    //get all blogs
    blogRouter.get('/bulk',async(c:any)=>{
      console.log("hello")
      const blogs=await c.prisma.post.findMany({})
      console.log(blogs)
      return c.json({blogs})
    })
    
  
  //get single post
  blogRouter.get('/:id' , async(c:any)=>{
    const id=c.req.param("id")
    console.log(id)
    console.log("noooooo")
    const blog=await c.prisma.post.findUnique({
      where:{
        id
      }
    })
    return c.json({
      blog
    })
  })
  
