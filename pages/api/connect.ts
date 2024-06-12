
import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
const uri = process.env.MONGO_URI;

// set up a mongoose schema
const userSchema = new mongoose.Schema({
    initialIQ : {
        type: Number
    },
    testOneScore: {
        type: Number
    },
    testTwoScore: {
        type: Number
    },
    testThreeScore: {
        type: Number
    },
})

mongoose.model('User', userSchema);

// Set up a connection to the mongodb database
export default async function handler ( req: NextApiRequest, res: NextApiResponse ) {
    if ( !uri ) {
        console.log("Mongo db uri doesn't exist");
        return res.status(500).json({message: "Mongo db uri isn't here"})
    }
    try {
        const client = await MongoClient.connect(uri);
        const db = client.db('jipime');
        res.status(200).json({ message: "Successfully connected to mognodb"})
    }
    catch ( err ) {
        console.error("Error when connecting to mongodb", err);
        res.status(500).json({error: "Failed to connect to mongo db"})
    }
}