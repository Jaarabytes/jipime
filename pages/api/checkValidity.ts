
// func that checks if user's choice is equal to answer and if so, it increments their score
type userChoices = {[key: string]: string};
type answers = string[]
export default function checkValidity (userChoices: userChoices, answers: answers ) {
    let score = 0;
    const values = Object.values(userChoices);
    for (let i = 0; i < values.length; i++ ) {
        if ( values[i] == answers[i]) {
            score++
        }
    }
    return score;
}