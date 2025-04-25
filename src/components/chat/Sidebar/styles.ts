import styled from 'styled-components';

export const createStyles = ({ drawerWidth }: { drawerWidth: number }) => ({

  Sidebar : styled.aside<{ $isOpen: boolean }>`
    width: ${drawerWidth}px;
    background-color: #F8F9FA; /* Light grey background */
    border-right: 1px solid #E0E0E0; /* Subtle border */
    display: flex;
    flex-direction: column;
    padding: 60px 15px 20px;

    /* Drawer specific styles for PUSH behavior */
    position: fixed;
    left: 80px; /* Adjusted to match new side trail width */
    top: 0;
    height: 100%;
    z-index: 900; 
    /* Adjust transform based on new left position */
    transform: translateX(${props => props.$isOpen ? '0' : '-100%'}); 
    transition: transform 0.3s ease-in-out;
    box-shadow: ${props => props.$isOpen ? '2px 0 10px rgba(0,0,0,0.1)' : 'none'}; /* Add shadow when open */
  `,

  // Button to close the drawer from within
  CloseDrawerButton : styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 22px;
    line-height: 1;
    padding: 5px;
    cursor: pointer;
    color: #6C757D;
    z-index: 910; /* Ensure it's above sidebar content */

    &:hover {
      color: #252525;
    }
  `, 
  NewChatButton: styled.button`
    background-color: #252525;
    border: none;
    color: #FFFFFF;
    padding: 12px 20px;
    margin: 0 0 20px;
    border-radius: 8px;
    font-family: 'Poppins', sans-serif;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.2s;

    &:hover {
      background-color: #495057;
    }
  `,

  ChatHistoryList: styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    overflow-y: auto;
    flex-grow: 1;
  `,

  ChatHistoryItem: styled.li<{ $isActive: boolean }>`
    padding: 12px 15px;
    font-family: 'Avenir', sans-serif;
    font-size: 14px;
    cursor: pointer;
    border-radius: 6px;
    margin: 2px 0;
    background-color: ${props => props.$isActive ? 'rgba(160, 217, 177, 0.2)' : 'transparent'};
    color: #495057;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: background-color 0.15s ease-in-out;

    div {
      font-weight: 500;
      margin-bottom: 3px;
      color: #252525;
    }
  `,

  UserAvatar: styled.div`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #A0D9B1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 14px;
  `,

  UserProfileArea: styled.div`
    padding: 20px 15px;
    border-top: 1px solid #E0E0E0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,

  UserInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
  `,

  Username: styled.div`
    font-family: 'Avenir', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: #252525;
  `,

  UserEmail: styled.div`
    font-family: 'Avenir', sans-serif;
    font-size: 13px;
    color: #6C757D;
  `,

  SettingsButton: styled.button`
    background: none;
    border: none;
    color: #6C757D;
    font-family: 'Avenir', sans-serif;
    font-size: 14px;
    cursor: pointer;
    padding: 5px 0;
    text-align: left;
    transition: color 0.2s;

    &:hover {
      color: #252525;
    }
  `
}); 