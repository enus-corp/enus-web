import styled from 'styled-components';
import { ChatLayoutStyles } from '../ChatLayout/types';

const TrailIcon = styled.div<{ $isActive: boolean }>`
  width: 48px;
  height: 48px;
  background-color: ${props => props.$isActive ? '#A0D9B1' : '#6C757D'};
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  transition: background-color 0.2s ease-in-out;
  border: 1px solid #252525;

  &:hover {
    background-color: ${props => props.$isActive ? '#8BC4A0' : '#495057'};
  }
`;

const OpenDrawerButton = styled(TrailIcon)`
  background-color: #FF6B35;
  margin-bottom: 10px;
  border: 1px solid #252525;

  &:hover {
    background-color: #FF8C5A;
  }
`;

const UserAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #A0D9B1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
  margin-top: auto;
  cursor: pointer;
  border: 1px solid #252525;
`;

const defaultStyles: ChatLayoutStyles = {
  drawerWidth: 280,
  trailWidth: 80
};

export const createStyles = (styles: ChatLayoutStyles = defaultStyles) => ({
  SideTrail: styled.aside`
    width: ${styles.trailWidth}px;
    height: 100vh;
    background-color: #FFFFFF;
    border-right: 1px solid #E0E0E0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 10px;
    gap: 25px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
  `,

  TrailIcon,
  OpenDrawerButton,
  UserAvatar
}); 