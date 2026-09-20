import React from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { ThemeProvider } from './src/context/ThemeContext';
import { LanguageProvider } from './src/context/LanguageContext';
import { ProductProvider } from './src/context/ProductContext';
import { ServiceProvider } from './src/context/ServiceContext';
import { CategoryProvider } from './src/context/CategoryContext';
import { MenuDrawerProvider } from './src/context/MenuDrawerContext';
import { UserProvider } from './src/context/UserContext';
import { AppNavigator } from './src/navigation/AppNavigator';

import { requestAppStartupPermissions } from './src/utils/permissionHelper';

export default function App() {
  React.useEffect(() => {
    requestAppStartupPermissions();
  }, []);

  const [fontsLoaded, fontError] = useFonts({
    'LiAdorNoirrit': require('./src/assets/fonts/LiAdorNoirrit-Regular.ttf'),
    'LiAdorNoirrit-Regular': require('./src/assets/fonts/LiAdorNoirrit-Regular.ttf'),
    'LiAdorNoirrit-SemiBold': require('./src/assets/fonts/LiAdorNoirrit-SemiBold.ttf'),
    'LiAdorNoirrit-Bold': require('./src/assets/fonts/LiAdorNoirrit-Bold.ttf'),
    'Geist-Regular': require('./src/assets/fonts/Geist-Regular.ttf'),
    'Geist-Medium': require('./src/assets/fonts/Geist-Medium.ttf'),
    'Geist-SemiBold': require('./src/assets/fonts/Geist-SemiBold.ttf'),
    'Geist-Bold': require('./src/assets/fonts/Geist-Bold.ttf'),
  });

  if (fontError) {
    console.warn('Font loading error:', fontError);
  }

  if (!fontsLoaded && !fontError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFBE00' }}>
        <Image
          source={require('./assets/icon.png')}
          style={{ width: 140, height: 140 }}
          resizeMode="contain"
        />
        <ActivityIndicator size="small" color="#0F172A" style={{ marginTop: 24 }} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LanguageProvider>
          <UserProvider>
            <ProductProvider>
              <ServiceProvider>
                <CategoryProvider>
                  <MenuDrawerProvider>
                    <NavigationContainer>
                      <AppNavigator />
                    </NavigationContainer>
                  </MenuDrawerProvider>
                </CategoryProvider>
              </ServiceProvider>
            </ProductProvider>
          </UserProvider>
        </LanguageProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}


