const express = require("express");
const db = require("../db");
const router = express.Router();

// Add project
router.post("/", (req, res) => {
  const { title, description, live_link } = req.body;
  db.query(
    "INSERT INTO projects (title, description, live_link) VALUES (?, ?, ?)",
    [title, description, live_link],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send({ message: "Project added", id: result.insertId });
    }
  );
});

// Get all projects
router.get("/", (req, res) => {
  db.query("SELECT * FROM projects", (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

// Delete project
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM projects WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Project deleted" });
  });
});

// Update project
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, live_link } = req.body;
  db.query(
    "UPDATE projects SET title = ?, description = ?, live_link = ? WHERE id = ?",
    [title, description, live_link, id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send({ message: "Project updated" });
    }
  );
});

module.exports = router;
