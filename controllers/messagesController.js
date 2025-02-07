// =========================
// INDEX CONTROLLER
// =========================
// This controller handlers the logic for displayed messages.
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
const { deleteMessageById } = require("../db/queries/delete/messages");

// =========================
// 2. CONTROLLER FUNCTIONS
// =========================
const deleteMessage = asyncHandler(async (req, res, next) => {
  try {
    const messageId = req.params.id;
    await deleteMessageById(messageId);

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// =========================
// 3. EXPORT
// =========================
module.exports = {
  deleteMessage,
};
