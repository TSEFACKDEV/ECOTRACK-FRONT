import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiLogIn, FiUserPlus, FiMenu, FiX, FiRefreshCw } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { user, token } = useAuth();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleLinkClick = () => setMenuOpen(false);
  const handleLogout = () => {
    // Add logout functionality here
  };

  return (
    <nav className="w-full bg-white shadow-xl fixed top-0 left-0 z-30">
      <div className="max-w-8xl mx-auto flex justify-between items-center px-4 md:px-10 py-4">
        <Link to="/" className="flex items-center gap-2 text-[#10B981] text-2xl font-bold cursor-pointer">
          <FiRefreshCw className="text-[#10B981]" size={28} />
          Eco <span className="font-extrabold text-gray-900">Track</span>
        </Link>

        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#10B981]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

        <ul className="hidden md:flex items-center gap-7">
          <li>
            <Link to="/" className="text-gray-700 hover:text-[#10B981] transition-colors font-medium">
              Accueil
            </Link>
          </li>
          {/* Add other nav links here */}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          {token ? (
            <>
              {user?.role === "ADMIN" && (
                <Link to="/dashboard" className="text-gray-700 hover:text-[#10B981] transition-colors font-medium">
                  Dashboard
                </Link>
              )}
              <button className="btn1" onClick={handleLogout}>
                <FiLogIn /> Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link className="btn1" to="/login">
                <FiLogIn /> Connexion
              </Link>
              <Link className="btn2" to="/register">
                <FiUserPlus /> Inscription
              </Link>
            </>
          )}
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 bg-white shadow-lg ${menuOpen ? "max-h-[500px] py-4" : "max-h-0 overflow-hidden py-0"}`}>
        <ul className="flex flex-col gap-4 px-6">
          <li>
            <Link to="/" className="text-gray-700 hover:text-[#10B981] text-lg py-2" onClick={handleLinkClick}>
              Accueil
            </Link>
          </li>
          {/* Add other mobile nav links here */}
        </ul>
        <div className="flex flex-col gap-2 mt-4 px-6">
          <Link className="btn1" to="/login" onClick={handleLinkClick}>
            <FiLogIn /> Connexion
          </Link>
          <Link className="btn2" to="/register" onClick={handleLinkClick}>
            <FiUserPlus /> Inscription
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;