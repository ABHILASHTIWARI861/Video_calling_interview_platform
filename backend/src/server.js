import express from 'express';
import ENV from './lib/env.js';

const app=express();

app.get('/',(req,res)=>{
    res.send("Hello World");
})

console.log(ENV.DB_URL);
console.log(ENV.PORT);

app.listen(ENV.PORT,()=>{
    console.log("server is running on port"+" " + `${ENV.PORT}`);
})

