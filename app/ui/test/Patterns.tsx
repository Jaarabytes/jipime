'use client'
import { useState } from "react"
import { MdOutlineKeyboardArrowRight } from "react-icons/md"
import { useRouter } from "next/navigation"

export default function Patterns () {
    // This is the patterns part of the iq test. show patterns similar to mensa's iq test
    // Sadly patterns is off, just adding 10 random form questions again 
    // I have had a hard time drawing patterns thus delaying shipping time, sorry
    const questions = [
        // answer: true they are just reversed
        {question : 'HOME is to EMOH, thus 5642 is to 2465'},
        // answer: false 200/5 = 40/2= 20/4 = 5
        {question : 'So a 1/4 of 1/2 of 1/5 of 200 is 2.5?'},
        // answer: false, (2x + x ) - 5 = 3x + x , x is thus 10, Bob is 10 , alice is 20
        {question : 'Alice is twice as old as Bob. Five years ago, Alice was three times as old as Bob. So, Alice is 10 years old?'},
        // answer: false, Five (which is odd) odd numbers thus when adding up give out an odd number, 15 + 5 + 12 + 7 + 1 = 41
        {question : 'The odd numbers here add up to an even number: 15, 32, 5, 13, 82, 7, 1.'},
        // answer: true, Yes you idiot, it takes se7en
        {question : 'It can take 7 toothpicks (without breaking), to spell out "FIN"? '},
        // answer: false, 32, hyphen is NOT a letter (4, 8, 3, 6, 4, 7)
        {question : 'This sentence has thirty-five letters'},
        // answer: true, yes you idiot
        {question : 'Jake needs 16 bottles of water from the store. John can only carry 3 at a time. The minimum number of trips John makes is thus 6?'},
        // answer: false, no, michael likes perfect squares
        {question : 'Michael likes 25 but not 24; he likes 400 but not 300; he likes 144 but not 145. So Michael would like 10?'},
        // answer: true, it is [1, 2, 3, 4, 5] cubed
        {question : 'Is this correct? 1, 8, 27, 64, 125, 216'}
    ]
    const [ formData, setFormData ] = useState({
            'question-1': '',
            'question-2': '',
            'question-3': '',
            'question-4': '',
            'question-5': '',
            'question-6': '',
            'question-7': '',
            'question-8': '',
            'question-9': ''

    })
    const [ response, setResponse ] = useState(null);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({...prevData, [name]: value }))
   }
   
   const handleSubmit = async (e: any) => {
       e.preventDefault();
       try {
           const res = await fetch ("/api/test-two", {
               method: "POST",
               headers: { "Application-Type": "JSON"} ,
               body: JSON.stringify(formData)
           })
           const data = await res.json();
           setResponse(data);
           if ( res.ok ) {
               console.log("Successfully submitted test-one")
           }
           else{
               console.log("Error when submitting test-one")
           }
           const router = useRouter();
        //    push to critical think, test-3
           router.push('/test-3')
       }
       catch (err) {
           console.error("error when submitting test-one", err)
       }
   } 
    // add a next button that submits all answers at once to calculator
    // have a function in calculator that checks and keeps score
    return (
        <>
            <div className="m-5">
                <form id="true-false" onSubmit={handleSubmit}>
                    {questions.map((element, index) => (
                        <div key={index} className="my-4">
                            <p>{index + 1}. <span className="mx-4">{element.question}</span></p>
                                    <div className="mx-5">
                                        <label className="block"><input type="radio" name={`question-${index + 1}`} className="mx-2" value={`True`} onChange={handleChange}></input>True</label>
                                        <label className="block"><input type="radio" name={`question-${index + 1}`} className="mx-2" value={`False`} onChange={handleChange}></input>False</label>
                                    </div>
                        </div>
                    ))}
                    <button className="text-center m-5 text-xl bg-blue-900 text-white rounded-lg px-5 py-3 hover:bg-blue-700"
                    type="submit"
                    >Next <MdOutlineKeyboardArrowRight className="w-6 inline" /></button>
                </form>
            </div>
        </>
    )
}