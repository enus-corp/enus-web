import React, { useRef, useEffect } from 'react';
import { MessageListProps } from './types';
import { createStyles } from './styles';

const { MessageArea, MessageBubble } = createStyles();

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messageAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <MessageArea ref={messageAreaRef}>
      {messages.map(msg => (
        <MessageBubble key={msg.id} $sender={msg.sender}>
          {msg.text}
        </MessageBubble>
      ))}
    </MessageArea>
  );
};

export default MessageList; 