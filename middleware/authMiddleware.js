function ensureUserAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function requireMembership(req, res, next) {
  if (!req.user || !req.user.role_id) {
    throw new Error("Access Denied: You must be a member to access this page.");
  }
  next();
}

function requireAdmin(req, res, next) {
  if (!req.user || req.user.role_id !== 1) {
    throw new Error(
      "Access Denied: You must be an admin to perform this action."
    );
  }
  next();
}

module.exports = { ensureUserAuth, requireMembership, requireAdmin };
