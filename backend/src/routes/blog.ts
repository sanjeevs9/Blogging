import { Hono } from 'hono'
import { sign } from "hono/jwt"
import { connect } from 'mongoose'
import {createPostInput,updatePostInput} from "sanjeev100x"

export const blogRouter=new Hono<{
    
}>()

//create post
blogRouter.post('',async (c:any)=>{

    const id=c.get("userId")
    const body=await c.req.json()

console.log(body)
console.log(id)
    const {success} =createPostInput.safeParse(body)
    if(!success){
      return  c.json({
        "message":"Give valid inputs"
      })
    }
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
    const {success} =updatePostInput.safeParse(body);
    if(!success){
      c.json({
        "messgae":"please give valid inputs"
      })
    }

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
      const blogs=await c.prisma.post.findMany({
        include:{
          author:{
            select:{
              name:true
            }
          }
        }
      })
      console.log(blogs)
      return c.json({blogs})
    })
    
  
  //get single post
  blogRouter.get('/id/:id' , async(c:any)=>{
    try {
      let id=c.req.param("id")
      console.log(id);
      console.log('Before query');
      
      const blog = await c.prisma.post.findUnique({
        where: {
            id: "569c9aed-6967-4276-93c8-679c3957e209"
        },
        include: {
          author: {
              select: {
                  name: true
              }
          }
      }
    });
      console.log('After query');
      return c.json({
        blog
      });
    } catch (error) {
      console.log(error);
      c.res.status(500).json({
        message: 'An error occurred'
      });
    }
  });
  
