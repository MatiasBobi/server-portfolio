const jwt = require("jsonwebtoken")
require('dotenv').config()

const verifyJWT = (req, res, next) =>{
    const authHeader = req.header['authorization'];
    if(!authHeader) return res.status(401);
    
    try {
        const user = jwt.verify(authHeader, process.env.ACCESS_TOKEN_JWTSECRET)
        return res.json({email: user.email})
    } catch (error) {
        res.status(401).json({error: "Invalid token"})
    }


}