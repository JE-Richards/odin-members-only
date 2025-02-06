// =========================
// SIGN UP CONTROLLER
// =========================
// This controller handles the logic for the sign-up process, including
// rendering the sign-up page and processing the form submission.
// It interacts with the validation layer, handles potential validation errors,
// inserts new users into the database, and redirects on successful submission.
//
// Sections:
// 1. Setup
// 2. Controller Functions
//    2.1. getSignUpPage
//    2.2. postSignUp
// 3. Export
// =========================

// =========================
// 1. SETUP
// =========================
const validateSignUp = require("../validators/signUpValidator");
const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { insertNewUser } = require("../db/queries/insert/users");
const ValidationError = require("../errors/ValidationError");
const DatabaseError = require("../errors/DatabaseError");

// =========================
// 2. CONTROLLER FUNCTIONS
// =========================
// =========================
// 2.1. GETSIGNUPPAGE
// =========================
const getSignUpPage = (req, res) => {
  res.render("signUp", {
    title: "Sign up",
    errors: [],
    formData: {},
  });
};

// =========================
// 2.2. POSTSIGNUP
// =========================
const postSignUp = [
  validateSignUp,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    let formErrors = [];

    if (!errors.isEmpty()) {
      formErrors = errors.array();
    }

    try {
      await insertNewUser(req.body.username, req.body.email, req.body.password);

      // return to homepage if no errors occur
      res.redirect("/");
    } catch (err) {
      if (err instanceof ValidationError) {
        formErrors.push({ msg: err.message });
        return res.status(400).render("signUp", {
          title: "Sign up",
          errors: formErrors,
          formData: req.body,
        });
      }

      if (err instanceof DatabaseError) {
        return next(err);
      }

      // Pass unexpected errors to the global error handler
      next(err);
    }
  }),
];

// =========================
// 3. EXPORT
// =========================
module.exports = {
  getSignUpPage,
  postSignUp,
};
