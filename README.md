# README

This repo is used for interviewing processes. Feel free to have a look around at the existing code, including cloning it and setting up the dependencies ahead of time.

## Requirements

- Ruby 3.3.0
- Node.js >= 16.11.0
- Yarn 3.1.1
- PostgreSQL
- Foreman (`gem install foreman`)

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

4. **Start the development servers:**

   ```sh
   foreman start -f Procfile.dev
   ```

   This runs the Rails server and Vite asset builder together. The app is available at [http://localhost:3000](http://localhost:3000).

## Frontend (React + Vite + Tailwind)

- The React app is located in `app/javascript`.
- Tailwind CSS is used for styling.
- The main entry point is `app/javascript/index.jsx`.
- Vite runs in watch/build mode — assets are compiled and served by Rails, not a separate dev server.

## Testing

```sh
bundle exec rspec        # Ruby specs
TZ=UTC jest              # JavaScript specs
```

---

If you have any questions or issues, please open an issue or contact the maintainer.
