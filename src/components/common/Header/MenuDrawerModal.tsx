import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useMenuDrawer } from '../../../context/MenuDrawerContext';
import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';
import { cartStore } from '../../../store/cartStore';
import { AppText as Text } from '../AppText';

interface MenuDrawerModalProps {
  onNavigateToTab?: (tabName: string) => void;
}

export const MenuDrawerModal: React.FC<MenuDrawerModalProps> = ({ onNavigateToTab }) => {
  const { isMenuDrawerOpen, closeMenuDrawer } = useMenuDrawer();
  const { isDarkMode } = useTheme();
  const { language, setLanguage, isBangla, t } = useLanguage();
  const navigation = useNavigation<any>();

  const [cartCount, setCartCount] = useState<number>(cartStore.getTotalCount());
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    return cartStore.subscribe(() => {
      setCartCount(cartStore.getTotalCount());
    });
  }, []);

  if (!isMenuDrawerOpen) return null;

  const handleNavPress = (tabName: string) => {
    closeMenuDrawer();
    if (onNavigateToTab) {
      onNavigateToTab(tabName);
    } else {
      try {
        navigation.navigate(tabName);
      } catch (e) {
        console.log('Navigation error', e);
      }
    }
  };

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
              className={`max-h-[95vh] rounded-b-[28px] pt-10 pb-6 shadow-2xl border-b ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-white border-slate-200'
              }`}
            >
              {/* Top Drag Handle & Close Button */}
              <View className="flex-row items-center justify-between px-5 py-2">
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
                  <Ionicons
                    name="close"
                    size={20}
                    color={isDarkMode ? '#94A3B8' : '#475569'}
                  />
                </TouchableOpacity>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 4, paddingBottom: 20 }}
              >
                {/* 1. MY PROFILE CARD (explicit Light vs Dark Mode styling matching screenshot) */}
                <View
                  className={`rounded-[20px] border p-4 mb-3.5 ${
                    isDarkMode
                      ? 'bg-slate-800 border-slate-700'
                      : 'bg-[#FFFBEB] border-[#FEF3C7]'
                  }`}
                >
                  {/* Top Profile Info Row */}
                  <View className="flex-row items-center mb-3.5">
                    <View className="relative mr-3">
                      <View className="w-12 h-12 rounded-full bg-amber-500 items-center justify-center shadow-sm">
                        <Ionicons name="person" size={24} color="#FFFFFF" />
                      </View>
                      <View
                        className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 ${
                          isDarkMode ? 'border-slate-800' : 'border-white'
                        }`}
                      />
                    </View>

                    <View className="flex-1">
                      <View className="flex-row items-center gap-1.5">
                        <Text
                          className={`text-[17px] font-black tracking-tight ${
                            isDarkMode ? 'text-slate-50' : 'text-slate-900'
                          }`}
                        >
                          {isBangla ? 'আমার প্রোফাইল' : 'My Profile'}
                        </Text>
                        <View
                          className={`px-2 py-0.5 rounded-md ${
                            isDarkMode ? 'bg-emerald-950' : 'bg-emerald-100'
                          }`}
                        >
                          <Text
                            className={`text-[10px] font-black tracking-wider uppercase ${
                              isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                            }`}
                          >
                            ACCOUNT
                          </Text>
                        </View>
                      </View>

                      <Text
                        className={`text-xs font-medium mt-0.5 ${
                          isDarkMode ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {isBangla ? 'অর্ডার, উইশলিস্ট ও সেটিংস' : 'Orders, Wishlist & Settings'}
                      </Text>
                    </View>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => handleNavPress('ProfileTab')}
                      className={`w-8 h-8 rounded-full border items-center justify-center shadow-sm ${
                        isDarkMode
                          ? 'bg-slate-900 border-slate-700'
                          : 'bg-white border-slate-100'
                      }`}
                    >
                      <Ionicons
                        name="chevron-forward"
                        size={18}
                        color={isDarkMode ? '#94A3B8' : '#64748B'}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* 3 Pill Buttons Row Inside Profile Card */}
                  <View className="flex-row items-center gap-2.5">
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => handleNavPress('OrdersTab')}
                      className={`flex-1 py-2.5 rounded-full border items-center justify-center shadow-sm ${
                        isDarkMode
                          ? 'bg-slate-900 border-slate-700'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <Text
                        className={`text-xs font-bold ${
                          isDarkMode ? 'text-slate-100' : 'text-slate-800'
                        }`}
                      >
                        {isBangla ? 'অর্ডারসমূহ' : 'Orders'}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => handleNavPress('WishlistTab')}
                      className={`flex-1 py-2.5 rounded-full border items-center justify-center shadow-sm ${
                        isDarkMode
                          ? 'bg-slate-900 border-slate-700'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <Text
                        className={`text-xs font-bold ${
                          isDarkMode ? 'text-slate-100' : 'text-slate-800'
                        }`}
                      >
                        {isBangla ? 'উইশলিস্ট' : 'Wishlist'}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => handleNavPress('ProfileTab')}
                      className={`flex-1 py-2.5 rounded-full border items-center justify-center shadow-sm ${
                        isDarkMode
                          ? 'bg-slate-900 border-slate-700'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <Text
                        className={`text-xs font-bold ${
                          isDarkMode ? 'text-slate-100' : 'text-slate-800'
                        }`}
                      >
                        {isBangla ? 'সেটিংস' : 'Settings'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* 2. LANGUAGE SELECTOR CARD */}
                <View
                  className={`flex-row items-center justify-between px-4 py-3 rounded-2xl border mb-3.5 ${
                    isDarkMode
                      ? 'bg-slate-800 border-slate-700'
                      : 'bg-[#F8FAFC] border-[#F1F5F9]'
                  }`}
                >
                  <Text
                    className={`text-sm font-extrabold ${
                      isDarkMode ? 'text-slate-100' : 'text-slate-800'
                    }`}
                  >
                    Language / ভাষা
                  </Text>

                  <View
                    className={`flex-row items-center rounded-full border p-0.5 ${
                      isDarkMode
                        ? 'bg-slate-900 border-slate-700'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => setLanguage('EN')}
                      className={`px-3.5 py-1.5 rounded-full ${language === 'EN' ? 'bg-[#F59E0B]' : ''}`}
                    >
                      <Text
                        className={`text-xs ${
                          language === 'EN'
                            ? 'font-black text-slate-900'
                            : isDarkMode
                            ? 'font-bold text-slate-400'
                            : 'font-bold text-slate-500'
                        }`}
                      >
                        English
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => setLanguage('BN')}
                      className={`px-3.5 py-1.5 rounded-full ${language === 'BN' ? 'bg-[#F59E0B]' : ''}`}
                    >
                      <Text
                        className={`text-xs ${
                          language === 'BN'
                            ? 'font-black text-slate-900'
                            : isDarkMode
                            ? 'font-bold text-slate-400'
                            : 'font-bold text-slate-500'
                        }`}
                      >
                        বাংলা
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* 3. SEARCH BAR BOX */}
                <View
                  className={`flex-row items-center px-3.5 h-12 rounded-2xl border mb-3.5 ${
                    isDarkMode
                      ? 'bg-slate-800 border-slate-700'
                      : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <TextInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder={
                      isBangla
                        ? 'পণ্য, মুদি সামগ্রী, ঔষধ ও সার্ভিস খুঁজুন...'
                        : 'Search groceries, food, medicine, services...'
                    }
                    placeholderTextColor={isDarkMode ? '#64748B' : '#94A3B8'}
                    className={`flex-1 text-xs font-semibold py-0 ${
                      isDarkMode ? 'text-slate-100' : 'text-slate-900'
                    }`}
                    onSubmitEditing={() => handleNavPress('SearchTab')}
                  />
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => handleNavPress('SearchTab')}
                  >
                    <Ionicons
                      name="search-outline"
                      size={20}
                      color={isDarkMode ? '#64748B' : '#94A3B8'}
                    />
                  </TouchableOpacity>
                </View>

                {/* 4. DELIVERY LOCATION BAR */}
                <View
                  className={`flex-row items-center px-3.5 py-2.5 rounded-xl border mb-4 ${
                    isDarkMode
                      ? 'bg-slate-800 border-slate-700'
                      : 'bg-[#F8FAFC] border-[#F1F5F9]'
                  }`}
                >
                  <Ionicons
                    name="location-outline"
                    size={16}
                    color="#F59E0B"
                    style={{ marginRight: 6 }}
                  />
                  <Text
                    numberOfLines={1}
                    className={`flex-1 text-xs ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    <Text
                      className={`font-extrabold ${
                        isDarkMode ? 'text-slate-100' : 'text-slate-900'
                      }`}
                    >
                      Deliver to:{' '}
                    </Text>
                    Parashmoni laboratory school., 16, Road 27, Sector 7, Uttara, Dhaka
                  </Text>
                </View>

                {/* 5. MENU NAV ITEMS LIST */}
                <View className="gap-4 px-1">
                  {/* Cart Link */}
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => handleNavPress('CartTab')}
                    className="flex-row items-center gap-3.5 py-1"
                  >
                    <View className="w-7 items-center justify-center relative">
                      <Ionicons
                        name="cart-outline"
                        size={22}
                        color={isDarkMode ? '#94A3B8' : '#475569'}
                      />
                      {cartCount > 0 && (
                        <View className="absolute -top-1 -right-1.5 bg-amber-500 rounded-full min-w-[16px] h-4 items-center justify-center px-1">
                          <Text className="text-[10px] font-black text-slate-900">
                            {cartCount}
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text
                      className={`text-base font-bold ${
                        isDarkMode ? 'text-slate-100' : 'text-slate-800'
                      }`}
                    >
                      {t('cart')}
                    </Text>
                  </TouchableOpacity>

                  {/* Account Link */}
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      closeMenuDrawer();
                      Alert.alert(isBangla ? 'আমার অ্যাকাউন্ট' : 'My Account', isBangla ? 'আপনার অ্যাকাউন্ট প্রোফাইল সম্পর্কিত তথ্য।' : 'Manage your account profile details.');
                    }}
                    className="flex-row items-center gap-3.5 py-1"
                  >
                    <View className="w-7 items-center justify-center">
                      <Ionicons
                        name="person-outline"
                        size={22}
                        color={isDarkMode ? '#94A3B8' : '#475569'}
                      />
                    </View>
                    <Text
                      className={`text-base font-bold ${
                        isDarkMode ? 'text-slate-100' : 'text-slate-800'
                      }`}
                    >
                      {isBangla ? 'অ্যাকাউন্ট' : 'Account'}
                    </Text>
                  </TouchableOpacity>

                  {/* Offers & Coupons Link */}
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => handleNavPress('OffersTab')}
                    className="flex-row items-center gap-3.5 py-1"
                  >
                    <View className="w-7 items-center justify-center">
                      <Ionicons
                        name="gift-outline"
                        size={22}
                        color={isDarkMode ? '#94A3B8' : '#475569'}
                      />
                    </View>
                    <Text
                      className={`text-base font-bold ${
                        isDarkMode ? 'text-slate-100' : 'text-slate-800'
                      }`}
                    >
                      {t('offers')}
                    </Text>
                  </TouchableOpacity>

                  {/* Customer Support Link */}
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      closeMenuDrawer();
                      Alert.alert(isBangla ? 'কাস্টমার সাপোর্ট' : 'Customer Support', isBangla ? 'যাদুবাজার হেল্পলাইন: ০৯৬১১-১২৩৪৫৬' : 'Jadubazar Helpline: 09611-123456');
                    }}
                    className="flex-row items-center gap-3.5 py-1"
                  >
                    <View className="w-7 items-center justify-center">
                      <Ionicons
                        name="headset-outline"
                        size={22}
                        color={isDarkMode ? '#94A3B8' : '#475569'}
                      />
                    </View>
                    <Text
                      className={`text-base font-bold ${
                        isDarkMode ? 'text-slate-100' : 'text-slate-800'
                      }`}
                    >
                      {isBangla ? 'হেল্প ও সাপোর্ট' : 'Help & Support'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
