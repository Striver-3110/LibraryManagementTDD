const express = require('express')
const router = express.Router();

const {AddBookController} = require('../Controller/BookController')

router.post('/addNewBook', AddBookController)

module.exports = router;