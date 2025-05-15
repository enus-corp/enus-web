import React from 'react';
import { SideTrailProps } from './types';
import { createStyles } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faGear } from '@fortawesome/free-solid-svg-icons';

const { SideTrail, TrailIcon, OpenDrawerButton, UserAvatar } = createStyles({ trailWidth: 40 });

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
        <FontAwesomeIcon icon={faComment} />
      </TrailIcon>

      {/* Configuration Icon */}
      <TrailIcon
        $isActive={activeIcon === 'config'}
        onClick={() => onIconClick('config')}
        title="Configuration"
      >
        <FontAwesomeIcon icon={faGear} />
      </TrailIcon>

      {/* User Avatar */}
      <UserAvatar onClick={onOpenSettings} title="User Settings">
        {userInitials}
      </UserAvatar>
    </SideTrail>
  );
};

export default SideTrailComponent; 