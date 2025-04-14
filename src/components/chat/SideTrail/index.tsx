import React from 'react';
import { SideTrailProps } from './types';
import { createStyles } from './styles';

const { SideTrail: StyledSideTrail, TrailIcon, OpenDrawerButton, UserAvatar } = createStyles();

const SideTrailComponent: React.FC<SideTrailProps> = ({
  isSidebarOpen,
  onToggleSidebar,
  onOpenSettings,
  username,
  activeIcon,
  onIconClick
}) => {
  const userInitials = username
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();

  return (
    <StyledSideTrail>
      {/* Open Drawer Button */}
      <OpenDrawerButton
        $isActive={false}
        onClick={onToggleSidebar}
        title={isSidebarOpen ? "Close Panel" : "Open Panel"}
      >
        {isSidebarOpen ? '<' : '>'}
      </OpenDrawerButton>

      {/* Chat Icon */}
      <TrailIcon
        $isActive={activeIcon === 'chat'}
        onClick={() => onIconClick('chat')}
        title="Chat"
      >
        💬
      </TrailIcon>

      {/* Configuration Icon */}
      <TrailIcon
        $isActive={activeIcon === 'config'}
        onClick={() => onIconClick('config')}
        title="Configuration"
      >
        ⚙️
      </TrailIcon>

      {/* User Avatar */}
      <UserAvatar onClick={onOpenSettings} title="User Settings">
        {userInitials}
      </UserAvatar>
    </StyledSideTrail>
  );
};

export default SideTrailComponent; 