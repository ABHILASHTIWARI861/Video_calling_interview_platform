import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = [
    requireAuth({signInUrl:'/abhilash'}),
    async (req,res, next)=>{
        try{
        const auth = typeof req.auth === "function" ? req.auth() : req.auth;
        const clerkId = auth?.userId;
        if(!clerkId){
            return res.status(401).json({message:"Unauthorized Access"});               
        }
        let user = await User.findOne({clerkId});
        if(!user){
            // Fallback for local/dev when webhook sync has not created Mongo user yet.
            const claims = auth?.sessionClaims || {};
            const firstName = claims?.first_name || "";
            const lastName = claims?.last_name || "";
            const fullName = `${firstName} ${lastName}`.trim() || "User";
            const email = claims?.email || `${clerkId}@clerk.local`;
            const profileImage = claims?.image_url || "";

            user = await User.create({
                clerkId,
                name: fullName,
                email,
                profileImage,
            });
        }
        req.user = user;
        next();
    }
    catch(error){
        return res.status(401).json({message:"Unauthorized Access"});
    }
}
];