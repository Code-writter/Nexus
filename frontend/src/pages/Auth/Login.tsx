import { useContext, useState } from "react"
import { AppContent } from "../../context/AppContex";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login(){
    // @ts-ignore
    const {backendUrl, setIsLoggedIn, getUserData } = useContext(AppContent)

    const navigate = useNavigate()
    const [state, setState] = useState("register")
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onSubmitHandler = async (e : React.FormEvent) => {
        try {
            e.preventDefault()

            if(
                state === "register"
            ){
                axios.defaults.withCredentials = true
                const { data } = await axios.post(`${backendUrl}/api/v1/user/register`, {
                    email,
                    password,
                    fullName
                })

                console.log(data)

                if(data.success){
                    setIsLoggedIn(true)
                    getUserData()
                    navigate("/dashboard")
                }else{
                    // TODO : Add toast
                }

            }else{
                axios.defaults.withCredentials = true
                const { data } = await axios.post(`${backendUrl}/api/v1/user/login`, {
                    email,
                    password
                })

                if(data.success){
                    setIsLoggedIn(true)
                    getUserData()
                    navigate("/dashboard")
                }else{
                    // TODO : Add toast
                }
            }
        } catch (error) {
            console.log(error)
        }
    }


    return(
        <div className=" flex items-center justify-center min-h-screen px-6 sm:px-0 bg-blue-300" >
            <img src="" alt="" 
                className=" absolute left-5 top-5 w-28 cursor-pointer "
            />
            <div className=" w-full max-w-md" >
                <h2 className=" text-2xl font-bold mb-6" >
                    {state === "login" ? "Login to the app" : "Create new Account"}
                </h2>
            </div>

            <form onSubmit={onSubmitHandler} action="">
                {
                    state === "register" && (
                        <div className=" mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-2xl border border-gray-300" >
                        {/* <img src="" alt="logo" /> */}
                            <input 
                            onChange={e => setFullName(e.target.value)} 
                            value={fullName} 
                            className=" bg-transparent outline-none" 
                            type="text" 
                            placeholder="Name" />
                        
                        </div>
                    )
                }
                <div className=" mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-2xl border border-gray-300" >
                    {/* <img src="" alt="logo" /> */}
                    <input 
                    onChange={e => setEmail(e.target.value)} 
                    value={email} 
                    className=" bg-transparent outline-none" type="email" placeholder="email" />
                    
                </div>
                <div className=" mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-2xl border border-gray-300" >
                    {/* <img src="" alt="logo" /> */}
                    <input 
                        onChange={e => setPassword(e.target.value)} 
                        value={password} 
                    className=" bg-transparent outline-none" type="password" placeholder="Password" />
                    
                </div>
                <button className=" w-full px-5 py-2.5 rounded-2xl bg-blue-500 text-white" type="submit">
                    {state === "login" ? "Login" : "Create Account"}
                </button>
                <br />

                {
                    state === "login" ? (
                        <p>
                            Don't have an account? <span className=" cursor-pointer" onClick={() => setState("register")}>Register</span>
                        </p>

                    ) : (
                        <p>
                            already have an account? <span className=" cursor-pointer" onClick={() => setState("login")}>Login</span>
                        </p>
                    )
                }
            </form>
        </div>
    )
}