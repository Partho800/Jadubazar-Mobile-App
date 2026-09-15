import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { ThemeProvider } from './src/context/ThemeContext';
import { LanguageProvider } from './src/context/LanguageContext';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  const [fontsLoaded] = useFonts({
    'LiAdorNoirrit': require('./src/assets/fonts/LiAdorNoirrit-Regular.ttf'),
    'LiAdorNoirrit-Regular': require('./src/assets/fonts/LiAdorNoirrit-Regular.ttf'),
    'LiAdorNoirrit-SemiBold': require('./src/assets/fonts/LiAdorNoirrit-SemiBold.ttf'),
    'LiAdorNoirrit-Bold': require('./src/assets/fonts/LiAdorNoirrit-Bold.ttf'),
    'Geist-Regular': require('./src/assets/fonts/Geist-Regular.ttf'),
    'Geist-Medium': require('./src/assets/fonts/Geist-Medium.ttf'),
    'Geist-SemiBold': require('./src/assets/fonts/Geist-SemiBold.ttf'),
    'Geist-Bold': require('./src/assets/fonts/Geist-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LanguageProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </LanguageProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
