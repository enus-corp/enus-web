import React, { useState } from 'react';
import { ChatLayoutProps } from './types';
import { createStyles } from './styles';

const styles = createStyles({
  drawerWidth: 280,
  trailWidth: 60
});

const ChatLayout: React.FC<ChatLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <styles.ChatLayoutContainer>
      <styles.Sidebar isOpen={isSidebarOpen}>
        <styles.CloseDrawerButton onClick={toggleSidebar}>
          ×
        </styles.CloseDrawerButton>
        {children}
      </styles.Sidebar>
    </styles.ChatLayoutContainer>
  );
};

export default ChatLayout; 