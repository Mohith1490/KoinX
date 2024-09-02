import dotenv from 'dotenv'
import { transactionModel, etherPrice } from "./model/transactions.model.js";

dotenv.config();

export async function userTransactions(req, res) {
    const { address } = req.params
    try {
        let etherscan_url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`
        const response = await fetch(etherscan_url); //fetching data from provided address
        let transition_history = await response.json();


        // checking if message is ok else return error
        if (transition_history.message !== "OK") {
            return res.send(400).json({ message: "error occured enter a valid address" });
        }


        let totalexpenses = 0; //calculating total expenses of user and storing in model for longterm purposes
        transition_history.result.forEach(element => {
            let result = (element.gasPrice * element.gasUsed) / Math.exp(18);
            totalexpenses += result;
        });

        
        // returning array of transactions and storing address to easily access in future need 
        const transaction = transition_history.result.map((payment) => ({ ...payment, address, totalexpenses }));
        await transactionModel.insertMany(transaction);

    } catch (error) {
        console.error("error occured")
    }
}
export async function getEtheriumPrice() {
    try {
        // featching price of ether
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr');
        const result = await response.json();
        await etherPrice.create({ price: result.ethereum.inr })
        return result.ethereum.inr
    } catch (error) {
        console.error(error);
    }
}