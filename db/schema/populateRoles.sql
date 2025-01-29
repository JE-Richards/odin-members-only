-- =========================
-- POPULATE ROLES SCRIPT
-- =========================
-- This script inserts the predefined roles into the roles table.
-- If a role already exists, it will not be inserted again.

INSERT INTO roles (role_title) VALUES
('admin'),
('moderator'),
('member')
ON CONFLICT (role_title) DO NOTHING;