
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-smooth"
    >
      {isDarkMode ? (
        <Sun className="text-primary" size={24} />
      ) : (
        <Moon className="text-primary" size={24} />
      )}
    </button>
  );
};

export default DarkModeToggle;
