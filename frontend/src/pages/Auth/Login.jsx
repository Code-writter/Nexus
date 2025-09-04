import { useState, useContext } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import AuthInput from "../../components/layout/AuthInput";
import { Link, useNavigate } from "react-router-dom"
import validateEmail from "../../../utils/validateEmail";
import axios from "axios";
import axiosInstance from "../../api/axios";
import { API_PATHS } from "../../api/urls";
import {UserContext} from "../../context/UserContext"


export default function Login(){
    const navigate = useNavigate()

    const {updateUser} = useContext(UserContext)

    // const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {

        e.preventDefault();
        if(!validateEmail(email)){
            setError("Invalid credentials")
            return;
        }

        if(!password){
            setError("Invalid credentials")
            return;
        }

        setError("")
        // Handle API calling
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password
            })

            const {token, user} = response.data

            if(token){
                localStorage.setItem("token", token);
                updateUser(user)
                navigate("/dashboard")
            }
        } catch (error) {
            if(error.response && error.response.data){
                setError(error.response.data.message)
            }else{
                setError("Something went wrong")
            }
        }
    }


    return (
        <AuthLayout>
        <div className="lg:w-[70%]  h-3/4 md:h-full flex flex-col justify-center" >
            <h3 
                className=" text-xl font-semibold text-black"
            >
                Welcome Back
            </h3>
            <p className=" text-xs text-slate-700 mt-1.5 mb-6" > Please Enter Your details to log in </p>

            <form onSubmit={handleSubmit} >
                <AuthInput
                    value={email}
                    onChange={({target}) => setEmail(target.value)}
                    label={"Email"}
                    placeholder={"user@example.com"}
                    type={"text"}
                />
                <AuthInput
                    value={password}
                    onChange={({target}) => setPassword(target.value)}
                    label={"Password"}
                    placeholder={"Enter password"}
                    type={"password"}
                />
                {
                    error && <p className=" text-red-400 text-xs pb-1.5 " > {error} </p>
                }

                <button type="submit" className="btn-primary" >
                    Login
                </button>

                <p className=" text-[13px] text-slate-800 mt-3 " >
                    Don't have an account{" "}
                    <Link className="font-medium text-blue-400 underline"  to={"/sign-up"} >
                        Register
                    </Link>
                </p>
            </form>
        </div>
        </AuthLayout>
    )
}