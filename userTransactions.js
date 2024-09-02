import mongoose from "mongoose";
import dotenv from 'dotenv'
import express from 'express'
import { transactionModel } from "./model/transactions.model.js";

dotenv.config();

export async function userTransactions(req, res) {
    const { address } = req.params
    try {
        let etherscan_url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`
        const response = await fetch(etherscan_url);
        let transition_history = await response.json();
        if (transition_history.message !== "OK") {
            return res.send(400).json({ message: "error occured enter a valid address" });
        }
        let totalexpenses = 0;
        transition_history.result.forEach(element => {
            let result = (element.gasPrice * element.gasUsed) / Math.exp(18);
            totalexpenses += result;
        });
        const transaction = transition_history.result.map((payment) => ({ ...payment, address, totalexpenses }));
        await transactionModel.insertMany(transaction);

    } catch (error) {
        console.error("error occured")
    }
}
export async function getEtheriumPrice() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr');
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}