// =========================
// DELETE MESSAGES QUERIES
// =========================
// This module contains functions for interacting with the database to insert
// new message. It provides a specific function to insert a new message into the
// `messages` table.
//
// Sections:
// 1. Set up
// 2. Queries
//     2.1. deleteMessageById
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
// 2.1. DELETEMESSAGEBYID
// Key functionality:
// - Using transactions to ensure atomicity and data consistency.
// =========================
async function deleteMessageById(messageId) {
  let client;

  // connection can fail - handle failure gracefully
  try {
    client = await pool.connect();
  } catch (err) {
    throw new DatabaseError("Failed to connect to the database.");
  }

  try {
    await client.query("BEGIN");

    const deleteQuery = `
      DELETE FROM messages
      WHERE id =($1);
    `;

    const result = await client.query(deleteQuery, [messageId]);

    if (result.rowCount === 0) {
      throw new NotFoundError(`Message with id ${messageId} not found.`);
    }

    if (result.rowCount > 1) {
      throw new DataIntegrityError(
        "Critical error: Multiple message affected by deletion. Expected only one."
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
  deleteMessageById,
};
