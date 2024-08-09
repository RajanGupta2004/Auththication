import mongoose from "mongoose";



const emailVerificationSchema = new mongoose.Schema({
    userId :{type:mongoose.Schema.Types.ObjectId , ref:"user" , required:true},
    otp: {type:Number , required:true},
    createdAt: {type:Date , default:Date.now() , expires:"15m"}

})

const EmailVerificationModel = mongoose.model("EmailVerification" , emailVerificationSchema)


export default EmailVerificationModel