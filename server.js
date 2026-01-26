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

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
