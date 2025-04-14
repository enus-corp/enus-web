import React from 'react';
import ChatHistory from './ChatHistory';
import NewChatButton from './NewChatButton';
import { ChatHistoryItem } from './types';
import { createStyles } from './styles';

const styles = createStyles({
  drawerWidth: 280,
  trailWidth: 60
});

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  chatHistory: ChatHistoryItem[];
  activeChatId: string | null;
  onChatSelect: (chatId: string) => void;
  onNewChat: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  chatHistory,
  activeChatId,
  onChatSelect,
  onNewChat,
}) => {
  const { Sidebar, CloseDrawerButton } = styles;
  return (
    <Sidebar isOpen={isOpen}>
      <CloseDrawerButton onClick={onClose}>
        &times;
      </CloseDrawerButton>
      <NewChatButton onClick={onNewChat} />
      <ChatHistory
        items={chatHistory}
        activeChatId={activeChatId}
        onChatSelect={onChatSelect}
      />
    </Sidebar>
  );
};

export default Sidebar; 