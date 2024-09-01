const express = require("express");
const router = express.Router();
const {validateBook} = require('../middleware/AddBookValidation')
const {validationISBN} = require('../middleware/ISBNValidation')

const {
  AddBookController,
  BorrowBookController,
  ReturnBookController,
  allAvailableBooks,
  allBooks,
} = require("../Controller/BookController");

router.post('/addNewBook', validateBook, AddBookController);
router.post("/borrowBook", validationISBN, BorrowBookController);
router.post("/returnBook", validationISBN, ReturnBookController);
router.get("/viewAvailableBooks", allAvailableBooks);
router.get("/viewAllBooks", allBooks);

module.exports = router;