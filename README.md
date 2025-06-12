# 🔗 URL Shortener

A simple and secure full-stack URL shortener built with modern technologies.

## ✨ Features

- **Quick Shortening:** Easily shorten long URLs.
- **Persistent Storage:** Utilizes MongoDB for reliable data storage.
- **Authenticated Sessions:** Secure user authentication using JWT (JSON Web Tokens).
- **Secure Authentication:** Implements cookie-based login.
- **Dashboard Functionality:** Provides pagination, sorting, and filtering for managing URLs.
- **Production Ready:** Fully deployed and ready for use.

## 🚀 Tech Stack

### 💻 Frontend

- **Framework**: React with Vite bundler for a fast development experience.
- **Routing**: TanStack Router for efficient client-side navigation.
- **Forms & Validation**: TanStack Form integrated with Zod for robust form handling and validation.
- **State Management**: Zustand for a simple and powerful state management solution.
- **HTTP Client**: Axios for making API requests.
- **Styling**: Tailwind CSS for utility-first styling.

### ⚙️ Backend

- **Runtime**: Node.js with Express.js for a flexible and scalable server.
- **Database**: MongoDB (managed with Mongoose) for data persistence.
- **Authentication**: JWT (access & refresh tokens) for secure API authentication.
- **Security & Utilities**: Includes libraries like `bcrypt` for password hashing, `cookie-parser` for handling cookies, `cors` for managing cross-origin requests, `dotenv` for environment variables, and `nanoid` for generating unique URL IDs.

## 🌐 Deployment

- **Frontend**: Deployed on Vercel.
- **Backend**: Deployed on Vercel/Render.

## 🛠️ Setup & Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AnkitJha-03/URL-Shortener.git
   cd URL-Shortener
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your database connection string, JWT secrets, and any other necessary configuration.

4. **Run the app:**

   ```bash
   npm run dev
   ```

## 🔗 Live Demo

Experience the live application here: https://url-shortener-by-ankit.vercel.app

## Future Improvements / To-Do

- Implement dark mode theme toggle
- Add "Remember Me" option to login form
- Integrate email verification on signup
- Add link analytics (device, location, click trends over time)

## Technical Challenges Faced

### 🔁 SPA Routing on Vercel

When deployed, refreshing a route like `/dashboard` caused a `404 NOT_FOUND` error because Vercel by default doesn't handle SPA client-side routing.  
✅ **Fix**: Added a `vercel.json` with a catch-all rewrite rule to route unknown paths to `index.html`.

### 🍪 Cookie-Based Auth & CORS

Since the app uses HttpOnly cookies for JWT authentication across domains:

- Had to set `credentials: true` in Axios globally to allow cookies to be sent.
- Configured backend CORS properly with `credentials: true` and `origin` set to the frontend URL.
- Set cookies with `SameSite: None` and `Secure: true` to allow cross-site usage in production.

### 🧠 Zustand Auth State & Refresh Persistence

On a page refresh, Zustand state resets — initially this caused the app to wrongly assume the user was logged out.

- ✅ **Fix**: Introduced `isAuthReady` flag in Zustand.
- Made main layout wait (`loadBefore`) for `auth.store.ready` in TanStack Router before rendering protected routes.
- Prevented race conditions where Dashboard would redirect to `/login` before auth status was actually known.
