const db = require('../db/db');

// ✅ GET all tasks (latest first)
exports.getTasks = (req, res) => {
  db.query('SELECT * FROM tasks ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// ✅ POST: Add a new task (with deadline)
exports.addTask = (req, res) => {
  const { title, deadline } = req.body;

  if (!title) return res.status(400).json({ error: 'Title is required' });

  const q = 'INSERT INTO tasks (title, deadline) VALUES (?, ?)';
  const values = [title, deadline];

  db.query(q, values, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Task added', id: result.insertId });
  });
};

// ✅ PUT: Update task status
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  db.query('UPDATE tasks SET status = ? WHERE id = ?', [status, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Task updated' });
  });
};

// ✅ DELETE: Delete task
exports.deleteTask = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Task deleted' });
  });
};
