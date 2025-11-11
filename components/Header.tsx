import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { BuildingOffice2Icon, SunIcon, MoonIcon } from './Icons';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center">
          <BuildingOffice2Icon className="h-8 w-8 text-brand-primary" />
          <h1 className="ml-3 text-2xl md:text-3xl font-bold text-dark-text dark:text-gray-100 tracking-tight">
            Companies Directory
          </h1>
        </div>
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-brand-secondary transition-colors"
        >
          {theme === 'light' ? (
            <MoonIcon className="h-6 w-6" />
          ) : (
            <SunIcon className="h-6 w-6" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;