// =========================
// MAKE ADMIN (SERVER-SIDE) VALIDATION
// =========================
// This script defines the server-side validation rules for the make admin form
// in the message board application. It uses `express-validator` to enforce
// input requirements and ensure data integrity before submission.
//
// Sections:
// 1. Validator
// 2. Export
// =========================

// =========================
// 1. VALIDATOR
// =========================
const { body } = require("express-validator");

const validateMakeAdmin = [
  body("adminPass")
    .trim()
    .notEmpty()
    .withMessage("Passcode must not be empty.")
    .isLength({ min: 3 })
    .withMessage("Passcode must be at least 3 characters.")
    .isLength({ max: 255 })
    .withMessage("Passcode must be less than 255 characters."),
];

// =========================
// 2. EXPORT
// =========================
module.exports = validateMakeAdmin;
