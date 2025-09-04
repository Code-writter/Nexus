export default function UserCard(
    {
        name,
        totalPollsVotes,
        totalPollsCreated,
        totlaPollsBookmarked
    }
){
    return(
        <div className=" bg-slate-100/50 rounded-lg  mt-16  overflow-hidden "  >
            <div className="" >
                <div>
                    A
                </div>
            </div>

            <div className=" mt-12 px-5" >
                <div className=" text-center pt-1" >
                    <h3 className=" text-lg text-gray-900 font-medium leading-6" > {name} </h3>
                    
                </div>
            </div>
        </div>
    )
}