import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import connectDB from "./config/connectdb.js"
import passport from "passport"
import userRoutes from "./routes/userRoutes.js"

const app = express()

const Port = process.env.PORT || 8000
const DATABASE_URL = process.env.DATABASE_URL
const FRONTEND_HOST = process.env.FRONTEND_HOST


// corse policy issue solve
var corsOptions = {
    origin: FRONTEND_HOST,
    optionsSuccessStatus: 200 
  }
app.use(cors(corsOptions))

// database connection
connectDB(DATABASE_URL)


//  middleware to handle JSON data
app.use(express.json())


// passport middleware
app.use(passport.initialize())

// all route uses

app.use("/api/user" , userRoutes)












app.listen(Port , ()=>{
    console.log(`server is listen at ${Port}`)
})