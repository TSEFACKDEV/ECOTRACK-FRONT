import React from "react";
import { Link, useLocation } from "react-router";
import {
  FiUsers,
  FiHome,
  FiSettings,
  FiBarChart2,
  FiAlertCircle,
  FiRefreshCw,
} from "react-icons/fi";
import { MdLightbulbOutline } from "react-icons/md";

const SideBar = () => {
  const location = useLocation();

  const navItems = [
    {
      path: "/dashboard",
      icon: <FiHome size={20} />,
      label: "Tableau de bord",
    },
    {
      path: "/dashboard/user",
      icon: <FiUsers size={20} />,
      label: "Utilisateurs",
    },
    {
      path: "/dashboard/reports",
      icon: <FiAlertCircle size={20} />,
      label: "Signalements",
    },
     {
      path: "/dashboard/astuces",
      icon: <MdLightbulbOutline size={20} />,
      label: "Astuces/conseil",
    },
    {
      path: "/dashboard/stats",
      icon: <FiBarChart2 size={20} />,
      label: "Statistiques",
    },
    {
      path: "/dashboard/settings",
      icon: <FiSettings size={20} />,
      label: "Paramètres",
    },
  ];

  return (
    <div className="bg-white shadow-md h-full p-4">
      <div className="mb-8 p-4">
        {/* LOGO */}
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-[#10B981] text-2xl font-bold cursor-pointer"
        >
          <FiRefreshCw className="text-[#10B981]" size={28} />
          Eco <span className="font-extrabold text-gray-900">Track</span>
        </Link>
      </div>
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? "bg-green-100 text-green-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
