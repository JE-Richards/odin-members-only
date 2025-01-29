-- =========================
-- CREATE TABLES SCRIPT
-- =========================
-- This script contains the SQL queries needed to create the tables 
-- required for the message board application. It includes the creation 
-- of the 'users', 'messages', 'replies', and 'roles' tables.
-- 
-- The tables are designed with the following relationships:
-- - users can have multiple messages and replies.
-- - messages can have multiple replies.
-- - roles are assigned to users.

-- =========================
-- 1. CREATE ROLES TABLE
-- =========================
CREATE TABLE IF NOT EXISTS roles (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  role_title VARCHAR (50) UNIQUE NOT NULL
);

-- =========================
-- 2. CREATE USERS TABLE
-- =========================
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  email VARCHAR (255) UNIQUE NOT NULL,
  username VARCHAR (50) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role_id INTEGER REFERENCES roles(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  last_logged_in TIMESTAMP,
  last_posted TIMESTAMP
);

-- =========================
-- 3. CREATE MESSAGES TABLE
-- =========================
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  message_title VARCHAR (255) NOT NULL,
  message TEXT NOT NULL,
  author_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- 4. CREATE REPLIES TABLE
-- =========================
CREATE TABLE IF NOT EXISTS replies (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  message_id INTEGER REFERENCES messages(id) ON DELETE SET NULL,
  author_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  reply_content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

