// =========================
// CREATE POST CONTROLLER
// =========================
// This controller handles the logic for the creating a new post process,
// including rendering the create post page and processing the form submission.
// It interacts with the validation layer, handles potential validation errors,
// inserts new messages into the database, and redirects on successful
// submissions.
//
// Sections:
// 1. Setup
// 2. Controller Functions
//    2.1. getCreatePostPage
//    2.2. postCreatePost
// 3. Export
// =========================

// =========================
// 1. SETUP
// =========================
const asyncHandler = require("express-async-handler");
const validateCreatePost = require("../validators/createPostValidator");
const { validationResult } = require("express-validator");
const { insertNewMessage } = require("../db/queries/insert/messages");
const DataIntegrityError = require("../errors/DataIntegrityError");

// =========================
// 2. CONTROLLER FUNCTIONS
// =========================
// =========================
// 2.1. GETCREATEPOSTPAGE
// =========================
const getCreatePostPage = (req, res) => {
  res.render("createPost", {
    title: "Create Post",
    errors: [],
    formData: {},
  });
};

// =========================
// 2.2. POSTCREATEPOST
// =========================
const postCreatePost = [
  validateCreatePost,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    let formErrors = [];

    if (!errors.isEmpty()) {
      formErrors = errors.array();
    }

    try {
      await insertNewMessage(
        req.body.postTitle,
        req.body.postMessage,
        req.user.id
      );

      // return to homepage if no errors occur
      res.redirect("/");
    } catch (err) {
      // Console log for debugging
      console.log("Error inserting message: ", err);

      // Data integrity or database errors shouldn't pass error message directly to user
      // Instead provide a more user friendly error message
      if (err instanceof DataIntegrityError) {
        return res.status(500).render("createPost", {
          title: "Create Post",
          errors: [{ msg: "An unexpected error occurred. Please try again." }],
          formData: req.body,
        });
      }

      if (err instanceof DatabaseError) {
        return res.status(503).render("createPost", {
          title: "Create Post",
          errors: [{ msg: "Service unavailable. Please try again later." }],
          formData: req.body,
        });
      }

      // Send all other unexpected errors to global error handler
      next(err);
    }
  }),
];

// =========================
// 3. EXPORT
// =========================
module.exports = {
  getCreatePostPage,
  postCreatePost,
};
