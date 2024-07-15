'use client'
import Upvote from "@/app/ui/home/Donate"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { total } from "@/lib/actions";
import LoadingModal from "../ui/Loading";
import InternalServerError from "../ui/db/InternalServerError";
import UserNotFound from "../ui/db/UserNotFound";
export default function Result () {    
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ notFound, setNotFound ] = useState(false);
    // redirect user to home pages, if his/her user Id is missing
    const fetchUserResults = async () => {
        setLoading(true)
        try {
            const result = await total();
            if ( result ) {
                setUserResults(result);
            }
            else {
                setNotFound(true);
            }
        }
        catch ( err ) {
            setError(true);
        }
        finally {
            setLoading(false)
        }
    }
    const router = useRouter();
    useEffect(() => {
        const userId = Cookies.get('userId');
        if ( !userId ) {
            router.push('/');
        }
    }, [router])
    useEffect(() => {
        fetchUserResults();
    }, [])
    const [ userResults , setUserResults ] = useState({iq: 0, percentile: 0});
    const resultPercentile = Math.floor(userResults.percentile);
    const position =  parseFloat((100 - userResults.percentile).toFixed(2));
    if ( loading ) {
        return (
            <LoadingModal />
        )
    }
    if ( error ) {
        return(
            <InternalServerError />
        )
    }

    if ( notFound ) {
        return (
            <UserNotFound />
        )
    }
    return (
        <>
                <div className="text-center my-5 px-3" style={{minHeight: "100vh"}}>
                    <h2 className="text-3xl">It&apos;s <b>{userResults.iq}</b></h2>
                    <p className="my-5">You IQ was measured to be <b>{userResults.iq}</b> which is equivalent to the <b>{resultPercentile}</b>{(resultPercentile.toString()).endsWith("1")
                    ? `st` : (resultPercentile.toString()).endsWith("2") ? `nd` : (resultPercentile.toString()).endsWith("3") ? `rd` : `th` } percentile, 
                    with a standard deviation of <b>15</b></p>
                    <p className="my-3">In a room filled with 1000 people, you&apos;d be position <b>{Math.round(100 - userResults.percentile) * 10}</b></p>
                    {/* add the top 10 percent feature so that users can gag on it*/}
                    {(position < 20 ? <p className="my-3">Congratulations, You are in the top <b>{position}%</b></p> : <p></p>)}
                    <p>Great test, yes? Give me money</p>
                    <Upvote />
                </div>
        </>
    )
}