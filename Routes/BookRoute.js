const express = require('express')
const router = express.Router();

const {AddBookController, BorrowBookController} = require('../Controller/BookController')

router.post('/addNewBook', AddBookController)
router.post('/borrowBook', BorrowBookController)

module.exports = router;