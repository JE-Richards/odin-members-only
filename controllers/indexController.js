// =========================
// INDEX CONTROLLER
// =========================
// This controller handlers the logic for the index page.
//
// Sections:
// 1. Setup
// 2. Controller Functions
// 3. Export
// =========================

// =========================
// 1. SETUP
// =========================
const asyncHandler = require("express-async-handler");
const { getAllMessagesWithAuthor } = require("../db/queries/select/messages");

// =========================
// 2. CONTROLLER FUNCTIONS
// =========================
const getIndex = asyncHandler(async (req, res, next) => {
  let messages;

  try {
    messages = await getAllMessagesWithAuthor();
  } catch (err) {
    console.log("Error retrieving messages: ", err);
    return res.render("index", { title: "The Odin Club", messages: [] });
  }

  if (!messages) {
    return res.render("index", { title: "The Odin Club", messages: [] });
  }

  return res.render("index", { title: "The Odin Club", messages });
});

// =========================
// 2. EXPORT
// =========================
module.exports = {
  getIndex,
};
