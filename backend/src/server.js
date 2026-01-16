import express from 'express';
import ENV from './lib/env.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './lib/db.js';
import cors from 'cors';
import { serve } from 'inngest/express';
import { inngest, userFunctions } from './lib/inngest.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app=express();

app.use(express.json());
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}));

// Register Inngest endpoint for webhooks
app.use('/api/inngest', serve({ client: inngest, functions: userFunctions }));

// API routes - must come before static file serving
app.get('/home',(req,res)=>{
    res.send("Hello chulbul pandey kya kr rhi ho");
})

app.get('/hotel',(req,res)=>{
    res.send("Welcome to Hotel");
})

console.log(ENV.NODE_ENV);

// Serve static files in both development and production
// Use path.resolve to get absolute path - works from backend/src directory
const staticPath = path.resolve(__dirname, '../../frontend/vite-project/dist');
console.log('Serving static files from:', staticPath);
console.log('__dirname:', __dirname);
console.log('process.cwd():', process.cwd());

app.use(express.static(staticPath));

// Catch-all handler for SPA routing - must be after API routes and static files
app.use((req, res, next) => {
    // Skip if request is for API routes
    if (req.path.startsWith('/api/')) {
        return next();
    }
    // Serve index.html for all other GET requests (SPA routing)
    res.sendFile(path.join(staticPath, 'index.html'), (err) => {
        if (err) {
            console.error('Error sending index.html:', err);
            res.status(404).send('File not found');
        }
    });
});

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


