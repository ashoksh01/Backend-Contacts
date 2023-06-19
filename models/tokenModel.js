const mongoose  = require("mongoose")

const TokenSchema = mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId ,
        ref:'User'
    },
    token:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Token" , TokenSchema)