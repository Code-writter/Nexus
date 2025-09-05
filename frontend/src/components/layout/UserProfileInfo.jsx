import moment from 'moment'
import { CiUser } from "react-icons/ci";

export default function UserProfileInfo ({
    fullName,
    createdAt
}){
    return(
        <div className=' flex items-center gap-4' >

            <CiUser className=' text-[30px] font-bold ' />


            <div>
                <p className=" text-sm text-black font-medium leading-4 " >
                    {
                        fullName
                    } <span
                        className="mx-1 text-sm text-slate-500"
                    > {" "} .</span>
                    <span className=' text-[10px] text-sm text-slate-500' >
                        {createdAt && moment(createdAt).fromNow()}
                    </span>
                </p>
                <span className='' >
                    {}
                </span>
            </div>
        </div>
    )
}