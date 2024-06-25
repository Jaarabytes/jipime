'use client'
import Upvote from "@/app/ui/home/Donate"
import { useState, useEffect } from "react"
import LoadingModal from "../ui/Loading";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
export default function Result () {
    const [ notFound , setNotFound ] = useState();
    const router = useRouter();
    // redirect user to home pages, if his/her user Id is missing
    useEffect(() => {
        const userId = Cookies.get('userId');
        if ( !userId ) {
            router.push('/');
        }
    }, [])
    // soon to be the funniest component
    const [ userResults , setUserResults ] = useState({iq: 0, percentile: 0});
    const [isLoading, setIsLoading ] = useState(false);
    useEffect(() => {
        const fetchUserResults =  async () => {
            // mount the loading modal
            setIsLoading(true);
            try {
                const response = await fetch ( "/api/total", {
                    method: "GET",
                });
                if ( response.ok ) {
                    const data = await response.json();
                    setUserResults(data);
                }
                else {
                    console.log("Failed to fetch results");
                }
            }
            catch ( err ) {
                console.error("Error fetching results", err);
            }
            finally {
                // unmount modal
                setIsLoading(false);
            }
            }
        fetchUserResults();
    }, []);
    const resultPercentile = Math.floor(userResults.percentile);
    const position =  parseFloat((100 - userResults.percentile).toFixed(2));
    return (
        <>
            <div className="text-center my-5 px-3" style={{minHeight: "100vh"}}>
                <h2 className="text-3xl">It&apos;s <b>{userResults.iq}</b></h2>
                <p className="my-5">You IQ was measured to be <b>{userResults.iq}</b> which is equivalent to the <b>{resultPercentile}</b>{(resultPercentile.toString()).endsWith("1")
                ? `st` : (resultPercentile.toString()).endsWith("2") ? `nd` : (resultPercentile.toString()).endsWith("3") ? `rd` : `th` } percentile, 
                with a standard deviation of <b>15</b></p>
                <p className="my-3">In a room filled with 1000 people, you&apos;d be position <b>{Math.round(100 - userResults.percentile) * 10}</b></p>
                {/* add the top 10 percent feature so that users can gag on it*/}
                {(position ? <p className="my-3">Congratulations, You are in the top <b>{position}%</b></p> : <p></p>)}

                <p>Great test, yes? Give me money</p>
                <Upvote />
            </div>
            <LoadingModal isOpen={isLoading} />
        </>
    )
}
