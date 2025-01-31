// =========================
// INDEX CONTROLLER
// =========================
// This controller handlers the logic for the index page.
//
// Sections:
// 1. Controller Functions
// 2. Export
// =========================

// =========================
// 1. CONTROLLER FUNCTIONS
// =========================
const getIndex = (req, res) => {
  res.render("index", { title: "The Odin Club" });
};

// =========================
// 2. EXPORT
// =========================
module.exports = {
  getIndex,
};
