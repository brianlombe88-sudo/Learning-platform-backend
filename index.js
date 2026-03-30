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

app.get("/api/courses", (req, res) => {
  res.json([
    { id: 1, title: "JavaScript Basics", description: "Learn JS from scratch" },
    { id: 2, title: "React for Beginners", description: "Build modern apps" },
    { id: 3, title: "Node.js Masterclass", description: "Backend development" }
  ]);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
