
const transporter = require('../config/mailer')
const {validationResult} = require("express-validator")

module.exports = {
    async sendMail (req, res){
        try {
          const err = validationResult(req)
            if(err.isEmpty()){
              await transporter.sendMail({
                from: `<${req.body.from}>`,
                to: `stncs00@gmail.com`, 
                subject: `${req.body.subject}`, 
                html: `
                <h1> Te llego un mail con la siguiente descripcion: </h1><br>
                <p>${req.body.description} y ${req.body.from}</p>
                
                `,
              }, (error, info) =>{
                if(error) res.status(500).json({msg: "Hubo un error al intentar enviar el mail", isError: true})
                res.status(200).json({msg: "El mail fue enviado exitosamente", isError: false})
              });
              
            } else {
              res.status(500).json(err.errors)
            }

        } catch (error) {
          res.status(500).json({msg: "Error: el servidor no responde", isError: true})
        }
    }
}