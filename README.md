# Simple Members Only Message Board: An Express Project

## Table of Contents

1. [About](#about)
2. [Getting Started](#getting-started)
3. [Running the App](#running-the-app)
4. [Features](#features)
5. [Technologies Used](#technologies-used)

## About

This is the fourth project from [The Odin Project Node.js course](https://www.theodinproject.com/lessons/node-path-nodejs-members-only). The goal is to build a simple message board app with a focus on implementing user authentication and allowing different privileges to different user roles (non-members, members, admins).

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Ensure you have [Node.js](https://nodejs.org/en) installed locally.
- Ensure you have [PostgreSQL](https://www.postgresql.org) installed and running.

### Installation

1. Clone this repository

   ```bash
   git clone https://github.com/JE-Richards/odin-members-only
   ```

2. Navigate to the project directory

   ```bash
   cd your-repo
   ```

3. Run

   ```bash
   npm install
   ```

4. Create a `.env` file in the root of your project using the `.env.public` file as a template.

5. Populate the database.
   Before you can run the app, you need to populate the database. Run one of the following commands:

   - If you have a `DB_URL` specified in your `.env` file:

     ```bash
     node db/populateDb.js
     ```

   - Alternatively, if you want to manually specify the database URL, run
     ```bash
     node db/populateDb.js <DB_URL>
     ```

   This will create all of the required tables for the app to function.

6. After running the script, the app is ready to run.

## Running the app

To start the app, run the following:

```bash
node app.js
```

Then open the app in your browser at:

```
http://<app_host>:<app_port>/
```

## Features

The app serves as a simple members only message board with the following functionality:

- Users can create an account.
- Users can be upgraded to a member.
- Users can be upgraded to an admin.
- Users can log in to their account.
- Members can create a new post.
- Posts are displayed on the homepage.
  - Only members can see who created a post. Non-members see 'username hidden'.
- Admins can delete messages.

## Technologies Used

- **[Node.js](https://nodejs.org/en)** and **[Express](https://expressjs.com)** for server-side functionality.
- **[npm](https://www.npmjs.com)** for package management.
- **[PostgreSQL](https://www.postgresql.org)** for the database.
- **[EJS](https://ejs.co)** for dynamic HTML rendering.
- **CSS** for styling.
- **[bcryptjs](https://www.npmjs.com/package/bcryptjs)** for password hashing and security.
- **[passport.js](https://www.passportjs.org)** for user authentication.
