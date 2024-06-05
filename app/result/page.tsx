import Upvote from "@/app/ui/home/Donate"

export default function Result () {


    return (
        <>
            <div className="text-center">
                {/* display IQ results here */}
                {/* replace <this> with relevant values */}
                <h2 className="font-bold text-xl">Your IQ was measured to be</h2>
                {/* Display bell curve here */}
                <p>You IQ was measured to be this which is equivalent to the this percentile, with a standard deviation of this</p>
                <p>Great test, yes? Give me money</p>
                <Upvote />
            </div>
        </>
    )
}