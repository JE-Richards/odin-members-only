// =========================
// POPULATE DATABASE SCRIPT
// =========================
// This script contains the SQL queries needed to set up the database for the
// message board application. It includes table creation, seeding initial data,
// and adding comments to describe the database schema.
//
// Sections:
// 1. Requirements
// 2. SQL Execution Logic
// 3. Populate DB Function
// 4. Populate DB Execution
// =========================

// =========================
// 1. REQUIREMENTS
// =========================
require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// SQL file paths
const createTableSqlPath = path.join(__dirname, 'schema', 'createTables.sql');
const addCommentsSqlPath = path.join(__dirname, 'schema', 'addComments.sql');
const populateRolesSqlPath = path.join(
  __dirname,
  'schema',
  'populateRoles.sql'
);

// =========================
// 2. SQL EXECUTION LOGIC
// =========================
// This function reads an SQL file and executes the query within
async function executeSqlFromFile(client, filePath) {
  const sql = fs.readFileSync(filePath, 'utf8');
  await client.query(sql);
}

// =========================
// 3. POPULATE DB FUNCTION
// =========================
// This function connects to the database, starts a transaction, runs the SQL
// queries, and handles any errors by rolling back the transaction if needed.
async function populateDb() {
  const connectionString = process.argv[2] || process.env.DB_URL;

  if (!connectionString) {
    console.error('Error: Please provide a connection string as an argument.');
    console.error('Usage: node db/populateDb.js <connection_string>');
    process.exit(1);
  }

  console.log('Seeding db...');
  const client = new Client({
    connectionString,
  });

  try {
    console.log('Attempting to connect to the database...');
    await client.connect();
    console.log('Connection successful.');

    console.log('Running SQL queries.');
    await client.query('BEGIN');

    try {
      await executeSqlFromFile(client, createTableSqlPath);
      await executeSqlFromFile(client, addCommentsSqlPath);
      await executeSqlFromFile(client, populateRolesSqlPath);

      await client.query('COMMIT');
      console.log('Database successfully seeded.');
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error during SQL execution, rolled back changes:', error);
    }
  } catch (error) {
    console.error('Error while connecting to the database: ', error);
  } finally {
    console.log('Closing the database connection...');
    await client.end();
    console.log('Done.');
  }
}

// =========================
// 4. POPULATE DB EXECUTION
// =========================
populateDb();
