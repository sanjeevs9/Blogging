import { useState } from "react"
import icon from "../icons/blogger.svg"
import Popup from "./Popup";
import { createAvatar } from '@dicebear/core';
import { bottts } from '@dicebear/collection';
import { useNavigate,Link,useLocation } from "react-router-dom";



const seed = Math.random().toString();
const avatar = createAvatar(bottts, {
    seed:seed
});

const svg = avatar.toString();
export default function Header() {
    const navigate =useNavigate();
    const location = useLocation();
    const [pop, setpop] = useState(false);

    function onClick() {
        setpop(!pop);
    }
    return (
        <>
            <div>
                <div className="flex    pl-8 pr-8  flex-row w-full ">
                    <div className="flex  w-1/2 p-3 items-center gap-4" >
                        {/* <div className="flex flex-col justify-center text-xl font-extrabold">
                        BLOG
                       </div> */}
                        <div className="w-10 h-10  flex flex-col justify-center cursor-pointer">
                            <img src={icon} alt="Blogger Icon" onClick={()=>{navigate('/blogs')}}/>
                        </div>
                    </div>
                    <div className="flex  w-1/2 gap-8 justify-end p-3 items-center" >

                        <Link to={`${location.pathname}/write`} className="flex  gap-1 hover:inset-2 cursor-pointer hover:scale-110 motion-reduce:transform-none">

                            <div className="h-8 w-8 flex-row  ">
                                <svg className="flex" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>

                            </div>
                            <div className="flex pt-1 ">
                                Write
                            </div>

                        </Link>


                        <div
                            className="h-8 w-8 rounded-full bg-red-200 flex justify-center items-center pl-[0.25px] hover:inset-2 cursor-pointer hover:scale-110 motion-reduce:transform-none"
                            onClick={onClick}
                        >
                            <div
                                className="h-7 w-7"
                                dangerouslySetInnerHTML={{ __html: svg }}
                            />
                        </div>
                        {pop == true ? <Popup email="sanjeev.19@gail.com" /> : null}

                    </div>
                </div>

            </div>
        </>
    )
}