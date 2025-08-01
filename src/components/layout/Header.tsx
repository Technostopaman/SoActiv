import React, { useState } from 'react';
import { Menu, Plus, Sun, Moon, Bell, User } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';

interface HeaderProps {
  onMobileMenuToggle: () => void;
  onAddClient: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMobileMenuToggle, onAddClient }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        {/* Mobile menu button */}
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Menu size={20} />
        </button>

        {/* Logo (mobile) */}
        <div className="lg:hidden flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-orange-500 rounded-md">
            <span className="text-white text-sm font-bold">S</span>
          </div>
          <span className="text-lg font-bold text-gray-900 dark:text-white">SoActiv</span>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-3">
          {/* Add Client Button */}
          <Button
            onClick={onAddClient}
            size="sm"
            className="hidden sm:flex"
          >
            <Plus size={16} className="mr-1" />
            Add Client
          </Button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Notifications */}
          <button className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
          </button>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <span className="hidden sm:block text-sm font-medium">{user?.name}</span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  My Profile
                </button>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Settings
                </button>
                <hr className="my-1 border-gray-200 dark:border-gray-700" />
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};