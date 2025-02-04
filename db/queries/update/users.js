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
// 3. EXPORT
// =========================
module.exports = {
  updateUserRole,
};
