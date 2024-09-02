import mongoose from "mongoose";
import dotenv from 'dotenv'
import express from 'express'
import {userTransactions,getEtheriumPrice} from "./userTransactions.js";

dotenv.config();
const server = express();


mongoose.connect(process.env.MONGODB_URL).then(() => {
    server.listen(process.env.PORT, (error) => {
        if (error) console.error(error);
        console.log("connected server");     
    })
})
    .catch((error) => {
        console.error("error occured in connecting database ", error);
    })

server.get('/api/transactions/:address',(req,res)=>{
    let response = userTransactions(req,res);
    setInterval(getEtheriumPrice,600000)
    console.log(response);    
})