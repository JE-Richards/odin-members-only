// =========================
// INSERT MESSAGES QUERIES
// =========================
// This module contains functions for interacting with the database to insert
// new message. It provides a specific function to insert a new message into the
// `messages` table.
//
// Sections:
// 1. Set up
// 2. Queries
//     2.1. InsertNewMessage
// 3. Export
// =========================

// =========================
// 1. SET UP
// =========================
const pool = require("../../pool");
const DatabaseError = require("../../../errors/DatabaseError");
const DataIntegrityError = require("../../../errors/DataIntegrityError");

// =========================
// 2. QUERIES
// =========================
// =========================
// 2.1. INSERTNEWMESSAGE
// Key functionality:
// - Using transactions to ensure atomicity and data consistency.
// =========================
async function insertNewMessage(title, message, userId) {
  let client;

  // connection can fail - handle failure gracefully
  try {
    client = await pool.connect();
  } catch (err) {
    throw new DatabaseError("Failed to connect to the database.");
  }

  try {
    await client.query("BEGIN");

    const insertQuery = `
      INSERT INTO messages (message_title, message, author_id, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING id;
    `;

    const { rows } = await client.query(insertQuery, [title, message, userId]);

    if (!rows[0]) {
      throw new DataIntegrityError("Message insertion failed unexpectedly.");
    }

    await client.query("COMMIT");
    return rows[0];
  } catch (err) {
    await client.query("ROLLBACK");

    throw err;
  } finally {
    client.release();
  }
}

// =========================
// 3. EXPORT
// =========================
module.exports = {
  insertNewMessage,
};
