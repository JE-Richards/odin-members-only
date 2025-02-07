// =========================
// INDEX ROUTER
// =========================
// This file defines the routes and middleware for the index page.
// It handles the HTTP requests for rendering the index page. The routes are
// connected to the controller functions to handle the request logic.
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
const indexController = require("../controllers/indexController");

// =========================
// 2. ROUTES
// =========================
const indexRouter = () => {
  const router = Router();

  router.get("/", indexController.getIndex);

  return router;
};

// =========================
// 3. EXPORT
// =========================
module.exports = indexRouter;
