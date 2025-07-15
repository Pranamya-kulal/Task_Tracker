import React, { useState } from 'react';
import { FaPlus, FaCalendarAlt } from 'react-icons/fa';

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, deadline);
    setTitle('');
    setDeadline('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 rounded-xl p-6 space-y-4 shadow-md"
    >
      <h2 className="text-xl font-bold flex items-center gap-2 text-white">
        <FaPlus className="text-indigo-400" /> Add New Task
      </h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
        className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <div className="flex items-center gap-2 text-sm text-gray-300">
        <FaCalendarAlt />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="p-2 bg-gray-700 rounded-md text-white focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 text-white rounded-md font-medium transition"
      >
        + Add Task
      </button>
    </form>
  );
};

export default TaskForm;
