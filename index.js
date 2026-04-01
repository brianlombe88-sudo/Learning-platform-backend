const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// VERY IMPORTANT FIX
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
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

// Create course (NO AUTH for now to avoid errors)
app.post("/courses", async (req, res) => {
  const { title, description, price } = req.body;

  try {
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

// Dummy payment route
app.post
