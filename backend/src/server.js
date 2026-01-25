import express from 'express';
import ENV from './lib/env.js';
import path from 'path';
import { connectDB } from './lib/db.js';
import cors from 'cors';
import { serve } from 'inngest/express';
import { inngest, userFunctions } from './lib/inngest.js';
import { clerkMiddleware } from '@clerk/express'
import { protectRoute } from './middleware/protectRoute.js';
import chatRoutes from './routes/chatRoutes.js';
import sessionRoutes from './routes/sessionRoute.js';

const __dirname = path.resolve();

const app=express();

app.use(express.json());
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}));

// Register Inngest endpoint for webhooks
app.use('/api/inngest', serve({ client: inngest, functions: userFunctions }));
app.use('/api/chat',chatRoutes)
app.use('/api/sessions',sessionRoutes);

app.use(clerkMiddleware()) //It will add auth field to req object i.e req.auth
app.get('/home',(req,res)=>{
    res.status(200).json({message:"Welcome to Home Page"});
})

app.get('/hotel',(req,res)=>{
    res.send("Welcome to Hotel");
})

app.get('/video_call',protectRoute,(req,res)=>{
   res.status(200).json({message:"Welcome to Video Call Page"});
   console.log("User accessed video call page:", req.user)
}
);

console.log(ENV.NODE_ENV);


if(ENV.NODE_ENV === "development"){
    app.use(express.static(path.join(__dirname,'../frontend','vite-project','dist')))
    app.get("/{*any}",(req,res)=>{
        res.sendFile(path.join(__dirname,'../frontend','vite-project','dist','index.html'))
    })
}

console.log(ENV.DB_URL);
console.log(ENV.PORT);


const startServer = async () =>{
 try {
    await connectDB();
    app.listen(ENV.PORT, () =>{
        console.log(`🚀Server is running on port ${ENV.PORT}`);
    })
 }
    catch (error) {
    console.log("💔Error in starting server",error);
}
}

startServer();


