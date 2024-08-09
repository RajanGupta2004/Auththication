


import jwt from "jsonwebtoken"



const GenerateToken = async (user) => {
    try {

        const payload = { _id: user._id, role: user.role }

        const accesstoken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET_KEY, {
            expiresIn: '100s',  // Token expires in 1 hour
        })

        const refershToken = jwt.sign(payload, process.env.JWT_REFERESH_TOKEN_SECRET_KEY, {
            expiresIn: '5d',  // Token expires in 1 hour
        })

        return Promise.resolve({ accesstoken, refershToken })



    } catch (error) {
        console.log(error)

    }
}