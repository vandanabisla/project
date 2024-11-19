const express = require('express');
const db = require('../db');

const router = express.Router();

// Create a record
router.post('/create', (req, res) => {
  const { name, email } = req.body;
  db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
});

// Read all records
router.get('/show', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Update a record
router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  db.run(
    'UPDATE users SET name = ?, email = ? WHERE id = ?',
    [name, email, id],
    function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.json({ updated: this.changes });
    }
  );
});

// Delete a record
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM users WHERE id = ?', id, function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
