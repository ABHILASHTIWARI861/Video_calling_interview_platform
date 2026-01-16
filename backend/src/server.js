import express from 'express';
import ENV from './lib/env.js';
import path from 'path';
import { connectDB } from './lib/db.js';
import cors from 'cors';
import { serve } from 'inngest/express';
import { inngest, userFunctions } from './lib/inngest.js';

const app=express();

app.use(express.json());
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}));

// Register Inngest endpoint for webhooks
app.use('/api/inngest', serve({ client: inngest, functions: userFunctions }));


const __dirname = path.resolve();
app.get('/home',(req,res)=>{
    res.send("Hello chulbul pandey kya kr rhi ho");
})

app.get('/hotel',(req,res)=>{
    res.send("Welcome to Hotel");
})

console.log(ENV.NODE_ENV);

// if(ENV.NODE_ENV === "development"){
//     app.use(express.static(path.join(__dirname,'../frontend','vite-project','dist')))
//     app.get("/{*any}",(req,res)=>{
//         res.sendFile(path.join(__dirname,'../frontend','vite-project','dist','index.html'))
//     })
// }

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


