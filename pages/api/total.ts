import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (req: NextApiRequest, res:NextApiResponse ){
//  here the total and final computation is done   

// fetch initial IQ and test-IQ's
// also, factor in time
    fetchIQScores();
    // deal with the timer component
    // return something, this is to be fixed
}

async function fetchIQScores () {
    try {
        const [ initialIQ, score1, score2, score3 ] = await Promise.all([
            // fetch initial IQ
            fetch('http://localhost:3000/api/age').then(response => response.json()),
            // fetch score from test-one
            fetch('http://localhost:3000/api/test-one').then(response => response.json()),
            // fetch score from test-two
            fetch('http://localhost:3000/api/test-two').then(response => response.json()),
            // fetch score from test-three
            fetch('http://localhost:3000/api/test-three').then(response => response.json())
        ]);
        console.log('Initial IQ:', initialIQ);
        console.log('Test One Score:', score1);
        console.log('Test Two Score:', score2);
        console.log('Test Three Score:', score3);
        
        return { initialIQ, score1, score2, score3 };
    }
    catch ( err ) {
        console.error("Error when fetching data from endpoints", err);
    }
}