import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigator } from './BottomTabNavigator';
import { CheckoutScreen } from '../screens/Checkout/CheckoutScreen';
import { OrderSuccessScreen } from '../screens/Checkout/OrderSuccessScreen';
import { OrderTrackingScreen } from '../screens/Orders/OrderTrackingScreen';
import { OrdersScreen } from '../screens/Orders/OrdersScreen';
import { WishlistScreen } from '../screens/Wishlist/WishlistScreen';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';

const Stack = createNativeStackNavigator();

export const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      
      {/* Supporting legacy & clean navigation route aliases */}
      <Stack.Screen name="CheckoutTab" component={CheckoutScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      
      <Stack.Screen name="OrderSuccessTab" component={OrderSuccessScreen} />
      <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
      
      <Stack.Screen name="OrderTrackingTab" component={OrderTrackingScreen} />
      <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
      
      <Stack.Screen name="OrdersTab" component={OrdersScreen} />
      <Stack.Screen name="Orders" component={OrdersScreen} />
      
      <Stack.Screen name="WishlistTab" component={WishlistScreen} />
      <Stack.Screen name="Wishlist" component={WishlistScreen} />
      
      <Stack.Screen name="ProfileTab" component={ProfileScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

