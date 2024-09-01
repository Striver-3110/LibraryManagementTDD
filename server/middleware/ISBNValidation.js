const { check } = require('express-validator');

exports.validationISBN = [
  check('ISBN')
    .isString().withMessage('ISBN must be a string')
    .notEmpty().withMessage('ISBN is required'),
];
