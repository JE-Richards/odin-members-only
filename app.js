// =========================
// APP.JS - MAIN SERVER SETUP
// =========================
// This file sets up the Express server for the message board application,
// imports required middleware, and defines the routing for the application.
//
// Sections:
// 1. Setup and Imports
// 2. Middleware Configuration
// 3. Route Configuration
// 4. Server Start
// =========================

// =========================
// 1. SETUP AND IMPORTS
// =========================
// Load environment variables from .env
require("dotenv").config();

// Import required dependencies
const express = require("express");
const path = require("node:path");
const session = require("express-session");
const passport = require("./config/passport");
const indexRouter = require("./routes/indexRouter");
const signUpRouter = require("./routes/signUpRouter");
const loginRouter = require("./routes/loginRouter");
const logoutRouter = require("./routes/logoutRouter");
const membershipQuizRouter = require("./routes/membershipQuizRouter");
const createPostRouter = require("./routes/createPostRouter");
const DatabaseError = require("./errors/DatabaseError");

// Create an instance of the Express app
const app = express();

// =========================
// 2. MIDDLEWARE CONFIGURATION
// =========================
// Set up template engine for EJS and define template directory
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware to parse URL-encoded data, required for form submissions
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files from 'public' folder (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Passport set up for user authentication
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Set up to ensure a logged in user is available across all views
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// =========================
// 3. ROUTE CONFIGURATION
// =========================
app.use("/sign-up", signUpRouter());
app.use("/login", loginRouter());
app.use("/logout", logoutRouter());
app.use("/membership-quiz", membershipQuizRouter());
app.use("/create-post", createPostRouter());
app.use("/", indexRouter());

// catching non-existant pages
app.use((req, res, next) => {
  const err = new Error("The page you are looking for does not exist.");
  err.statusCode = 404;
  next(err);
});

// global error middleware
app.use((err, req, res, next) => {
  if (err instanceof DatabaseError) {
    return res.status(500).render("error", {
      title: "Error",
      error: "Something went wrong. Please try again later.",
    });
  }

  res.status(err.statusCode || 500).render("error", {
    title: "Error",
    error: err.message || "Internal Server Error",
  });
});

// =========================
// 4. SERVER START
// =========================
app.listen(process.env.PORT, () => {
  console.log(
    `Express app - listening on ${process.env.HOST}:${process.env.PORT}`
  );
});
