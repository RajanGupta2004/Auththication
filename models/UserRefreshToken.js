import mongoose from "mongoose";



const refershTokenSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    
    createdAt: { type: Date, default: Date(), expireIn: "5d" }
})