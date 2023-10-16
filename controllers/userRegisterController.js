const { validationResult } = require("express-validator")
const { userData } = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { serialize } = require("cookie")
require('dotenv').config()
module.exports = {
    async createUser(req, res) {
        try {
            const err = validationResult(req)
            const { username, email, password } = req.body
            const duplicateMail = await userData.findOne({ email: email })
            const duplicateUsername = await userData.findOne({ username: username })
            if (err.isEmpty()) {
                if (duplicateMail) {
                    res.status(409).json({ errMsg: "Mail already exists." })
                } else
                    if (duplicateUsername) {
                        res.status(409).json({ errMsg: "Username already exists." })
                    } else {
                        const passHashed = await bcrypt.hash(password, 10)
                        const userInfo = {
                            username: username,
                            email: email,
                            password: passHashed
                        }
                        const accessToken = jwt.sign({
                            "username": username,
                            "mail": email
                        }, process.env.ACCESS_TOKEN_JWTSECRET, {
                            expiresIn: '24h'
                        })
                        const serialized = serialize('tokenapp', accessToken, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production',
                            sameSite: 'strict',
                            maxAge: 1000 * 60 * 60 * 24 * 30,
                            path: '/'
                        })
                        const user = new userData(userInfo)
                        await user.save()
                        res.setHeader("Set-Cookie", serialized).status(201).json({
                            userInfo: {
                                "username": username,
                                "mail": email
                            }, token: accessToken
                        })
                    }
            } else {
                res.status(501).json(err)
            }
        } catch (error) {
            res.status(501).json({ errorMsg: error.message })
        }
    },

    async loginUser(req, res) {
        try {
            const err = validationResult(req)
            const { email, password } = req.body
            const foundUser = await userData.findOne({ email: email })

            if (err.isEmpty()) {
                if (!foundUser) {
                    res.status(501).json({ errMsg: "mail not exists." })
                } else {
                    const matchPassword = await bcrypt.compare(password, foundUser.password)
                    if (matchPassword) {
                        const accessToken = jwt.sign({
                            "username": foundUser.username,
                            "mail": foundUser.email
                        }, process.env.ACCESS_TOKEN_JWTSECRET, {
                            expiresIn: '24h'
                        })
                        const serialized = serialize('tokenapp', accessToken, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production',
                            sameSite: 'strict',
                            maxAge: 1000 * 60 * 60 * 24 * 30,
                            path: '/'
                        })
                        res.setHeader("Set-Cookie", serialized).status(201).json({
                            userInfo: {
                                "username": foundUser.username,
                                "mail": foundUser.email
                            }, token: accessToken
                        })
                    } else {
                        res.status(501).json({ msg: "Invalid password" })
                    }
                }
            } else {
                res.status(501).json(err)
            }
        } catch (error) {
            res.status(501).json({ errorMsg: error.message })
        }
    }

}