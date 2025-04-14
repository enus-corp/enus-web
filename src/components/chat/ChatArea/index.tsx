import React, { useState } from 'react';
import { ChatPanelProps } from './types';
import { createStyles } from './styles';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const { ChatPanel: StyledChatPanel } = createStyles();

const ChatPanel: React.FC<ChatPanelProps> = ({
  isSidebarOpen,
  title,
  messages,
  onSendMessage
}) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    onSendMessage(newMessage.trim());
    setNewMessage('');
  };

  return (
    <StyledChatPanel isSidebarOpen={isSidebarOpen}>
      <ChatHeader title={title} />
      <MessageList messages={messages} />
      <MessageInput
        value={newMessage}
        onChange={setNewMessage}
        onSubmit={handleSubmit}
      />
    </StyledChatPanel>
  );
};

export default ChatPanel; 