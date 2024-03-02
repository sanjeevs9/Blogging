import axios from "axios";
import { useEffect, useState } from "react"
import { network } from "../configure";

interface Blog{
    id:string,
    title:string,
    content:string,
    authorId: string,
    author: {
        name: string
    }
}

export const useBlogs=()=>{
    const[loading,setloading]=useState(true);
    const[blogs,setblogs]=useState<Blog[]>([])
    const token =localStorage.getItem("token")

    useEffect(()=>{
        axios.get(`${network}/api/v1/blog/bulk`,{
            headers:{
                Authorization :`Bearer ${token}`
            }
        }
        )
        .then(res=>{
      
            setblogs(res.data.blogs)
            setloading(false)
        })
        .catch((e)=>{
            console.log(e.response)
        })
    },[])
    return{
        loading,
        blogs
    }
}