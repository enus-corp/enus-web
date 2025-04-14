export interface Message {
    id: string;
    sender: 'user' | 'ai';
    text: string;
}

export interface ChatHeaderProps {
    title: string;
}

export interface MessageListProps {
    messages: Message[];
}

export interface MessageInputProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    placeholder?: string;
}

export interface ChatPanelProps {
    isSidebarOpen: boolean;
    title: string;
    messages: Message[];
    onSendMessage: (message: string) => void;
} 

export interface ChatConfig {
    readSpeed: ReadSpeed;
    detailLevel: DetailLevel;
    briefingCount: number;
}
  
export type ReadSpeed = 'slow' | 'normal' | 'fast' | 'very_fast';
export type DetailLevel = 'simple' | 'basic' | 'detailed' | 'extensive';

export interface ConfigPanelProps {
  chatId: string;
  config: ChatConfig;
  onConfigChange: (config: ChatConfig) => void;
}

export interface ChatConfig {
  readSpeed: ReadSpeed;
  detailLevel: DetailLevel;
  briefingCount: number;
}

export const READ_SPEED_MULTIPLIERS: Record<ReadSpeed, number> = {
  slow: 0.8,
  normal: 1.0,
  fast: 1.2,
  very_fast: 1.5
};

export const DETAIL_LEVEL_CHAR_COUNTS: Record<DetailLevel, number> = {
  simple: 150,
  basic: 300,
  detailed: 450,
  extensive: 600
}; 