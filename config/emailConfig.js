import express from "express"
import dotenv from "dotenv"
import nodemailer from 'nodemailer'

dotenv.config()


// const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     secure: false, // Use `true` for port 465, `false` for all other ports
//     timeout: 60000,
//     auth: {
//       user: process.env.EMAIL_USER, // admin gmail id 
//       pass: process.env.EMAIL_PASS,      // admin gmail password
//     },
   
//   })


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secureConnection: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });



  export default transporter


