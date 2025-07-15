import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import ProgressChart from './components/ProgressChart';
import { AnimatePresence, motion } from 'framer-motion';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const API = 'http://localhost:5000/api/tasks';

  const getTasks = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setTasks(data);
  };

  const addTask = async (title, deadline) => {
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, deadline }),
    });
    getTasks();
  };

  const updateTask = async (id, status) => {
    await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    getTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    getTasks();
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-zinc-900 text-white">
      {/* Sidebar with Chart */}
      <div className="w-[300px] fixed left-0 top-0 bottom-0 bg-zinc-950 p-6 border-r border-white/10 shadow-lg z-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-indigo-400 flex justify-center items-center gap-2">
            🚀 Smart Tracker
          </h1>
          <p className="text-gray-400 text-xs mt-1">Plan. Track. Crush it.</p>
        </div>
        <div className="mt-6">
          <ProgressChart tasks={tasks} />
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        className="flex-1 ml-[300px] p-8 space-y-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Filters */}
        <div className="flex justify-center gap-4">
          {['all', 'pending', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                filter === f
                  ? 'bg-indigo-500 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-indigo-500 hover:text-white'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl">
          <TaskForm onAdd={addTask} />
        </div>

        {/* Task List */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl">
          <AnimatePresence>
            <TaskList
              tasks={filteredTasks}
              onStatusChange={updateTask}
              onDelete={deleteTask}
            />
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default App;
