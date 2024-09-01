const express = require("express");
const router = express.Router();

const {
  AddBookController,
  BorrowBookController,
  ReturnBookController,
  allAvailableBooks,
  allBooks,
} = require("../Controller/BookController");

router.post("/addNewBook", AddBookController);
router.post("/borrowBook", BorrowBookController);
router.post("/returnBook", ReturnBookController);
router.get("/viewAvailableBooks", allAvailableBooks);
router.get("/viewAllBooks", allBooks);

module.exports = router;