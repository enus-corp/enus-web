'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from '@/components/chat/Sidebar';
import SideTrail from '@/components/chat/SideTrail';
import SettingsModal from '@/components/chat/SettingsModal';
import ChatPanel from '@/components/chat/ChatArea';
import { Message } from '@/components/chat/ChatArea/types';

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
  const [currentChatId, setCurrentChatId] = useState<string | null>(mockChatHistory[0]?.id || null);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const activeChat = mockChatHistory.find(chat => chat.id === currentChatId);

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

  return (
    <ChatLayoutContainer>
      <SideTrail
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={toggleSidebar}
        onOpenSettings={() => setIsModalOpen(true)}
        username="John Doe"
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
        isSidebarOpen={isSidebarOpen}
        title={activeChat ? activeChat.title : 'New Chat'}
        messages={messages}
        onSendMessage={handleSendMessage}
      />

      <SettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        username="John Doe"
        userPlan="Pro Plan"
      />
    </ChatLayoutContainer>
  );
};

export default ChatPage; 