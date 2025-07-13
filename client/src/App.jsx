import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './index.css';

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Backend URL
  const API = 'http://localhost:5000/api/tasks';

  // Fetch tasks
  const getTasks = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  // Add task
  const addTask = async (title) => {
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      const newTask = await res.json();
      getTasks(); // Refresh tasks
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  // Update status
  const updateTask = async (id, status) => {
    try {
      await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      getTasks();
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await fetch(`${API}/${id}`, {
        method: 'DELETE',
      });
      getTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="app">
      <h1>📋 Task Tracker</h1>
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onStatusChange={updateTask} onDelete={deleteTask} />
    </div>
  );
};

export default App;
