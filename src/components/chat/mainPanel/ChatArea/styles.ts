import styled from 'styled-components';
import { ChatLayoutStyles } from '@/components/chat/ChatLayout/types';

const ChatHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #E0E0E0;
  background-color: #FFFFFF;
  z-index: 1;
`;

const MessageArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const MessageBubble = styled.div<{ $isUser: boolean }>`
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 8px;
  background-color: ${props => props.$isUser ? '#A0D9B1' : '#F8F9FA'};
  color: ${props => props.$isUser ? '#FFFFFF' : '#252525'};
  align-self: ${props => props.$isUser ? 'flex-end' : 'flex-start'};
  font-size: 14px;
  line-height: 1.5;
`;

const InputArea = styled.div`
  padding: 20px;
  border-top: 1px solid #E0E0E0;
  background-color: #FFFFFF;
`;

const InputForm = styled.form`
  display: flex;
  gap: 10px;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #A0D9B1;
  }
`;

const SendButton = styled.button`
  padding: 12px 24px;
  background-color: #A0D9B1;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #8BC4A0;
  }
`;

const defaultStyles: ChatLayoutStyles = {
  drawerWidth: 280,
  trailWidth: 80
};

export const createStyles = (styles: ChatLayoutStyles = defaultStyles) => ({
  ChatPanel: styled.div<{ isSidebarOpen?: boolean }>`
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100vh;
    margin-left: ${props => props.isSidebarOpen ? '360px' : '80px'};
    transition: margin-left 0.3s ease-in-out;
    background-color: #FFFFFF;
    position: relative;
  `,

  ChatHeader,
  MessageArea,
  MessageBubble,
  InputArea,
  InputForm,
  ChatInput,
  SendButton
}); 