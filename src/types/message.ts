export interface Message {
  id: string;
  from: string;
  text: string;
  avatar: string;
  timestamp: string;
  isMe?: boolean;
}

export interface ChatData {
  contactName: string;
  contactAvatar: string;
  messages: Message[];
}

export interface StatusBarInfo {
  time: string;
  battery: number;
  signal: number;
  wifi: boolean;
}
