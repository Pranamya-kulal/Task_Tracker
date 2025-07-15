import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(ArcElement, Tooltip, Legend);

const ProgressChart = ({ tasks }) => {
  const completed = tasks.filter((task) => task.status === 'completed').length;
  const pending = tasks.length - completed;

  const data = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        data: [completed, pending],
        backgroundColor: ['#4ade80', '#facc15'], // Green, Yellow
        borderWidth: 2,
        cutout: '70%',
      },
    ],
  };

  const percentage = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;

  return (
    <motion.div
      className="w-full max-w-xs mx-auto bg-gray-900 p-6 rounded-2xl shadow-lg text-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-lg font-semibold text-white mb-4">📊 Progress Overview</h2>

      <Doughnut data={data} />

      <p className="mt-4 text-indigo-300 text-sm font-medium">
        {percentage === 100
          ? '🎉 All tasks completed!'
          : `✅ ${percentage}% tasks done — keep going!`}
      </p>
    </motion.div>
  );
};

export default ProgressChart;
