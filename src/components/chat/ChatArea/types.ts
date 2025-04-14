export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

export interface ChatHeaderProps {
  title: string;
}

export interface MessageListProps {
  messages: Message[];
}

export interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  placeholder?: string;
}

export interface ChatPanelProps {
  isSidebarOpen: boolean;
  title: string;
  messages: Message[];
  onSendMessage: (message: string) => void;
} 