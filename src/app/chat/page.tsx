'use client';

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

// --- Mock Data ---
// In a real app, this would come from your backend/state management
const mockChatHistory = [
  { id: 'chat1', title: 'Summary of Tech News Today', lastMessage: 'AI advancements dominate headlines...' },
  { id: 'chat2', title: 'Questions about Market Trends', lastMessage: 'Can you explain the recent dip?' },
  { id: 'chat3', title: 'Follow-up on Renewable Energy', lastMessage: 'Sources mentioned solar power increase...' },
  { id: 'chat4', title: 'Drafting an email about summary', lastMessage: 'Subject: Key Takeaways from...' },
];

// --- Type Definition for Message ---
interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

const mockMessages: Message[] = [
  { id: 'msg1', sender: 'user', text: 'Summarize the latest news about AI regulations.' },
  { id: 'msg2', sender: 'ai', text: 'Certainly! Recent developments include proposals for AI safety standards in the EU and ongoing discussions in the US Congress regarding transparency requirements for AI models...' },
  { id: 'msg3', sender: 'user', text: 'What are the main points of the EU proposal?' },
  { id: 'msg4', sender: 'ai', text: 'The EU proposal focuses on risk-based categorization, with stricter rules for high-risk AI systems like those used in critical infrastructure or law enforcement. Key points include data quality requirements, human oversight mandates, and clear information for users interacting with AI systems.' },
];

const drawerWidth = 280; // Define drawer width
const trailWidth = 60;  // Define trail width

// --- Styled Components ---

const ChatLayoutContainer = styled.div`
  height: 100vh;
  background-color: #FFFFFF;
  color: #252525; /* Primary text color */
  position: relative; /* Needed for absolute positioning context if used */
  /* overflow-x: hidden; Keep hidden to prevent scrollbars */
`;

// --- Left Sidebar (Drawer) ---
const Sidebar = styled.aside<{ isOpen: boolean }>`
  width: ${drawerWidth}px;
  background-color: #F8F9FA; /* Light grey background */
  border-right: 1px solid #E0E0E0; /* Subtle border */
  display: flex;
  flex-direction: column;
  padding-top: 60px; /* Add explicit top padding */
  padding-bottom: 20px;

  /* Drawer specific styles for PUSH behavior */
  position: absolute; /* Position relative to ChatLayoutContainer */
  left: ${trailWidth}px; /* Position it after the trail */
  top: 0;
  height: 100%;
  z-index: 900; 
  /* Adjust transform based on new left position */
  transform: translateX(${props => props.isOpen ? '0' : '-100%'}); 
  transition: transform 0.3s ease-in-out;
  box-shadow: ${props => props.isOpen ? '2px 0 10px rgba(0,0,0,0.1)' : 'none'}; /* Add shadow when open */
`;

// Button to close the drawer from within
const CloseDrawerButton = styled.button`
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
`;

const NewChatButton = styled.button`
  /* background-color: #FFFFFF; */
  /* border: 1px solid #CED4DA; */
  background-color: #252525; /* Primary button color */
  border: none;
  color: #FFFFFF; /* White text */
  padding: 12px 20px;
  margin: 0 20px 20px 20px; 
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.2s;

  &:hover {
    /* background-color: #F1F3F5; */
    /* border-color: #ADB5BD; */
    background-color: #495057; /* Darken on hover */
  }
`;

const ChatHistoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  flex-grow: 1; /* Allows list to take available space */
`;

const ChatHistoryItem = styled.li<{ isActive: boolean }>`
  padding: 12px 20px;
  font-family: 'Avenir', sans-serif;
  font-size: 14px;
  cursor: pointer;
  border-radius: 6px;
  margin: 2px 10px; /* Add horizontal margin */
  /* background-color: ${props => props.isActive ? '#E9ECEF' : 'transparent'}; */
  background-color: ${props => props.isActive ? 'rgba(160, 217, 177, 0.2)' : 'transparent'}; /* Light green subtle background for active */
  color: #495057;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: background-color 0.15s ease-in-out;

  &:hover {
    /* background-color: #E9ECEF; */
  }

  div { /* Title */
    font-weight: 500;
    margin-bottom: 3px;
    color: #252525;
  }
`;

// --- User Profile Area (Bottom of Sidebar) ---
/* const UserProfileArea = styled.div` ... `; */
/* const UserAvatar = styled.div` ... `; /* Keep UserAvatar as TrailUserAvatar uses it */
/* const UserInfo = styled.div` ... `; */

// --- Base User Avatar Style (needed for TrailUserAvatar) ---
const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #A0D9B1; /* Default placeholder color */
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
`;

