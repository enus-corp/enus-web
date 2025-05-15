'use client';

import React, { useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from '@/components/chat/Sidebar';
import SideTrail from '@/components/chat/SideTrail';
import SettingsModal from '@/components/chat/SettingsModal';
import ChatPanel from '@/components/chat/mainPanel/ChatArea';
import { Message } from '@/components/chat/mainPanel/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { createNewChatTitle } from '@/utils/date';
import { websocketService } from '@/services/websocket';
import { self } from '@/services/user';
import { isTokenExpired } from '@/utils/jwt';
import { useRootAppSelector } from '@/hooks/useAppSelector';
import { useRootAppDispatch } from '@/hooks/useAppDispatch';
import { setUser } from '@/store/slices/userSlice';
import { setChatHistory, setCurrentChatId, setMessages, addMessage, setActiveIcon, toggleSidebar, toggleModal } from '@/store/slices/chatSlice';
import { ChatHistoryItem } from '@/components/chat/Sidebar/types';
import { User } from '@/types/user';
import clientApi from '@/services/clientApi';


// --- Styled Components ---
const ChatLayoutContainer = styled.div`
  height: 100vh;
  background-color: #FFFFFF;
  color: #252525;
  position: relative;
`;

// --- Chat Page Component ---
const ChatPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useRootAppDispatch();
  
  // Get state from Redux
  const user = useRootAppSelector<User|null>((state) => state.user.user);
  const activeIcon = useRootAppSelector<'chat' | 'config' | null>((state) => state.chat.activeIcon);
  const isSidebarOpen = useRootAppSelector<boolean>((state) => state.chat.isSidebarOpen);
  const currentChatId = useRootAppSelector<string|null>((state) => state.chat.currentChatId);
  const chatHistory = useRootAppSelector<ChatHistoryItem[]>((state) => state.chat.chatHistory);
  const messages = useRootAppSelector<Message[]>((state) => state.chat.messages);
  const isModalOpen = useRootAppSelector<boolean>((state) => state.chat.isModalOpen);

  const activeChat = chatHistory.find(chat => chat.id === currentChatId);

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await clientApi.get("/api/user/self")
        dispatch(setUser(user));
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        router.replace('/login');
      }
    };

    fetchUserData();
  }, [router, dispatch]);

  useEffect(() => {
    // get token
    const token = localStorage.getItem('accessToken');

    // check token exists in local storage. If not, redirect to login
    if (!token || isTokenExpired(token)) {
      router.replace('/login');
    }
  }, [router, searchParams]);

  useEffect(() => {
    // Connect to WebSocket when component mounts
    websocketService.connect();

    // Cleanup on unmount
    return () => {
      websocketService.disconnect();
    };
  }, []);

  const handleNewChat = async () => {
    try {
      // Request new chat ID from server
      const chatId = await websocketService.requestNewChat();
      const newChatTitle = createNewChatTitle();
      
      // Create new chat
      const newChat = {
        id: chatId,
        title: newChatTitle,
        lastMessage: '새로운 대화를 시작합니다.'
      };
      
      // Update chat history and set as current chat
      dispatch(setChatHistory([newChat, ...chatHistory]));
      dispatch(setCurrentChatId(chatId));
      dispatch(setMessages([])); // Clear messages for new chat
    } catch (error) {
      console.error('Failed to create new chat:', error);
    }
  };

  const handleSendMessage = async (message: string) => {
    try {
      // Send message through WebSocket
      websocketService.sendMessage(message);

      // Add message to Redux state
      const userMessage: Message = {
        id: `msg${Date.now()}`,
        sender: 'user',
        text: message,
      };

      dispatch(addMessage(userMessage));
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleIconClick = (icon: 'chat' | 'config') => {
    dispatch(setActiveIcon(icon));
    
    if (icon === 'config') {
      // TODO: Implement routing to config page
      console.log('Navigate to config page');
    }
  };

  return (
    <ChatLayoutContainer>
      <SideTrail
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => dispatch(toggleSidebar())}
        onOpenSettings={() => dispatch(toggleModal())}
        username={user?.username || 'Guest'}
        activeIcon={activeIcon}
        onIconClick={handleIconClick}
      />

      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => dispatch(toggleSidebar())}
        chatHistory={chatHistory} 
        activeChatId={currentChatId} 
        onChatSelect={(newChatId) => dispatch(setCurrentChatId(newChatId))} 
        onNewChat={handleNewChat} 
      />
      
      <ChatPanel
        messages={messages}
        title={activeChat ? activeChat.title : 'New Chat'}
        onSendMessage={handleSendMessage}
        chatId='TEST'
        isSidebarOpen={isSidebarOpen}
        isConfigMode={activeIcon === 'config'}
        config={{
          readSpeed: 'normal',
          detailLevel: 'basic',
          briefingCount: 1
        }}
        onConfigChange={() => {}}
      />

      {isModalOpen && (
        <SettingsModal
          isOpen={isModalOpen}
          onClose={() => dispatch(toggleModal())}
          username={user?.username || 'Guest'}
          userPlan="Free Plan"
        />
      )}
    </ChatLayoutContainer>
  );
};

export default ChatPage; 