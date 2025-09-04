

export default function AuthLayout ({children}){
    return(
        <div className=" flex" >
            <div className=" w-screen h-screen md:w-1/2 px-12 pt-8 pb-12" >
                <h2 className=" text-lg font-medium text-black" > Nexus </h2>

                {children}
            </div>

            <div className=" hidden md:block w-1/2 h-screen bg-sky-200 " >

            </div>
        </div>
    )
}