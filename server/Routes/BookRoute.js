const express = require("express"); // Import the Express module
const router = express.Router(); // Create an instance of an Express router

// Import middleware for validating book data and ISBN
const { validateBook } = require('../middleware/AddBookValidation');
const { validationISBN } = require('../middleware/ISBNValidation');

// Import controllers for handling book-related operations
const {
  AddBookController,
  BorrowBookController,
  ReturnBookController,
  allAvailableBooks,
  allBooks,
} = require("../Controller/BookController");

// Route for adding a new book
// Uses validateBook middleware to validate request data before calling AddBookController
router.post('/addNewBook', validateBook, AddBookController);

// Route for borrowing a book
// Uses validationISBN middleware to validate the ISBN before calling BorrowBookController
router.post("/borrowBook", validationISBN, BorrowBookController);

// Route for returning a book
// Uses validationISBN middleware to validate the ISBN before calling ReturnBookController
router.post("/returnBook", validationISBN, ReturnBookController);

// Route for viewing all available books
router.get("/viewAvailableBooks", allAvailableBooks);

// Route for viewing all books in the library
router.get("/viewAllBooks", allBooks);

// Export the router to be used in the main application
module.exports = router;
