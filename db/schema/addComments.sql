-- =========================
-- ADD COMMENTS TO TABLE COLUMNS
-- =========================
-- This script adds comments to the database schema for better clarity and documentation.
-- The comments explain the purpose of each column in the tables, which can help developers 
-- and DBAs understand the schema more easily.

-- =========================
-- 1. COMMENTS FOR USERS TABLE
-- =========================
COMMENT ON COLUMN users.id IS 'Primary key for the users table. Uniquely identifies each user.';
COMMENT ON COLUMN users.email IS 'Email address for this user. Email must be unique to each user.';
COMMENT ON COLUMN users.username IS 'Username for this user. Username must be unique.';
COMMENT ON COLUMN users.password IS 'Encrypted password for the user. This should be securely hashed.';
COMMENT ON COLUMN users.role_id IS 'The users permissions role, referencing roles(id).';
COMMENT ON COLUMN users.created_at IS 'Timestamp for when the user was created.';
COMMENT ON COLUMN users.last_logged_in IS 'Timestamp for when the user last logged in.';
COMMENT ON COLUMN users.last_posted IS 'Timestamp for when the user last posted on the platform.';

-- =========================
-- 2. COMMENTS FOR MESSAGES TABLE
-- =========================
COMMENT ON COLUMN messages.id IS 'Primary key for the messages table. Uniquely identifies each message.';
COMMENT ON COLUMN messages.message_title IS 'Title for the message.';
COMMENT ON COLUMN messages.message IS 'The content of the message. This is the body of the post.';
COMMENT ON COLUMN messages.author_id IS 'The ID of the user who authored the message. References the users table.';
COMMENT ON COLUMN messages.created_at IS 'Timestamp for when the message was created.';

-- =========================
-- 3. COMMENTS FOR REPLIES TABLE
-- =========================
COMMENT ON COLUMN replies.id IS 'Primary key for the replies table. Uniquely identifies each reply.';
COMMENT ON COLUMN replies.message_id IS 'The ID of the message this reply is attached to. References the messages table.';
COMMENT ON COLUMN replies.author_id IS 'The ID of the user who authored the reply. References the users table.';
COMMENT ON COLUMN replies.reply_content IS 'The content of the reply. This is the body of the reply post.';
COMMENT ON COLUMN replies.created_at IS 'Timestamp for when the reply was created.';

-- =========================
-- 4. COMMENTS FOR ROLES TABLE
-- =========================
COMMENT ON COLUMN roles.id IS 'Primary key for the roles table. Uniquely identifies each role.';
COMMENT ON COLUMN roles.role_title IS 'Title of the role (e.g., "admin", "user", etc.). This defines user permissions.';