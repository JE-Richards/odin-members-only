// =========================
// PASSPORT.JS CONFIG - LOCAL STRATEGY (AUTHENTICATION)
// =========================
// This file sets up Passport with a local strategy for handling user login,
// using the username and password to authenticate users.
//
// Sections:
// 1. Setup and Imports
// 2. Local Strategy - Authentication Logic
// 3. Serialize and Deserialize User
// 4. Export
// =========================

// =========================
// 1. SETUP AND IMPORTS
// =========================
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const {
  findUserByUsername,
  findUserById,
} = require("../db/queries/select/users");
const NotFoundError = require("../errors/NotFoundError");
const bcrypt = require("bcryptjs");

// =========================
// 2. LOCAL STRATEGY - AUTHENTICATION LOGIC
// =========================
// This section configures Passport's LocalStrategy to handle login authentication
// using the username and password provided by the user. It checks the database
// for a matching username, compares the provided password with the stored hash,
// and returns an appropriate result.
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await findUserByUsername(username);

      if (!user) {
        return done(null, false, { message: `User ${username} not found.` });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "Password is incorrect." });
      }

      return done(null, user);
    } catch (err) {
      // NotFoundError is thrown by findUserByUsername if the username doesn't exist
      if (err instanceof NotFoundError) {
        return done(null, false, { message: `User ${username} not found.` });
      }
      return done(err);
    }
  })
);

// =========================
// 3. SERIALIZE AND DESERIALIZE USER
// =========================
// The following methods manage user data across requests by storing a unique
// identifier (user id) in the session and retrieving the user object for each request.

passport.serializeUser((user, done) => {
  // Store the user id in session for subsequent requests
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    // Retrieve the user from the database based on the stored id (from serialize)
    const user = await findUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// =========================
// 2. EXPORT
// =========================
module.exports = passport;
