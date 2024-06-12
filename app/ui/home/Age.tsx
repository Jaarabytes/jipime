'use client'
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { v4 as uuidv4 } from 'uuid';
const generateUserId = () => {
    return uuidv4();
}
export default function Age() {
    //acquire the userId if exists, if not create new one
    useEffect(() => {
        const existingUserId = Cookies.get('userId');
        if ( !existingUserId ) {
            const newUserId = generateUserId();
            Cookies.set('userId', newUserId, { expires: 14 })
        }
    }, []);
    const userId = Cookies.get('userId')
    // handling client-side redirect
    const router = useRouter();
    // age-selection is necessary for extra points uwu
    const [ ageValue, setAgeValue ] = useState(false);
    // generate random id and store it as cookie
    const handleSubmit = async (e: any) => {
        e.preventDefault();

    try {
        // sending age data to age function
        const response = await fetch("/api/age", {
            method: "POST",
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify({selectedAge: ageValue, userId: userId})
        })
        // if successful, user starts the test
        if (response.ok) {
            router.push('/test')
        }
        else {
            console.error("Failed to submit age");
        }
    }
    catch ( err ) {
        console.error("Error submitting age", err)
    }  
}   
    // If name == true, add 2-3 points on IQ, if not, HER LOSS
    const ages = [{name:true , age: "16<"},{name: false, age: "18-50"}, {name: false, age: "51-60"},{name: true, age: "61+"}];
    return (
        <>
            <h3 className="my-5 text-lg">Please select your age: </h3>
            {ages.map((element, index) => (
                // change the form action for the mpesa lipa form
                <form className="sm:inline p-5" key={index} onSubmit={handleSubmit}>
                    <button
                    onClick={() => setAgeValue(element.name)}
                    className="bg-red-800 px-5 py-3 rounded-lg text-white hover:bg-red-600">{element.age}</button>
                </form>
            ))}
        </>
    )
}