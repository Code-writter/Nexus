import DashboardLayout from "../../components/layout/DashboardLayout";

export default function VotedPolls(){
    return(
        <DashboardLayout activeMenu={"Voted Polls"}>
            <h2 className="mt-3 py-4 text-lg text-black font-medium " >
                Voted Poll
            </h2>
        </DashboardLayout>
    )
}