// =========================
// INSERT USERS QUERIES
// =========================
// This module contains functions for interacting with the database to insert
// new users. It provides a specific function to insert a new user into the
// `users` table, handling the insertion logic as well as ensuring no duplicate
// usernames or emails are added.
//
// Sections:
// 1. Set up
// 2. Queries
//     2.1. InsertNewUser
// 3. Export
// =========================

// =========================
// 1. SET UP
// =========================
const pool = require("../../pool");
const bcrypt = require("bcryptjs");
const ValidationError = require("../../../errors/ValidationError");
const DatabaseError = require("../../../errors/DatabaseError");

// =========================
// 2. QUERIES
// =========================
// =========================
// 2.1. INSERTNEWUSER
// Key functionality:
// - Hashing the user's password before inserting into the database.
// - Using transactions to ensure atomicity and data consistency.
// - Managing unique constraint violations and providing specific error messages
//   for username and email conflicts.
// =========================
async function insertNewUser(username, email, password) {
  let client;

  // connection can fail - handle failure gracefully
  try {
    client = await pool.connect();
  } catch (err) {
    throw new DatabaseError("Failed to connect to the database.");
  }

  try {
    await client.query("BEGIN");

    // Check if username or email already exist in the database
    const checkQuery = `
      SELECT id, username, email
      FROM users
      WHERE username = ($1) OR email = ($2)
    `;

    const result = await client.query(checkQuery, [username, email]);

    let errorMessages = [];

    if (result.rows.length > 0) {
      const existingUsername = result.rows.filter(
        (row) => row.username === username
      );
      const existingEmail = result.rows.filter((row) => row.email === email);

      if (existingUsername.length > 0) {
        errorMessages.push("Username is already taken.");
      }
      if (existingEmail.length > 0) {
        errorMessages.push("Email is already registered.");
      }
    }

    if (errorMessages.length > 0) {
      throw new ValidationError(errorMessages.join(" "));
    }

    // Proceed with inserting user
    const insertQuery = `
      INSERT INTO USERS (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, username, email
    `;
    const hashedPassword = await bcrypt.hash(password, 10);

    const { rows } = await client.query(insertQuery, [
      username,
      email,
      hashedPassword,
    ]);

    if (rows.length === 0) {
      throw new Error("User already exists with this username or email.");
    }

    await client.query("COMMIT");
    return rows[0];
  } catch (err) {
    await client.query("ROLLBACK");

    if (!(err instanceof ValidationError)) {
      throw new DatabaseError(
        "Database error occurred while insterting a new user."
      );
    }

    console.error("Error during database operation: ", err);
    throw err;
  } finally {
    client.release();
  }
}

// =========================
// 3. EXPORT
// =========================
module.exports = {
  insertNewUser,
};
