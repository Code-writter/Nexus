import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import useUserAuth from "../../hook/useUserAuth";
import { useNavigate } from "react-router-dom";
import HeaderWithFilter from "../../components/layout/HeaderWithFilter";
import axiosInstance from "../../api/axios";
import { API_PATHS } from "../../api/urls";
import PollCard from "../../components/layout/PollCard";

const PAGE_SIZE = 10;

export default function Home(){
    useUserAuth()
    const navigate = useNavigate();


    const [allPolls, setAllPolls] = useState([]);
    const [stats, setStats] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(false)
    
    const [filterType, setFilterType] = useState("")

    const fetchAllPolls = async (overridePage = page) => {
        if(loading) return;

        setLoading(true)

        try {
            const response  = await axiosInstance.get(
                `${API_PATHS.POLLS.GET_ALL}?Page=${overridePage}&limit=${PAGE_SIZE}&type=${filterType}`
            )

            console.log(response)
            if(response.data?.polls?.length > 0){
                setAllPolls((prevPolls) => overridePage === 1 ? response.data.polls : [...prevPolls, ...response.data.polls])

                setStats(response.data?.stats || [])
                setHasMore(response.data.polls.length === PAGE_SIZE)
            }else{
                setHasMore(false)
            }
        } catch (error) {
            console.log("sdlfhskhf")
        }finally{
            setLoading(false)
        }
    };

    useEffect(() => {
        setPage(1);
        fetchAllPolls(1)
        return () => {};
    }, [filterType])

    useEffect(() => {
        if(page != 1){
            fetchAllPolls()
        }
        return () => {};
    }, [page])

        

    return(

        <DashboardLayout activeMenu="Dashboard" >
            <div className=" my-5 mx-auto " >
                <HeaderWithFilter 
                    title="Polls"
                    filterType={filterType}
                    setFilterType={setFilterType}
                />

                {
                    allPolls.map((poll) => (
                        <PollCard
                            key={`dashboard_${poll._id}`}
                            pollId={poll._id}
                            question={poll.question}
                            type={poll.type}
                            questions={poll.questions}
                            options={poll.options}
                            voters={poll.voters}
                            responses={poll.responses}
                            creator={poll.creator?.name}
                            userHasVoted={poll.userHasVoted || false}
                            isPolLClosed={poll.closed || false}
                            createdAt={poll.createdAt || false}

                        />
                    ))
                }
            </div>
        </DashboardLayout>
    )
}