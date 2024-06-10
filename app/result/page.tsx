import Upvote from "@/app/ui/home/Donate"

export default async function Result () {
    const data = await getData();
    return (
        <>
            <div className="text-center" style={{minHeight: "100vh"}}>
                {/* display IQ results here */}
                {/* replace <this> with relevant values */}
                <h2 className="font-bold text-xl">Your IQ was measured to be { data }</h2>
                <p>You IQ was measured to be this which is equivalent to the this percentile, with a standard deviation of this</p>
                <p>Great test, yes? Give me money</p>
                <Upvote />
            </div>
        </>
    )
}

export async function getData () {
    const response = await fetch ("/api/total");
    const data = await response.json();
    return data;
}