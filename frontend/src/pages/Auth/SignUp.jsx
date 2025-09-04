import { useState, useContext } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import AuthInput from "../../components/layout/AuthInput";
import { Link } from "react-router-dom"
import validateEmail from "../../utils/validateEmail";
import { UserContext } from "../../context/UserContext";
import axiosInstance from "../../api/axios";
import { API_PATHS } from "../../api/urls";
import { useNavigate } from "react-router-dom";



export default function SignUp(){
    const {updateUser} = useContext(UserContext)
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {

        e.preventDefault();

        if(!name){
            setError("All fields are required")
            return;
        }

        if(!validateEmail(email)){
            setError("All fields are required")
            return;
        }

        if(!password){
            setError("All fields are required")
            return;
        }
        console.log({name, email, password})
        setError("")
        // Handle API calling
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                name,
                email,
                password,
            })

            const {token, user} = response.data;
            console.log({token,user})
            if(token){
                localStorage.setItem("token", token);
                updateUser(user);
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
                Welcome
            </h3>
            <p className=" text-xs text-slate-700 mt-1.5 mb-6" > Please Enter Your details to register in </p>

            <form onSubmit={handleSubmit} >
                <AuthInput
                    value={name}
                    onChange={({target}) => setName(target.value)}
                    label={"Name"}
                    placeholder={"Enter full name"}
                    type={"text"}
                />
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
                    Register
                </button>

                <p className=" text-[13px] text-slate-800 mt-3 " >
                    Have an account{" "}
                    <Link className="font-medium text-blue-400 underline"  to={"/login"} >
                        Login
                    </Link>
                </p>
            </form>
        </div>
        </AuthLayout>
    )
}