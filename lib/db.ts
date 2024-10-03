import mongoose, { Schema , model, models } from "mongoose";

const uri: string = process.env.MONGO_URI as string;

interface IUser {
    userId?: String,
    starterIQ?: Number,
    testOneScore?: Number,
    testTwoScore?: Number,
    testThreeScore?: Number,    
} 

const userSchema = new Schema<IUser>({
    userId : {
        type: String,
        unique: true
    },
    starterIQ : {
        type: Number,
        default: 0
    },
    testOneScore: {
        type: Number,
        default: 0
    },
    testTwoScore: {
        type: Number,
        default: 0
    },
    testThreeScore: {
        type: Number,
        default: 0
    },
})

const User = models.User || model<IUser>('User', userSchema);

export async function connectToDatabase () {
    if ( mongoose.connection.readyState >= 1 ) {
        return;
    }
    return mongoose.connect( uri )
}

export default async function handler () {
    if ( !uri ) {
        console.log("Mongo db uri doesn't exist");
    }
    try {
        await connectToDatabase();
    }
    catch ( err ) {
        console.error("Error when connecting to mongodb", err);
    }
}
export { User }
