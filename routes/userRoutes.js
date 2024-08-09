import express from "express"
import userControllers from "../controllers/userControllers.js"

const router = express.Router()



// public routes

router.post("/register" , userControllers.userRegistration)
router.post("/verify-otp" , userControllers.verifyUserOTP)
router.post("/login" , userControllers.Login)



export default router
