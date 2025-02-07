// =========================
// MAKE ADMIN ROUTER
// =========================
// This file defines the routes and middleware for the 'make admin' process.
// It handles the HTTP requests for rendering the make admin page and
// processing the form submission. The routes are connected to the controller
// functions to handle the request logic.
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
const { ensureUserAuth } = require("../middleware/authMiddleware");
const makeAdminController = require("../controllers/makeAdminController");

// =========================
// 2. ROUTES
// =========================
const makeAdminRouter = () => {
  const router = Router();

  router.get("/", ensureUserAuth, makeAdminController.getMakeAdminPage);

  router.post("/", ensureUserAuth, makeAdminController.postMakeAdmin);

  return router;
};

// =========================
// 3. EXPORT
// =========================
module.exports = makeAdminRouter;
