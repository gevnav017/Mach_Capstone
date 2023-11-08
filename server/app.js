const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors")
const app = express();

// Logging middleware
app.use(morgan("dev"));
app.use(cors())

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public")));

// api routes
// products api
app.use("/api", require("./api/products"))

// users api
app.use("/api", require("./api/users"))

// orders api
app.use("/api", require("./api/orders"))

// wishlist api
app.use("/api", require("./api/wishlist"))

// send file upon refresh from any page or extension
app.get("/*", (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  } catch (error) {
    next(error);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

// Default to 404 if no other route matched
app.use((req, res) => {
  res.status(404).send("Not found.");
});

module.exports = app;