'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from '@/components/chat/Sidebar';
import SideTrail from '@/components/chat/SideTrail';
import SettingsModal from '@/components/chat/SettingsModal';
import ChatPanel from '@/components/chat/mainPanel/ChatArea';
import { Message } from '@/components/chat/mainPanel/types';
import { useUser } from '@/contexts/UserContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { createNewChatTitle } from '@/utils/date';
import { websocketService } from '@/services/websocket';
import { self } from '@/services/user';
import { isTokenExpired } from '@/utils/jwt';


interface ChatHistoryItem {
  id: string;
  title: string;
  lastMessage: string;
}

// --- Mock Data ---
const mockChatHistory: ChatHistoryItem[] = [
  { id: 'chat1', title: 'Summary of Tech News Today', lastMessage: 'AI advancements dominate headlines...' },
  { id: 'chat2', title: 'Questions about Market Trends', lastMessage: 'Can you explain the recent dip?' },
  { id: 'chat3', title: 'Follow-up on Renewable Energy', lastMessage: 'Sources mentioned solar power increase...' },
  { id: 'chat4', title: 'Drafting an email about summary', lastMessage: 'Subject: Key Takeaways from...' },
];

const mockMessages: Message[] = [
  { id: 'msg1', sender: 'user', text: 'Summarize the latest news about AI regulations.' },
  { id: 'msg2', sender: 'ai', text: 'Certainly! Recent developments include proposals for AI safety standards in the EU and ongoing discussions in the US Congress regarding transparency requirements for AI models...' },
  { id: 'msg3', sender: 'user', text: 'What are the main points of the EU proposal?' },
  { id: 'msg4', sender: 'ai', text: 'The EU proposal focuses on risk-based categorization, with stricter rules for high-risk AI systems like those used in critical infrastructure or law enforcement. Key points include data quality requirements, human oversight mandates, and clear information for users interacting with AI systems.' },
];

// --- Styled Components ---
const ChatLayoutContainer = styled.div`
  height: 100vh;
  background-color: #FFFFFF;
  color: #252525;
  position: relative;
`;

// --- Chat Page Component ---
const ChatPage: React.FC = () => {
  const { user, setUser } = useUser();
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>(mockChatHistory);
  const [currentChatId, setCurrentChatId] = useState<string | null>(mockChatHistory[0]?.id || null);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeIcon, setActiveIcon] = useState<'chat' | 'config' | null>('chat');
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeChat = chatHistory.find(chat => chat.id === currentChatId);

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await self();
        setUser(user);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        router.replace('/login');
      }
    };

    fetchUserData(); 
  }, [router, setUser]);

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
      const newChat: ChatHistoryItem = {
        id: chatId,
        title: newChatTitle,
        lastMessage: '새로운 대화를 시작합니다.'
      };
      
      // Update chat history and set as current chat
      setChatHistory(prev => [newChat, ...prev]);
      setCurrentChatId(chatId);
      setMessages([]); // Clear messages for new chat
    } catch (error) {
      console.error('Failed to create new chat:', error);
      // Handle error (show error message to user)
    }
  };

  const handleSendMessage = async (message: string) => {
    try {
      // Send message through WebSocket
      websocketService.sendMessage(message);

      // Add message to local state
      const userMessage: Message = {
        id: `msg${Date.now()}`,
        sender: 'user',
        text: message,
      };

      setMessages(prev => [...prev, userMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      // Handle error (show error message to user)
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleIconClick = (icon: 'chat' | 'config') => {
    setActiveIcon(icon);
    // Config icon click will be handled by routing to a separate page
    if (icon === 'config') {
      // TODO: Add routing to config page
      console.log('Navigate to config page');
    }
  };

  return (
    <ChatLayoutContainer>
      <SideTrail
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={toggleSidebar}
        onOpenSettings={() => setIsModalOpen(true)}
        username={user?.username || 'Guest'}
        activeIcon={activeIcon}
        onIconClick={handleIconClick}
      />

      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        chatHistory={chatHistory} 
        activeChatId={currentChatId} 
        onChatSelect={(newChatId) => setCurrentChatId(newChatId)} 
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
          onClose={() => setIsModalOpen(false)}
          username={user?.username || 'Guest'}
          userPlan="Free Plan"
        />
      )}
    </ChatLayoutContainer>
  );
};

export default ChatPage; 