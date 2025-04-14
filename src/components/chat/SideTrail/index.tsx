import React from 'react';
import { SideTrailProps } from './types';
import { createStyles } from './styles';

const styles = createStyles({
  width: 60,
  backgroundColor: '#343A40',
  iconSize: 32,
  iconSpacing: 25
});

const SideTrail: React.FC<SideTrailProps> = ({
  isSidebarOpen,
  onToggleSidebar,
  onOpenSettings,
  username,
  avatarUrl
}) => {
  const { SideTrailContainer, TrailIcon, OpenDrawerButton, UserAvatar } = styles;

  return (
    <SideTrailContainer>
      <OpenDrawerButton onClick={onToggleSidebar}>
        {isSidebarOpen ? '<' : '>'}
      </OpenDrawerButton>

      <TrailIcon>Ic1</TrailIcon>
      <TrailIcon className="active">Ic2</TrailIcon>
      <TrailIcon>Ic3</TrailIcon>

      <UserAvatar onClick={onOpenSettings}>
        {avatarUrl ? (
          <img src={avatarUrl} alt={username} />
        ) : (
          username.charAt(0).toUpperCase()
        )}
      </UserAvatar>
    </SideTrailContainer>
  );
};

export default SideTrail; 