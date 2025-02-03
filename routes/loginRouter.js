// =========================
// LOGIN ROUTER
// =========================
// This file defines the routes and middleware for the login page.
// It handles the HTTP requests for rendering the login page and processing the
// form submission. The routes are connected to the controller functions to
// handle the request logic and validation.
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
const loginController = require("../controllers/loginController");

// =========================
// 2. ROUTES
// =========================
const loginRouter = () => {
  const router = Router();

  router.get("/", loginController.getLoginPage);

  // Need to spread the postLogin array because
  router.post("/", loginController.postLogin);

  return router;
};

// =========================
// 3. EXPORT
// =========================
module.exports = loginRouter;
