import mongoose from "mongoose";
import dotenv from 'dotenv'
import express from 'express'

dotenv.config();
const server = express();


mongoose.connect(process.env.MONGODB_URL).then(() => {
    server.listen(process.env.PORT, (error) => {
        if (error) console.error(error);
        console.log("connected server");
        userTransitions();
    })
})
    .catch((error) => {
        console.error("error occured in connecting database ", error);
    })
let address = "0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC";
var etherscan_url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`

async function userTransitions(req,res) {
    try {
        const response = await fetch(etherscan_url);   
        let transition_history = await response.json();   
        if(transition_history.message !== "OK"){
            return res.send(400).json({message: "error occured enter a valid address"});
        }

    } catch (error) {
        console.log("error occured")
    }
}