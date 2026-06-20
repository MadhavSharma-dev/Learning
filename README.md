# IT Industry — MERN Backend Project

A production-ready Node.js + Express + MongoDB backend boilerplate. This project follows clean architecture patterns used across the IT industry for scalable REST APIs.

---

## Project Structure

```
it-industry/
├── public/
│   └── temp/              # Temporary file uploads (e.g. images before cloud upload)
├── src/
│   ├── app.js             # Express app setup — middlewares registered here
│   ├── index.js           # Entry point — DB connection + server start
│   ├── constants.js       # Global constants (DB name, enums, etc.)
│   ├── db/
│   │   └── database.js    # MongoDB connection logic using Mongoose
│   ├── controllers/       # Route handler functions (business logic)
│   ├── middlewares/       # Custom middlewares (auth, error handler, etc.)
│   ├── models/            # Mongoose schemas/models
│   ├── routes/            # Express route definitions
│   └── utils/
│       ├── ApiError.js    # Custom error class
│       ├── Apiresponse.js # Standardized API response wrapper
│       └── asyncHandler.js# Async error wrapper for controllers
├── .env                   # Environment variables (never commit this)
├── package.json
└── README.md
```

---

Node.js is a runtime environment that lets you run JavaScript outside the browser. It's built on Chrome's V8 engine and provides the core capabilities: file system access, networking, OS interaction, etc.

Express.js is a web framework that runs on top of Node.js. It abstracts away the boilerplate of handling HTTP requests, routing, and middleware.


## MERN Stack Mapping in this project ; It tells which part of MERN is used in which place ??

| MERN Part | Where It's Used | File(s) |
|-----------|----------------|---------|
| **M** — MongoDB | Database connection, Mongoose models | `src/db/database.js`, `src/models/` |
| **E** — Express | App setup, routes, middlewares | `src/app.js`, `src/routes/`, `src/middlewares/` |
| **R** — React | Frontend (not in this repo — this is backend only) | — |
| **N** — Node.js | Runtime for the entire backend, entry point | `src/index.js`, `package.json` |

> This repo covers the **MEN** part of MERN. The React frontend would be a separate project consuming this API.

---

## File-by-File Breakdown

### `src/index.js` — Node.js Entry Point
- Loads environment variables via `dotenv`
- Calls `connectDB()` to connect to MongoDB
- Starts the Express server on the configured PORT
- **Used in every MERN backend project** — this is always the startup file

```js
require("dotenv").config();
connectDB().then(() => { app.listen(PORT) })
```

---

### `src/app.js` — Express App Configuration
- Creates the Express app instance
- Registers all global middlewares
- **Used in every MERN backend project**

| Middleware | Purpose | MERN Part |
|-----------|---------|-----------|
| `cors` | Allows React frontend to talk to this backend (cross-origin) | Express |
| `express.json()` | Parses incoming JSON request bodies | Express |
| `express.urlencoded()` | Parses form data | Express |
| `express.static("public")` | Serves static files from `/public` | Express / Node |
| `cookie-parser` | Reads cookies (used for auth tokens/sessions) | Express |

```js
app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());
```

---

### `src/db/database.js` — MongoDB Connection
- Uses `mongoose.connect()` with the URI from `.env`
- Exits the process if connection fails (`process.exit(1)`)
- **Used in every MERN backend project**
- MERN Part: **M (MongoDB)**

```js
await mongoose.connect(process.env.MONGODB_URI);
```

---

### `src/utils/ApiError.js` — Custom Error Class
- Extends the built-in `Error` class
- Adds `statusCode`, `errors[]`, `success: false` to every error
- Lets you throw HTTP-aware errors anywhere: `throw new ApiError(404, "User not found")`
- Error middleware catches it and sends a structured response
- **Used in every professional MERN backend project**
- MERN Part: **E (Express)** — works with Express error middleware

```js
throw new ApiError(401, "Unauthorized")
// instead of res.status(401).json({ message: "Unauthorized" }) everywhere
```

---

### `src/utils/Apiresponse.js` — Standardized Response Wrapper
- Wraps every successful API response in a consistent shape
- `success` is auto-set: `true` if `statusCode < 400`, `false` otherwise
- **Used in every professional MERN backend project**
- MERN Part: **E (Express)** — used inside controllers/route handlers

