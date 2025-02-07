// =========================
// UPDATE USERS QUERIES
// =========================
// This module contains functions for interacting with the database to update
// the users table.
//
// Sections:
// 1. Set up
// 2. Queries
//     2.1. updateUserRole
//     2.2. updateUserLastLoggedIn
//     2.3. updateUserLastPosted
// 3. Export
// =========================

// =========================
// 1. SET UP
// =========================
const pool = require("../../pool");
const DatabaseError = require("../../../errors/DatabaseError");
const NotFoundError = require("../../../errors/NotFoundError");
const DataIntegrityError = require("../../../errors/DataIntegrityError");

// =========================
// 2. QUERIES
// =========================
// =========================
// 2.1. UPDATEUSERROLE
// Key functionality:
// - Find a users role in the users database
// - The role_id given to a user is crossreferenced with the roles table
// - Return NotFoundError if user doesn't exist
// - Includes a DataIntegrityError safeguard
// =========================
async function updateUserRole(userId, roleTitle) {
  let client;

  try {
    client = await pool.connect();
  } catch (err) {
    throw new DatabaseError("Failed to connect to the database.");
  }

  try {
    await client.query("BEGIN");

    const updateQuery = `
      UPDATE users
      SET role_id = (SELECT id FROM roles WHERE role_title = ($1))
      WHERE id = ($2);
    `;

    const result = await client.query(updateQuery, [roleTitle, userId]);

    // Should never trigger as app logic dictates a user must be logged in when this query would execute
    if (result.rowCount === 0) {
      throw new NotFoundError(`User ${userId} not found, cannot update role.`);
    }

    // Should never trigger as userId is a primary key, but included as a safeguard
    if (result.rowCount > 1) {
      throw new DataIntegrityError(
        "Critical error: Multiple users affected by role update. Expected only one."
      );
    }

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");

    console.log("Error during database operation: ", err);
    throw err;
  } finally {
    client.release();
  }
}

// =========================
// 2.2. UPDATEUSERLASTLOGGEDIN
// Key functionality:
// - Updates a users `last_logged_in` with the current datetime `NOW()`
// - Return NotFoundError if user doesn't exist
// - Includes a DataIntegrityError safeguard
// =========================
async function updateUserLastLoggedIn(userId) {
  let client;

  try {
    client = await pool.connect();
  } catch (err) {
    throw new DatabaseError("Failed to connect to the database.");
  }

  try {
    await client.query("BEGIN");

    const updateQuery = `
      UPDATE users
      SET last_logged_in = NOW()
      WHERE id = ($1);
    `;

    const result = await client.query(updateQuery, [userId]);

    // Should never trigger as app logic dictates a user must be logged in when this query would execute
    if (result.rowCount === 0) {
      throw new NotFoundError(
        `User ${userId} not found, cannot update last_logged_in.`
      );
    }

    // Should never trigger as userId is a primary key, but included as a safeguard
    if (result.rowCount > 1) {
      throw new DataIntegrityError(
        "Critical error: Multiple users affected by role update. Expected only one."
      );
    }

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");

    console.log("Error during database operation: ", err);
    throw err;
  } finally {
    client.release();
  }
}

// =========================
// 2.3. UPDATEUSERLASTPOSTED
// Key functionality:
// - Updates a users `last_posted` with the datetime a post is created at
// - Return NotFoundError if user doesn't exist
// - Includes a DataIntegrityError safeguard
// =========================
async function updateUserLastPosted(userId, postTime) {
  let client;

  try {
    client = await pool.connect();
  } catch (err) {
    throw new DatabaseError("Failed to connect to the database.");
  }

  try {
    await client.query("BEGIN");

    const updateQuery = `
      UPDATE users
      SET last_posted = ($1)
      WHERE id = ($2);
    `;

    const result = await client.query(updateQuery, [postTime, userId]);

    // Should never trigger as app logic dictates a user must be logged in when this query would execute
    if (result.rowCount === 0) {
      throw new NotFoundError(
        `User ${userId} not found, cannot update last_posted.`
      );
    }

    // Should never trigger as userId is a primary key, but included as a safeguard
    if (result.rowCount > 1) {
      throw new DataIntegrityError(
        "Critical error: Multiple users affected by role update. Expected only one."
      );
    }

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");

    console.log("Error during database operation: ", err);
    throw err;
  } finally {
    client.release();
  }
}

// =========================
// 3. EXPORT
// =========================
module.exports = {
  updateUserRole,
  updateUserLastLoggedIn,
  updateUserLastPosted,
};
