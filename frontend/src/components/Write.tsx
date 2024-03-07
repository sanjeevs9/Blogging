import JoditEditor from 'jodit-react';
import Header from './Header';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { network } from '../configure';
import { CreatePostInput, createPostInput } from 'sanjeev100x';
import { useNavigate } from 'react-router-dom';


export default function Write(){
    const[value,setvalue]=useState<CreatePostInput>({
        title:"",
        content:""
    })
    const token =localStorage.getItem("token");
    const editor =useRef(null)
    const navigate=useNavigate();

    useEffect(()=>{
        console.log(value.title)
        console.log(value.content);
    },[value.title,value.content])

    async function handle(){
         axios.post(`${network}/api/v1/blog`,
         {
                title:value.title,
                content:value.content
         },{
            headers:{
                Authorization:`Bearer ${token}`
            }
         }
         ).then(res=>{
            console.log(res.data)
            alert(res.data.message);
            navigate("/blogs")

         }).catch(error=>{
            console.log(error)
         })
    }
    return(
        <>
      
    <div className='flex flex-col h-screen'>
        <div className=''>
        <Header/>
        </div>
        <div className='pl-20 pr-20 bg-red-100 h-full pt-5 '>
    
    
        <div className='flex flex-col justify-center '>
                <div className=''>
                <input className='flex p-3 border-2 w-full' placeholder='Title' onChange={(e)=>{
                    setvalue((c=>({...c,title:e.target.value})))}}></input>
                </div>
        </div>
        <div className=''>

        <JoditEditor className=''
    ref={editor}
    value={""}
    onChange={newContent => {
        console.log(newContent)

        // Replace <br> and </p> with newline characters
        let contentWithLineBreaks = newContent.replace(/<br\s*\/?>/g, "\n").replace(/<\/p>/g, "\n");
        // Remove all other HTML tags
        let contentWithoutTags = contentWithLineBreaks.replace(/<[^>]*>/g, "");

        setvalue(prevValue => ({...prevValue, content: contentWithoutTags}));
    }}
/>
                </div>
                <div className=' flex justify-center '>
                <button type="button" className="w-1/3 flex py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 items-center justify-center " onClick={handle}>Publish</button>
                </div>
        </div>
        </div>
        </>
    )
}