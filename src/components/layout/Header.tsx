import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Flame, Bell, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  
  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white dark:bg-gray-800 shadow-md' 
        : 'bg-transparent dark:bg-transparent'
    }`}>
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-amber-600 dark:text-amber-500 transition hover:text-amber-700 dark:hover:text-amber-400"
          >
            <Flame className="h-8 w-8" />
            <span className="text-xl font-bold">CampusGas</span>
          </Link>
          
          <nav className="hidden md:flex md:space-x-8">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500 transition">
              Home
            </Link>
            <Link to="/gas-cylinders" className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500 transition">
              Gas Cylinders
            </Link>
            {user ? (
              <>
                <Link to="/request-refill" className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500 transition">
                  Request Refill
                </Link>
                <Link to="/my-orders" className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500 transition">
                  My Orders
                </Link>
                {user.isAdmin && (
                  <Link to="/admin-dashboard" className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500 transition">
                    Admin Dashboard
                  </Link>
                )}
              </>
            ) : null}
          </nav>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-amber-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>
            
            {user ? (
              <>
                <Link to="/my-orders" className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500 transition">
                  <Bell className="h-6 w-6" />
                </Link>
                <div className="hidden md:flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user.name}</span>
                  <button 
                    onClick={logout}
                    className="text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <Link 
                to="/auth" 
                className="hidden md:inline-flex btn btn-primary"
              >
                <User className="h-5 w-5 mr-1" />
                Login / Register
              </Link>
            )}
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex md:hidden text-gray-700 dark:text-gray-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden slide-in">
          <div className="container-custom py-4 space-y-1 bg-white dark:bg-gray-800">
            <Link 
              to="/" 
              className="block py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Home
            </Link>
            <Link 
              to="/gas-cylinders" 
              className="block py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Gas Cylinders
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/request-refill" 
                  className="block py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Request Refill
                </Link>
                <Link 
                  to="/my-orders" 
                  className="block py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  My Orders
                </Link>
                {user.isAdmin && (
                  <Link 
                    to="/admin-dashboard" 
                    className="block py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button 
                  onClick={logout}
                  className="flex w-full items-center py-2 px-3 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/auth" 
                className="flex items-center py-2 px-3 rounded text-amber-600 dark:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition"
              >
                <User className="h-5 w-5 mr-2" />
                Login / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;