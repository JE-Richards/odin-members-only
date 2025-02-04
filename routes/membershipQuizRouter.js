// =========================
// MEMBERSHIP QUIZ ROUTER
// =========================
// This file defines the routes and middleware for the membership quiz process.
// It handles the HTTP requests for rendering the membership quiz page and
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
const membershipQuizController = require("../controllers/membershipQuizController");

// =========================
// 2. ROUTES
// =========================
const membershipQuizRouter = () => {
  const router = Router();

  router.get("/", ensureUserAuth, (req, res) =>
    membershipQuizController.getMembershipQuizPage(req, res)
  );

  router.post("/", ensureUserAuth, (req, res, next) =>
    membershipQuizController.postMembershipQuiz(req, res, next)
  );

  return router;
};

// =========================
// 3. EXPORT
// =========================
module.exports = membershipQuizRouter;
