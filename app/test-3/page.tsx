'use client'

import { useState } from "react"
import { useTimer } from "@/app/ui/Timer";
import { checkTestThree } from "@/lib/actions";
import LoadingModal from "../ui/Loading";
import InternalServerError from "@/app/ui/db/InternalServerError"

export default function CriticalThink () {
    const [ loading , setLoading ] = useState(false);
    const [ error , setError ] = useState(false);
    const { currentTime } = useTimer();
    const minutes = Math.floor( currentTime / 60);
    const seconds = currentTime % 60 
    const questions = [
        // answer: something that is temporary and lasts for a short period of time
        {question: "What does ephemeral mean?", options: ["lasting", "fleeting", "solid", "ancient"], answer: "fleeting"},
        // answer: author writes books thus artist paints paintings
        {question: "Book is to author as painting is to", options: ["canvas", "brush", "artist", "gallery"], answer: "artist"},
        // answer: magnanimous -> forgiving especially to rivals
        {question: "His ______ nature made him popular. he never spoke ill of anyone", options: ["candid", "enigmatic", "magnanimous", "frugal"], answer: "magnanimous"},
        // answer: sculpture all others are written literature, sculpture is visual art
        {question: "Which does not belong", options: ["poem", "novel", "essay", "sculpture"], answer: "sculpture"},
        // answer: basically, if A = B and B = C, that means A = C
        {question: "If all bloops are razzies and all razzies are lazzies, are all bloops definitely lazzies?", options: ["True", "False"], answer: "True"},
        // answer: Box that has misfortunes and hope trapped inside
        {question: "What does 'Pandora's box' mean?", options: ["Box that has Pandora inside", "Box that exists and does not exist", "Box that has misfortunes and hope trapped inside"], 
        answer: "Box that has misfortunes and hope trapped inside"},
        // answer: there is no 'a' in the sentence
        {question: "The seventh vowel is this sentence is 'a'?", options: ["True", "False"], answer: "False"},
        // answer: spirit yes, but it revolves around culture
        {question: "What is a zeitgeist?", options: ["Ancient spirit", "Cultural trend", "Musical genre", "Scientific theory"], answer: "Cultural trend"},
        // answer: capitalism is a type of economy
        {question: "Democracy is to government as capitalism is to? ", options: ["Money", "Economy", "Business", "Market"], answer: "Economy"},
        // answer: it means argue with the opposite so that the thought process around an issue is revealed
        {question: "What does 'to play devil`s advocate' mean?", options: ["be evil", "argue with the opposite", "make a deal", "cheat in a game"], answer: "argue with the opposite"},
    ]
    const [ formData, setFormData] = useState({
            'question-1': '',
            'question-2': '',
            'question-3': '',
            'question-4': '',
            'question-5': '',
            'question-6': '',
            'question-7': '',
            'question-8': '',
            'question-9': '',
            'question-10': ''
    });
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({...prevData, [name]: value}))
    }

    const handleSubmit = async (e: any) => {
      try {
        setLoading(true)
        e.preventDefault();
        console.log(`Form data is ${formData}`)
        await checkTestThree(formData)
        setLoading(false)
      }
      catch (err) {
        setError(true)
      }
    }
   if ( error ) {
    return (
        <InternalServerError />
    )
}
    if ( loading ) {
        return (
            <LoadingModal />
        )
    }

    return (
        <>
            <div className="text-3xl m-5 text-center">
                {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, "0")}
            </div>

            
            <div className="m-5">
                <form id="critical-think" onSubmit={handleSubmit}>
                    {questions.map((element, index) => (
                        <div key={index} className="my-4">
                            <p className="my-3">{index + 1}. <span className="mx-4">{element.question}</span></p>
                                    <div className="mx-5">
                                        {element.options.map((elem, ind) => (
                                            <div key={ind}>
                                                <label className="block"><input type="radio" name={`question-${index + 1}`} className="mx-2" value={`${elem}`} onChange={handleChange}></input>{elem}</label>
                                            </div>
                                        ))}
                                    </div>
                        </div>
                    ))}
                <button className="text-center m-5 text-xl bg-red-900 text-white rounded-lg px-5 py-3 hover:bg-red-700"
                type="submit"
                >Finish ME !</button>
                </form>
            </div>
        </>
    )
}

