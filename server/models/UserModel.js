const {model , Schema} = require('mongoose');

const User = Schema({
  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
  },
  date:{
    type:Date,
    default:Date.now,
  },
    
});


module.exports = model('User', User);