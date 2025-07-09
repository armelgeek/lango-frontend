"use client";

import React from "react";

export interface Contact {
  id: string;
  name: string;
  avatar: string;
}

export interface ConversationPreview {
  id: string;
  contact: Contact;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

interface InboxProps {
  conversations: ConversationPreview[];
  onSelect: (id: string) => void;
  theme?: "light" | "dark";
}

export default function Inbox({ conversations, onSelect, theme = "light" }: InboxProps) {
  const isDark = theme === "dark";
  return (
    <div className={`w-full h-full flex flex-col bg-transparent`}> 
      <div className="px-6 py-4 text-2xl font-bold tracking-tight select-none">
        Messages
      </div>
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => (
          <button
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={`
              w-full flex items-center px-4 py-3 border-b transition-colors duration-200
              ${isDark ? "bg-black border-gray-800 hover:bg-gray-900" : "bg-white border-gray-100 hover:bg-gray-50"}
              focus:outline-none
            `}
          >
            <div className="relative mr-4">
              <span className="w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-gray-200 dark:bg-gray-700">
                {conv.contact.avatar}
              </span>
              {conv.unread && (
                <span className="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-white dark:border-black" />
              )}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="font-semibold text-base truncate">
                {conv.contact.name}
              </div>
              <div className="text-sm text-gray-500 truncate">
                {conv.lastMessage}
              </div>
            </div>
            <div className="ml-2 flex flex-col items-end">
              <span className="text-xs text-gray-400">
                {conv.timestamp}
              </span>
              {conv.unread && (
                <span className="mt-1 px-2 py-0.5 text-xs rounded-full bg-blue-500 text-white font-semibold">Nouveau</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
