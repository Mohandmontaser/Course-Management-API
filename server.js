import path from "path";
import { fileURLToPath } from "url";

import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

import { dbConnection } from "./src/config/database.js";
import mountRoutes from "./src/routes/index.js";
import { ApiError } from "./src/utils/apiError.js";
import { globalError } from "./src/middlewares/errorMiddleware.js";

// Load environment variables
dotenv.config({ path: "config.env" });

// Establish database connection
dbConnection();

// Create Express app
const app = express();

// __dirname setup for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware: parse JSON bodies
app.use(express.json());

// Middleware: serve static files from uploads directory
app.use(express.static(path.join(__dirname, "uploads")));

// Development-only middleware: HTTP request logger
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`Mode: ${process.env.NODE_ENV}`);
}

// Mount application routes
mountRoutes(app);

// Handle undefined routes
app.all("*", (req, res, next) => {
  next(new ApiError(`Cannot find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware
app.use(globalError);

// Start the server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error("Shutting down...");
    process.exit(1);
  });
});
