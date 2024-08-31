const express = require('express')
const router = express.Router();

const {AddBookController, BorrowBookController,ReturnBookController} = require('../Controller/BookController')

router.post('/addNewBook', AddBookController)
router.post('/borrowBook', BorrowBookController)
router.post('/returnBook', ReturnBookController)

module.exports = router;