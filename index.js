const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Models
const User = require("./models/User");
const Course = require("./models/Course");

// Routes
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
  const { title, description, price } = req.body;

  const course = new Course({
    title,
    description,
    price,
    tutorId: "temp"
  });

  await course.save();

  res.json({ message: "Course created" });
});

// Get courses
app.get("/courses", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// Dummy payment route (temporary)
app.post("/create-checkout-session", (req, res) => {
  res.json({ url: "https://example.com" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running"));
