import React from 'react';
import { ChatHistoryProps } from './types';
import { createStyles } from './styles';

const styles = createStyles({
  drawerWidth: 280,
  trailWidth: 60
})

const ChatHistory: React.FC<ChatHistoryProps> = ({
  items,
  activeChatId,
  onChatSelect
}) => {
  const {ChatHistoryList, ChatHistoryItem} = styles;
  return (
    <ChatHistoryList>
      {items.map((item) => (
        <ChatHistoryItem
          key={item.id}
          $isActive={item.id === activeChatId}
          onClick={() => onChatSelect(item.id)}
        >
          <div>{item.title}</div>
          <div>{item.lastMessage}</div>
        </ChatHistoryItem>
      ))}
    </ChatHistoryList>
  );
};

export default ChatHistory; 