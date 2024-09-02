import mongoose from "mongoose";
import dotenv from 'dotenv'
import express from 'express'
import { userTransactions, getEtheriumPrice } from "./userTransactions.js";
import { transactionModel } from "./model/transactions.model.js";

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

server.get('/api/transactions/:address', (req, res) => {
    let response = userTransactions(req, res);
    setInterval(getEtheriumPrice, 600000)
    console.log(response);
})
server.get('/api/expenses/:address', async (req, res) => {
    const { address } = req.params
    try {
        const result = await transactionModel.findOne({ address: address })
        const etherprice = await getEtheriumPrice()
        res.send(200).json({ totalexpenses: result, etheriumprice: etherprice })
    } catch (error) {
      console.error("could not fetch data");
    }

})