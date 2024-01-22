# README

This repo is used for interviewing processes. Feel free to have a look around at the existing code, including cloning it and setting up the dependencies ahead of time.

## Requirements

- Ruby (version compatible with your Rails app)
- Node.js 16.11.x
- Yarn 3.1.1
- PostgreSQL (or your configured DB)

## Setup

1. **Install backend dependencies:**

   ```sh
   bundle install
   ```

2. **Install frontend dependencies:**

   ```sh
   yarn
   ```

3. **Set up the database:**

   ```sh
   bundle exec rake db:setup
   ```

4. **Start the Rails server:**

   ```sh
   rails server
   ```

5. **Start the React (Vite) development server:**
   ```sh
   yarn dev
   ```
   This will launch the frontend on [http://localhost:5173](http://localhost:5173) by default.

## Frontend (React + Vite + Tailwind)

- The React app is located in `app/javascript`.
- Tailwind CSS is used for styling. You can add classes directly to your JSX.
- The main entry point is `app/javascript/index.jsx`.

## Notes

- Make sure you are using the correct versions of Node and Yarn (see above).
- If you encounter issues with dependencies, try deleting `.yarn/cache` and running `yarn` again.
- The Rails backend and React frontend run as separate servers in development.

---

If you have any questions or issues, please open an issue or contact the maintainer.
