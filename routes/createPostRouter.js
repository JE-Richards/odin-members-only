// =========================
// CREATE POST ROUTER
// =========================
// This file defines the routes and middleware for the create post process.
// It handles the HTTP requests for rendering the create post page and
// processing the form submission. The routes are connected to the controller
// functions to handle the request logic and validation.
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
const createPostController = require("../controllers/createPostController");
const { requireMembership } = require("../middleware/authMiddleware");

// =========================
// 2. ROUTES
// =========================
const createPostRouter = () => {
  const router = Router();

  router.get("/", requireMembership, createPostController.getCreatePostPage);

  router.post("/", requireMembership, createPostController.postCreatePost);

  return router;
};

// =========================
// 3. EXPORT
// =========================
module.exports = createPostRouter;
