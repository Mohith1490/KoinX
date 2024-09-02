import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
    _id: false,
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
    totalexpenses: Number
})

export const transactionModel = mongoose.model("transactionModel",transactionSchema);

const etherPriceSchema = mongoose.Schema({
    price: Number
})

export const etherPrice = mongoose.model("etherPrice",etherPriceSchema);