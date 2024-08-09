import mongoose from "mongoose";

// const DatabaseURL = "mongodb://127.0.0.1:27017/"



const connectDB = async (DATABASE_URL)=>{
    try {

        const option = {
            dbName:"passportjsauth"
        }

        await mongoose.connect(DATABASE_URL , option)
        console.log("database connection successfully...")
        
    } catch (error) {

        console.log(error)
        
    }
}


export default connectDB