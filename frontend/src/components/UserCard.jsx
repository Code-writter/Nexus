

const StatsCard = ({label, value}) => {
    return(
        <div className=" text-center" >
            <p className=" font-medium text-gray-900 " > {value} </p>
            <p className=" text-xs text-slate-700/80 mt-[2px] " > {label} </p>
        </div>
    )
}

export default function UserCard(
    {
        name,
        totalPollsVotes,
        totalPollsCreated,
        totlaPollsBookmarked
    }
){

    return(
        <div className=" p-4 bg-slate-100/50 rounded-lg sticky z-20 mt-16  overflow-hidden "  >
            <div className=" w-full h-32 bg-blue-400 flex items-center justify-center relative" >
                <div className=" flex items-center justify-center absolute bg-amber-200 text-center h-20 w-20 rounded-full overflow-hidden " >
                    {name}
                </div>
            </div>

            <div className=" mt-12 px-5" >
                <div className=" text-center pt-1" >
                    <h3 className=" text-lg text-gray-900 font-medium leading-6" > {name} </h3>

                </div>


            </div>
                <div className=" flex items-center justify-between gap-5 flex-wrap my-6" >
                    <StatsCard label="Polls Created" value={totalPollsCreated || 0 }/>
                    <StatsCard label="Voted" value={totalPollsVotes || 0 }/>
                    <StatsCard label="Bookmarked" value={totlaPollsBookmarked || 0 }/>
                </div>
        </div>
    )
}