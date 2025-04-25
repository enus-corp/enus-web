import styled from 'styled-components';
import { SettingsModalStyles } from './types';

export const createStyles = (styles: SettingsModalStyles) => {
  /**
   * Modal Styles
   */
  const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `;

  const ModalContent = styled.div`
    background-color: ${styles.backgroundColor};
    padding: 0;
    border-radius: ${styles.borderRadius};
    box-shadow: ${styles.boxShadow};
    width: ${styles.width};
    max-width: ${styles.maxWidth};
    height: ${styles.height};
    max-height: ${styles.maxHeight};
    position: relative;
    display: flex;
    gap: 15px;
    overflow: hidden;
  `;

  const ModalCloseButton = styled.button`
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    font-size: 24px;
    line-height: 1;
    color: #6C757D;
    cursor: pointer;
    padding: 5px;

    &:hover {
      color: #252525;
    }
  `;

  const ModalSidebar = styled.aside`
    width: 200px;
    background-color: #F8F9FA;
    border-right: 1px solid #E0E0E0;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 5px;
  `;
  
  const ModalProfileSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 20px 25px 20px;
    gap: 8px;
  `;

  const ModalAvatar = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #A0D9B1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 24px;
    margin-bottom: 5px;
  `;

  const ModalUserName = styled.div`
    font-family: 'Avenir', sans-serif;
    font-size: 16px;
    color: #252525;
    font-weight: 600;
  `;

  const ModalUserPlan = styled.div`
    font-family: 'Avenir', sans-serif;
    font-size: 13px;
    color: #6C757D;
    background-color: #E9ECEF;
    padding: 3px 8px;
    border-radius: 10px;
  `;

  const ModalDivider = styled.hr`
    border: none;
    border-top: 1px solid #E0E0E0;
    margin: 15px 20px;
  `;

  const ModalOption = styled.button<{ isActive: boolean }>`
    background-color: ${props => props.isActive ? 'rgba(160, 217, 177, 0.2)' : 'transparent'};
    border: none;
    color: #252525;
    padding: 12px 20px;
    border-radius: 0;
    font-family: 'Poppins', sans-serif;
    font-size: 15px;
    font-weight: ${props => props.isActive ? '600' : '400'};
    cursor: pointer;
    text-align: left;
    width: 100%;
    transition: background-color 0.15s ease-in-out;

    &:hover {
      background-color: #E9ECEF;
    }
  `;

  const ModalMainContent = styled.div`
    flex: 1;
    padding: 30px 40px;
    overflow-y: auto;
  `;
  
  /**
   * Modal Detail styles
   */
  const ModalTitle = styled.h2`
    font-family: 'Avenir', sans-serif;
    font-weight: 700;
    font-size: 20px;
    color: #252525;
    margin: 0 0 10px 0;
    text-align: left;
    padding: 30px 40px 0 40px;
  `;

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

  const LogoutButton = styled(ThemeToggleButton)`
    background-color: #FF6B35;
    border-color: #F59E0B;
    color: #FFFFFF;
    margin-top: 20px;

    &:hover {
      background-color: #D97706;
      border-color: #B45309;
    }
  `;
  
  return {
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
    ModalOption,
    SettingsSection,
    SettingItem,
    SettingLabel,
    ThemeToggleButton,
    LogoutButton
  };
}; 