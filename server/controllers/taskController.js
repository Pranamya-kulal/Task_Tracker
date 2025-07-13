const db = require('../db/db');

// GET all tasks
exports.getTasks = (req, res) => {
  db.query('SELECT * FROM tasks ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// POST new task
exports.addTask = (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  db.query('INSERT INTO tasks (title) VALUES (?)', [title], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Task added', id: result.insertId });
  });
};

// PUT update task status
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  db.query('UPDATE tasks SET status = ? WHERE id = ?', [status, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Task updated' });
  });
};

// DELETE task
exports.deleteTask = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Task deleted' });
  });
};
