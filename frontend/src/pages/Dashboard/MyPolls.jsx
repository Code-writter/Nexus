import DashboardLayout from "../../components/layout/DashboardLayout";

export default function MyPolls(){
    return(
        <DashboardLayout activeMenu={"My Polls"}>
            <h2 className=" mt-3 py-4 text-lg text-black font-medium " >
                My Polls
            </h2>
        </DashboardLayout>
    )
}