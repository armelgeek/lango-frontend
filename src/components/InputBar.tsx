'use client';

import React, { useState } from 'react';

interface InputBarProps {
  theme?: 'light' | 'dark';
  onSend?: (message: string) => void;
}

export default function InputBar({ 
  theme = 'light',
  onSend 
}: InputBarProps) {
  const [message, setMessage] = useState('');
  const isDark = theme === 'dark';
  
  const handleSend = () => {
    if (message.trim() && onSend) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`
      px-4 py-3 border-t
      ${isDark ? 
        'bg-gray-900 border-gray-700' : 
        'bg-white border-gray-200'
      }
      transition-colors duration-300
    `}>
      <div className="flex items-end space-x-3">
        {/* Plus button */}
        <button className={`
          p-2 rounded-full transition-colors duration-200
          ${isDark ? 
            'text-gray-400 hover:bg-gray-800' : 
            'text-gray-500 hover:bg-gray-100'
          }
        `}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="16"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
        </button>
        
        {/* Message input */}
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Message..."
            rows={1}
            className={`
              w-full px-4 py-2 rounded-2xl resize-none transition-colors duration-300
              text-sm leading-relaxed max-h-24 overflow-y-auto
              ${isDark ? 
                'bg-gray-800 text-white placeholder-gray-400 border-gray-600' : 
                'bg-gray-100 text-gray-900 placeholder-gray-500 border-gray-200'
              }
              border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            `}
            style={{ minHeight: '36px' }}
          />
        </div>
        
        {/* Camera button */}
        <button className={`
          p-2 rounded-full transition-colors duration-200
          ${isDark ? 
            'text-gray-400 hover:bg-gray-800' : 
            'text-gray-500 hover:bg-gray-100'
          }
        `}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
            <circle cx="12" cy="13" r="3"/>
          </svg>
        </button>
        
        {/* Send button or microphone */}
        <button 
          onClick={handleSend}
          className={`
            p-2 rounded-full transition-all duration-200
            ${message.trim() ? 
              'bg-blue-500 text-white hover:bg-blue-600 scale-100' : 
              (isDark ? 
                'text-gray-400 hover:bg-gray-800 scale-95' : 
                'text-gray-500 hover:bg-gray-100 scale-95'
              )
            }
          `}
        >
          {message.trim() ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22,2 15,22 11,13 2,9 22,2"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" y1="19" x2="12" y2="23"/>
              <line x1="8" y1="23" x2="16" y2="23"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
