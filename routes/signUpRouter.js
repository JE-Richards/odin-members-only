// =========================
// SIGN UP ROUTER
// =========================
// This file defines the routes and middleware for the sign-up process.
// It handles the HTTP requests for rendering the sign-up page and processing
// the form submission. The routes are connected to the controller functions
// to handle the request logic and validation.
//
// Sections:
// 1. Set up
// 2. Routes
// 3. Export
// =========================

// =========================
// 1. SET UP
// =========================
const { Router } = require("express");
const signUpController = require("../controllers/signUpController");

// =========================
// 2. ROUTES
// =========================
const signUpRouter = () => {
  const router = Router();

  router.get("/", (req, res) => signUpController.getSignUpPage(req, res));

  router.post("/", signUpController.postSignUp);

  return router;
};

// =========================
// 3. EXPORT
// =========================
module.exports = signUpRouter;
