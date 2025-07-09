"use client";

import React, { useState } from "react";
import Inbox, { ConversationPreview, Contact } from "./Inbox";

const contacts: Contact[] = [
  { id: "emilie", name: "Émilie", avatar: "👩" },
  { id: "maman", name: "Maman", avatar: "👩‍🦳" },
  { id: "lucas", name: "Lucas", avatar: "🧑" }
];

const conversations: ConversationPreview[] = [
  {
    id: "emilie",
    contact: contacts[0],
    lastMessage: "Tu fais quoi ce soir ?",
    timestamp: "14:10",
    unread: true
  },
  {
    id: "maman",
    contact: contacts[1],
    lastMessage: "Tu viens ce soir ?",
    timestamp: "13:55",
    unread: false
  },
  {
    id: "lucas",
    contact: contacts[2],
    lastMessage: "On se retrouve à 20h !",
    timestamp: "13:40",
    unread: false
  }
];

export default function InboxDemo() {
  const [selected, setSelected] = useState<string | null>(null);

  if (selected) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="text-2xl font-bold mb-4">Discussion avec {contacts.find(c => c.id === selected)?.name}</div>
        <button
          className="px-4 py-2 rounded bg-blue-500 text-white font-semibold"
          onClick={() => setSelected(null)}
        >
          Retour à l'Inbox
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Inbox conversations={conversations} onSelect={setSelected} theme="light" />
    </div>
  );
}
