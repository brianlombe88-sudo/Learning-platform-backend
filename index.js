const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Enable CORS (VERY IMPORTANT)
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Models
const User = require("./models/User");
const Course = require("./models/Course");

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Register
app.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  const user = new User({ name, email, password, role });
  await user.save();

  res.json({ message: "User registered" });
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ token: user._id });
});

// Create course
app.post("/courses", async (req, res) => {
  try {
    const { title, description, price } = req.body;

    const course = new Course({
      title,
      description,
      price,
      tutorId: "test"
    });

    await course.save();

    res.json({ message: "Course created" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get courses
app.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Dummy payment route (temporary)
app.post("/create-checkout-session", (req, res) => {
  res.json({ url: "https://example.com" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running"));
