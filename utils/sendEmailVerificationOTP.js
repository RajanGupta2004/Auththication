import transporter from "../config/emailConfig.js"
import EmailVerificationModel from "../models/EmailVerification.js"

const sendEmailVerificationOTP = async(req , user) => {


    // generate OTP
    const otp =  Math.floor(1000+ Math.random()*9000)

    // save otp in database
    await new EmailVerificationModel({userId:user._id , otp:otp }).save()

    // otp verification link
    const otpVerificationLink = `${process.env.FRONTEND_HOST}/account/verify-email`

    


    var mailOptions = {
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: 'OTP - verification..',
        html: `<p> <h1>Dear ${user.name}</h1> thanky for signing in our website <h1>Your OTM is ${otp} </h1> and your verifcation link is ${otpVerificationLink}</p>`,
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error.message);
        }
        console.log('Email Sent: '+ info);
    });

    return otp
  
}

export default sendEmailVerificationOTP
