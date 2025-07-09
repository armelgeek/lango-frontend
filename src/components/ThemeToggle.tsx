'use client';

import React from 'react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
}

export default function ThemeToggle({ theme, onThemeChange }: ThemeToggleProps) {
  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => onThemeChange(isDark ? 'light' : 'dark')}
      className={`
        fixed top-4 right-4 z-50
        w-12 h-12 rounded-full
        flex items-center justify-center
        transition-all duration-300
        ${isDark ? 
          'bg-yellow-500 hover:bg-yellow-400 text-gray-900' : 
          'bg-gray-800 hover:bg-gray-700 text-yellow-400'
        }
        shadow-lg hover:shadow-xl
        active:scale-95
      `}
      title={isDark ? 'Mode clair' : 'Mode sombre'}
    >
      <span className="text-xl">
        {isDark ? '☀️' : '🌙'}
      </span>
    </button>
  );
}
