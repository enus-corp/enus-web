export interface ChatHistoryItem {
  id: string;
  title: string;
  lastMessage: string;
}

export interface ChatHistoryProps {
  items: ChatHistoryItem[];
  activeChatId: string | null;
  onChatSelect: (chatId: string) => void;
}

export interface NewChatButtonProps {
  onClick: () => void;
}

export interface UserProfileProps {
  username: string;
  avatarUrl?: string;
  onSettingsClick: () => void;
} 