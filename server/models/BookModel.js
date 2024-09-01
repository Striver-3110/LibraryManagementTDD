const mongoose = require('mongoose');

// Define the schema for the 'Book' model
const BookSchema = mongoose.Schema({
    // ISBN of the book
    ISBN: {
        type: String,      // Data type of ISBN is a string
        required: true,    // ISBN is a mandatory field
        unique: true,      // ISBN must be unique across the collection
    },
    // Title of the book
    title: {
        type: String,      // Data type of title is a string
        required: true,    // Title is a mandatory field
    },
    // Author of the book
    author: {
        type: String,      // Data type of author is a string
        required: true,    // Author is a mandatory field
    },
    // Publication year of the book
    yearOfPublish: {
        type: Number,      // Data type of yearOfPublish is a number
        required: true,    // Year of publish is a mandatory field
    },
    // Availability status of the book
    available: {
        type: Boolean,     // Data type of available is a boolean
        required: true,    // Availability is a mandatory field
    },
    // Number of available copies of the book
    availableCopies: {
        type: Number,      // Data type of availableCopies is a number
        required: true,    // Available copies is a mandatory field
    }
});

// Create and export the 'Book' model based on the schema
module.exports = mongoose.model("Book", BookSchema);
