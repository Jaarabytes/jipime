'use client'
import { useState, useEffect } from "react"
import { preview } from "@/lib/actions";
import LoadingModal from "../ui/Loading";
import InternalServerError from "../ui/db/InternalServerError";
import UserNotFound from "../ui/db/UserNotFound";
import { useRouter } from 'next/navigation';

export default function PreResult () {    
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ notFound, setNotFound ] = useState(false);
    const router = useRouter();
    const fetchUserResults = async () => {
        setLoading(true)
        try {
            const result = await preview();
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
    useEffect(() => {
        fetchUserResults();
    }, [])

    const handleRedirect = () => {
      router.push("/test-2")
    }
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
                    <p className="font-bold">(This is just an estimate, finish the test for the actual figure)</p>
                    <p className="my-5">You IQ was measured to be <b>{userResults.iq}</b> which is equivalent to the <b>{resultPercentile}</b>{(resultPercentile.toString()).endsWith("1") ? `st` : (resultPercentile.toString()).endsWith("2") ? `nd` : (resultPercentile.toString()).endsWith("3") ? `rd` : `th` } percentile, 
                    with a standard deviation of <b>15</b></p>
                    <p className="my-3">In a room filled with 1000 people, you&apos;d be position <b>{Math.ceil(100 - userResults.percentile) * 10}</b></p>
                    {(position < 20 ? <p className="my-3">Congratulations, You are in the top <b>{position}%</b></p> : <p></p>)}
                    <p className="font-bold">Finish the test </p>
                    <button className="text-center m-5 text-xl bg-red-900 text-white rounded-lg px-5 py-3 hover:bg-red-700"
                    onClick={handleRedirect}
                    >Finish ME !</button>
                </div>
        </>
    )
}
