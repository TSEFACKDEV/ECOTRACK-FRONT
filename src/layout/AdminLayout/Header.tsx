import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { FiLogOut, FiBell, FiUser } from 'react-icons/fi';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-gray-800">Tableau de bord</h2>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <FiBell className="text-gray-600" size={20} />
        </button>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <FiUser className="text-green-600" size={16} />
          </div>
          <span className="text-sm font-medium">{user?.firstName} {user?.lastName}</span>
        </div>
        
        <button 
          onClick={logout}
          className="p-2 rounded-lg hover:bg-gray-100 flex items-center gap-2 text-sm"
        >
          <FiLogOut size={16} />
          Déconnexion
        </button>
      </div>
    </header>
  );
};

export default Header;