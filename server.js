const express = require("express");
const cors = require("cors");
const path = require("path");

const projectRoutes = require("./routes/projects");
const certRoutes = require("./routes/certifications");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/api/projects", projectRoutes);
app.use("/api/certifications", certRoutes);

// Test root
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const PORT = parseInt(process.env.PORT, 10);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});

