import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '@/components/chat/mainPanel/types';
import { ChatHistoryItem } from '@/components/chat/Sidebar/types';

interface ChatState {
  activeIcon: 'chat' | 'config' | null;
  isSidebarOpen: boolean;
  currentChatId: string | null;
  chatHistory: ChatHistoryItem[];
  messages: Message[];
  isModalOpen: boolean;
}

const initialState: ChatState = {
  activeIcon: 'chat',
  isSidebarOpen: true,
  currentChatId: null,
  chatHistory: [],
  messages: [],
  isModalOpen: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveIcon: (state, action: PayloadAction<'chat' | 'config' | null>) => {
      state.activeIcon = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setCurrentChatId: (state, action: PayloadAction<string | null>) => {
      state.currentChatId = action.payload;
    },
    setChatHistory: (state, action: PayloadAction<ChatHistoryItem[]>) => {
      state.chatHistory = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
  },
});

export const {
  setActiveIcon,
  toggleSidebar,
  setCurrentChatId,
  setChatHistory,
  addMessage,
  setMessages,
  toggleModal,
} = chatSlice.actions;

export default chatSlice.reducer; 