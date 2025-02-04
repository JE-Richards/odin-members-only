// =========================
// MEMBERSHIP QUIZ CONTROLLER
// =========================
// This controller handles the logic for the membership quiz process, including
// rendering the membership quiz page and processing the quiz form submission.
//
// Sections:
// 1. Setup
// 2. Controller Functions
//    2.1. getMembershipQuizPage
//    2.2. postMembershipQuiz
// 3. Export
// =========================

// =========================
// 1. SETUP
// =========================
const { updateUserRole } = require("../db/queries/update/users");
const asyncHandler = require("express-async-handler");
const NotFoundError = require("../errors/NotFoundError");
const DatabaseError = require("../errors/DatabaseError");
const DataIntegrityError = require("../errors/DataIntegrityError");

// =========================
// 2. CONTROLLER FUNCTIONS
// =========================
// =========================
// 2.1. GETMEMBERSHIPQUIZPAGE
// =========================
const getMembershipQuizPage = (req, res) => {
  res.render("membershipQuiz", {
    title: "Membership Quiz",
    errors: [],
  });
};

// =========================
// 2.2. POSTMEMBERSHIPQUIZ
// =========================
const postMembershipQuiz = asyncHandler(async (req, res, next) => {
  const { membershipQuestion } = req.body;

  if (membershipQuestion !== "194") {
    return res.render("membershipQuiz", {
      title: "Membership Quiz",
      errors: [{ msg: "Incorrect answer, please try again." }],
    });
  }

  try {
    const userId = req.user.id;
    const roleTitle = "member";

    await updateUserRole(userId, roleTitle);

    // return to homepage if no errors occur
    res.redirect("/");
  } catch (err) {
    console.log(err);

    if (
      err instanceof NotFoundError ||
      err instanceof DatabaseError ||
      err instanceof DataIntegrityError
    ) {
      res.status(500).render("membershipQuiz", {
        title: "Membership Quiz",
        errors: [{ msg: "Internal server error, please try again later." }],
      });
    }

    next(err);
  }
});

// =========================
// 3. EXPORT
// =========================
module.exports = { getMembershipQuizPage, postMembershipQuiz };
