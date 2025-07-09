'use client';

import React, { useState, useEffect } from 'react';
import { Message } from '@/types/message';

interface MessageBubbleProps {
  message: Message;
  isVisible: boolean;
  theme?: 'light' | 'dark';
}

export default function MessageBubble({ 
  message, 
  isVisible, 
  theme = 'light' 
}: MessageBubbleProps) {
  const [mounted, setMounted] = useState(false);
  const isDark = theme === 'dark';
  const isFromMe = message.isMe || message.from === 'Moi';

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setMounted(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className={`
      flex mb-3 px-4
      ${isFromMe ? 'justify-end' : 'justify-start'}
      transform transition-all duration-500 ease-out
      ${mounted ? 
        'translate-y-0 opacity-100' : 
        'translate-y-4 opacity-0'
      }
    `}>
      <div className={`
        flex max-w-[280px] items-end space-x-2
        ${isFromMe ? 'flex-row-reverse space-x-reverse' : 'flex-row'}
      `}>
        {/* Avatar */}
        {!isFromMe && (
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center text-sm mb-1
            ${isDark ? 'bg-gray-700' : 'bg-gray-100'}
          `}>
            {message.avatar}
          </div>
        )}
        
        {/* Message content */}
        <div className="flex flex-col">
          {/* Sender name (only for others) */}
          {!isFromMe && (
            <span className={`
              text-xs mb-1 px-2
              ${isDark ? 'text-gray-400' : 'text-gray-500'}
            `}>
              {message.from}
            </span>
          )}
          
          {/* Message bubble */}
          <div className={`
            relative px-4 py-2 rounded-2xl max-w-full break-words
            shadow-sm transition-all duration-300
            ${isFromMe ? 
              (isDark ? 
                'bg-blue-600 text-white' : 
                'bg-blue-500 text-white'
              ) : 
              (isDark ? 
                'bg-gray-700 text-white' : 
                'bg-gray-100 text-gray-900'
              )
            }
            ${mounted ? 'scale-100' : 'scale-95'}
            hover:shadow-md
          `}>
            {/* Message text */}
            <p className="text-sm leading-relaxed">
              {message.text}
            </p>
            
            {/* Message tail */}
            <div className={`
              absolute w-0 h-0 
              ${isFromMe ? 
                'right-0 border-l-8 border-r-0' : 
                'left-0 border-r-8 border-l-0'
              }
              ${isFromMe ? 
                (isDark ? 
                  'border-l-blue-600 border-t-8 border-t-transparent border-b-8 border-b-transparent' :
                  'border-l-blue-500 border-t-8 border-t-transparent border-b-8 border-b-transparent'
                ) : 
                (isDark ? 
                  'border-r-gray-700 border-t-8 border-t-transparent border-b-8 border-b-transparent' :
                  'border-r-gray-100 border-t-8 border-t-transparent border-b-8 border-b-transparent'
                )
              }
              ${isFromMe ? 
                '-mr-2 top-3' : 
                '-ml-2 top-3'
              }
            `} />
          </div>
          
          {/* Timestamp */}
          <span className={`
            text-xs mt-1 px-2
            ${isDark ? 'text-gray-500' : 'text-gray-400'}
            ${isFromMe ? 'text-right' : 'text-left'}
          `}>
            {message.timestamp}
          </span>
        </div>
        
        {/* Avatar for my messages */}
        {isFromMe && (
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center text-sm mb-1
            ${isDark ? 'bg-blue-700' : 'bg-blue-100'}
          `}>
            {message.avatar}
          </div>
        )}
      </div>
    </div>
  );
}
