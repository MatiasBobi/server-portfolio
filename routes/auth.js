const express = require("express")
const {check} = require("express-validator")
const {createUser, loginUser} = require("../controllers/userRegisterController")
const {logoutHandler} = require("../controllers/logoutController")
const router = express.Router()



router.post("/register",[
    check("username").not().isEmpty().withMessage("A username has not been sent"),
    check("password").not().isEmpty().withMessage("A password has not been sent"),
    check("email").not().isEmpty().isEmail().withMessage("invalid email"),
],createUser)

router.post("/login",[
    check("password").not().isEmpty().withMessage("A password has not been sent"),
    check("email", "Invalid email").isEmail()
],loginUser)

router.get("/logout", logoutHandler)
module.exports = router;