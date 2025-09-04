import { useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";

export default function Login(){

    // const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <AuthLayout>
        <div className="lg:w-[70%]  h-3/4 md:h-full flex flex-col justify-center" >
            <h3 
                className=" text-xl font-semibold text-black"
            >
                Welcome Back
            </h3>
            <p className=" text-xs text-slate-700 mt-1.5 mb-6" > Please Enter Your details to log in </p>

            {/* <form onSubmit={handleSubmit} >
                
            </form> */}
        </div>
        </AuthLayout>
    )
}