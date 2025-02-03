// =========================
// LOGOUT CONTROLLER
// =========================
// This controller handles the logic for the user logout process.
//
// Sections:
// 1. Controller Functions
//     1.1. getLogout
// 2. Export
// =========================

// =========================
// 1. CONTROLLER FUNCTIONS
// =========================
// =========================
// 1.1. GETLOGOUT
// =========================
const getLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
};

// =========================
// 2. EXPORT
// =========================
module.exports = { getLogout };
