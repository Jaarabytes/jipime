
import mongoose, { Schema , model, models } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
const uri: string = process.env.MONGO_URI as string;

// set up a mongoose schema
const userSchema = new mongoose.Schema({
    userId : {
        type: String,
        unique: true
    },
    starterIQ : {
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

const User = models.user || model('User', userSchema);
export { User }

export async function connectToDatabase () {
    if ( mongoose.connection.readyState >= 1 ) {
        return;
    }
    return mongoose.connect( uri, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    })
}

// Set up a connection to the mongodb database
export default async function handler ( req: NextApiRequest, res: NextApiResponse ) {
    if ( !uri ) {
        console.log("Mongo db uri doesn't exist");
        return res.status(500).json({message: "Mongo db uri isn't here"})
    }
    try {
        await connectToDatabase();
        res.status(200).json({ message: "Successfully connected to mognodb"})
    }
    catch ( err ) {
        console.error("Error when connecting to mongodb", err);
        res.status(500).json({error: "Failed to connect to mongo db"})
    }
}