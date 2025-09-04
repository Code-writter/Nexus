import { useState } from "react"
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa6"

export default function AuthInput({
    value,
    onChange,
    label,
    placeholder,
    type
}){

    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordView = () => {
        setShowPassword(!showPassword)
    }

    return(
        <div>
            <label className=" text-[13px] text-slate-800" > {label} </label>
                <div className=" input-box" >
                    <input 
                    type={
                        type == "password" ? (showPassword ? "text" : "password") : "text"
                    }
                        placeholder={placeholder}
                        className=" bg-transparent w-full outline-none"
                        onChange={(e) => onChange(e)}
                        value={value}
                    />

                    {
                        type === "password" && <>
                                {
                                    showPassword ? (
                                        <FaRegEye 
                                            size={20}
                                            className=" text-blue-400 cursor-pointer " 
                                            onClick={() => togglePasswordView()}
                                        />

                                    ) : (
                                        <FaRegEyeSlash
                                            size={20}
                                            className="text-blue-400 cursor-pointer " 
                                            onClick={() => togglePasswordView()}
                                        />
                                    )
                                }
                        </>
                    }

                </div>

        </div>
    )
}