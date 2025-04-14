export interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  userPlan?: string;
  avatarUrl?: string;
}

export type ModalTab = 'Settings' | 'View Plans' | 'Get Help' | 'Log Out';

export interface SettingsModalStyles {
  width: string;
  maxWidth: string;
  height: string;
  maxHeight: string;
  backgroundColor: string;
  borderRadius: string;
  boxShadow: string;
} 