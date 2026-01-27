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

const __dirname = path.resolve(); //path.resolve()-->>returns an absolute path starting from the current working directory if no arguments are provided.
                                  //path.resolve("config", ".env");  if cwd is /home/user/project , it will return /home/user/project/config/.env
const app=express();             //app = configuration + routing ke kaam aata hai
                                 //express()--->>application object return karta hai.


//1)app.use():
//GET
//POST
//PUT
//DELETE
//sab pe kaam karta hai,depend krta hai ki tumhe krna kya hai.

//2)app.use([path], middleware)
//path → optional
// middleware → function ya router

app.use(express.json());   //app.use(express.json()) ka kaam hai JSON ko JS object me convert karna, taaki tum easily access kar sako,“display” karna iska kaam nhi hai.it convert only JSON to JS object


app.use(cors({
    origin:ENV.CLIENT_URL,  //“If the frontend is running on a different URL (localhost:5173), CORS middleware allows the backend to accept requests from that frontend and send responses safely, including credentials if needed.”
    credentials:true        //credentials: true allows cookies, HTTP authentication headers.
}));  

// Register Inngest endpoint for webhooks
app.use('/api/inngest', serve({ client: inngest, functions: userFunctions }));
//https://my-app-at.onrender.com/api/inngest -->>ye kaam start me hi inngest dashBoard pe apn kr rakhe the.

app.use('/api/chat',chatRoutes)
app.use('/api/sessions',sessionRoutes);

app.use(clerkMiddleware()) //It will add auth field to req object (i.e req.auth,req.user) 
//req.auth = {7
//  userId: "user_123",
//  sessionId: "sess_456",
//  orgId: null,
//  getToken: async () => "...jwt..."
//}
//✅ Always present (even if user not logged in)
//✅ If NOT logged in → req.auth.userId === null
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



if(ENV.NODE_ENV === "development"){
    app.use(express.static(path.join(__dirname,'../frontend','vite-project','dist')))  //express.static--->>is used to serve the frontend build files. The dist folder contains static assets generated during build time, so Express can directly serve them without any processing.
    app.get("/{*any}",(req,res)=>{
        res.sendFile(path.join(__dirname,'../frontend','vite-project','dist','index.html'))
    })
}



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


