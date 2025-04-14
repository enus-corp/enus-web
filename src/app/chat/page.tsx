'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from '@/components/chat/Sidebar';
import SideTrail from '@/components/chat/SideTrail';
import SettingsModal from '@/components/chat/SettingsModal';
import ChatPanel from '@/components/chat/mainPanel/ChatArea';
import { Message } from '@/components/chat/mainPanel/types';
import { useUser } from '@/contexts/UserContext';
import axiosInstance from '@/lib/axios';

interface GeneralServerResponse<T> {
  error: boolean;
  message: string;
  code: number;
  data: T | null;
}

interface UserDTO {
  userId: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  isOauthUser: boolean;
}

// --- Mock Data ---
const mockChatHistory = [
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

const drawerWidth = 280;
const trailWidth = 60;

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
  const [currentChatId, setCurrentChatId] = useState<string | null>(mockChatHistory[0]?.id || null);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeIcon, setActiveIcon] = useState<'chat' | 'config' | null>('chat');

  const activeChat = mockChatHistory.find(chat => chat.id === currentChatId);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: response } = await axiosInstance.get<GeneralServerResponse<UserDTO>>('/api/user/self', {
          withCredentials: true
        });
        
        if (!response.error && response.data) {
          console.log(response.data)
          setUser(response.data);
        } else {
          console.error('Error fetching user data:', response.message);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, [setUser]);

  const handleSendMessage = (message: string) => {
    const userMessage = {
      id: `msg${Date.now()}`,
      sender: 'user' as const,
      text: message,
    };

    const aiResponse = {
      id: `msg${Date.now() + 1}`,
      sender: 'ai' as const,
      text: `Okay, processing your request about: "${message}". (This is a placeholder response.)`,
    };

    setMessages([...messages, userMessage, aiResponse]);
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
        chatHistory={mockChatHistory} 
        activeChatId={currentChatId} 
        onChatSelect={(newChatId) => setCurrentChatId(newChatId)} 
        onNewChat={() => {}} 
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