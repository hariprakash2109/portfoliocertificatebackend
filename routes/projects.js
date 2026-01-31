const express = require("express");
const db = require("../db");
const router = express.Router();

// Add project
// Add project
router.post("/", async (req, res) => {
  try {
    const { title, description, live_link, category } = req.body;

    const [result] = await db.query(
      "INSERT INTO projects (title, description, live_link, category) VALUES (?, ?, ?, ?)",
      [title, description, live_link, category]
    );

    res.json({ message: "Project added", id: result.insertId });
  } catch (err) {
    console.error("ADD PROJECT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


// Get all projects
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM projects");
    res.json(rows);
  } catch (err) {
    console.error("GET PROJECTS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// Delete project
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM projects WHERE id = ?", [id]);

    res.json({ message: "Project deleted" });
  } catch (err) {
    console.error("DELETE PROJECT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// Update project
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, live_link, category } = req.body;

    await db.query(
      "UPDATE projects SET title=?, description=?, live_link=?, category=? WHERE id=?",
      [title, description, live_link, category, id]
    );

    res.json({ message: "Project updated" });
  } catch (err) {
    console.error("UPDATE PROJECT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
