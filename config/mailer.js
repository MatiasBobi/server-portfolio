const nodemailer = require('nodemailer')

//USAR DOTENV PARA USER Y PASS
 const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: process.env.MAIL, 
      pass: process.env.PASSWORD_NODEMAILER_APP, 
    },
  });

  transporter.verify().then(() =>{
    console.log("Ready for send emails.")
  })

  module.exports = transporter