import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = [
    requireAuth({signInUrl:'/abhilash'}),
    async (req,res, next)=>{
        try{
        const clerkId = req.auth().userId;
        if(!clerkId){
            return res.status(401).json({message:"Unauthorized Access"});               
        }
        const user = await User.findOne({clerkId});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        req.user = user;
        next();
    }
    catch(error){
        return res.status(401).json({message:"Unauthorized Access"});
    }
}
];