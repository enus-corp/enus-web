import { RootAppDispatch } from '@/store/appStore';
import { ThemeAppDispatch } from '@/store/themeStore';
import { useDispatch } from 'react-redux';

export const useRootAppDispatch = () => useDispatch<RootAppDispatch>(); 
export const useThemeDispatch = () => useDispatch<ThemeAppDispatch>(); 