import React, { useState } from 'react';
import { createStyles } from './styles';
import { Message, ChatConfig } from '../types';
import ConfigPanel from '../TtsConfig';

interface ChatAreaProps {
  messages: Message[];
  title: string;
  onSendMessage: (message: string) => void;
  chatId: string;
  isConfigMode: boolean;
  config: ChatConfig;
  onConfigChange: (config: ChatConfig) => void;
  isSidebarOpen: boolean;
}

const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  title,
  onSendMessage,
  chatId,
  isConfigMode,
  config,
  onConfigChange,
  isSidebarOpen
}) => {
  const { ChatPanel, ChatHeader, MessageArea, MessageBubble, InputArea, InputForm, ChatInput, SendButton } = createStyles();
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const styles = createStyles();

  if (isConfigMode) {
    return (
      <styles.ChatPanel isSidebarOpen={isSidebarOpen}>
        <ConfigPanel
          chatId={chatId}
          config={config}
          onConfigChange={onConfigChange}
        />
      </styles.ChatPanel>
    );
  }

  return (
    <ChatPanel isSidebarOpen={isSidebarOpen}>

      {/* Header */}
      <ChatHeader>
        <h2>{title}</h2>
      </ChatHeader>

      {/* Message Area */}
      <MessageArea>
        {messages.map((msg, index) => (
          <MessageBubble key={index} $isUser={msg.sender !== 'user'}>
            {msg.text}
          </MessageBubble>
        ))}
      </MessageArea>

      {/* Input Area */}
      <InputArea>
        <InputForm onSubmit={handleSubmit}>
          <ChatInput
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <SendButton type="submit">Send</SendButton>
        </InputForm>
      </InputArea>
    </ChatPanel>
  );
};

export default ChatArea; 