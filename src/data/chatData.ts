import { ChatData } from '@/types/message';

export const chatData: ChatData = {
  contactName: "Groupe Amis 🎉",
  contactAvatar: "👥",
  messages: [
    {
      id: "1",
      from: "Émilie",
      text: "Salut tout le monde ! 👋",
      avatar: "👩",
      timestamp: "14:01"
    },
    {
      id: "2", 
      from: "Lucas",
      text: "Yo ! Comment ça va ?",
      avatar: "🧑",
      timestamp: "14:02"
    },
    {
      id: "3",
      from: "Moi",
      text: "Coucou ! Ça va super bien 😊",
      avatar: "🧔",
      timestamp: "14:03",
      isMe: true
    },
    {
      id: "4",
      from: "Sophie",
      text: "On fait quoi ce weekend ?",
      avatar: "👱‍♀️",
      timestamp: "14:05"
    },
    {
      id: "5",
      from: "Moi",
      text: "J'ai une idée ! On pourrait aller au parc 🌳",
      avatar: "🧔",
      timestamp: "14:06",
      isMe: true
    },
    {
      id: "6",
      from: "Émilie",
      text: "Excellente idée ! J'apporte des snacks 🥨",
      avatar: "👩",
      timestamp: "14:07"
    },
    {
      id: "7",
      from: "Lucas",
      text: "Parfait ! Moi j'amène la musique 🎵",
      avatar: "🧑",
      timestamp: "14:08"
    },
    {
      id: "8",
      from: "Sophie",
      text: "Et moi les boissons ! 🥤",
      avatar: "👱‍♀️",
      timestamp: "14:09"
    },
    {
      id: "9",
      from: "Moi",
      text: "Super ! RDV samedi 14h au parc central ?",
      avatar: "🧔",
      timestamp: "14:10",
      isMe: true
    },
    {
      id: "10",
      from: "Émilie",
      text: "Oui ! J'ai hâte 🎉",
      avatar: "👩",
      timestamp: "14:11"
    }
  ]
};
