import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  FiHome,
  FiBookOpen,
  FiAlertCircle,
  FiGift,
  FiInfo,
  FiHelpCircle,
  FiLogIn,
  FiUserPlus,
  FiMenu,
  FiX,
  FiRefreshCw,
  FiList,
  FiUser,
  FiLogOut,
} from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';

const navLinks = [
  { to: '/', label: 'Accueil', icon: <FiHome /> },
  { to: '/signalement', label: 'Signalements', icon: <FiAlertCircle /> },
  { to: '/planing', label: 'Planing', icon: <FiList /> },
  { to: '/conseils', label: 'Conseils', icon: <FiBookOpen /> },
  { to: '/about', label: 'A Propos', icon: <FiInfo /> },
  { to: '/faq', label: 'FAQs', icon: <FiHelpCircle /> },
];

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className="w-full bg-white shadow-xl fixed top-0 left-0 z-30">
      <div className="max-w-8xl mx-auto flex justify-between items-center px-4 md:px-10 py-4">
        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2 text-[#10B981] text-2xl font-bold cursor-pointer"
        >
          <FiRefreshCw className="text-[#10B981]" size={28} />
          Eco <span className="font-extrabold text-gray-900">Track</span>
        </Link>

        {/* Bouton pour le menu Burger */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#10B981]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Ouvrir le menu"
        >
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

        {/* Menu desktop */}
        <ul className="hidden md:flex items-center gap-7">
          {navLinks.map(({ to, label, icon }) => (
            <li key={to}>
              <Link
                to={to}
                className="flex items-center gap-2 text-gray-700 hover:text-[#10B981] transition-colors font-medium"
              >
                <span className="text-[#10B981]">{icon}</span>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Boutons d'authentification desktop */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {user?.role === 'ADMIN' && (
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-gray-700 hover:text-[#10B981] transition-colors font-medium"
                >
                  Dashboard
                </Link>
              )}
              <div className="flex items-center gap-2">
                <span className="text-gray-700">
                  <FiUser className="inline mr-1" />
                  {user?.firstName}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn1 flex items-center gap-2"
                >
                  <FiLogOut />
                  Déconnexion
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn1 flex items-center gap-2"
              >
                <FiLogIn />
                Connexion
              </Link>
              <Link
                to="/register"
                className="btn2 flex items-center gap-2"
              >
                <FiUserPlus />
                Inscription
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Menu mobile */}
      <div
        className={`md:hidden transition-all duration-300 bg-white shadow-lg ${
          menuOpen ? 'max-h-[500px] py-4' : 'max-h-0 overflow-hidden py-0'
        }`}
      >
        <ul className="flex flex-col gap-4 px-6">
          {navLinks.map(({ to, label, icon }) => (
            <li key={to}>
              <Link
                to={to}
                className="flex items-center gap-2 text-gray-700 hover:text-[#10B981] text-lg py-2"
                onClick={handleLinkClick}
              >
                <span className="text-[#10B981]">{icon}</span>
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-2 mt-4 px-6">
          {isAuthenticated ? (
            <>
              {user?.role === 'ADMIN' && (
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-[#10B981] text-lg py-2"
                  onClick={handleLinkClick}
                >
                  Dashboard
                </Link>
              )}
              <div className="flex items-center gap-2 py-2 text-gray-700">
                <FiUser className="text-[#10B981]" />
                {user?.firstName} {user?.lastName}
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  handleLinkClick();
                }}
                className="btn1 flex items-center gap-2 justify-center"
              >
                <FiLogOut />
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn1 flex items-center gap-2 justify-center"
                onClick={handleLinkClick}
              >
                <FiLogIn />
                Connexion
              </Link>
              <Link
                to="/register"
                className="btn2 flex items-center gap-2 justify-center"
                onClick={handleLinkClick}
              >
                <FiUserPlus />
                Inscription
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;