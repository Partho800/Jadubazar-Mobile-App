import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useMenuDrawer } from '../../../context/MenuDrawerContext';
import { useTheme } from '../../../context/ThemeContext';
import { useCategory } from '../../../context/CategoryContext';
import { useLanguage } from '../../../context/LanguageContext';
import { useUser } from '../../../context/UserContext';
import { AppText as Text } from '../AppText';

interface MenuDrawerModalProps {
  onNavigateToTab?: (tabName: string) => void;
}

export const MenuDrawerModal: React.FC<MenuDrawerModalProps> = ({ onNavigateToTab }) => {
  const { isMenuDrawerOpen, closeMenuDrawer } = useMenuDrawer();
  const { isDarkMode } = useTheme();
  const { isBangla } = useLanguage();
  const { user } = useUser();
  const { activeCategoryColor } = useCategory();
  const navigation = useNavigation<any>();

  // Track currently active selected menu item
  const [activeMenuItem, setActiveMenuItem] = useState<string>('settings');

  if (!isMenuDrawerOpen) return null;

  const handleNavPress = (tabName: string, params?: any) => {
    closeMenuDrawer();
    if (onNavigateToTab) {
      onNavigateToTab(tabName);
    } else {
      try {
        navigation.navigate(tabName, params);
      } catch (e) {
        console.log('Navigation error', e);
      }
    }
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: isBangla ? 'ড্যাশবোর্ড' : 'Dashboard',
      icon: 'grid-outline',
      onPress: () => handleNavPress('ProfileTab', { viewMode: 'dashboard', timestamp: Date.now() }),
    },
    {
      id: 'settings',
      label: isBangla ? 'প্রোফাইল সেটিংস' : 'Profile Settings',
      icon: 'person-outline',
      onPress: () => handleNavPress('ProfileTab', { viewMode: 'settings', timestamp: Date.now() }),
    },
    {
      id: 'delivery',
      label: isBangla ? 'ডেলিভারি ম্যান' : 'Delivery Man',
      icon: 'bicycle-outline',
      onPress: () => handleNavPress('ProfileTab', { viewMode: 'delivery', timestamp: Date.now() }),
    },
    {
      id: 'orders',
      label: isBangla ? 'আমার অর্ডারসমূহ' : 'My Orders',
      icon: 'clipboard-outline',
      onPress: () => handleNavPress('OrdersTab'),
    },
    {
      id: 'bookings',
      label: isBangla ? 'সার্ভিস বুকিং' : 'Service Bookings',
      icon: 'book-outline',
      onPress: () => handleNavPress('OrdersTab'),
    },
    {
      id: 'wishlist',
      label: isBangla ? 'উইশলিস্ট ম্যানেজার' : 'Wishlist Manager',
      icon: 'heart-outline',
      onPress: () => handleNavPress('WishlistTab'),
    },
    {
      id: 'addresses',
      label: isBangla ? 'সংরক্ষিত ঠিকানা' : 'Saved Addresses',
      icon: 'location-outline',
      onPress: () => handleNavPress('ProfileTab', { viewMode: 'addresses', timestamp: Date.now() }),
    },
    {
      id: 'notifications',
      label: isBangla ? 'নোটিফিকেশন' : 'Notifications',
      icon: 'notifications-outline',
      onPress: () => handleNavPress('ProfileTab', { viewMode: 'notifications', timestamp: Date.now() }),
    },
    {
      id: 'reviews',
      label: isBangla ? 'আমার রিভিউসমূহ' : 'My Reviews',
      icon: 'star-outline',
      onPress: () => handleNavPress('ProfileTab', { viewMode: 'reviews', timestamp: Date.now() }),
    },
  ];

  return (
    <Modal
      visible={isMenuDrawerOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={closeMenuDrawer}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={closeMenuDrawer}>
        <View className={`flex-1 justify-start ${isDarkMode ? 'bg-black/75' : 'bg-black/40'}`}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View
              className={`w-full max-h-[95vh] rounded-b-[28px] pt-7 pb-6 shadow-2xl border-b ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              {/* Top Drag Pill & Close Button */}
              <View className="flex-row items-center justify-between px-5 pt-2 pb-3">
                <View
                  className={`w-10 h-1.5 rounded-full ${
                    isDarkMode ? 'bg-slate-700' : 'bg-slate-300'
                  }`}
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={closeMenuDrawer}
                  className={`w-8 h-8 rounded-full items-center justify-center ${
                    isDarkMode ? 'bg-slate-800' : 'bg-slate-100'
                  }`}
                >
                  <Ionicons name="close" size={19} color={isDarkMode ? '#94A3B8' : '#475569'} />
                </TouchableOpacity>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 4, paddingBottom: 20 }}
              >
                {/* 1. USER PROFILE HEADER */}
                <View className="flex-row items-center px-2 pt-1 pb-4">
                  <Image
                    source={{
                      uri:
                        user.avatar ||
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
                    }}
                    className="w-13 h-13 rounded-full bg-slate-200 mr-3.5 border-2 border-amber-400"
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                  />
                  <View className="flex-1">
                    <Text
                      className={`text-base font-black tracking-tight ${
                        isDarkMode ? 'text-slate-50' : 'text-slate-900'
                      }`}
                    >
                      {user.name}
                    </Text>
                    <Text
                      className={`text-xs font-semibold mt-0.5 ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {user.email}
                    </Text>
                  </View>
                </View>

                {/* HORIZONTAL DIVIDER LINE */}
                <View
                  className={`h-[1px] w-full my-2 ${
                    isDarkMode ? 'bg-slate-800' : 'bg-slate-100'
                  }`}
                />

                {/* 2. ACCOUNT MENU ITEMS LIST WITH ACTIVE HIGHLIGHT */}
                <View className="gap-1 px-1 py-2">
                  {menuItems.map((item) => {
                    const isActive = activeMenuItem === item.id;
                    return (
                      <TouchableOpacity
                        key={item.id}
                        activeOpacity={0.85}
                        onPress={() => {
                          setActiveMenuItem(item.id);
                          item.onPress();
                        }}
                        style={{
                          backgroundColor: isActive ? activeCategoryColor : 'transparent',
                        }}
                        className={`flex-row items-center gap-3.5 px-3.5 py-3 rounded-xl ${
                          isActive
                            ? 'shadow-sm active:scale-[0.99]'
                            : 'active:bg-slate-100 dark:active:bg-slate-800'
                        }`}
                      >
                        <Ionicons
                          name={item.icon as any}
                          size={20}
                          color={isActive ? '#FFFFFF' : isDarkMode ? '#94A3B8' : '#475569'}
                        />
                        <Text
                          className={`text-sm ${
                            isActive
                              ? 'font-black text-white'
                              : isDarkMode
                              ? 'font-bold text-slate-200'
                              : 'font-bold text-slate-700'
                          }`}
                        >
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
