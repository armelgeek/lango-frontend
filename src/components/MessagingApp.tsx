'use client';

import React, { useState } from 'react';
import LockScreen from '@/components/LockScreen';
import AppTransition from '@/components/AppTransition';
import ChatScreen from '@/components/ChatScreen';
import ThemeToggle from '@/components/ThemeToggle';
import { chatData } from '@/data/chatData';
import { useVideoExport } from '@/hooks/useVideoExport';

type AppState = 'locked' | 'transitioning' | 'chat';

export default function MessagingApp() {
  const [appState, setAppState] = useState<AppState>('locked');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [animationSpeed, setAnimationSpeed] = useState(3000);
  const { exportToImage } = useVideoExport();

  const handleUnlock = () => {
    setAppState('transitioning');
  };

  const handleAppOpen = () => {
    setAppState('chat');
  };

  const handleExportVideo = () => {
    exportToImage('chat-screen');
  };

  const resetToLockScreen = () => {
    setAppState('locked');
  };

  return (
    <div className={`
      min-h-screen flex items-center justify-center p-4 transition-colors duration-300
      ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}
    `}>
      {/* Theme toggle - Only show during chat */}
      {appState === 'chat' && (
        <ThemeToggle theme={theme} onThemeChange={setTheme} />
      )}
      
      {/* Speed control - Only show during chat */}
      {appState === 'chat' && (
        <div className={`
          fixed top-4 left-4 z-50
          p-3 rounded-lg shadow-lg
          ${theme === 'dark' ? 
            'bg-gray-800 text-white' : 
            'bg-white text-gray-900'
          }
          transition-colors duration-300
        `}>
          <label className="block text-sm font-medium mb-2">
            Vitesse: {animationSpeed}ms
          </label>
          <input
            type="range"
            min="500"
            max="5000"
            step="500"
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(Number(e.target.value))}
            className={`
              w-24 h-2 rounded-lg appearance-none cursor-pointer
              ${theme === 'dark' ? 
                'bg-gray-700' : 
                'bg-gray-200'
              }
            `}
          />
        </div>
      )}

      {/* Reset button - Only show during chat */}
      {appState === 'chat' && (
        <button
          onClick={resetToLockScreen}
          className={`
            fixed bottom-4 left-4 z-50
            px-4 py-2 rounded-lg text-sm font-medium
            ${theme === 'dark' ? 
              'bg-gray-800 text-white hover:bg-gray-700' : 
              'bg-white text-gray-900 hover:bg-gray-100'
            }
            shadow-lg transition-all duration-200
          `}
        >
          🔒 Retour Lock Screen
        </button>
      )}

      {/* iPhone Container */}
      <div className={`
        relative w-[375px] h-[812px] 
        rounded-[3rem] p-2 shadow-2xl
        ${theme === 'dark' ? 
          'bg-gray-800 shadow-gray-900/50' : 
          'bg-gray-900 shadow-black/20'
        }
        transition-all duration-300
      `}>
        {/* iPhone Screen */}
        <div className={`
          w-full h-full rounded-[2.5rem] overflow-hidden
          ${theme === 'dark' ? 'bg-black' : 'bg-black'}
          relative
        `}>
          {/* Dynamic Island (iPhone 14 Pro style) */}
          <div className={`
            absolute top-2 left-1/2 transform -translate-x-1/2 z-30
            w-32 h-6 rounded-full
            ${theme === 'dark' ? 'bg-black' : 'bg-black'}
          `} />
          
          {/* App State Management */}
          {appState === 'locked' && (
            <LockScreen 
              theme={theme} 
              onUnlock={handleUnlock}
              showNotification={true}
            />
          )}
          
          {appState === 'transitioning' && (
            <AppTransition 
              theme={theme} 
              onComplete={handleAppOpen}
            />
          )}
          
          {appState === 'chat' && (
            <ChatScreen
              chatData={chatData}
              animationSpeed={animationSpeed}
              theme={theme}
              onExportVideo={handleExportVideo}
            />
          )}
        </div>
      </div>
    </div>
  );
}
