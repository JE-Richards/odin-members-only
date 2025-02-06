// =========================
// SELECT MESSAGES QUERIES
// =========================
// This module contains functions for interacting with the database to select
// users.
//
// Sections:
// 1. Set up
// 2. Queries
//     2.1. getAllMessages
//     2.2. getAllMessagesWithAuthor
// 3. Export
// =========================

// =========================
// 1. SET UP
// =========================
const pool = require("../../pool");
const DatabaseError = require("../../../errors/DatabaseError");
const NotFoundError = require("../../../errors/NotFoundError");

// =========================
// 2. QUERIES
// =========================
// =========================
// 2.1. GETALLMESSAGES
// Key functionality:
// - Returns all rows from the table.
// =========================
async function getAllMessages() {
  let client;

  try {
    client = await pool.connect();
  } catch (err) {
    throw new DatabaseError("Failed to connect to the database.");
  }

  try {
    const query = `
      SELECT *
      FROM messages;
    `;

    const { rows } = await client.query(query);

    if (rows.length === 0) {
      throw new NotFoundError(
        "Messages table is empty. No messages to return."
      );
    }

    return rows;
  } catch (err) {
    if (!(err instanceof NotFoundError)) {
      throw new DatabaseError(
        "Database error occurred whilst getting all messages."
      );
    }

    throw err;
  } finally {
    client.release();
  }
}

// =========================
// 2.1. GETALLMESSAGESWITHAUTHOR
// Key functionality:
// - Returns all rows from the table.
// =========================
async function getAllMessagesWithAuthor() {
  let client;

  try {
    client = await pool.connect();
  } catch (err) {
    throw new DatabaseError("Failed to connect to the database.");
  }

  try {
    const query = `
      SELECT m.*, u.username
      FROM messages AS m
      LEFT JOIN users AS u 
        ON m.author_id = u.id
      ORDER BY m.created_at DESC
    `;

    const { rows } = await client.query(query);

    if (rows.length === 0) {
      throw new NotFoundError(
        "Messages table is empty. No messages to return."
      );
    }

    return rows;
  } catch (err) {
    if (!(err instanceof NotFoundError)) {
      throw new DatabaseError(
        "Database error occurred whilst getting all messages."
      );
    }

    throw err;
  } finally {
    client.release();
  }
}

// =========================
// 3. EXPORT
// =========================
module.exports = {
  getAllMessages,
  getAllMessagesWithAuthor,
};