// --- Modal Styles ---
const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure it's on top */
`;

const ModalContent = styled.div`
  background-color: #FFFFFF;
  /* padding: 30px 40px; */ /* Remove overall padding */
  padding: 0; /* Reset padding */
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  /* min-width: 350px; */
  width: 70vw; /* Make modal wider */
  max-width: 800px; /* Limit max width */
  height: 60vh; /* Give it some height */
  max-height: 600px;
  position: relative; 
  display: flex; /* Use flex for sidebar/content layout */
  /* flex-direction: column; */ /* Remove vertical stacking */
  gap: 15px;
  overflow: hidden; /* Hide overflow from rounded corners */
`;

const ModalSidebar = styled.aside`
  width: 200px; /* Width for the sidebar */
  background-color: #F8F9FA; /* Light background for sidebar */
  border-right: 1px solid #E0E0E0;
  padding: 20px 0; /* Vertical padding */
  display: flex;
  flex-direction: column;
  gap: 5px; /* Spacing between options */
`;

const ModalMainContent = styled.div`
  flex: 1; /* Takes remaining space */
  padding: 30px 40px;
  overflow-y: auto; /* Allow scrolling if content exceeds height */
`;

const ModalTitle = styled.h2`
  font-family: 'Avenir', sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: #252525;
  margin: 0 0 10px 0;
  text-align: left;
  padding: 30px 40px 0 40px; /* Add padding back here */
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  line-height: 1;
  color: #6C757D;
  cursor: pointer;
  padding: 5px;

  &:hover {
    color: #252525;
  }
`;

// Profile Section within Modal Sidebar
const ModalProfileSection = styled.div`
  display: flex;
  flex-direction: column; /* Stack items vertically */
  align-items: center; /* Center items horizontally */
  padding: 20px 20px 25px 20px; /* Padding around profile info */
  gap: 8px;
`;

const ModalAvatar = styled.div`
  width: 60px; /* Larger avatar */
  height: 60px;
  border-radius: 50%;
  background-color: #A0D9B1; /* Accent color placeholder */
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 24px; /* Larger initial */
  margin-bottom: 5px;
`;

const ModalUserName = styled.div`
  font-family: 'Avenir', sans-serif;
  font-size: 16px;
  color: #252525;
  font-weight: 600;
`;

const ModalUserPlan = styled.div`
  font-family: 'Avenir', sans-serif;
  font-size: 13px;
  color: #6C757D; /* Muted color */
  background-color: #E9ECEF; /* Light background chip */
  padding: 3px 8px;
  border-radius: 10px;
`;

// Divider for Modal Sidebar
const ModalDivider = styled.hr`
  border: none;
  border-top: 1px solid #E0E0E0;
  margin: 15px 20px; /* Vertical margin, horizontal padding */
`;

// Explicitly define isActive prop for ModalOption
const ModalOption = styled.button<{ isActive: boolean }>` 
  /* background-color: #F8F9FA; */ /* Base background is now ModalSidebar */
  background-color: ${props => props.isActive ? 'rgba(160, 217, 177, 0.2)' : 'transparent'}; /* Subtle green highlight */
  /* border: 1px solid #E0E0E0; */
  border: none; /* Remove border */
  color: #252525;
  padding: 12px 20px;
  /* border-radius: 8px; */
  border-radius: 0; /* No radius for full width look */
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  /* font-weight: 400; */
  font-weight: ${props => props.isActive ? '600' : '400'}; /* Adjust weight */
  cursor: pointer;
  text-align: left;
  width: 100%;
  /* transition: background-color 0.2s, border-color 0.2s; */
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: #E9ECEF;
    /* border-color: #CED4DA; */
  }
`;

// --- Side Trail ---
const SideTrail = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: ${trailWidth}px;
  background-color: #343A40; /* Dark background */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  z-index: 950; /* Above closed sidebar, below modal */
  gap: 25px; /* Spacing between icons */
`;

const TrailIcon = styled.div`
  width: 32px;
  height: 32px;
  background-color: #6C757D; /* Placeholder color */
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;

  &.active {
    background-color: #FF8A65; /* Example active color */
  }
`;

// Button within SideTrail to open the drawer - DEFINED AFTER TrailIcon
const OpenDrawerButton = styled(TrailIcon)` /* Inherit base styles */
  background-color: #495057; /* Slightly different color */
  margin-bottom: 10px; /* Space below */

  &:hover {
    background-color: #6C757D;
  }
`;

const TrailUserAvatar = styled(UserAvatar)` /* Extend UserAvatar */
  /* Inherits UserAvatar styles, override specifics */
  margin-top: auto; /* Push to bottom */
  width: 38px; 
  height: 38px;
  background-color: #495057; /* Darker placeholder */
  cursor: pointer;
`;

