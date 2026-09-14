import { ComponentType } from 'react';
import { Ionicons } from '@expo/vector-icons';

export interface TabMenuItem {
  id: string;
  name: string;
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
  activeIconName: keyof typeof Ionicons.glyphMap;
  badge?: number;
}

export const TAB_MENU_ITEMS: TabMenuItem[] = [
  {
    id: 'wallet',
    name: 'Wallet',
    label: 'Wallet',
    iconName: 'wallet-outline',
    activeIconName: 'wallet',
  },
  {
    id: 'transactions',
    name: 'Transactions',
    label: 'Transactions',
    iconName: 'swap-horizontal-outline',
    activeIconName: 'swap-horizontal',
  },
  {
    id: 'home',
    name: 'Home',
    label: 'Home',
    iconName: 'home-outline',
    activeIconName: 'home',
  },
  {
    id: 'notifications',
    name: 'Notifications',
    label: 'Notifications',
    iconName: 'notifications-outline',
    activeIconName: 'notifications',
  },
  {
    id: 'profile',
    name: 'Profile',
    label: 'Profile',
    iconName: 'person-outline',
    activeIconName: 'person',
  },
];
