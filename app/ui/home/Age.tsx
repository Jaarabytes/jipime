'use client'
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";

export default function Age() {
    // Submit the age to add points according to the age
    const router = useRouter();
    const startTest = (age: string) => {
        router.push(`/test?age=${age}`)
    }
    const ages = [{name: "child" , age: "16<"},{name: "not old", age: "18-50"}, {name: "old", age: "51-60"},{name: "older", age: "61+"}];
    return (
        <>
            <h3 className="my-5 text-lg">Please select your age: </h3>
            {ages.map((element, index) => (
                <form className="sm:inline p-5" key={index}>
                    <button
                    onClick={(() => startTest(`${element.name}`))}
                    className="bg-red-800 px-5 py-3 rounded-lg text-white hover:bg-red-600">{element.age}</button>
                </form>
            ))}
        </>
    )
}