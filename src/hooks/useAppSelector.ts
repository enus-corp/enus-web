import { useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootAppState } from '@/store/appStore';
import type { ThemeRootState } from '@/store/themeStore';

export const useRootAppSelector: TypedUseSelectorHook<RootAppState> = useSelector; 
export const useThemeSelector: TypedUseSelectorHook<ThemeRootState> = useSelector; 
