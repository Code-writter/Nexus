import { useContext, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { UserContext } from "../../context/UserContext";
import useUserAuth from "../../hook/useUserAuth";
import { POLL_TYPES } from "../../utils/data";
import OptionList from "../../components/layout/OptionInput";

export default function CreatedPolls(){
    useUserAuth()
    const {user} = useContext(UserContext)

    const [pollData, setPollData] = useState({
        question : "",
        type : "",
        options : [],

        error : ""
    })

    const handleValueChange = (key, value) => {
        setPollData((prev) => ({
            ...prev,
            [key] : value
        }))
    }

    return(
        <DashboardLayout activeMenu="Create Poll" >
            <div className=" bg-gray-100/80  my-5 p-5 rounded-lg mx-auto  " >
                <h2 className=" text-lg text-black font-medium " >
                    Create Poll
                </h2>

                <div className=" mt-3" >
                    <label className=" text-xs font-medium text-slate-600 " >QUESTION</label>

                    <textarea 
                        placeholder="Let's get other's opinions"
                        className=" w-full text-[13px] text-black outline-none bg-slate-200/80 p-2 rounded-md mt-2 "
                        rows={4}
                        value={pollData.question}
                        onChange={({target}) => handleValueChange("question", target.value)}
                    />
                </div>

                <div className=" mt-3">
                    <label className=" text-xs font-medium text-slate-600 " >POLL TYPE</label>

                    <div className=" flex gap-4 flex-wrap mt-3 " >
                        {
                            POLL_TYPES.map((item) => (
                                <div
                                    key={item.value}
                                    className={`option-chip hover:border-blue-300 ${
                                        pollData.type === item.value
                                        ? "text-white bg-blue-400 border-blue-500"
                                        : " border-sky-50"
                                    }`}

                                    onClick={() => {
                                        handleValueChange("type", item.value)
                                    }}
                                >
                                    {item.label}
                                </div>
                            ))
                        }
                    </div>
                </div>

                {
                    pollData.type === "single-choice" && (
                        <div className=" mt-5" >
                            <label className=" text-xs font-medium text-slate-600 " >Single Choice</label>

                            <div className=" mt-3 " >
                                <OptionList 
                                    optionList={pollData.options}
                                    setOptionList={(value) => {
                                        handleValueChange("options", value)
                                    }}
                                />
                            </div>
                        </div>
                    )
                }

            </div>
        </DashboardLayout>
    )
}