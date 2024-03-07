import axios from "axios";
import { useEffect, useState } from "react"
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { network } from "../configure";
import Header from "./Header";
import { configDotenv } from "dotenv";

interface blog {
    author: {
        name:string
    },
    published: string,
    title: string,
    content: string,
    avatar: string,
    id: string
  }

export default function SingleBlog(){
    const token=localStorage.getItem("token")
    const location = useLocation();
    const [data, setData] = useState<blog>({
        author: {
            name:""
        },
        published: "",
        title: "",
        content: "",
        avatar: "",
        id: ""
    });
    const {id}=useParams();


    useEffect(()=>{
        axios.get(`${network}/api/v1/blog/id/${id}`,
       {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then(res=>{
            console.log(res.data.blog)
            setData(prevData => ({ ...prevData, ...res.data.blog }));
            
        }).catch(error=>{
            console.log(error)
        })
    },[])
    useEffect(()=>{
        console.log(data)
    },[data])
    return(
        <>
        <Header/>
        <div className="max-h-min max-w-full flex flex-col pl-40 pr-40">
            <div className="pl-20 pr-20 flex bg-red-100 flex-col">

            
            <div className="font-bold text-3xl flex justify-center    ">

                {data.title}<span className="font-thin text-sm">{data.author.name}</span> 
                
            </div>
            <div className="sm:pl-5 sm:pr-5 md:pl-20 md:pr-20 flex whitespace-normal overflow-wrap break-words " >
                <div className="w-full">

                {data.content.split('\n\n').map((paragraph, index) => (
        <p key={index}>
            {paragraph.split('\n').map((line, lineIndex) => (
                <span key={lineIndex}>
                    {line}
                    <br />
                </span>
            ))}
        </p>
    ))}
                </div>
    
</div>
            </div>

           
            
        </div>
        </>
    )
}