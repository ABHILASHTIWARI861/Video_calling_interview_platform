import express from 'express';
import ENV from './lib/env.js';
import path from 'path';
const app=express();

const __dirname = path.resolve();
app.get('/home',(req,res)=>{
    res.send("Hello chulbul pandey kya kr rhi ho");
})

app.get('/hotel',(req,res)=>{
    res.send("Welcome to Hotel");
})

console.log(ENV.NODE_ENV);

if(ENV.NODE_ENV === "xyz"){
    app.use(express.static(path.join(__dirname,'../frontend','vite-project','dist')))
    app.get("/{*any}",(req,res)=>{
        res.sendFile(path.join(__dirname,'../frontend','vite-project','dist','index.html'))
    })
}

console.log(ENV.DB_URL);
console.log(ENV.PORT);

app.listen(ENV.PORT,()=>{
    console.log("server is running on port"+" " + `${ENV.PORT}`);
})

