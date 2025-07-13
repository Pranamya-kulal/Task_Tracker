import React from 'react';

const TaskList = ({ tasks, onStatusChange, onDelete }) => {
  if (tasks.length === 0) return <p>No tasks yet. Add one above! 🚀</p>;

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className={`task ${task.status}`}>
          <span>{task.title}</span>
          <div className="actions">
           <button onClick={() => onStatusChange(task.id, task.status === 'pending' ? 'completed' : 'pending')}>
  {task.status === 'pending' ? '✅ Mark Done' : '↩️ Undo'}
</button>

<button onClick={() => onDelete(task.id)} className="delete">
  🗑️ Delete
</button>

          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
