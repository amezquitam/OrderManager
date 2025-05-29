import React from 'react';
import { Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">
        Gestión de restaurantes
      </h1>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Bell className="h-6 w-6 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            2
          </span>
        </div>
        
        <div className="flex items-center">
          <div className="mr-3 text-right">
            <p className="text-sm font-medium text-gray-900">{currentUser?.firstName}</p>
            <p className="text-xs text-gray-500 capitalize">{currentUser?.role}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <span className="text-gray-700 text-lg font-medium">
              {currentUser?.firstName.charAt(0)}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;