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
const indexRouter = require("./routes/indexRouter");
const signUpRouter = require("./routes/signUpRouter");
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

// =========================
// 3. ROUTE CONFIGURATION
// =========================
app.use("/sign-up", signUpRouter());
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
