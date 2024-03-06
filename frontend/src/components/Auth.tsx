import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "sanjeev100x";
import axios from "axios"
import { network } from "../configure";

export default function Auth(props: { type: "signup" | "signin" }) {
    const type = props.type;
    const navigate=useNavigate();
    const[value,setValue]=useState<SignupInput>({
        name:"",
        email:"",
        password:""
})


   async function request(){
        
        try{
            await    axios.post(`${network}/api/v1/user/${type==="signup"?"signup":"signin"}`,
            value
        ).then(res=>{
            console.log(res.data)
            localStorage.setItem("token",res.data.token);
            navigate('/blogs') 
        })
        }catch(e:any){
            console.log(e)
            alert(e.response.data.error)

        }
        
    }

    return (
        <div className="h-screen  flex flex-col justify-center gap-6 items-center">
           
            <div className="flex gap-2 flex-col  items-center ">
                <div className="font-extrabold text-4xl">
                    {type === "signup" ? "Create an account" : "Login To your Account"}
                </div>
                <div className=" text-center text-gray-500">
                    {type === "signup"
                        ? "Already have an acount?"
                        : "Dont have an account?"}
                        <span className="pl-2">
                    <Link
                        to={type === "signup" ? "/signin" : "/signup"}
                        className="underline"
                    >
                        {type === "signup" ? "Login" : "Signup"}
                    </Link>
                    </span>
                </div>
            </div>
            <div className="justify-center  w-2/3 flex-col gap-3">
                {type==="signup"?
                <Inputs
                placeholder="Enter your username"
                onchange={(e) => {
                    setValue((c) => ({
                        ...c,
                        name: e.target.value,
                    }));
                }}
                label="Username"
            ></Inputs>:null}
                
                <Inputs
                    placeholder="sanjeev@example.com"
                    onchange={(e) => {
                        setValue((c) => ({
                            ...c,
                            email: e.target.value,
                        }));
                    }}
                    label="Email"
                ></Inputs>
                <Inputs
                    placeholder="***"
                    onchange={(e) => {
                        setValue((c) => ({
                            ...c,
                            password: e.target.value,
                        }));
                    }}
                    label="Password"
                    type="password"
                ></Inputs>
            </div>
            <div className="flex w-2/3 items-center">
                <button onClick={request}
                    type="button"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                >
                    {type==="signup"?"Sign Up" :"Sign In"}
                </button>
            </div>
        </div>
    );
}
interface label {
    placeholder: string;
    onchange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    label: string;
}

function Inputs({ placeholder, onchange, type, label }: label) {
    return (
        <div>
            <label className="block mb-2 text-sm  pt-4 font-bold">{label}</label>
            <input
                onChange={onchange}
                type={type || "text"}
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder={placeholder}
                required
            />
        </div>
    );
}
