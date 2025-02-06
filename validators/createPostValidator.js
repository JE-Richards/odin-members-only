// =========================
// CREATE POST (SERVER-SIDE) VALIDATION
// =========================
// This script defines the server-side validation rules for the create post form
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

const emptyErr = "must not be empty.";

const validateCreatePost = [
  body("postTitle")
    .trim()
    .notEmpty()
    .withMessage(`Message title ${emptyErr}`)
    .isLength({ min: 3 })
    .withMessage("Message title must be at least 3 characters.")
    .isLength({ max: 255 })
    .withMessage("Message title must be less than 255 characters."),
  body("postMessage")
    .trim()
    .notEmpty()
    .withMessage(`Message ${emptyErr}`)
    .isLength({ min: 3 })
    .withMessage("Message must be at least 3 characters.")
    .isLength({ max: 1000 })
    .withMessage("Message must be less than 1,000 characters."),
];

// =========================
// 2. EXPORT
// =========================
module.exports = validateCreatePost;
