import React, { useState } from 'react';
import { SettingsModalProps, ModalTab } from './types';
import { createStyles } from './styles';
import { useTheme } from '@/contexts/ThemeContext';
import styled from 'styled-components';

const styles = createStyles({
  width: '70vw',
  maxWidth: '800px',
  height: '60vh',
  maxHeight: '600px',
  backgroundColor: '#FFFFFF',
  borderRadius: '12px',
  boxShadow: '0 5px 20px rgba(0, 0, 0, 0.15)'
});

const SettingsSection = styled.div`
  margin-top: 20px;
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.divider};
`;

const SettingLabel = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
`;

const ThemeToggleButton = styled.button`
  padding: 6px 12px;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.inputBorder};
  background-color: ${({ theme }) => theme.buttonPrimaryBg};
  color: ${({ theme }) => theme.buttonPrimaryText};
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.buttonPrimaryHoverBg};
  }
`;

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  username,
  userPlan = 'Pro Plan',
  avatarUrl
}) => {
  const [activeTab, setActiveTab] = useState<ModalTab>('Settings');
  const { theme, toggleTheme } = useTheme();
  const {
    ModalBackdrop,
    ModalContent,
    ModalSidebar,
    ModalMainContent,
    ModalTitle,
    ModalCloseButton,
    ModalProfileSection,
    ModalAvatar,
    ModalUserName,
    ModalUserPlan,
    ModalDivider,
    ModalOption
  } = styles;

  if (!isOpen) return null;

  const handleTabClick = (tab: ModalTab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Settings':
        return (
          <>
            <ModalTitle>Settings</ModalTitle>
            <SettingsSection>
              <SettingItem>
                <SettingLabel>Theme</SettingLabel>
                <ThemeToggleButton onClick={toggleTheme}>
                  Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
                </ThemeToggleButton>
              </SettingItem>
            </SettingsSection>
          </>
        );
      case 'View Plans':
        return (
          <>
            <ModalTitle>View Plans</ModalTitle>
            <p>Information about available subscription plans.</p>
          </>
        );
      case 'Get Help':
        return (
          <>
            <ModalTitle>Get Help</ModalTitle>
            <p>Support documentation, contact information, FAQs.</p>
          </>
        );
      case 'Log Out':
        return (
          <>
            <ModalTitle>Log Out</ModalTitle>
            <p>Are you sure you want to log out?</p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalCloseButton onClick={onClose}>&times;</ModalCloseButton>
        
        <ModalSidebar>
          <ModalProfileSection>
            <ModalAvatar>
              {avatarUrl ? (
                <img src={avatarUrl} alt={username} />
              ) : (
                username.charAt(0).toUpperCase()
              )}
            </ModalAvatar>
            <ModalUserName>{username}</ModalUserName>
            <ModalUserPlan>{userPlan}</ModalUserPlan>
          </ModalProfileSection>

          <ModalDivider />

          <ModalOption
            isActive={activeTab === 'Settings'}
            onClick={() => handleTabClick('Settings')}
          >
            Settings
          </ModalOption>
          <ModalOption
            isActive={activeTab === 'View Plans'}
            onClick={() => handleTabClick('View Plans')}
          >
            View Plans
          </ModalOption>
          <ModalOption
            isActive={activeTab === 'Get Help'}
            onClick={() => handleTabClick('Get Help')}
          >
            Get Help
          </ModalOption>

          <ModalDivider />

          <ModalOption
            isActive={activeTab === 'Log Out'}
            onClick={() => handleTabClick('Log Out')}
          >
            Log Out
          </ModalOption>
        </ModalSidebar>

        <ModalMainContent>
          {renderContent()}
        </ModalMainContent>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default SettingsModal; 