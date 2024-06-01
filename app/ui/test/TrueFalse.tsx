

export default function TrueFalse () {
    // This component holds all the true or false questions of the iq test. (part 1)
    const questions = [
        // answer: 77 + 33 = 110
        {question: "77 + 33 is equal to 100", answer: false},
        // answer: press CTRL + Shift + I in your browser and type in `console.log(8).toString(2))`, 8 in binary is 1000, yes this is rigged in my favor
        {question: "In a way, 1000 is equal to 8", answer: true},
        // answer : (fibonacci sequence) add previous number to current number to get next number
        {question: "1, 1, 2, 3, 5, 8, the next number is 13", answer: true},
        // answer: each machine takes 5 minutes to make a widget
        {question: "It takes 5 machines 5 minutes to make 5 widgets, so it would also take 100 minutes for 100 machines to make 100 widgets?", answer: false},
        // answer: you passed the second person, not the first person, so you are second place
        {question: "I'm running a race and I pass the second person, that means I am number one?", answer: false},
        // answer : "All but 9 die" means that all sheep died except for the nine
        {question: "A farmer has 17 sheep and all but 9 die, so the farmer has 8 sheep left", answer: false},
        // answer: 47 + 58 + 15 = 120
        {question: "I have forty seven shillings. If I borrow fifty-eight shillings from Kelvin and fifteen shillings from Jane, can I buy a bike which costs one-hundred and twenty dollars (no tax involved)", answer: true},
        // answer : 1,011  backwards = 1,101
        {question: "The number 'one thousand and eleven' written backwards is 'one thousand one hundred and one'", answer: true},
        // answer: it's 5:13 not 4:13
        {question: "47 minutes before 6 o'clock is the same as 13 minutes past 4 o'clock", answer: false},
        // answer: mirrors are opposite
        {question: "If I look into a mirror and touch my left ear with my right hand, the guy in the mirror is touching his right ear with his left hand", answer: true},
    ]
    return (
        <>
            {questions.map((element, index) => (
                <div key={index} className="my-4">
                    <form>
                    <p>{index + 1}. <span className="mx-4">{element.question}</span></p>
                            <div className="mx-5">
                                <label className="block"><input type="radio" name="trueorfalse" className="mx-2" value="True"></input>True</label>
                                <label className="block"><input type="radio" name="trueorfalse" className="mx-2" value="False"></input>False</label>
                            </div>
                    </form>
                </div>
            ))}
        </>
    )
}