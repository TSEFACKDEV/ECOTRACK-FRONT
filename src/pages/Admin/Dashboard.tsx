import React from 'react';
import { FiUsers, FiAlertCircle, FiBarChart2 } from 'react-icons/fi';
import { Link } from 'react-router';

const Dashboard = () => {
  const stats = [
    { title: 'Utilisateurs', value: '1,234', icon: <FiUsers size={24} />, link: '/dashboard/user' },
    { title: 'Signalements', value: '567', icon: <FiAlertCircle size={24} />, link: '/dashboard/reports' },
    { title: 'Taux de résolution', value: '78%', icon: <FiBarChart2 size={24} />, link: '/dashboard/stats' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tableau de bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Link
            to={stat.link}
            key={index}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-800 mt-1">{stat.value}</p>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                {stat.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Activité récente</h2>
        <div className="border-t border-gray-200 pt-4">
          <p className="text-gray-500">Aucune activité récente</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;