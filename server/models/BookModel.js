const mongoose = require('mongoose');

const Book = mongoose.Schema({
    ISBN:{
        type:String,
        required:true,
        unique:true,
    },
    title:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    yearOfPublish:{
        type:Number,
        required:true,
    },
    available:{
        type:Boolean,
        required:true,
    },
    availableCopies:{
        type:Number,
        required:true,
    }
})

module.exports = mongoose.model("Book",Book);