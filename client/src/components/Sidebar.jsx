import React from 'react';
import { FaHome, FaTasks, FaInbox, FaChartBar, FaBullseye, FaUserPlus, FaQuestionCircle } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="w-full sm:w-60 min-h-screen bg-gradient-to-b from-indigo-800 to-purple-900 text-white p-6 space-y-8">
      <div className="flex items-center gap-2 text-2xl font-bold tracking-wide">
        <span className="text-pink-400">🧠</span> TaskPro
      </div>

      <nav className="space-y-4">
        <SidebarItem icon={<FaHome />} label="Home" />
        <SidebarItem icon={<FaTasks />} label="My Tasks" />
        <SidebarItem icon={<FaInbox />} label="Inbox" />
        <SidebarItem icon={<FaChartBar />} label="Reporting" />
        <SidebarItem icon={<FaBullseye />} label="Goals" />
      </nav>

      <div className="pt-8 border-t border-purple-700 space-y-3 text-sm">
        <SidebarItem icon={<FaUserPlus />} label="Invite Teammates" />
        <SidebarItem icon={<FaQuestionCircle />} label="Help & Getting Started" />
      </div>
    </aside>
  );
};

const SidebarItem = ({ icon, label }) => (
  <div
    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-700 transition cursor-pointer"
  >
    <span className="text-lg">{icon}</span>
    <span>{label}</span>
  </div>
);

export default Sidebar;
