import React from 'react';
import { ChatHeaderProps } from './types';
import { createStyles } from './styles';

const { ChatHeader: StyledChatHeader } = createStyles();

const ChatHeader: React.FC<ChatHeaderProps> = ({ title }) => {
  return (
    <StyledChatHeader>
      {title}
    </StyledChatHeader>
  );
};

export default ChatHeader; 