// --- Right Chat Panel ---
const ChatPanel = styled.main<{ isSidebarOpen: boolean }>` 
  /* Adjust margin and width based on sidebar state */
  margin-left: ${props => props.isSidebarOpen ? trailWidth + drawerWidth : trailWidth}px;
  width: calc(100% - ${props => props.isSidebarOpen ? trailWidth + drawerWidth : trailWidth}px);
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #FFFFFF;
  transition: margin-left 0.3s ease-in-out, width 0.3s ease-in-out; /* Add transition */
`;

const ChatHeader = styled.header`
  padding: 15px 30px;
  border-bottom: 1px solid #E0E0E0;
  font-family: 'Avenir', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #252525;
  display: flex; /* To position toggle button */
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

const MessageBubble = styled.div<{ sender: 'user' | 'ai' }>`
  padding: 15px 20px;
  border-radius: 18px;
  max-width: 70%;
  font-family: 'Avenir', sans-serif;
  font-size: 15px;
  line-height: 1.6;
  word-wrap: break-word;

  ${({ sender }) => sender === 'user' ? `
    background-color: #E9ECEF; /* Light grey for user */
    color: #252525;
    border-bottom-right-radius: 4px;
    align-self: flex-end;
  ` : `
    background-color: #F8F9FA; /* Slightly different grey for AI */
    color: #252525;
    border-bottom-left-radius: 4px;
    align-self: flex-start;
    border: 1px solid #A0D9B1; /* Add subtle green border to AI messages */
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
  resize: none; /* Prevent manual resizing */
  min-height: 48px; /* Minimum height for one line */
  max-height: 200px; /* Limit expansion */
  line-height: 1.5;
  color: #495057;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;


  &:focus {
    outline: none;
    border-color: #A0D9B1; /* Green accent */
    box-shadow: 0 0 0 3px rgba(160, 217, 177, 0.3);
  }
`;

const SendButton = styled.button`
  background-color: #252525; /* Primary button color */
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 25px; /* Adjusted padding to match NewChatButton vertically */
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  align-self: center; /* Adjust alignment if needed with new padding */
  /* height: 48px; */ /* Let padding control height */

  &:hover {
    background-color: #495057;
  }

  &:disabled {
    background-color: #ADB5BD;
    cursor: not-allowed;
  }
`;

// --- Type Definition for Modal Tab ---
// Update ModalTab type for new options + default
// type ModalTab = 'Personal Information' | 'Billing' | 'Settings';
type ModalTab = 'Settings' | 'View Plans' | 'Get Help' | 'Log Out';

// --- Chat Page Component ---
const ChatPage: React.FC = () => {
  const [currentChatId, setCurrentChatId] = useState<string | null>(mockChatHistory[0]?.id || null);
  const [messages, setMessages] = useState<Message[]>(mockMessages); // Explicitly type state
  const [newMessage, setNewMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [activeModalTab, setActiveModalTab] = useState<ModalTab>('Personal Information'); 
  const [activeModalTab, setActiveModalTab] = useState<ModalTab>('Settings'); // Default to Settings
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar drawer
  const messageAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const activeChat = mockChatHistory.find(chat => chat.id === currentChatId);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Adjust textarea height dynamically
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set to scroll height
    }
  }, [newMessage]);


  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = {
      id: `msg${Date.now()}`,
      sender: 'user' as const,
      text: newMessage.trim(),
    };

    // Simulate AI response (replace with actual API call)
    const aiResponse = {
      id: `msg${Date.now() + 1}`,
      sender: 'ai' as const,
      text: `Okay, processing your request about: "${newMessage.trim()}". (This is a placeholder response.)`,
    };

    setMessages([...messages, userMessage, aiResponse]);
    setNewMessage('');
  };

  // Updated function to handle modal option clicks
  const handleModalOptionClick = (option: ModalTab) => {
    setActiveModalTab(option);
    // Keep modal open when switching tabs
    // console.log(`Selected option: ${option}`);
    // alert(`${option} functionality not implemented yet.`);
    // setIsModalOpen(false); 
  };

  const renderModalContent = () => {
    switch (activeModalTab) {
      // Remove 'Personal Information' and 'Billing' cases for now
      // Add cases for 'View Plans' and 'Get Help'
      case 'Settings':
        return (
          <>
            <ModalTitle>Settings</ModalTitle>
            <p>Application settings, preferences, theme options, etc.</p>
          </>
        );
      case 'View Plans':
        return (
          <>
            <ModalTitle>View Plans</ModalTitle>
            <p>Information about available subscription plans.</p>
          </>
        );
      case 'Get Help':
        return (
          <>
            <ModalTitle>Get Help</ModalTitle>
            <p>Support documentation, contact information, FAQs.</p>
          </>
        );
      case 'Log Out': // Handle Log Out separately, maybe not render content here
        return (
          <>
            <ModalTitle>Log Out</ModalTitle>
            <p>Are you sure you want to log out?</p>
            {/* Add confirmation button */}
          </>
        );
      default:
        return null;
    }
  };

  // Toggle sidebar state
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ChatLayoutContainer>
      {/* Add the Side Trail */}
      <SideTrail>
        {/* Add Open Drawer Button */} 
        <OpenDrawerButton onClick={toggleSidebar}>
           {/* Placeholder icon, e.g., arrows or lines */}
           &gt; {/* Use > symbol for now */}
        </OpenDrawerButton>

        <TrailIcon>Ic1</TrailIcon> {/* Placeholder Icon 1 */}
        <TrailIcon className="active">Ic2</TrailIcon> {/* Placeholder Active Icon */}
        <TrailIcon>Ic3</TrailIcon> {/* Placeholder Icon 3 */}
        {/* Add more icons as needed */}
        <TrailUserAvatar onClick={() => setIsModalOpen(true)}>
          U {/* Placeholder initial */}
        </TrailUserAvatar>
      </SideTrail>

      {/* Sidebar (Drawer) */}
      <Sidebar isOpen={isSidebarOpen}>
        <CloseDrawerButton onClick={toggleSidebar}>
          &times;
        </CloseDrawerButton>
        <NewChatButton>+ New Chat</NewChatButton>
        <ChatHistoryList>
          {mockChatHistory.map(chat => (
            <ChatHistoryItem
              key={chat.id}
              isActive={chat.id === currentChatId}
              onClick={() => setCurrentChatId(chat.id)}
            >
              <div>{chat.title}</div>
              <span>{chat.lastMessage}</span>
            </ChatHistoryItem>
          ))}
        </ChatHistoryList>
      </Sidebar>
      <ChatPanel isSidebarOpen={isSidebarOpen}>
        <ChatHeader>
          {activeChat ? activeChat.title : 'New Chat'}
        </ChatHeader>
        <MessageArea ref={messageAreaRef}>
          {messages.map(msg => (
            <MessageBubble key={msg.id} sender={msg.sender}>
              {msg.text}
            </MessageBubble>
          ))}
          {/* Add loading indicator here if needed */}
        </MessageArea>
        <InputArea>
          <InputForm onSubmit={handleSendMessage}>
            <ChatInput
              ref={textareaRef}
              placeholder="Ask me anything about the news..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              rows={1} // Start with one row
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault(); // Prevent newline on Enter
                  handleSendMessage(e);
                }
              }}
            />
            <SendButton type="submit" disabled={!newMessage.trim()}>Send</SendButton>
          </InputForm>
        </InputArea>
      </ChatPanel>

      {/* Settings Modal */}
      {isModalOpen && (
        <ModalBackdrop onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalCloseButton onClick={() => setIsModalOpen(false)}>&times;</ModalCloseButton>
            <ModalSidebar>
              {/* Add Profile Section */}
              <ModalProfileSection>
                <ModalAvatar>U</ModalAvatar> {/* Placeholder */}
                <ModalUserName>User Name</ModalUserName> {/* Placeholder */}
                <ModalUserPlan>Pro Plan</ModalUserPlan> {/* Placeholder */}
              </ModalProfileSection>

              <ModalDivider />

              {/* Update Modal Options */}
              <ModalOption
                isActive={activeModalTab === 'Settings'}
                onClick={() => handleModalOptionClick('Settings')}
              >
                Settings
              </ModalOption>
              <ModalOption
                isActive={activeModalTab === 'View Plans'}
                onClick={() => handleModalOptionClick('View Plans')}
              >
                View Plans
              </ModalOption>
              <ModalOption
                isActive={activeModalTab === 'Get Help'}
                onClick={() => handleModalOptionClick('Get Help')}
              >
                Get Help
              </ModalOption>

              <ModalDivider />

              <ModalOption
                isActive={activeModalTab === 'Log Out'}
                onClick={() => handleModalOptionClick('Log Out')}
              >
                Log Out
              </ModalOption>

            </ModalSidebar>
            <ModalMainContent>
              {renderModalContent()}
            </ModalMainContent>
          </ModalContent>
        </ModalBackdrop>
      )}

    </ChatLayoutContainer>
  );
};

export default ChatPage; 