const { check } = require('express-validator');

exports.validateBook = [
  check('ISBN')
    .isString().withMessage('ISBN must be a string')
    .notEmpty().withMessage('ISBN is required'),
  check('title')
    .isString().withMessage('Title must be a string')
    .notEmpty().withMessage('Title is required'),
  check('author')
    .isString().withMessage('Author must be a string')
    .notEmpty().withMessage('Author is required'),
  check('yearOfPublish')
    .isNumeric().withMessage('Year of publish must be a number'),
  check('available')
    .isBoolean().withMessage('Available must be a boolean'),
  check('availableCopies')
    .isInt({ min: 1 }).withMessage('Available copies must be a positive integer'),
];
