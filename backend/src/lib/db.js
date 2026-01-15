import mongoose from 'mongoose';

import ENV from './env.js';

export const connectDB = async () =>{
    try{
        if(!ENV.DB_URL){
            throw new Error("DB_URL is not defined in environment variables");
        }
        const cnn = await mongoose.connect(ENV.DB_URL);
        console.log("💖DB connected successfully to ");
    }
    catch(error){
        console.log(ENV.DB_URL);
        console.log("💔Eroor while connecting to DB",error)
    }
}