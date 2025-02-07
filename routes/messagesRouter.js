// =========================
// MESSAGES ROUTER
// =========================
// This file defines the routes and middleware for messages.
// The routes are connected to the controller functions to handle the request
// logic.
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
const messagesController = require("../controllers/messagesController");
const { requireAdmin } = require("../middleware/authMiddleware");

// =========================
// 2. ROUTES
// =========================
const messagesRouter = () => {
  const router = Router();

  router.delete("/:id", requireAdmin, messagesController.deleteMessage);

  return router;
};

// =========================
// 3. EXPORT
// =========================
module.exports = messagesRouter;
