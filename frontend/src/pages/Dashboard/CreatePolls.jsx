import { useContext, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { UserContext } from "../../context/UserContext";
import useUserAuth from "../../hook/useUserAuth";
import { POLL_TYPES } from "../../utils/data";
import OptionList from "../../components/layout/OptionInput";
import axiosInstance from "../../api/axios";
import { API_PATHS } from "../../api/urls";
import toast from "react-hot-toast";

export default function CreatedPolls() {
    useUserAuth()
    const { user } = useContext(UserContext)

    const [pollData, setPollData] = useState({
        question: "",
        type: "",
        options: [],
        error: ""
    })

    const handleValueChange = (key, value) => {
        setPollData((prev) => ({
            ...prev,
            [key]: value
        }))
    }

    const clearData = () => {
        setPollData({
            question: "",
            type: "",
            options: [],
            error: ""
        })
    }

    // FIX #1: This function was switching on `pollData.options` (an array)
    // instead of `pollData.type` (a string). This caused it to always
    // fall to the `default` case and return an empty array `[]`.
    const getOptions = () => { // It is now synchronous (no 'async' needed)
        switch (pollData.type) { // Now correctly switches on the poll type
            case "single-choice":
                return pollData.options
            default:
                return []
        }
    }

    const handleCreatePoll = async () => {
        const { question, options, type } = pollData

        // FIX #2: Changed from `&&` to `||`. The error should show if EITHER field is empty.
        if (!question || !type) {
            handleValueChange("error", "Question and Type are required")
            return
        }

        if (type === "single-choice" && options.length < 2) {
            handleValueChange("error", "Single choice polls require at least two options")
            return
        }
        handleValueChange("error", "")

        const optionData = getOptions(); // No 'await' needed now

        try {
            // FIX #3: Added 'await'. You must wait for the API call to finish
            // before you can process the response.
            const response = await axiosInstance.post(API_PATHS.POLLS.CREATE, {
                question,
                typeOfPoll: type,
                options: optionData, // This will now contain the correct options
                creator: user._id
            })

            if (response) {
                toast.success("Poll created successfully !")
                clearData()
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                toast.error(error.response.data.message);
                handleValueChange("error", error.response.data.message)
            } else {
                handleValueChange("error", "Something went wrong")
            }
        }
    }


    return (
        <DashboardLayout activeMenu="Create Poll" >
            <div className=" bg-gray-100/80  my-5 p-5 rounded-lg mx-auto  " >
                <h2 className=" text-lg text-black font-medium " >
                    Create Poll
                </h2>

                <div className=" mt-3" >
                    {/* ... (rest of your JSX is correct) ... */}
                    <label className=" text-xs font-medium text-slate-600 " >QUESTION</label>

                    <textarea
                        placeholder="Let's get other's opinions"
                        className=" w-full text-[13px] text-black outline-none bg-slate-200/80 p-2 rounded-md mt-2 "
                        rows={4}
                        value={pollData.question}
                        onChange={({ target }) => handleValueChange("question", target.value)}
                    />
                </div>

                <div className=" mt-3">
                    <label className=" text-xs font-medium text-slate-600 " >POLL TYPE</label>

                    <div className=" flex gap-4 flex-wrap mt-3 " >
                        {
                            POLL_TYPES.map((item) => (
                                <div
                                    key={item.value}
                                    className={`option-chip hover:border-blue-300 ${pollData.type === item.value
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

                {
                    pollData.error && (
                        <p className=" text-xs text-red-500 mt-5" >
                            {pollData.error}
                        </p>
                    )
                }

                <button
                    className="btn-primary py-2 mt-6 "
                    onClick={handleCreatePoll}
                >
                    Create Poll
                </button>
            </div>
        </DashboardLayout>
    )
}