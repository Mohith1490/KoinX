import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
    blockNumber: String,
    blockHash: String,
    timeStamp: String,
    hash: String,
    nonce: String,
    transactionIndex: String,
    from: String,
    to: String,
    value: String,
    gas: String,
    gasPrice: String,
    input: String,
    methodId: String,
    functionName: String,
    contractAddress: String,
    cumulativeGasUsed: String,
    txreceipt_status: String,
    gasUsed:String,
    confirmations: String,
    isError: String,
    address: String,
    expenses: Number
})

export const transactionModel = mongoose.model("transactionModel",transactionSchema);