// =========================
// LOGIN ROUTER
// =========================
// This file defines the routes and middleware for the logout process.
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
const logoutController = require("../controllers/logoutController");

// =========================
// 2. ROUTES
// =========================
const logoutRouter = () => {
  const router = Router();

  router.get("/", logoutController.getLogout);

  return router;
};

// =========================
// 3. EXPORT
// =========================
module.exports = logoutRouter;
