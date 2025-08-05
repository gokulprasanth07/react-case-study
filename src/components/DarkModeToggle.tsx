import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const DarkModeToggle: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  return (
    <button
      onClick={toggleDarkMode}
      style={{
        background: darkMode ? '#222' : '#eee',
        color: darkMode ? '#fff' : '#222',
        border: '1px solid #888',
        borderRadius: 6,
        padding: '0.4rem 1rem',
        cursor: 'pointer',
        marginLeft: 12,
      }}
      aria-label="Toggle dark mode"
    >
      {darkMode ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
};
