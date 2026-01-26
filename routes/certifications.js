const express = require("express");
const multer = require("multer");
const db = require("../db");
const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => cb(null, Date.now() + file.originalname)
});
const upload = multer({ storage });

// Add certification
router.post("/", upload.single("image"), (req, res) => {
  const { title, issuer } = req.body;
  const image_url = req.file.filename;

  db.query(
    "INSERT INTO certifications (title, issuer, image_url) VALUES (?, ?, ?)",
    [title, issuer, image_url],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send({ message: "Certification added", id: result.insertId });
    }
  );
});

// Get all certifications
router.get("/", (req, res) => {
  db.query("SELECT * FROM certifications", (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

// Delete certification
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM certifications WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Certification deleted" });
  });
});

// Update certification
router.put("/:id", upload.single("image"), (req, res) => {
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

  db.query(query, params, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Certification updated" });
  });
});

module.exports = router;
