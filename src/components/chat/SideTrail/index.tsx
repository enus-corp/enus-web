import React from 'react';
import { SideTrailProps } from './types';
import { createStyles } from './styles';

const { SideTrail, TrailIcon, OpenDrawerButton, UserAvatar } = createStyles({ trailWidth: 80 });

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
    <SideTrail>
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
    </SideTrail>
  );
};

export default SideTrailComponent; 