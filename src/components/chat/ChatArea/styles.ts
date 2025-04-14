import styled from 'styled-components';

export const createStyles = () => {
  const ChatPanel = styled.main<{ isSidebarOpen: boolean }>` 
    margin-left: ${props => props.isSidebarOpen ? '340px' : '60px'};
    width: calc(100% - ${props => props.isSidebarOpen ? '340px' : '60px'});
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #FFFFFF;
    transition: margin-left 0.3s ease-in-out, width 0.3s ease-in-out;
  `;

  const ChatHeader = styled.header`
    padding: 15px 30px;
    border-bottom: 1px solid #E0E0E0;
    font-family: 'Avenir', sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: #252525;
    display: flex;
    align-items: center;
    gap: 15px;
  `;

  const MessageArea = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 25px;
  `;

  interface MessageBubbleProps {
    $sender: 'user' | 'ai';
  }

  const MessageBubble = styled.div<MessageBubbleProps>`
    padding: 15px 20px;
    border-radius: 18px;
    max-width: 70%;
    font-family: 'Avenir', sans-serif;
    font-size: 15px;
    line-height: 1.6;
    word-wrap: break-word;

    ${({ $sender }) => $sender === 'user' ? `
      background-color: #E9ECEF;
      color: #252525;
      border-bottom-right-radius: 4px;
      align-self: flex-end;
    ` : `
      background-color: #F8F9FA;
      color: #252525;
      border-bottom-left-radius: 4px;
      align-self: flex-start;
      border: 1px solid #A0D9B1;
    `}
  `;

  const InputArea = styled.div`
    padding: 20px 30px;
    border-top: 1px solid #E0E0E0;
    background-color: #F8F9FA;
  `;

  const InputForm = styled.form`
    display: flex;
    gap: 15px;
  `;

  const ChatInput = styled.textarea`
    flex: 1;
    padding: 12px 18px;
    border-radius: 8px;
    border: 1px solid #CED4DA;
    font-family: 'Avenir', sans-serif;
    font-size: 15px;
    resize: none;
    min-height: 48px;
    max-height: 200px;
    line-height: 1.5;
    color: #495057;
    transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

    &:focus {
      outline: none;
      border-color: #A0D9B1;
      box-shadow: 0 0 0 3px rgba(160, 217, 177, 0.3);
    }
  `;

  const SendButton = styled.button`
    background-color: #252525;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px 25px;
    font-family: 'Poppins', sans-serif;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    align-self: center;

    &:hover {
      background-color: #495057;
    }

    &:disabled {
      background-color: #ADB5BD;
      cursor: not-allowed;
    }
  `;

  return {
    ChatPanel,
    ChatHeader,
    MessageArea,
    MessageBubble,
    InputArea,
    InputForm,
    ChatInput,
    SendButton
  };
}; 