export interface SideTrailProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onOpenSettings: () => void;
  username: string;
  activeIcon: 'chat' | 'config' | null;
  onIconClick: (icon: 'chat' | 'config') => void;
  avatarUrl?: string;
}

export interface SideTrailStyles {
  width: number;
  backgroundColor: string;
  iconSize: number;
  iconSpacing: number;
} 