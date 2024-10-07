import React from 'react';
import { FaShoePrints, FaUsers } from 'react-icons/fa';

function Sidebar({ activeSection, setActiveSection }) {
  const menuItems = [
    { id: 'shoes', label: 'Manage Shoes', icon: <FaShoePrints className="mr-2" /> },
    { id: 'shoesList', label: 'Shoes List', icon: <FaShoePrints className="mr-2" /> },
    { id: 'customers', label: 'Manage Customers', icon: <FaUsers className="mr-2" /> },
  ];

  return (
    <div className="w-64 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
      <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>
      <nav className="space-y-4">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`flex items-center p-2 rounded-md ${activeSection === item.id ? 'bg-purple-700' : ''}`}
            onClick={() => setActiveSection(item.id)}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
