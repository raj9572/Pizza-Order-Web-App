const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
  name:{
    type:String,
    required:[true,"name is required"]
  },
  email:{
    type:String,
    required:[true,"Email is required"],
  },
  password:{
    type:String,
    required:[true,"Password is required"]
  },
  isAdmin:{
    type:Boolean,
    default:false
  },


},{timestamps:true});

module.exports =  mongoose.model("user",userSchema)