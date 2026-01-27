require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const projectRoutes = require("./routes/projects");
const certRoutes = require("./routes/certifications");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/projects", projectRoutes);
app.use("/api/certifications", certRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
