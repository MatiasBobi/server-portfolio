const mongoose = require("mongoose")

const Schema = mongoose.Schema

const schema = new Schema({
    username:{
        type: String,
        require:true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

const userData = mongoose.model("newuser", schema)

module.exports = {userData}