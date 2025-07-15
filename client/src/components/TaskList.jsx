import React from 'react';
import { motion } from 'framer-motion';
import {
  FaTrash,
  FaCheckCircle,
  FaUndo,
  FaCalendarAlt,
} from 'react-icons/fa';

const TaskList = ({ tasks, onStatusChange, onDelete }) => {
  return (
    <div className="space-y-6">
      {tasks.length === 0 ? (
        <motion.p
          className="text-center text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No tasks yet. Add one!
        </motion.p>
      ) : (
        tasks.map((task) => (
          <motion.div
            key={task.id}
            className="rounded-xl p-6 border border-white/10 bg-white/5 backdrop-blur-md shadow-xl transition transform hover:scale-[1.015]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h3
                  className={`text-xl font-semibold tracking-wide ${
                    task.status === 'completed'
                      ? 'text-green-300 line-through'
                      : 'text-white'
                  }`}
                >
                  {task.title}
                </h3>
                {task.deadline && (
                  <p className="text-sm text-gray-300 mt-2 flex items-center gap-2">
                    <FaCalendarAlt className="text-pink-400" />
                    {new Date(task.deadline).toLocaleDateString()}
                  </p>
                )}
              </div>

              <span
                className={`mt-3 sm:mt-0 px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-full ${
                  task.status === 'completed'
                    ? 'bg-green-800 text-green-200'
                    : 'bg-yellow-700 text-yellow-200'
                }`}
              >
                {task.status}
              </span>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() =>
                  onStatusChange(
                    task.id,
                    task.status === 'completed' ? 'pending' : 'completed'
                  )
                }
                className="text-sm bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-200"
              >
                {task.status === 'completed' ? <FaUndo /> : <FaCheckCircle />}
                {task.status === 'completed' ? 'Undo' : 'Mark as Done'}
              </button>

              <button
                onClick={() => onDelete(task.id)}
                className="text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-200"
              >
                <FaTrash />
                Delete
              </button>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
};

export default TaskList;
