import DashboardLayout from "../../components/layout/DashboardLayout";
import useUserAuth from "../../hook/useUserAuth";



export default function Home(){
    useUserAuth()
    return(

        <DashboardLayout activeMenu="Dashboard" >

        </DashboardLayout>
    )
}