const { check } = require('express-validator');

exports.validateBook = [
  check('ISBN').notEmpty().withMessage('ISBN is required'),
  check('title').notEmpty().withMessage('Title is required'),
  check('author').notEmpty().withMessage('Author is required'),
  check('yearOfPublish').isNumeric().withMessage('Year of publish must be a number'),
  check('available').isBoolean().withMessage('Available must be a boolean'),
  check('availableCopies').isInt({ min: 1 }).withMessage('Available copies must be a positive integer'),
];