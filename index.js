require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

app.get("/api/courses", (req, res) => {
  res.json([
    { id: 1, title: "JavaScript Basics", description: "Learn JavaScript from scratch" },
    { id: 2, title: "React for Beginners", description: "Build modern web apps" },
    { id: 3, title: "Node.js Masterclass", description: "Backend development with Node" }
  ]);
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    res.json({ token: "demo-token", role: "student", message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Serve frontend - THIS MUST BE AT THE BOTTOM
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT)); 
