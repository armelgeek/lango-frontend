'use client';

import React from 'react';

interface ChatHeaderProps {
  contactName: string;
  contactAvatar: string;
  theme?: 'light' | 'dark';
  onBack?: () => void;
}

export default function ChatHeader({ 
  contactName, 
  contactAvatar, 
  theme = 'light',
  onBack 
}: ChatHeaderProps) {
  const isDark = theme === 'dark';
  
  return (
    <div className={`
      flex items-center px-4 py-3 border-b
      ${isDark ? 
        'bg-black border-gray-800 text-white' : 
        'bg-white border-gray-200 text-gray-900'
      }
      transition-colors duration-300
      relative z-10
    `}>
      {/* Back button */}
      <button 
        onClick={onBack}
        className={`
          mr-3 p-1 rounded-full transition-colors duration-200
          ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}
        `}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="m15 18-6-6 6-6"/>
        </svg>
      </button>
      
      {/* Contact avatar */}
      <div className={`
        w-9 h-9 rounded-full flex items-center justify-center text-lg mr-3
        ${isDark ? 'bg-gray-700' : 'bg-blue-100'}
        shadow-sm
      `}>
        {contactAvatar}
      </div>
      
      {/* Contact info */}
      <div className="flex-1">
        <h2 className={`
          font-semibold text-base leading-tight
          ${isDark ? 'text-white' : 'text-gray-900'}
        `}>
          {contactName}
        </h2>
        <p className={`
          text-xs
          ${isDark ? 'text-green-400' : 'text-green-600'}
        `}>
          En ligne
        </p>
      </div>
      
      {/* Actions */}
      <div className="flex items-center space-x-3">
        {/* Video call */}
        <button className={`
          p-2 rounded-full transition-colors duration-200
          ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}
        `}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m22 8-6 4 6 4V8Z"/>
            <rect width="14" height="12" x="2" y="6" rx="2" ry="2"/>
          </svg>
        </button>
        
        {/* Voice call */}
        <button className={`
          p-2 rounded-full transition-colors duration-200
          ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}
        `}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
