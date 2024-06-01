

export default function CriticalThink () {
    // Series of questions that is supposed to make you fail my test.
    // yes, I am against you
    return (
        <>
            {questions.map((element, index) => (
                <div key={index} className="my-4">
                    <form>
                    <p>{index + 1}. <span className="mx-4">{element.question}</span></p>
                            <div className="mx-5">
                                {element.options.map((elem, ind) => (
                                    <div key={index}>
                                        <label className="block"><input type="radio" name="pickoption" className="mx-2" value="True"></input>{elem}</label>
                                    </div>
                                ))}
                            </div>
                    </form>
                </div>
            ))}
        </>
    )
}
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
    {question: "What does 'to play devil`s advocate' mean?", options: ["be evil", "argue with opposite", "make a deal", "cheat in a game"], answer: "argue with the opposite"},
]