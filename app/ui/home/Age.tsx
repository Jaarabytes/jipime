'use client'
import { redirect, useRouter } from "next/navigation";

export default function Age() {
    const router = useRouter();
    const startTest = () => {
        router.push('/test');
    }
    // If name == true, add 2-3 points on IQ, if not, sorry for him
    const ages = [{name:true , age: "16<"},{name: false, age: "18-50"}, {name: false, age: "51-60"},{name: true, age: "61+"}];
    return (
        <>
            <h3 className="my-5 text-lg">Please select your age: </h3>
            {ages.map((element, index) => (
                <form className="sm:inline p-5" key={index}>
                    <button
                    onClick={startTest}
                    className="bg-red-800 px-5 py-3 rounded-lg text-white hover:bg-red-600">{element.age}</button>
                </form>
            ))}
        </>
    )
}