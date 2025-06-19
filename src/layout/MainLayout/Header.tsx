import React, { useEffect, useState } from "react";
import { Link } from "react-router";
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
} from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";

const navLinks = [
  { to: "/", label: "Accueil", icon: <FiHome /> },
  { to: "/signalement", label: "Signalements", icon: <FiAlertCircle /> },
  { to: "/planing", label: "Planing", icon: <FiList /> },
  { to: "/dons", label: "Dons", icon: <FiGift /> },
  { to: "/blog", label: "Blog", icon: <FiBookOpen /> },
  { to: "/about", label: "A Propos", icon: <FiInfo /> },
  { to: "/faq", label: "FAQs", icon: <FiHelpCircle /> },
];

const Header = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserName(user.firstName);
      } catch {
        setUserName(null);
      }
    }
  }, []);

  const handleLogout = () => {
    // Supprime le token ou les infos utilisateur
    localStorage.removeItem("token"); // adapte selon ton app
    // Recharge l'application
    window.location.reload();
  };

  const { isAuthenticated } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  // Ferme le menu mobile au clic sur un lien
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
        {/*  menu en plain écrant */}
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
        {/*  buttons en plains écrant */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {userName && (
                <span className="font-semibold text-green-700">
                  Bonjour, {userName}
                </span>
              )}
              <button className="btn1 " onClick={handleLogout}>
                <FiLogIn /> Déconection
              </button>
            </>
          ) : (
            <>
              <Link className="btn1 " to="/login">
                <FiLogIn /> Connexion
              </Link>
              <Link className="btn2 " to="/register">
                <FiUserPlus /> Inscription
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 bg-white shadow-lg ${
          menuOpen ? "max-h-[500px] py-4" : "max-h-0 overflow-hidden py-0"
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
          <Link className="btn1 " to="/login" onClick={handleLinkClick}>
            <FiLogIn /> Connexion
          </Link>
          <Link className=" btn2 " to="/register" onClick={handleLinkClick}>
            <FiUserPlus /> Inscription
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
