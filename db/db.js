const mongoose = require("mongoose")
require('dotenv').config()
const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.DATABASE_ACCESS)
        console.log("Conexion exitosa con la base de datos.")
    } catch {
        console.log("Error al intentar conectar con la base de datos.")
    }
    
}
module.exports = {connectDB}
