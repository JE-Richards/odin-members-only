// =========================
// LOGIN (SERVER-SIDE) VALIDATION
// =========================
// This script defines the server-side validation rules for the login form in
// the message board application. It uses `express-validator` to enforce
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

const emptyErr = "must not be empty.";

const validateLogin = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage(`Username ${emptyErr}`)
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters")
    .isLength({ max: 20 })
    .withMessage("Username must be less than 20 characters.")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage(
      "Username can only contain letters, numbers, underscores (_), and dashes (-)."
    ),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(`Password ${emptyErr}`)
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
];

// =========================
// 2. EXPORT
// =========================
module.exports = validateLogin;
