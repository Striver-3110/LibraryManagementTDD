const { check } = require('express-validator');

/**
 * Middleware for validating book-related request data.
 * Uses express-validator to check the validity of request parameters.
 */
exports.validateBook = [
  // Validate the 'ISBN' field
  check('ISBN')
    .isString().withMessage('ISBN must be a string') // Ensure ISBN is a string
    .notEmpty().withMessage('ISBN is required'), // Ensure ISBN is provided

  // Validate the 'title' field
  check('title')
    .isString().withMessage('Title must be a string') // Ensure title is a string
    .notEmpty().withMessage('Title is required'), // Ensure title is provided

  // Validate the 'author' field
  check('author')
    .isString().withMessage('Author must be a string') // Ensure author is a string
    .notEmpty().withMessage('Author is required'), // Ensure author is provided

  // Validate the 'yearOfPublish' field
  check('yearOfPublish')
    .isNumeric().withMessage('Year of publish must be a number'), // Ensure year of publish is numeric

  // Validate the 'available' field
  check('available')
    .isBoolean().withMessage('Available must be a boolean'), // Ensure available is a boolean

  // Validate the 'availableCopies' field
  check('availableCopies')
    .isInt({ min: 1 }).withMessage('Available copies must be a positive integer'), // Ensure available copies is a positive integer
];
