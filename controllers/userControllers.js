import userModels from "../models/User.js"

import bcrypt from "bcrypt"
import sendEmailVerificationOTP from "../utils/sendEmailVerificationOTP.js"
import EmailVerificationModel from "../models/EmailVerification.js"

class userControllers{

  // userRegistration

    static userRegistration = async(req ,res)=>{

        try {
            const {name , email , password , confirm_password} = req.body
            // console.log(name , email , password)

            // check all field required

            if(! name || !email || !password || !confirm_password ){
                return res.status(400).json({status:"failed" , message:"All field are required..."})
            }
            

            // check password and confirm password
            if(password!==confirm_password){
                return res.status(400).json({status:"failed" , message:"Please check our password again"})
            }

            //  check user already exist or not

            const existingUser = await userModels.findOne({email})

            if(existingUser){
                return res.status(409).json({status:"failed" , message:"user already exist...."})
            }

            // hashed the user password

            const salt = 10
            const hashedPassword = await bcrypt.hash(password , salt)


            // save user
            const newUser = await new userModels({name , email , password:hashedPassword}).save()

            //  otp verification

            sendEmailVerificationOTP(req , newUser)
        

            return res.status(201).json({
                status:"success",
                message:"user created successfully",
                user:{id:newUser._id , email:newUser.email}
            })

           
         } catch (error) {
            console.log(error)
            res.status(500).json({status:"failed" , message:"Unable to Register please try again"})    
            
        }

    }


    static verifyUserOTP = async (req , res)=>{

        try {

            const {email , otp} = req.body;
            // console.log(email , otp)

            // check all field 

            if(!email || !otp){
                return res.status(400).json({
                    status:"failed",
                    message:"All field required..."
                })
            }

            // check user already existing or not

            const existingUser = await userModels.findOne({email})
            // console.log("existingUser" , existingUser)

            if(!existingUser){

                return res.status(404).json({status:"failed" , message:"Email  does not exist.."})

            }

            // check user already verified or not

            if(existingUser.is_verified){

                return res.status(400).json({
                    status:"failed",
                    message:"user already verified..."
                })

            }


            // check there is matching email verification and otp


            const emailVerification  = await EmailVerificationModel.findOne({userId:existingUser._id , otp})

            if(!emailVerification){
                if(!existingUser.is_verified){
                    await sendEmailVerificationOTP(req , existingUser)
                    return res.status(400).json({status:"failed" , message:"Invalid OTP new OTP send to youe email"})
                }
                return res.status(400).json({status:"faild" , message:"Invald OTP "})
            }

            // console.log(emailVerification)



            // res.send({emailVerification})

            

            // check otp is expire or not

            const currentTime = new Date()

            // calculate expiraation time
            const expirationTime = new Date(emailVerification.createdAt.getTime() + 15 * 60 *1000)

            // console.log(currentTime , expirationTime , 126)

            if(currentTime>expirationTime){
                await sendEmailVerificationOTP(req , existingUser)
                return res.status(400).json({status:"failed" , message:"OTP is expired New OTP sent to youe email"})

            }

            // if OTP is valid and not verified make user verifird

            existingUser.is_verified = true

            await existingUser.save()

            // // deleate the existing otp

            await EmailVerificationModel.deleteMany({userId:existingUser._id})
            return res.status(200).json({status:"success" , message:"User is verified..."})
            
            
        } catch (error) {
            console.log(error)
            res.status(400).json({
                status:"failed",
                message:"Unable to verify OTP try again..",
                "error":error
            })
            
        }

    }

    static Login = async (req, res)=>{


        try {


            const {email , password} = req.body
            // console.log(email , password)

            if(!email || !password){
                return res.status(400).json({status:"failed" , message:"All field are requird"})
            }

            const existingUser = await userModels.findOne({email})

            if(!existingUser){
                return res.status(404).json({status:"failed" , message:"You are register user please register"})
            }

            // check user verified or not

            if(!existingUser.is_verified){
                return res.status(400).json({status:"failed" , message:"user is not verified"})
            }

            
            // compare password
            const comparePassword = await bcrypt.compare(password , existingUser.password)

            if(!comparePassword){
                return res.status(400).json({status:"failed" , message:"passwoed does not match and user is not verified..."})

            }


            // Generate access token

            


            // set token into cookies



            res.status(200).json({status:"success" , message:"login successfull..."})
            
        } catch (error) {
            console.log(error)
            res.status(400).json({status:"failed" , message:"Unable to login please try again"})
            
        }

    }
}

export default userControllers