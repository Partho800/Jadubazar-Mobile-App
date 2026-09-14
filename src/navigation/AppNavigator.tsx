import React from 'react';
import { StatusBar as RNStatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../context/ThemeContext';
import { MainNavigator } from './MainNavigator';

export const AppNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <NavigationContainer>
      <RNStatusBar
        backgroundColor="transparent"
        translucent
        barStyle={theme.statusBarStyle === 'dark' ? 'dark-content' : 'light-content'}
      />
      <StatusBar style={theme.statusBarStyle} />
      <MainNavigator />
    </NavigationContainer>
  );
};
