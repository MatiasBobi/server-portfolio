const express = require("express")
const {check} = require("express-validator")
const router = express.Router()

const {sendMail} = require("../controllers/sendEmailController.js")

router.post("/sendmail", [
    check("subject").not().isEmpty().withMessage("The subject wasn't entered"),
    check("from").isEmail().withMessage('Mail not valid'),
    check("description").not().isEmpty().withMessage("Description not entered")
], sendMail)

module.exports = router;