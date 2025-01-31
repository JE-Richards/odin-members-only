// =========================
// SIGN UP CONTROLLER
// =========================
// This controller handles the logic for the sign-up process, including
// rendering the sign-up page and processing the form submission.
// It interacts with the validation layer, handles potential validation errors,
// and redirects on successful submission.
//
// Sections:
// 1. Setup
// 2. Controller Functions
// 3. Export
// =========================

// =========================
// 1. SETUP
// =========================
const validateSignUp = require("../validators/signUpValidator");
const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// =========================
// 2. CONTROLLER FUNCTIONS
// =========================
const getSignUpPage = (req, res) => {
  res.render("signUp", {
    title: "Sign up",
    errors: [],
    formData: {},
  });
};

const postSignUp = [
  validateSignUp,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("signUp", {
        title: "Sign up",
        errors: errors.array(),
        formData: req.body,
      });
    }

    res.redirect("/");
  }),
];

// =========================
// 3. EXPORT
// =========================
module.exports = {
  getSignUpPage,
  postSignUp,
};
