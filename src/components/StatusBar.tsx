'use client';

import React from 'react';

interface StatusBarProps {
  time?: string;
  battery?: number;
  signal?: number;
  wifi?: boolean;
  theme?: 'light' | 'dark';
}

export default function StatusBar({ 
  time = "14:25", 
  battery = 85, 
  signal = 4, 
  wifi = true,
  theme = 'light'
}: StatusBarProps) {
  const isDark = theme === 'dark';
  
  return (
    <div className={`
      flex justify-between items-center px-6 pt-3 pb-1 text-sm font-medium
      ${isDark ? 'text-white bg-black' : 'text-black bg-white'}
      transition-colors duration-300
      relative z-20
    `}>
      {/* Left side - Time */}
      <div className="font-semibold tracking-tight">
        {time}
      </div>
      
      {/* Right side - Battery, Signal, WiFi */}
      <div className="flex items-center space-x-1">
        {/* Signal bars */}
        <div className="flex items-end space-x-0.5">
          {[1, 2, 3, 4].map((bar) => (
            <div
              key={bar}
              className={`
                w-1 rounded-sm transition-all duration-300
                ${bar <= signal ? 
                  (isDark ? 'bg-white' : 'bg-black') : 
                  (isDark ? 'bg-gray-600' : 'bg-gray-300')
                }
              `}
              style={{ height: `${bar * 2 + 2}px` }}
            />
          ))}
        </div>
        
        {/* WiFi icon */}
        <div className={`ml-1 ${wifi ? (isDark ? 'text-white' : 'text-black') : 'text-gray-400'}`}>
          <svg width="15" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.07 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
          </svg>
        </div>
        
        {/* Battery */}
        <div className="flex items-center ml-1">
          <div className={`
            relative w-6 h-3 border rounded-sm
            ${isDark ? 'border-white' : 'border-black'}
          `}>
            <div 
              className={`
                absolute top-0.5 left-0.5 h-2 rounded-sm transition-all duration-300
                ${battery > 20 ? 
                  (isDark ? 'bg-white' : 'bg-black') : 
                  'bg-red-500'
                }
              `}
              style={{ width: `${Math.max(0, (battery / 100) * 20 - 2)}px` }}
            />
            <div className={`
              absolute -right-0.5 top-1 w-0.5 h-1 rounded-r-sm
              ${isDark ? 'bg-white' : 'bg-black'}
            `} />
          </div>
          <span className="ml-1 text-xs font-medium">{battery}%</span>
        </div>
      </div>
    </div>
  );
}
