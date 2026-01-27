const express = require("express");
const multer = require("multer");
const db = require("../db");
const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Add certification
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, issuer } = req.body;
    if (!req.file) return res.status(400).json({ error: "Image is required" });

    const image_url = req.file.filename; // matches DB column

    const [result] = await db.query(
      "INSERT INTO certifications (title, issuer, image_url) VALUES (?, ?, ?)",
      [title, issuer, image_url]
    );

    res.json({ message: "Certification added", id: result.insertId });
  } catch (err) {
    console.error("ADD CERTIFICATION ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get all certifications
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM certifications");
    res.json(rows);
  } catch (err) {
    console.error("GET CERTIFICATIONS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// Delete certification
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM certifications WHERE id = ?", [id]);
    res.json({ message: "Certification deleted" });
  } catch (err) {
    console.error("DELETE CERTIFICATION ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// Update certification
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, issuer } = req.body;
    const image_url = req.file ? req.file.filename : null;

    let query = "UPDATE certifications SET title = ?, issuer = ?";
    const params = [title, issuer];

    if (image_url) {
      query += ", image_url = ?";
      params.push(image_url);
    }

    query += " WHERE id = ?";
    params.push(id);

    await db.query(query, params);
    res.json({ message: "Certification updated" });
  } catch (err) {
    console.error("UPDATE CERTIFICATION ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
