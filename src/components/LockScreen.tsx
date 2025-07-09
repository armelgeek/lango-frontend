'use client';

import React, { useState, useEffect } from 'react';

interface LockScreenProps {
  theme?: 'light' | 'dark';
  onUnlock?: () => void;
  showNotification?: boolean;
}

export default function LockScreen({ 
  theme = 'light', 
  onUnlock,
  showNotification = true 
}: LockScreenProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setNotificationVisible(true);
        // Joue le son de notification à chaque apparition
        try {
          const audio = new Audio('/notification.mp3');
          audio.volume = 1.0;
          audio.currentTime = 0;
          audio.play().catch(() => {/* ignore autoplay errors */});
        } catch (e) {
          // ignore
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showNotification, notificationVisible]);

  const handleUnlock = () => {
    setIsUnlocking(true);
    setTimeout(() => {
      onUnlock?.();
    }, 800);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <div className={`
      w-full h-full relative overflow-hidden
      ${isDark ? 'bg-black' : 'bg-black'}
      flex flex-col items-center justify-center
      ${isUnlocking ? 'transition-all duration-700 scale-110 opacity-0' : ''}
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
      <div className="absolute top-2 left-0 right-0 flex justify-between items-center px-6 pt-1 text-white text-sm font-medium">
        <div className="font-semibold">
          {formatTime(currentTime)}
        </div>
        <div className="flex items-center space-x-1">
          {/* Signal */}
          <div className="flex items-end space-x-0.5">
            {[1, 2, 3, 4].map((bar) => (
              <div
                key={bar}
                className="w-1 bg-white rounded-sm"
                style={{ height: `${bar * 2 + 2}px` }}
              />
            ))}
          </div>
          
          {/* WiFi */}
          <div className="ml-1 text-white">
            <svg width="15" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.07 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
            </svg>
          </div>
          
          {/* Battery */}
          <div className="flex items-center ml-1">
            <div className="relative w-6 h-3 border border-white rounded-sm">
              <div className="absolute top-0.5 left-0.5 h-2 w-4 bg-white rounded-sm" />
              <div className="absolute -right-0.5 top-1 w-0.5 h-1 bg-white rounded-r-sm" />
            </div>
            <span className="ml-1 text-xs">85%</span>
          </div>
        </div>
      </div>

      {/* Time and Date */}
      <div className="text-center mb-8 z-10">
        <div className="text-white text-6xl font-thin mb-2">
          {formatTime(currentTime)}
        </div>
        <div className="text-white text-lg font-medium capitalize">
          {formatDate(currentTime)}
        </div>
      </div>

      {/* Notification */}
      {notificationVisible && (
        <div className={`
          mx-4 mb-8 p-4 rounded-2xl backdrop-blur-md bg-white/20 border border-white/30
          notification-animate-in
          z-10
        `}>
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">💬</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-white font-semibold text-sm">Messages</span>
                <span className="text-white/70 text-xs">maintenant</span>
              </div>
              <div className="text-white text-sm mb-1">Groupe Amis 🎉</div>
              <div className="text-white/90 text-sm">Émilie: Salut tout le monde ! 👋</div>
            </div>
          </div>
        </div>
      )}

      {/* Camera and Flashlight shortcuts */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-between px-8">
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M14.5 4h-5l-2 2H3v14h18V6h-4.5l-2-2z"/>
            <circle cx="12" cy="13" r="3"/>
          </svg>
        </div>
        
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M9 12l2 2 4-4"/>
            <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
            <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
          </svg>
        </div>
      </div>

      {/* Unlock instruction */}
      <div className="absolute bottom-20 left-0 right-0 text-center">
        <div className="text-white/70 text-sm mb-4">
          Balayez vers le haut pour déverrouiller
        </div>
        <button
          onClick={handleUnlock}
          className="w-16 h-1 bg-white rounded-full mx-auto hover:bg-white/80 transition-all duration-200"
        />
      </div>

      {/* Dynamic Island (for newer iPhones) */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-20" />
    </div>
  );
}
