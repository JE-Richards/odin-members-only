// =========================
// LOGIN CONTROLLER
// =========================
// This controller handles the logic for the user login process, including
// rendering the login page and processing the login form submission.
// It interacts with the validation layer, handles potential validation errors,
// and Passport for authentication.
//
// Sections:
// 1. Setup
// 2. Controller Functions
//    2.1. getLoginPage
//    2.2. postLogin
// 3. Export
// =========================

// =========================
// 1. SETUP
// =========================
const passport = require("passport");
const validateLogin = require("../validators/loginValidator");
const { validationResult } = require("express-validator");

// =========================
// 2. CONTROLLER FUNCTIONS
// =========================
// =========================
// 2.1. GETLOGINPAGE
// =========================
const getLoginPage = (req, res) => {
  res.render("login", {
    title: "Login",
    errors: [],
    formData: {},
  });
};

// =========================
// 2.2. POSTLOGIN
// =========================
const postLogin = [
  validateLogin,
  (req, res, next) => {
    const errors = validationResult(req);
    let formErrors = [];

    if (!errors.isEmpty()) {
      formErrors = errors.array();
      return res.status(404).render("login", {
        title: "login",
        errors: formErrors,
        formData: req.body,
      });
    }

    passport.authenticate("local", async (err, user, info) => {
      if (err) {
        return next(err);
      }

      console.log(info);

      // If no user or any other errors
      if (!user) {
        // info.message should contain errors raised by the SQL queries
        formErrors.push({
          msg: info.message || "Invalid username or password.",
        });

        return res.status(401).render("login", {
          title: "Login",
          errors: formErrors,
          formData: req.body,
        });
      }

      // If login successful
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }

        // if the user doesn't have a role, redirect to the membership quiz to gain a role
        if (!user.role_id) {
          return res.redirect("/membership-quiz");
        }

        // if user has a role, redirect to index
        return res.redirect("/");
      });
    })(req, res, next);
  },
];

// =========================
// 3. EXPORT
// =========================
module.exports = { getLoginPage, postLogin };
