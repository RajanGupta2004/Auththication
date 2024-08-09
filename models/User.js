import mongoose, { Schema } from "mongoose";


// user Scheme

const userSchema = new mongoose.Schema({
    name:{type:String , trim :true , required:true},
    email:{type:String , trim:true , required:true , unique:true , lowercase:true},
    password:{type:String , trim:true , require:true},
    is_verified:{type :Boolean , default:false},
    role:{type:[String] , enum:["user" , "admin"], default:["user"]}

},{timestamps:true})

// console.log(mongoose.Schema.Types)


// models

const userModels = mongoose.model("user" , userSchema)

export default userModels