'use client';

import React, { useState, useEffect } from 'react';

interface AppTransitionProps {
  theme?: 'light' | 'dark';
  onComplete?: () => void;
}

export default function AppTransition({ 
  theme = 'light',
  onComplete 
}: AppTransitionProps) {
  const [stage, setStage] = useState<'homescreen' | 'opening' | 'complete'>('homescreen');
  const isDark = theme === 'dark';

  useEffect(() => {
    // Afficher l'écran d'accueil pendant 2 secondes
    const timer1 = setTimeout(() => {
      setStage('opening');
    }, 2000);

    // Commencer l'ouverture de l'app
    const timer2 = setTimeout(() => {
      setStage('complete');
      onComplete?.();
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  const apps = [
    { name: 'Messages', icon: '💬', color: 'bg-green-500' },
    { name: 'Phone', icon: '📞', color: 'bg-green-600' },
    { name: 'Safari', icon: '🧭', color: 'bg-blue-500' },
    { name: 'Mail', icon: '✉️', color: 'bg-blue-600' },
    { name: 'Maps', icon: '🗺️', color: 'bg-gray-500' },
    { name: 'Camera', icon: '📷', color: 'bg-gray-600' },
    { name: 'Photos', icon: '🖼️', color: 'bg-yellow-500' },
    { name: 'Settings', icon: '⚙️', color: 'bg-gray-700' },
  ];

  if (stage === 'complete') return null;

  return (
    <div className={`
      absolute inset-0 z-50
      ${isDark ? 'bg-black' : 'bg-black'}
      ${stage === 'opening' ? 'transition-all duration-700 scale-110 opacity-0' : ''}
    `}>
      {/* Wallpaper */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Status bar */}
      <div className="absolute top-2 left-0 right-0 flex justify-between items-center px-6 pt-1 text-white text-sm font-medium z-10">
        <div className="font-semibold">
          {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className="flex items-center space-x-1">
          <div className="flex items-end space-x-0.5">
            {[1, 2, 3, 4].map((bar) => (
              <div
                key={bar}
                className="w-1 bg-white rounded-sm"
                style={{ height: `${bar * 2 + 2}px` }}
              />
            ))}
          </div>
          <div className="ml-1 text-white">
            <svg width="15" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.07 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
            </svg>
          </div>
          <div className="flex items-center ml-1">
            <div className="relative w-6 h-3 border border-white rounded-sm">
              <div className="absolute top-0.5 left-0.5 h-2 w-4 bg-white rounded-sm" />
              <div className="absolute -right-0.5 top-1 w-0.5 h-1 bg-white rounded-r-sm" />
            </div>
            <span className="ml-1 text-xs">85%</span>
          </div>
        </div>
      </div>

      {/* Dynamic Island */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-20" />

      {/* Home screen apps */}
      <div className="flex-1 p-6 pt-16">
        <div className="grid grid-cols-4 gap-6">
          {apps.map((app) => (
            <div
              key={app.name}
              className={`
                flex flex-col items-center space-y-2
                ${stage === 'opening' && app.name === 'Messages' ? 
                  'transform transition-all duration-500 scale-150 z-30' : 
                  ''
                }
              `}
            >
              <div 
                className={`
                  w-14 h-14 rounded-2xl flex items-center justify-center text-2xl
                  ${app.color} shadow-lg
                  ${stage === 'opening' && app.name === 'Messages' ? 
                    'animate-pulse' : 
                    ''
                  }
                `}
                onClick={() => {
                  if (app.name === 'Messages') {
                    setStage('opening');
                  }
                }}
              >
                {app.icon}
              </div>
              <span className="text-white text-xs text-center leading-tight">
                {app.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Dock */}
      <div className="absolute bottom-6 left-6 right-6 bg-white/20 backdrop-blur-md rounded-2xl p-3">
        <div className="flex justify-around">
          {['📞', '✉️', '🎵', '🧭'].map((icon, index) => (
            <div
              key={index}
              className="w-14 h-14 rounded-2xl bg-gray-600 flex items-center justify-center text-2xl shadow-lg"
            >
              {icon}
            </div>
          ))}
        </div>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/60 rounded-full" />
    </div>
  );
}
