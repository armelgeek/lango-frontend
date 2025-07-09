'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChatData } from '@/types/message';
import StatusBar from './StatusBar';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import InputBar from './InputBar';

interface ChatScreenProps {
  chatData: ChatData;
  animationSpeed?: number;
  theme?: 'light' | 'dark';
  onExportVideo?: () => void;
}

export default function ChatScreen({ 
  chatData, 
  animationSpeed = 3000,
  theme = 'light',
  onExportVideo
}: ChatScreenProps) {
  const [visibleMessages, setVisibleMessages] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

  // Auto-scroll to bottom when new messages appear
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [visibleMessages]);

  // Animation logic
  useEffect(() => {
    if (isPlaying && currentIndex < chatData.messages.length) {
      const timer = setTimeout(() => {
        setVisibleMessages(prev => [...prev, chatData.messages[currentIndex].id]);
        setCurrentIndex(prev => prev + 1);
      }, animationSpeed);

      return () => clearTimeout(timer);
    } else if (currentIndex >= chatData.messages.length) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentIndex, chatData.messages, animationSpeed]);

  const startAnimation = () => {
    setVisibleMessages([]);
    setCurrentIndex(0);
    setIsPlaying(true);
  };

  const stopAnimation = () => {
    setIsPlaying(false);
  };

  const showAllMessages = () => {
    setVisibleMessages(chatData.messages.map(msg => msg.id));
    setCurrentIndex(chatData.messages.length);
    setIsPlaying(false);
  };

  const resetMessages = () => {
    setVisibleMessages([]);
    setCurrentIndex(0);
    setIsPlaying(false);
  };

  return (
    <div className={`
      w-full h-full flex flex-col
      ${isDark ? 'bg-black' : 'bg-white'}
      font-sans antialiased
      transition-colors duration-300
      relative
    `}>
      {/* Status bar */}
      <StatusBar theme={theme} />
      
      {/* Chat header */}
      <ChatHeader 
        contactName={chatData.contactName}
        contactAvatar={chatData.contactAvatar}
        theme={theme}
      />
      
      {/* Messages area */}
      <div 
        id="chat-screen"
        className={`
          flex-1 overflow-y-auto chat-scrollbar
          ${isDark ? 'bg-black' : 'bg-gray-50'}
          transition-colors duration-300
        `}
        style={{
          backgroundImage: isDark 
            ? 'none'
            : `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f0f0f0' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}
      >
        <div className="py-4">
          {chatData.messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isVisible={visibleMessages.includes(message.id)}
              theme={theme}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input bar */}
      <InputBar theme={theme} />
      
      {/* Control panel - Compact pour mobile */}
      <div className={`
        px-2 py-2 border-t flex flex-wrap gap-1 justify-center
        ${isDark ? 
          'bg-gray-900 border-gray-700' : 
          'bg-gray-100 border-gray-200'
        }
        transition-colors duration-300
      `}>
        <button
          onClick={startAnimation}
          disabled={isPlaying}
          className={`
            px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200
            ${isPlaying ?
              (isDark ? 'bg-gray-700 text-gray-500' : 'bg-gray-300 text-gray-500') :
              'bg-blue-500 text-white hover:bg-blue-600 active:scale-95'
            }
            disabled:cursor-not-allowed
          `}
        >
          {isPlaying ? '▶️' : '▶️'}
        </button>
        
        <button
          onClick={stopAnimation}
          disabled={!isPlaying}
          className={`
            px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200
            ${!isPlaying ?
              (isDark ? 'bg-gray-700 text-gray-500' : 'bg-gray-300 text-gray-500') :
              (isDark ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-red-500 text-white hover:bg-red-600')
            }
            disabled:cursor-not-allowed active:scale-95
          `}
        >
          ⏹️
        </button>
        
        <button
          onClick={showAllMessages}
          className={`
            px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 active:scale-95
            ${isDark ? 
              'bg-green-600 text-white hover:bg-green-700' : 
              'bg-green-500 text-white hover:bg-green-600'
            }
          `}
        >
          📜
        </button>
        
        <button
          onClick={resetMessages}
          className={`
            px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 active:scale-95
            ${isDark ? 
              'bg-gray-700 text-white hover:bg-gray-600' : 
              'bg-gray-500 text-white hover:bg-gray-600'
            }
          `}
        >
          🔄
        </button>
        
        {onExportVideo && (
          <button
            onClick={onExportVideo}
            className={`
              px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 active:scale-95
              ${isDark ? 
                'bg-purple-600 text-white hover:bg-purple-700' : 
                'bg-purple-500 text-white hover:bg-purple-600'
              }
            `}
          >
            📹
          </button>
        )}
      </div>
    </div>
  );
}
