import React from 'react';
import { NewChatButtonProps } from './types';
import { createStyles } from './styles';

const styles = createStyles({
  drawerWidth: 280,
  trailWidth: 60
});

const NewChatButton: React.FC<NewChatButtonProps> = ({ onClick }) => {
  return (
    <styles.NewChatButton onClick={onClick}>
      New Chat
    </styles.NewChatButton>
  );
};

export default NewChatButton; 