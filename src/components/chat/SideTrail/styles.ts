import styled from 'styled-components';
import { SideTrailStyles } from './types';

export const createStyles = (styles: SideTrailStyles) => {
  const SideTrailContainer = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: ${styles.width}px;
    background-color: ${styles.backgroundColor};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    z-index: 950;
    gap: ${styles.iconSpacing}px;
  `;

  const TrailIcon = styled.div`
    width: ${styles.iconSize}px;
    height: ${styles.iconSize}px;
    background-color: #6C757D;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 14px;

    &.active {
      background-color: #FF8A65;
    }
  `;

  const OpenDrawerButton = styled(TrailIcon)`
    background-color: #495057;
    margin-bottom: 10px;

    &:hover {
      background-color: #6C757D;
    }
  `;

  const UserAvatar = styled.div`
    width: ${styles.iconSize + 6}px;
    height: ${styles.iconSize + 6}px;
    border-radius: 50%;
    background-color: #495057;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    margin-top: auto;
  `;

  return {
    SideTrailContainer,
    TrailIcon,
    OpenDrawerButton,
    UserAvatar
  };
}; 