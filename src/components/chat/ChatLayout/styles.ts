import styled from 'styled-components';
import { ChatLayoutStyles } from './types';

export const createStyles = ({ drawerWidth, trailWidth }: ChatLayoutStyles) => ({
  ChatLayoutContainer: styled.div`
    height: 100vh;
    background-color: #FFFFFF;
    color: #252525;
    position: relative;
  `,

  Sidebar: styled.aside<{ isOpen: boolean }>`
    width: ${drawerWidth}px;
    background-color: #F8F9FA;
    border-right: 1px solid #E0E0E0;
    display: flex;
    flex-direction: column;
    padding-top: 60px;
    padding-bottom: 20px;
    position: absolute;
    left: ${trailWidth}px;
    top: 0;
    height: 100%;
    z-index: 900;
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
    transition: transform 0.3s ease-in-out;
    box-shadow: ${props => props.isOpen ? '2px 0 10px rgba(0,0,0,0.1)' : 'none'};
  `,

  CloseDrawerButton: styled.button`
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
    z-index: 910;

    &:hover {
      color: #252525;
    }
  `
}); 