import Header from "../../components/Header";
import Navbar from "../../components/Navbar";

export default function Home(){
    return(
        <div className=" flex flex-col min-h-screen  bg-blue-300" >
            <Navbar />

            <div className=" flex items-center flex-1" >
            <Header />  
            </div>
        </div>
    )
}