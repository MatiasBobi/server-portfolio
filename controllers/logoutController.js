
const jwt = require("jsonwebtoken")
const {serialize} = require("cookie")
require('dotenv').config()

module.exports = {
    logoutHandler(req,res){

        const {tokenapp} = req.cookies()

        if(!tokenapp){
            res.status(500).json({error: 'No token provider'})
        }

        try {
            jwt.verify(tokenapp, process.env.ACCESS_TOKEN_JWTSECRET)
            const serialized = serialize('tokenapp', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 0,
                path: '/'
            })
            res.setHeader("Set-Cookie", serialized)
            res.status(200).json({msg: "logout successfully!"})
        } catch (error) {
            res.status(500).json(error)
        }

    }
}