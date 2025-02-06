// =========================
// SELECT USERS QUERIES
// =========================
// This module contains functions for interacting with the database to select
// users.
//
// Sections:
// 1. Set up
// 2. Queries
//     2.1. findUserByUsername
//     2.2. findUserById
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
// 2.1. FINDUSERBYUSERNAME
// Key functionality:
// - Find a user in the database via username
// - Return NotFoundError if user doesn't exist
// =========================
async function findUserByUsername(username) {
  let client;

  try {
    client = await pool.connect();
  } catch (err) {
    throw new DatabaseError("Failed to connect to the database.");
  }

  try {
    const query = `
    SELECT *
    FROM users
    WHERE username = ($1);
  `;

    const { rows } = await client.query(query, [username]);

    if (rows.length === 0) {
      throw new NotFoundError(`User ${username} not found.`);
    }

    return rows[0];
  } catch (err) {
    if (!(err instanceof NotFoundError)) {
      throw new DatabaseError("Database error occured whilst finding user.");
    }

    throw err;
  } finally {
    client.release();
  }
}

// =========================
// 2.2. FINDUSERBYID
// Key functionality:
// - Find a user in the database via id
// - Return NotFoundError if user doesn't exist
// =========================
async function findUserById(id) {
  let client;

  try {
    client = await pool.connect();
  } catch (err) {
    throw new DatabaseError("Failed to connect to the database.");
  }

  try {
    const query = `
    SELECT *
    FROM users
    WHERE id = ($1);
  `;

    const { rows } = await client.query(query, [id]);

    if (rows.length === 0) {
      throw new NotFoundError(`User with ID ${id} not found.`);
    }

    return rows[0];
  } catch (err) {
    if (!(err instanceof NotFoundError)) {
      throw new DatabaseError("Database error occured whilst finding user.");
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
  findUserByUsername,
  findUserById,
};
