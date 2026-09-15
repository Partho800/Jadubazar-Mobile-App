import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CustomTabBar } from './CustomTabBar';

import { HomeScreen } from '../screens/Home/HomeScreen';
import { CategoryScreen } from '../screens/Category/CategoryScreen';
import { ShopScreen } from '../screens/Shop/ShopScreen';
import { CartScreen } from '../screens/Cart/CartScreen';
import { SearchScreen } from '../screens/Search/SearchScreen';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />

      <Tab.Screen
        name="CategoriesTab"
        component={CategoryScreen}
        options={{
          tabBarLabel: 'Categories',
        }}
      />

      <Tab.Screen
        name="OffersTab"
        component={ShopScreen}
        options={{
          tabBarLabel: 'Offers',
        }}
      />

      <Tab.Screen
        name="CartTab"
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
        }}
      />

      <Tab.Screen
        name="SearchTab"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
        }}
      />
    </Tab.Navigator>
  );
};

