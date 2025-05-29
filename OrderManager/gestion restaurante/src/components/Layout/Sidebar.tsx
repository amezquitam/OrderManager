import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, Users, Coffee, ShoppingBag, Clipboard, 
  BarChart2, LogOut, ChevronLeft, ChevronRight,
  Settings
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const { isAdmin, isCook, isWaiter, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`bg-blue-900 text-white h-screen flex flex-col transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center justify-between p-4 border-b border-blue-800">
        {!collapsed && <h1 className="text-xl font-bold">RestaurantApp</h1>}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-full hover:bg-blue-800 transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-2">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `flex items-center p-2 rounded-lg ${isActive ? 'bg-blue-800' : 'hover:bg-blue-800'} transition-colors`
              }
            >
              <Home size={20} />
              {!collapsed && <span className="ml-3">Dashboard</span>}
            </NavLink>
          </li>

          {isAdmin && (
            <li>
              <NavLink 
                to="/restaurant" 
                className={({ isActive }) => 
                  `flex items-center p-2 rounded-lg ${isActive ? 'bg-blue-800' : 'hover:bg-blue-800'} transition-colors`
                }
              >
                <Settings size={20} />
                {!collapsed && <span className="ml-3">Restaurante</span>}
              </NavLink>
            </li>
          )}

          {isAdmin && (
            <li>
              <NavLink 
                to="/users" 
                className={({ isActive }) => 
                  `flex items-center p-2 rounded-lg ${isActive ? 'bg-blue-800' : 'hover:bg-blue-800'} transition-colors`
                }
              >
                <Users size={20} />
                {!collapsed && <span className="ml-3">Usuarios</span>}
              </NavLink>
            </li>
          )}

          <li>
            <NavLink 
              to="/products" 
              className={({ isActive }) => 
                `flex items-center p-2 rounded-lg ${isActive ? 'bg-blue-800' : 'hover:bg-blue-800'} transition-colors`
              }
            >
              <Coffee size={20} />
              {!collapsed && <span className="ml-3">Productos</span>}
            </NavLink>
          </li>

          <li>
            <NavLink 
              to="/orders" 
              className={({ isActive }) => 
                `flex items-center p-2 rounded-lg ${isActive ? 'bg-blue-800' : 'hover:bg-blue-800'} transition-colors`
              }
            >
              <ShoppingBag size={20} />
              {!collapsed && <span className="ml-3">Ordenes</span>}
            </NavLink>
          </li>

          <li>
            <NavLink 
              to="/inventory" 
              className={({ isActive }) => 
                `flex items-center p-2 rounded-lg ${isActive ? 'bg-blue-800' : 'hover:bg-blue-800'} transition-colors`
              }
            >
              <Clipboard size={20} />
              {!collapsed && <span className="ml-3">Inventario</span>}
            </NavLink>
          </li>

          {isAdmin && (
            <li>
              <NavLink 
                to="/reports" 
                className={({ isActive }) => 
                  `flex items-center p-2 rounded-lg ${isActive ? 'bg-blue-800' : 'hover:bg-blue-800'} transition-colors`
                }
              >
                <BarChart2 size={20} />
                {!collapsed && <span className="ml-3">Reporte</span>}
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-blue-800">
        <button 
          onClick={logout}
          className="flex items-center w-full p-2 rounded-lg hover:bg-blue-800 transition-colors"
        >
          <LogOut size={20} />
          {!collapsed && <span className="ml-3">Salir</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;