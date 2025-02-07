// =========================
// MAKE ADMIN CONTROLLER
// =========================
// This controller handles the logic for the 'make admin' process, including
// rendering the page and processing the form submission.
// It interacts with the validation layer, handles potential validation errors,
// updates user role_id, and redirects on successful submission.
//
// Sections:
// 1. Setup
// 2. Controller Functions
//    2.1. getMakeAdminPage
//    2.2. postMakeAdmin
// 3. Export
// =========================

// =========================
// 1. SETUP
// =========================
const { validationResult } = require("express-validator");
const validateMakeAdmin = require("../validators/makeAdminValidator");
const asyncHandler = require("express-async-handler");
const { updateUserRole } = require("../db/queries/update/users");
const NotFoundError = require("../errors/NotFoundError");
const DatabaseError = require("../errors/DatabaseError");
const DataIntegrityError = require("../errors/DataIntegrityError");

// =========================
// 2. CONTROLLER FUNCTIONS
// =========================
// =========================
// 2.1. GETMAKEADMINPAGE
// =========================
const getMakeAdminPage = (req, res) => {
  res.render("makeAdmin", {
    title: "Make Admin",
    errors: [],
  });
};

// =========================
// 2.2. POSTMAKEADMIN
// =========================
const postMakeAdmin = [
  validateMakeAdmin,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const { adminPass } = req.body;

    let formErrors = [];

    if (!errors.isEmpty()) {
      formErrors = errors.array();
    }

    console.log("passCode: ", adminPass);
    console.log("env: ", process.env.ADMIN_PASSCODE);
    if (adminPass !== process.env.ADMIN_PASSCODE) {
      return res.render("makeAdmin", {
        title: "Make Admin",
        errors: [{ msg: "Incorrect answer, please try again." }],
      });
    }

    try {
      const userId = req.user.id;
      const roleTitle = "admin";

      await updateUserRole(userId, roleTitle);

      res.redirect("/");
    } catch (err) {
      console.log(err);

      if (
        err instanceof NotFoundError ||
        err instanceof DatabaseError ||
        err instanceof DataIntegrityError
      ) {
        res.status(500).render("makeAdmin", {
          title: "Make Admin",
          errors: [{ msg: "Internal server error, please try again later." }],
        });
      }

      next(err);
    }
  }),
];

// =========================
// 3. EXPORT
// =========================
module.exports = {
  getMakeAdminPage,
  postMakeAdmin,
};