```js
return res.status(200).json(new ApiResponse(200, userData, "User fetched"))
// Every response has: { statusCode, data, message, success }
```

---

### `src/utils/asyncHandler.js` — Async Error Wrapper
- Express does NOT catch errors from `async` functions by default
- Wraps any async controller in a `Promise` and forwards errors to `next(err)`
- Without this, you'd need `try/catch` in every single controller
- **Used in every MERN backend project with async controllers**
- MERN Part: **E (Express)** — middleware/controller pattern

```js
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

// Usage in controllers:
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    res.json(new ApiResponse(200, user))
})
```

---

## Dependencies

| Package | Purpose | MERN Part |
|--------|---------|-----------|
| `express` | Web framework | E |
| `mongoose` | MongoDB ODM — schemas, queries, models | M |
| `dotenv` | Loads `.env` variables into `process.env` | N |
| `cors` | Cross-origin requests (React ↔ Express) | E |
| `cookie-parser` | Parse cookies from requests | E |
| `bcryptjs` | Hash passwords before saving to MongoDB | M + E |
| `jsonwebtoken` | Generate/verify JWT tokens for auth | E |
| `nodemon` | Auto-restarts server on file change (dev only) | N |

---

## What's "Boilerplate" (Used in Every Project)

These patterns appear in virtually every professional Node/Express/MERN project:

1. `dotenv` config at the very top of `index.js`
2. Separate `connectDB()` function in `/db`
3. `app.use(cors())` + `express.json()` + `cookieParser()` in `app.js`
4. Custom `ApiError` class for structured error handling
5. Custom `ApiResponse` class for consistent response shape
6. `asyncHandler` wrapper to avoid repetitive try/catch
7. Folder separation: `controllers/`, `routes/`, `models/`, `middlewares/`, `utils/`
8. `.env` for secrets, never committed to Git

---

## Environment Variables

```env
PORT=_____
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/<dbname>
```

> Never commit your real `.env` to version control. Add it to `.gitignore`.

---

## How to Run

```bash
npm install
npm run dev
```

Server starts at `http://localhost:8000`

---

---

## Models (MongoDB — M)

### `src/models/User.js` — User Schema
- Fields: `username`, `email`, `fullName`, `avatar`, `coverImage`, `watchHistory`, `password`, `refreshToken`
- `avatar` and `coverImage` store Cloudinary URLs (not files directly)
- `watchHistory` is an array of ObjectId refs to the `Video` model
- `timestamps: true` auto-adds `createdAt` and `updatedAt`
- **MERN Part: M (MongoDB)** — Mongoose schema + model

Custom methods on the schema:

| Method | What it does |
|--------|-------------|
| `pre("save")` | Hashes password with bcrypt before saving — runs only if password was modified |
| `isPasswordCorrect()` | Compares plain password with stored hash using bcrypt |
| `generateAccessToken()` | Signs a JWT with user's `_id`, `email`, `username`, `fullName` — short-lived |
| `generateRefreshToken()` | Signs a JWT with only `_id` — long-lived, used to refresh access token |

> These methods make the User model self-contained for authentication — no need for separate auth helper files.

---

### `src/models/video.js` — Video Schema
- Fields: `videoFile`, `thumbnail`, `title`, `description`, `duration`, `views`, `isPublished`, `owner`
- `videoFile` and `thumbnail` store Cloudinary URLs
- `owner` is an ObjectId ref to the `User` model — links video to its creator
- `views` defaults to `0`, `isPublished` defaults to `true`
- `timestamps: true` auto-adds `createdAt` and `updatedAt`
- **MERN Part: M (MongoDB)** — Mongoose schema + model

---

## Folder Stubs (To Be Implemented)

| Folder | What Goes Here |
|--------|---------------|
| `src/models/` | Mongoose schemas — `User.js`, `video.js` (MongoDB — M) |
| `src/controllers/` | Business logic functions called by routes (Express — E) |
| `src/models/User.js` | User schema with auth methods — JWT + bcrypt (MongoDB — M) |
| `src/models/video.js` | Video schema with Cloudinary URLs and owner ref (MongoDB — M) |
| `src/routes/` | Express Router definitions, maps URLs to controllers (Express — E) |
| `src/middlewares/` | Auth middleware, error handler middleware (Express — E) |
| `public/temp/` | Temporary storage for file uploads before pushing to cloud |