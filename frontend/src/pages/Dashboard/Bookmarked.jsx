import DashboardLayout from "../../components/layout/DashboardLayout";

export default function Bookmarked(){
    return(
        <DashboardLayout activeMenu={"Bookmarked"}>
            <h2 className="mt-3 py-4 text-lg text-black font-medium " >
                Bookmarked Polls
            </h2>
        </DashboardLayout>
    )
}