const { check } = require('express-validator');

/**
 * Middleware for validating the ISBN field in the request.
 */
exports.validationISBN = [
  // Validate that the 'ISBN' field is a string
  check('ISBN')
    .isString().withMessage('ISBN must be a string') // Ensure ISBN is of type string
    .notEmpty().withMessage('ISBN is required') // Ensure ISBN is not empty
    .matches(/^(ISBN\s)?\d{8,13}$/).withMessage('Invalid ISBN format'),
];
