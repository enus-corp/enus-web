export interface SideTrailProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onOpenSettings: () => void;
  username: string;
  avatarUrl?: string;
}

export interface SideTrailStyles {
  width: number;
  backgroundColor: string;
  iconSize: number;
  iconSpacing: number;
} 