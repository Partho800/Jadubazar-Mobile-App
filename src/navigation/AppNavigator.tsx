import React from 'react';
import { StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../context/ThemeContext';
import { MainNavigator } from './MainNavigator';
import { CategoryBottomSheetModal } from '../components/Category/CategoryBottomSheetModal';
import { MenuDrawerModal } from '../components/common/Header/MenuDrawerModal';
import { SupportChatFloatingButton } from '../components/common/SupportChatFloatingButton';

export const AppNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <>
      <RNStatusBar
        backgroundColor="transparent"
        translucent
        barStyle={theme.statusBarStyle === 'dark' ? 'dark-content' : 'light-content'}
      />
      <StatusBar style={theme.statusBarStyle} />
      <MainNavigator />
      <CategoryBottomSheetModal />
      <MenuDrawerModal />
      <SupportChatFloatingButton />
    </>
  );
};

