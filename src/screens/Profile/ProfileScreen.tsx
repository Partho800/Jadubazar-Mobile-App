import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Image,
  Linking,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation, useIsFocused } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useMenuDrawer } from '../../context/MenuDrawerContext';
import { useUser } from '../../context/UserContext';
import { useCategory } from '../../context/CategoryContext';
import { Header } from '../../components/common/Header/Header';
import { AppText as Text } from '../../components/common/AppText';
import { RiderChatModal } from '../../components/order/RiderChatModal';
import { wishlistStore } from '../../store/wishlistStore';
import { DefaultUserAvatar } from '../../components/common/DefaultUserAvatar';

export interface SavedAddressItem {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  addressLine: string;
  isDefault: boolean;
}

export interface DeliveryOrderItem {
  id: string;
  date: string;
  status: 'active' | 'completed' | 'cancelled';
  statusLabelEn: string;
  statusLabelBn: string;
  totalAmount: number;
  itemsSummary: string;
  deliveryAddress: string;
  rider?: {
    name: string;
    rating: number;
    phone: string;
    vehicleInfo: string;
    photoUrl: string;
    deliveryCount: string;
  };
}

export interface UserReviewItem {
  id: string;
  itemName: string;
  category: string;
  date: string;
  rating: number;
  comment: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  time: string;
  message: string;
  icon: keyof typeof Ionicons.glyphMap;
  type?: 'promo' | 'order' | 'system';
  isRead?: boolean;
}

export const ProfileScreen: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { isBangla } = useLanguage();
  const { openMenuDrawer } = useMenuDrawer();
  const { user, updateUser } = useUser();
  const { activeCategoryColor } = useCategory();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();

  // View state: 'dashboard' | 'settings' | 'delivery' | 'addresses' | 'reviews' | 'notifications'
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'settings' | 'delivery' | 'addresses' | 'reviews' | 'notifications'
  >('dashboard');

  // Delivery view states
  const [deliveryFilter, setDeliveryFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [searchOrderQuery, setSearchOrderQuery] = useState('');
  const [isChatModalVisible, setIsChatModalVisible] = useState(false);
  const [chatOrderId, setChatOrderId] = useState('');
  const [chatRiderName, setChatRiderName] = useState('');
  const [deliveryOrders, setDeliveryOrders] = useState<DeliveryOrderItem[]>([]);
  const [userReviews, setUserReviews] = useState<UserReviewItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [wishlistCount, setWishlistCount] = useState<number>(wishlistStore.getItems().length);

  useEffect(() => {
    setWishlistCount(wishlistStore.getItems().length);
    const unsubscribe = wishlistStore.subscribe(() => {
      setWishlistCount(wishlistStore.getItems().length);
    });
    return () => unsubscribe();
  }, [isFocused]);

  const activeDeliveriesCount = deliveryOrders.filter((o) => o.status === 'active').length;
  const assignedRidersCount = deliveryOrders.filter((o) => !!o.rider).length;
  const completedDeliveriesCount = deliveryOrders.filter((o) => o.status === 'completed').length;

  const filteredDeliveryOrders = deliveryOrders.filter((order) => {
    const matchesFilter =
      deliveryFilter === 'all'
        ? true
        : deliveryFilter === 'active'
        ? order.status === 'active'
        : order.status === 'completed';
    const query = searchOrderQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      order.id.toLowerCase().includes(query) ||
      (order.rider?.name && order.rider.name.toLowerCase().includes(query)) ||
      order.itemsSummary.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  // Saved Addresses State (Starts empty at 0, populated from user actions)
  const [savedAddresses, setSavedAddresses] = useState<SavedAddressItem[]>([]);

  // Add/Edit Address Form State
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [newLabel, setNewLabel] = useState('Home');
  const [newAddressDetails, setNewAddressDetails] = useState('');

  // Start editing an address
  const handleStartEditAddress = (item: SavedAddressItem) => {
    setEditingAddressId(item.id);
    setNewLabel(item.title);
    setNewAddressDetails(item.addressLine);
    setIsAddingAddress(true);
  };

  const handleCancelAddressForm = () => {
    setIsAddingAddress(false);
    setEditingAddressId(null);
    setNewAddressDetails('');
    setNewLabel('Home');
  };

  // Form State for Profile Settings
  const [fullName, setFullName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [dob, setDob] = useState(user.dateOfBirth);
  const [address, setAddress] = useState(user.address);

  useEffect(() => {
    setFullName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setDob(user.dateOfBirth);
    setAddress(user.address);
  }, [user]);

  useEffect(() => {
    if (isFocused && route?.params?.viewMode) {
      setActiveTab(route.params.viewMode);
    }
  }, [isFocused, route?.params?.viewMode, route?.params?.timestamp]);

  const handleSaveProfile = () => {
    updateUser({
      name: fullName,
      email,
      phone,
      dateOfBirth: dob,
      address,
      savedAddressesCount: savedAddresses.length,
    });
    Alert.alert(
      isBangla ? 'প্রোফাইল আপডেট হয়েছে' : 'Profile Updated',
      isBangla
        ? 'আপনার প্রোফাইলের নতুন তথ্য সফলভাবে সংরক্ষিত হয়েছে।'
        : 'Your profile details have been updated successfully!'
    );
  };

  const handleOpenChat = (orderId: string, riderName: string) => {
    setChatOrderId(orderId);
    setChatRiderName(riderName);
    setIsChatModalVisible(true);
  };

  const handleCallRider = (phoneNum: string = '+8801712345678') => {
    Linking.openURL(`tel:${phoneNum}`).catch((err) => console.log('Call error', err));
  };

  const handleDeleteAddress = (id: string, title: string) => {
    const confirmMessage = isBangla
      ? `আপনি কি নিশ্চিত যে "${title}" ঠিকানাটি মুছে ফেলতে চান?`
      : `Are you sure you want to delete "${title}" address?`;

    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined' && window.confirm(confirmMessage)) {
        setSavedAddresses((prev) => {
          const updated = prev.filter((a) => a.id !== id);
          updateUser({ savedAddressesCount: updated.length });
          return updated;
        });
      }
    } else {
      Alert.alert(
        isBangla ? 'ঠিকানা মুছুন' : 'Delete Address',
        confirmMessage,
        [
          { text: isBangla ? 'বাতিল' : 'Cancel', style: 'cancel' },
          {
            text: isBangla ? 'মুছে ফেলুন' : 'Delete',
            style: 'destructive',
            onPress: () => {
              setSavedAddresses((prev) => {
                const updated = prev.filter((a) => a.id !== id);
                updateUser({ savedAddressesCount: updated.length });
                return updated;
              });
            },
          },
        ]
      );
    }
  };

  const handleSaveNewAddress = () => {
    if (!newAddressDetails.trim()) {
      Alert.alert(
        isBangla ? 'ঠিকানা প্রয়োজন' : 'Address Required',
        isBangla ? 'অনুগ্রহ করে ঠিকানা লিখুন।' : 'Please enter your street address and details.'
      );
      return;
    }

    const iconName: keyof typeof Ionicons.glyphMap =
      newLabel === 'Home'
        ? 'home-outline'
        : newLabel === 'Office'
        ? 'briefcase-outline'
        : 'location-outline';

    if (editingAddressId) {
      // Update existing address
      setSavedAddresses((prev) =>
        prev.map((item) =>
          item.id === editingAddressId
            ? { ...item, title: newLabel, icon: iconName, addressLine: newAddressDetails.trim() }
            : item
        )
      );
      setEditingAddressId(null);
    } else {
      // Add new address
      const newAddr: SavedAddressItem = {
        id: `addr-${Date.now()}`,
        title: newLabel,
        icon: iconName,
        addressLine: newAddressDetails.trim(),
        isDefault: savedAddresses.length === 0,
      };
      setSavedAddresses((prev) => {
        const updated = [...prev, newAddr];
        updateUser({ savedAddressesCount: updated.length });
        return updated;
      });
    }

    setNewAddressDetails('');
    setNewLabel('Home');
    setIsAddingAddress(false);

    Alert.alert(
      isBangla ? 'ঠিকানা সংরক্ষণ হয়েছে' : 'Address Saved',
      isBangla
        ? 'আপনার ঠিকানা সফলভাবে সংরক্ষিত হয়েছে।'
        : 'Address has been saved successfully!'
    );
  };

  return (
    <View className={`flex-1 ${isDarkMode ? 'bg-slate-950' : 'bg-[#F8FAFC]'}`}>
      {/* Top App Header */}
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 120, gap: 16 }}
      >
        {/* 1. TOP HEADER BAR CARD */}
        <View
          className={`px-4 py-3.5 rounded-2xl border flex-row items-center justify-between shadow-sm ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80'
          }`}
        >
          {/* Left Title with Icon */}
          <View className="flex-row items-center gap-2.5">
            <View
              style={{
                backgroundColor: `${activeCategoryColor}18`,
                borderColor: `${activeCategoryColor}40`,
              }}
              className="w-8 h-8 rounded-full border items-center justify-center"
            >
              <Ionicons
                name={
                  activeTab === 'delivery'
                    ? 'bicycle-outline'
                    : activeTab === 'addresses'
                    ? 'location-outline'
                    : activeTab === 'reviews'
                    ? 'star-outline'
                    : activeTab === 'notifications'
                    ? 'notifications-outline'
                    : activeTab === 'settings'
                    ? 'settings-outline'
                    : 'person-outline'
                }
                size={17}
                color={activeCategoryColor}
              />
            </View>
            <Text
              className={`text-base font-black tracking-tight ${
                isDarkMode ? 'text-slate-50' : 'text-slate-900'
              }`}
            >
              {activeTab === 'dashboard'
                ? isBangla
                  ? 'ড্যাশবোর্ড'
                  : 'Dashboard'
                : activeTab === 'delivery'
                ? isBangla
                  ? 'ডেলিভারি ম্যান'
                  : 'Delivery Man'
                : activeTab === 'addresses'
                ? isBangla
                  ? 'সংরক্ষিত ঠিকানা'
                  : 'Saved Addresses'
                : activeTab === 'reviews'
                ? isBangla
                  ? 'আমার রিভিউসমূহ'
                  : 'My Reviews'
                : activeTab === 'notifications'
                ? isBangla
                  ? 'নোটিফিকেশন'
                  : 'Notifications'
                : isBangla
                ? 'প্রোফাইল সেটিংস'
                : 'Profile Settings'}
            </Text>
          </View>

          {/* Right Button: ACCOUNT MENU */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={openMenuDrawer}
            style={{ backgroundColor: activeCategoryColor }}
            className="flex-row items-center gap-1.5 px-3 py-2 rounded-xl shadow-sm active:scale-95"
          >
            <Ionicons name="menu-outline" size={16} color="#FFFFFF" />
            <Text className="text-[11px] font-black text-white tracking-wide uppercase">
              ACCOUNT MENU
            </Text>
          </TouchableOpacity>
        </View>

        {/* TOP TAB TOGGLE SWITCHER (Only 3 Tabs: Dashboard | Settings | Delivery) */}
        <View
          className={`flex-row p-1 rounded-2xl border ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-200/60 border-slate-200'
          }`}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setActiveTab('dashboard')}
            className={`flex-1 py-2 rounded-xl items-center justify-center flex-row gap-1 ${
              activeTab === 'dashboard'
                ? isDarkMode
                  ? 'bg-slate-800 shadow-sm'
                  : 'bg-white shadow-sm'
                : 'bg-transparent'
            }`}
          >
            <Ionicons
              name="grid-outline"
              size={13}
              color={activeTab === 'dashboard' ? activeCategoryColor : isDarkMode ? '#94A3B8' : '#64748B'}
            />
            <Text
              className={`text-[10px] font-black ${
                activeTab === 'dashboard'
                  ? isDarkMode
                    ? 'text-slate-50'
                    : 'text-slate-900'
                  : isDarkMode
                  ? 'text-slate-400'
                  : 'text-slate-600'
              }`}
            >
              {isBangla ? 'ড্যাশবোর্ড' : 'Dashboard'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setActiveTab('settings')}
            className={`flex-1 py-2 rounded-xl items-center justify-center flex-row gap-1 ${
              activeTab === 'settings'
                ? isDarkMode
                  ? 'bg-slate-800 shadow-sm'
                  : 'bg-white shadow-sm'
                : 'bg-transparent'
            }`}
          >
            <Ionicons
              name="settings-outline"
              size={13}
              color={activeTab === 'settings' ? activeCategoryColor : isDarkMode ? '#94A3B8' : '#64748B'}
            />
            <Text
              className={`text-[10px] font-black ${
                activeTab === 'settings'
                  ? isDarkMode
                    ? 'text-slate-50'
                    : 'text-slate-900'
                  : isDarkMode
                  ? 'text-slate-400'
                  : 'text-slate-600'
              }`}
            >
              {isBangla ? 'সেটিংস' : 'Settings'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setActiveTab('delivery')}
            className={`flex-1 py-2 rounded-xl items-center justify-center flex-row gap-1 ${
              activeTab === 'delivery'
                ? isDarkMode
                  ? 'bg-slate-800 shadow-sm'
                  : 'bg-white shadow-sm'
                : 'bg-transparent'
            }`}
          >
            <Ionicons
              name="bicycle-outline"
              size={13}
              color={activeTab === 'delivery' ? activeCategoryColor : isDarkMode ? '#94A3B8' : '#64748B'}
            />
            <Text
              className={`text-[10px] font-black ${
                activeTab === 'delivery'
                  ? isDarkMode
                    ? 'text-slate-50'
                    : 'text-slate-900'
                  : isDarkMode
                  ? 'text-slate-400'
                  : 'text-slate-600'
              }`}
            >
              {isBangla ? 'ডেলিভারি' : 'Delivery'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* ----------------- DASHBOARD VIEW ----------------- */}
        {activeTab === 'dashboard' && (
          <>
            {/* WELCOME BACK CARD */}
            <View
              className={`p-5 rounded-2xl border shadow-sm flex-row items-center gap-4 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80'
              }`}
            >
              <DefaultUserAvatar
                uri={user.avatar}
                size={54}
                isDarkMode={isDarkMode}
                borderColor="#F59E0B"
              />
              <View className="flex-1">
                <Text
                  className={`text-lg font-black tracking-tight ${
                    isDarkMode ? 'text-slate-50' : 'text-slate-900'
                  }`}
                >
                  {isBangla
                    ? `স্বাগতম, ${user.firstName || user.name || 'ইউজার'}!`
                    : `Welcome Back, ${user.firstName || user.name || 'User'}!`}
                </Text>
                <Text
                  className={`text-xs font-semibold leading-relaxed mt-1 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  {isBangla
                    ? 'আপনার অর্ডার ট্র্যাকিং, সার্ভিস বুকিং এবং প্রিয় পণ্যসমূহ পরিচালনা করুন।'
                    : 'Monitor orders, service bookings, and saved preferences.'}
                </Text>
              </View>
            </View>

            {/* 4 STAT CARDS GRID (2x2) */}
            <View className="flex-row flex-wrap justify-between gap-3">
              {/* Stat 1: Total Orders */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('OrdersTab')}
                className={`w-[48.2%] p-4 rounded-2xl border flex-row items-center gap-3 shadow-sm ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80'
                }`}
              >
                <View
                  className={`w-12 h-12 rounded-2xl items-center justify-center border ${
                    isDarkMode
                      ? 'bg-emerald-950/80 border-emerald-800'
                      : 'bg-emerald-100/70 border-emerald-200'
                  }`}
                >
                  <Ionicons
                    name="clipboard-outline"
                    size={22}
                    color={isDarkMode ? '#34D399' : '#059669'}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase">
                    {isBangla ? 'মোট অর্ডার' : 'TOTAL ORDERS'}
                  </Text>
                  <Text
                    className={`text-2xl font-black mt-0.5 ${
                      isDarkMode ? 'text-slate-50' : 'text-slate-900'
                    }`}
                  >
                    0
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Stat 2: Service Bookings */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('OrdersTab')}
                className={`w-[48.2%] p-4 rounded-2xl border flex-row items-center gap-3 shadow-sm ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80'
                }`}
              >
                <View
                  className={`w-12 h-12 rounded-2xl items-center justify-center border ${
                    isDarkMode
                      ? 'bg-indigo-950/80 border-indigo-800'
                      : 'bg-indigo-100/70 border-indigo-200'
                  }`}
                >
                  <Ionicons
                    name="book-outline"
                    size={22}
                    color={isDarkMode ? '#818CF8' : '#4F46E5'}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase">
                    {isBangla ? 'সার্ভিস বুকিং' : 'SERVICE BOOKINGS'}
                  </Text>
                  <Text
                    className={`text-2xl font-black mt-0.5 ${
                      isDarkMode ? 'text-slate-50' : 'text-slate-900'
                    }`}
                  >
                    0
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Stat 3: Wishlisted Items */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('WishlistTab')}
                className={`w-[48.2%] p-4 rounded-2xl border flex-row items-center gap-3 shadow-sm ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80'
                }`}
              >
                <View
                  className={`w-12 h-12 rounded-2xl items-center justify-center border ${
                    isDarkMode
                      ? 'bg-red-950/80 border-red-800'
                      : 'bg-red-100/70 border-red-200'
                  }`}
                >
                  <Ionicons
                    name="heart-outline"
                    size={22}
                    color={isDarkMode ? '#F87171' : '#DC2626'}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase">
                    {isBangla ? 'উইশলিস্ট আইটেম' : 'WISHLISTED ITEMS'}
                  </Text>
                  <Text
                    className={`text-2xl font-black mt-0.5 ${
                      isDarkMode ? 'text-slate-50' : 'text-slate-900'
                    }`}
                  >
                    {wishlistCount}
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Stat 4: Saved Addresses */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setActiveTab('addresses')}
                className={`w-[48.2%] p-4 rounded-2xl border flex-row items-center gap-3 shadow-sm ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80'
                }`}
              >
                <View
                  className={`w-12 h-12 rounded-2xl items-center justify-center border ${
                    isDarkMode
                      ? 'bg-amber-950/80 border-amber-800'
                      : 'bg-amber-100/70 border-amber-200'
                  }`}
                >
                  <Ionicons
                    name="location-outline"
                    size={22}
                    color={isDarkMode ? '#FBBF24' : '#D97706'}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase">
                    {isBangla ? 'সংরক্ষিত ঠিকানা' : 'SAVED ADDRESSES'}
                  </Text>
                  <Text
                    className={`text-2xl font-black mt-0.5 ${
                      isDarkMode ? 'text-slate-50' : 'text-slate-900'
                    }`}
                  >
                    {savedAddresses.length}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* RECENT ORDERS CARD */}
            <View
              className={`p-4 rounded-2xl border shadow-sm ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80'
              }`}
            >
              {/* Card Header */}
              <View className="flex-row items-center justify-between mb-3.5">
                <Text className="text-xs font-extrabold text-slate-500 tracking-wider uppercase">
                  {isBangla ? 'সাম্প্রতিক অর্ডার' : 'RECENT ORDERS'}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('OrdersTab')}
                  className="flex-row items-center gap-1"
                >
                  <Text
                    className={`text-xs font-extrabold ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    View All
                  </Text>
                  <Ionicons name="arrow-forward" size={14} color={isDarkMode ? '#CBD5E1' : '#334155'} />
                </TouchableOpacity>
              </View>

              {/* Empty State */}
              <View className="items-center justify-center py-8 gap-2">
                <View
                  className={`w-14 h-14 rounded-2xl items-center justify-center mb-1 ${
                    isDarkMode ? 'bg-slate-800' : 'bg-slate-100'
                  }`}
                >
                  <Ionicons name="receipt-outline" size={28} color={isDarkMode ? '#475569' : '#94A3B8'} />
                </View>
                <Text className={`text-sm font-black ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {isBangla ? 'কোনো অর্ডার নেই' : 'No orders yet'}
                </Text>
                <Text className="text-xs font-medium text-slate-400 text-center">
                  {isBangla ? 'আপনার প্রথম অর্ডার দিন!' : 'Place your first order to see it here.'}
                </Text>
              </View>
            </View>

            {/* ACTIVE BOOKINGS CARD */}
            <View
              className={`p-4 rounded-2xl border shadow-sm ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80'
              }`}
            >
              {/* Empty State */}
              <View className="items-center justify-center py-8 gap-2">
                <View
                  className={`w-14 h-14 rounded-2xl items-center justify-center mb-1 ${
                    isDarkMode ? 'bg-slate-800' : 'bg-slate-100'
                  }`}
                >
                  <Ionicons name="calendar-outline" size={28} color={isDarkMode ? '#475569' : '#94A3B8'} />
                </View>
                <Text className={`text-sm font-black ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {isBangla ? 'কোনো বুকিং নেই' : 'No active bookings'}
                </Text>
                <Text className="text-xs font-medium text-slate-400 text-center">
                  {isBangla ? 'একটি সার্ভিস বুক করুন!' : 'Book a service to see it here.'}
                </Text>
              </View>
            </View>
          </>
        )}

        {/* ----------------- PROFILE SETTINGS VIEW ----------------- */}
        {activeTab === 'settings' && (
          <View
            className={`p-5 rounded-2xl border shadow-sm ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80'
            }`}
          >
            {/* Header Row: Title & Badge */}
            <View className="flex-row items-center justify-between mb-4">
              <Text
                className={`text-lg font-black tracking-tight ${
                  isDarkMode ? 'text-slate-50' : 'text-slate-900'
                }`}
              >
                {isBangla ? 'প্রোফাইল সেটিংস' : 'PROFILE SETTINGS'}
              </Text>
              <View
                className={`flex-row items-center gap-1 px-2.5 py-0.5 rounded-md border ${
                  isDarkMode
                    ? 'bg-emerald-950/60 border-emerald-800'
                    : 'bg-emerald-50 border-emerald-200'
                }`}
              >
                <Ionicons name="checkmark-circle" size={13} color="#10B981" />
                <Text
                  className={`text-[10px] font-black tracking-wider uppercase ${
                    isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                  }`}
                >
                  VERIFIED USER
                </Text>
              </View>
            </View>

            {/* Profile Avatar with Default SVG Icon and Camera Badge */}
            <View className="items-center justify-center mb-6">
              <View className="relative">
                <DefaultUserAvatar
                  uri={user.avatar}
                  size={84}
                  isDarkMode={isDarkMode}
                  borderColor="#F59E0B"
                />
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => {
                    Alert.alert(
                      isBangla ? 'ছবি পরিবর্তন' : 'Change Photo',
                      isBangla
                        ? 'গ্যালারি বা ক্যামেরা থেকে প্রোফাইল ছবি যুক্ত করতে চান?'
                        : 'Upload a custom profile photo from gallery or camera?'
                    );
                  }}
                  className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-amber-500 items-center justify-center border-2 border-white shadow-sm"
                >
                  <Ionicons name="camera" size={13} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              <Text
                className={`text-base font-black mt-2.5 ${
                  isDarkMode ? 'text-slate-50' : 'text-slate-900'
                }`}
              >
                {user.name || (isBangla ? 'নাম নির্ধারণ করা হয়নি' : 'No Name Set')}
              </Text>
              <Text className="text-xs font-semibold text-slate-400">
                {user.email || (isBangla ? 'ইমেইল নেই' : 'No Email')}
              </Text>
            </View>

            {/* Form Fields Container */}
            <View className="gap-4">
              {/* Field 1: Full Name */}
              <View>
                <Text
                  className={`text-xs font-extrabold mb-1.5 ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-800'
                  }`}
                >
                  {isBangla ? 'সম্পূর্ণ নাম' : 'Full Name'}
                </Text>
                <View
                  className={`flex-row items-center px-3.5 h-12 rounded-xl border ${
                    isDarkMode
                      ? 'bg-slate-950 border-slate-800'
                      : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <Ionicons
                    name="person-outline"
                    size={18}
                    color="#94A3B8"
                    style={{ marginRight: 10 }}
                  />
                  <TextInput
                    value={fullName}
                    onChangeText={setFullName}
                    placeholder={isBangla ? 'আপনার পূর্ণ নাম লিখুন' : 'Enter full name'}
                    placeholderTextColor={isDarkMode ? '#64748B' : '#94A3B8'}
                    className={`flex-1 text-sm font-semibold ${
                      isDarkMode ? 'text-slate-100' : 'text-slate-900'
                    }`}
                  />
                </View>
              </View>

              {/* Field 2: Email Address */}
              <View>
                <Text
                  className={`text-xs font-extrabold mb-1.5 ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-800'
                  }`}
                >
                  {isBangla ? 'ইমেইল অ্যাড্রেস' : 'Email Address'}
                </Text>
                <View
                  className={`flex-row items-center px-3.5 h-12 rounded-xl border ${
                    isDarkMode
                      ? 'bg-slate-950 border-slate-800'
                      : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <Ionicons
                    name="mail-outline"
                    size={18}
                    color="#94A3B8"
                    style={{ marginRight: 10 }}
                  />
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    placeholder={isBangla ? 'ইমেইল লিখুন' : 'Enter email'}
                    placeholderTextColor={isDarkMode ? '#64748B' : '#94A3B8'}
                    className={`flex-1 text-sm font-semibold ${
                      isDarkMode ? 'text-slate-100' : 'text-slate-900'
                    }`}
                  />
                </View>
              </View>

              {/* Field 3: Phone Number */}
              <View>
                <Text
                  className={`text-xs font-extrabold mb-1.5 ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-800'
                  }`}
                >
                  {isBangla ? 'ফোন নম্বর' : 'Phone Number'}
                </Text>
                <View
                  className={`flex-row items-center px-3.5 h-12 rounded-xl border ${
                    isDarkMode
                      ? 'bg-slate-950 border-slate-800'
                      : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <Ionicons
                    name="call-outline"
                    size={18}
                    color="#94A3B8"
                    style={{ marginRight: 10 }}
                  />
                  <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    placeholder={isBangla ? 'ফোন নম্বর লিখুন' : 'Enter phone number'}
                    placeholderTextColor={isDarkMode ? '#64748B' : '#94A3B8'}
                    className={`flex-1 text-sm font-semibold ${
                      isDarkMode ? 'text-slate-100' : 'text-slate-900'
                    }`}
                  />
                </View>
              </View>

              {/* Field 4: Date of Birth */}
              <View>
                <Text
                  className={`text-xs font-extrabold mb-1.5 ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-800'
                  }`}
                >
                  {isBangla ? 'জন্ম তারিখ' : 'Date of Birth'}
                </Text>
                <View
                  className={`flex-row items-center px-3.5 h-12 rounded-xl border ${
                    isDarkMode
                      ? 'bg-slate-950 border-slate-800'
                      : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <Ionicons
                    name="document-text-outline"
                    size={18}
                    color="#94A3B8"
                    style={{ marginRight: 10 }}
                  />
                  <TextInput
                    value={dob}
                    onChangeText={setDob}
                    placeholder="MM/DD/YYYY"
                    placeholderTextColor={isDarkMode ? '#64748B' : '#94A3B8'}
                    className={`flex-1 text-sm font-semibold ${
                      isDarkMode ? 'text-slate-100' : 'text-slate-900'
                    }`}
                  />
                  <Ionicons name="calendar-outline" size={18} color="#64748B" />
                </View>
              </View>

              {/* Field 5: Delivery Address */}
              <View>
                <Text
                  className={`text-xs font-extrabold mb-1.5 ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-800'
                  }`}
                >
                  {isBangla ? 'ডেলিভারি ঠিকানা' : 'Delivery Address'}
                </Text>
                <View
                  className={`flex-row items-center px-3.5 h-12 rounded-xl border ${
                    isDarkMode
                      ? 'bg-slate-950 border-slate-800'
                      : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <Ionicons
                    name="location-outline"
                    size={18}
                    color="#94A3B8"
                    style={{ marginRight: 10 }}
                  />
                  <TextInput
                    value={address}
                    onChangeText={setAddress}
                    placeholder={isBangla ? 'আপনার ডেলিভারি ঠিকানা লিখুন' : 'Enter delivery address'}
                    placeholderTextColor={isDarkMode ? '#64748B' : '#94A3B8'}
                    className={`flex-1 text-sm font-semibold ${
                      isDarkMode ? 'text-slate-100' : 'text-slate-900'
                    }`}
                  />
                </View>
              </View>

              {/* Save Profile Button */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleSaveProfile}
                className="w-full py-4 rounded-2xl bg-[#F59E0B] active:bg-amber-600 items-center justify-center shadow-lg shadow-amber-500/20 active:scale-[0.99] mt-2"
              >
                <Text className="text-sm font-black text-slate-900 tracking-wide">
                  {isBangla ? 'প্রোফাইল বিবরণ সংরক্ষণ করুন' : 'Save Profile Details'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* ----------------- SAVED ADDRESSES VIEW (Matching User Screenshot Exactly) ----------------- */}
        {activeTab === 'addresses' && (
          <View
            className={`p-5 rounded-3xl border shadow-sm ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80'
            }`}
          >
            {/* Title & Description Header */}
            <Text
              className={`text-lg font-black tracking-tight uppercase ${
                isDarkMode ? 'text-slate-50' : 'text-slate-900'
              }`}
            >
              {isBangla ? 'সংরক্ষিত ঠিকানা' : 'SAVED ADDRESSES'}
            </Text>
            <Text
              className={`text-xs font-semibold mt-1 mb-5 ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              {isBangla
                ? 'দ্রুত কেনাকাটার জন্য আপনার শিপিং ঠিকানাসমূহ পরিচালনা করুন।'
                : 'Manage your shipping destinations for faster checkout experiences.'}
            </Text>

            {/* Addresses List Container */}
            <View className="gap-3.5">
              {savedAddresses.length === 0 && !isAddingAddress && (
                <View
                  className={`p-6 rounded-2xl border items-center justify-center text-center ${
                    isDarkMode ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <View
                    className={`w-12 h-12 rounded-2xl items-center justify-center mb-2.5 border ${
                      isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <Ionicons name="location-outline" size={24} color="#94A3B8" />
                  </View>
                  <Text className={`text-sm font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    {isBangla ? 'কোনো সংরক্ষিত ঠিকানা নেই' : 'No saved addresses'}
                  </Text>
                  <Text
                    className={`text-xs font-medium text-center mt-1 max-w-[240px] ${
                      isDarkMode ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    {isBangla
                      ? 'নতুন ডেলিভারি ঠিকানা যোগ করতে নিচের বাটনে চাপুন।'
                      : 'Add a delivery address below for quick checkout.'}
                  </Text>
                </View>
              )}
              {savedAddresses.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.85}
                  onPress={() => handleStartEditAddress(item)}
                  className={`p-4 rounded-2xl border flex-row items-center justify-between cursor-pointer transition-all ${
                    isDarkMode
                      ? 'bg-slate-950/70 border-slate-700 hover:border-amber-500/60'
                      : 'bg-white border-slate-900 hover:border-amber-500'
                  }`}
                >
                  {/* Left Icon Box & Details */}
                  <View className="flex-row items-center flex-1 mr-3">
                    <View
                      className={`w-12 h-12 rounded-2xl items-center justify-center border mr-3.5 ${
                        isDarkMode
                          ? 'bg-slate-900 border-slate-800'
                          : 'bg-slate-50 border-slate-100'
                      }`}
                    >
                      <Ionicons
                        name={item.icon}
                        size={22}
                        color={isDarkMode ? '#94A3B8' : '#475569'}
                      />
                    </View>

                    <View className="flex-1">
                      <View className="flex-row items-center gap-2">
                        <Text
                          className={`text-base font-black ${
                            isDarkMode ? 'text-slate-50' : 'text-slate-900'
                          }`}
                        >
                          {item.title}
                        </Text>
                        {item.isDefault && (
                          <View
                            className={`px-2 py-0.5 rounded-full border ${
                              isDarkMode
                                ? 'bg-emerald-950/60 border-emerald-800'
                                : 'bg-emerald-50 border-emerald-200'
                            }`}
                          >
                            <Text
                              className={`text-[9px] font-black uppercase ${
                                isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                              }`}
                            >
                              DEFAULT
                            </Text>
                          </View>
                        )}
                      </View>

                      <Text
                        numberOfLines={2}
                        className={`text-xs font-semibold mt-1 ${
                          isDarkMode ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {item.addressLine}
                      </Text>
                    </View>
                  </View>

                  {/* Right Action Buttons (Edit + Delete) */}
                  <View className="flex-row items-center gap-1">
                    {/* Edit Pencil Button */}
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={(e) => {
                        e.stopPropagation();
                        handleStartEditAddress(item);
                      }}
                      className={`w-9 h-9 items-center justify-center rounded-xl ${
                        isDarkMode ? 'hover:bg-amber-950/60' : 'hover:bg-amber-100/80'
                      }`}
                    >
                      <Ionicons
                        name="create-outline"
                        size={18}
                        color={isDarkMode ? '#FBBF24' : '#D97706'}
                      />
                    </TouchableOpacity>

                    {/* Trash Delete Button */}
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={(e) => {
                        e.stopPropagation();
                        handleDeleteAddress(item.id, item.title);
                      }}
                      className={`w-9 h-9 items-center justify-center rounded-xl ${
                        isDarkMode ? 'hover:bg-red-950/60' : 'hover:bg-red-100/80'
                      }`}
                    >
                      <Ionicons
                        name="trash-outline"
                        size={19}
                        color={isDarkMode ? '#F87171' : '#DC2626'}
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}

              {/* Add New Address Form / Button (Dashed Container matching Screenshot 1) */}
              {!isAddingAddress ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setIsAddingAddress(true)}
                  className={`p-4 rounded-2xl border-2 border-dashed items-center justify-center flex-row gap-2 mt-2 ${
                    isDarkMode
                      ? 'border-slate-800 bg-slate-950/50 active:bg-slate-900'
                      : 'border-slate-200 bg-white active:bg-slate-50'
                  }`}
                >
                  <Ionicons name="add" size={20} color={isDarkMode ? '#FBBF24' : '#0F172A'} />
                  <Text
                    className={`text-sm font-black ${
                      isDarkMode ? 'text-slate-100' : 'text-slate-900'
                    }`}
                  >
                    {isBangla ? '+ নতুন ঠিকানা যুক্ত করুন' : '+ Add New Address'}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View
                  className={`p-5 rounded-3xl border-2 border-dashed mt-2 ${
                    isDarkMode
                      ? 'border-slate-700 bg-slate-950/80'
                      : 'border-slate-200 bg-slate-50/50'
                  }`}
                >
                  {/* Form Title */}
                  <Text
                    className={`text-base font-black mb-4 ${
                      isDarkMode ? 'text-slate-50' : 'text-slate-900'
                    }`}
                  >
                    {isBangla ? 'নতুন ঠিকানা যোগ করুন' : 'Add New Address Details'}
                  </Text>

                  {/* Address Label Field */}
                  <View className="mb-4">
                    <Text
                      className={`text-xs font-extrabold mb-1.5 ${
                        isDarkMode ? 'text-slate-200' : 'text-slate-800'
                      }`}
                    >
                      {isBangla ? 'ঠিকানার লেবেল' : 'Address Label'}
                    </Text>
                    <View className="flex-row items-center gap-2">
                      {['Home', 'Office', 'Other'].map((label) => {
                        const isSelected = newLabel === label;
                        return (
                          <TouchableOpacity
                            key={label}
                            activeOpacity={0.8}
                            onPress={() => setNewLabel(label)}
                            className={`flex-1 py-2.5 px-3 rounded-xl border items-center justify-center flex-row gap-1.5 ${
                              isSelected
                                ? isDarkMode
                                  ? 'bg-amber-950/80 border-amber-600'
                                  : 'bg-white border-slate-900 shadow-sm'
                                : isDarkMode
                                ? 'bg-slate-900 border-slate-800'
                                : 'bg-white border-slate-200'
                            }`}
                          >
                            <Ionicons
                              name={
                                label === 'Home'
                                  ? 'home-outline'
                                  : label === 'Office'
                                  ? 'briefcase-outline'
                                  : 'location-outline'
                              }
                              size={15}
                              color={isSelected ? '#F59E0B' : isDarkMode ? '#94A3B8' : '#64748B'}
                            />
                            <Text
                              className={`text-xs font-black ${
                                isSelected
                                  ? isDarkMode
                                    ? 'text-amber-400'
                                    : 'text-slate-900'
                                  : isDarkMode
                                  ? 'text-slate-400'
                                  : 'text-slate-600'
                              }`}
                            >
                              {label}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>

                  {/* Address Details Input Field */}
                  <View className="mb-5">
                    <Text
                      className={`text-xs font-extrabold mb-1.5 ${
                        isDarkMode ? 'text-slate-200' : 'text-slate-800'
                      }`}
                    >
                      {isBangla ? 'ঠিকানার তথ্য' : 'Address Details'}
                    </Text>
                    <View
                      className={`px-3.5 h-12 rounded-xl border flex-row items-center ${
                        isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                      }`}
                    >
                      <TextInput
                        value={newAddressDetails}
                        onChangeText={setNewAddressDetails}
                        placeholder={
                          isBangla
                            ? 'রাস্তার নম্বর, ফ্ল্যাট, শহর...'
                            : 'Street address, flat number, city...'
                        }
                        placeholderTextColor={isDarkMode ? '#64748B' : '#94A3B8'}
                        className={`flex-1 text-xs font-semibold ${
                          isDarkMode ? 'text-slate-100' : 'text-slate-900'
                        }`}
                      />
                    </View>
                  </View>

                  {/* Form Action Buttons */}
                  <View className="flex-row items-center justify-end gap-3">
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={handleCancelAddressForm}
                      className={`px-4 py-2.5 rounded-xl ${
                        isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-200/60'
                      }`}
                    >
                      <Text
                        className={`text-xs font-extrabold ${
                          isDarkMode ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        {isBangla ? 'বাতিল' : 'Cancel'}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={handleSaveNewAddress}
                      className="px-5 py-2.5 rounded-xl bg-[#F59E0B] active:bg-amber-600 shadow-sm active:scale-95"
                    >
                      <Text className="text-xs font-black text-slate-900 tracking-wide">
                        {isBangla ? 'ঠিকানা সংরক্ষণ করুন' : 'Save Address'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>
        )}

        {/* ----------------- MY REVIEWS VIEW ----------------- */}
        {activeTab === 'reviews' && (
          <View
            className={`p-5 rounded-3xl border shadow-sm ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80'
            }`}
          >
            {/* Title & Description Header */}
            <Text
              className={`text-lg font-black tracking-tight uppercase ${
                isDarkMode ? 'text-slate-50' : 'text-slate-900'
              }`}
            >
              {isBangla ? 'আমার রিভিউসমূহ' : 'MY PAST REVIEWS'}
            </Text>
            <Text
              className={`text-xs font-semibold mt-1 mb-5 ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              {isBangla
                ? 'পণ্য এবং সার্ভিসের জন্য আপনার দেওয়া সমস্ত রিভিউ ও রেটিং দেখুন এবং পরিচালনা করুন।'
                : 'Check and manage all reviews and ratings submitted for items and services.'}
            </Text>

            <View className="gap-3.5">
              {userReviews.length === 0 ? (
                <View
                  className={`p-8 rounded-2xl border items-center justify-center text-center ${
                    isDarkMode ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <View
                    className={`w-14 h-14 rounded-2xl items-center justify-center mb-3 border ${
                      isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-amber-50 border-amber-200'
                    }`}
                  >
                    <Ionicons name="star-outline" size={26} color="#F59E0B" />
                  </View>
                  <Text
                    className={`text-sm font-bold ${
                      isDarkMode ? 'text-slate-200' : 'text-slate-800'
                    }`}
                  >
                    {isBangla ? 'কোনো রিভিউ পাওয়া যায়নি' : 'No reviews yet'}
                  </Text>
                  <Text
                    className={`text-xs font-medium text-center mt-1 leading-relaxed max-w-[260px] ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {isBangla
                      ? 'আপনার কেনা পণ্য বা সার্ভিসের ওপর কোনো রিভিউ দিলে তা এখানে দেখা যাবে।'
                      : 'Reviews and ratings you submit for completed orders or services will appear here.'}
                  </Text>
                </View>
              ) : (
                userReviews.map((review) => (
                  <View
                    key={review.id}
                    className={`p-4 rounded-2xl border ${
                      isDarkMode ? 'bg-slate-950/70 border-slate-700' : 'bg-white border-slate-900'
                    }`}
                  >
                    <View className="flex-row items-center justify-between">
                      <Text
                        className={`text-base font-black ${
                          isDarkMode ? 'text-slate-50' : 'text-slate-900'
                        }`}
                      >
                        {review.itemName}
                      </Text>
                      <Text className="text-xs font-bold text-slate-400">{review.date}</Text>
                    </View>
                    <Text className="text-[10px] font-black tracking-wider text-slate-400 uppercase mt-0.5 mb-2">
                      {review.category}
                    </Text>

                    {/* Stars */}
                    <View className="flex-row items-center gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Ionicons
                          key={s}
                          name={s <= review.rating ? 'star' : 'star-outline'}
                          size={18}
                          color={s <= review.rating ? '#F59E0B' : isDarkMode ? '#475569' : '#CBD5E1'}
                        />
                      ))}
                    </View>

                    {/* Quote Box */}
                    <View
                      className={`p-3.5 rounded-2xl border flex-row items-start gap-2.5 ${
                        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-100'
                      }`}
                    >
                      <Ionicons name="chatbubble-outline" size={16} color="#64748B" style={{ marginTop: 2 }} />
                      <Text
                        className={`flex-1 text-xs font-bold italic leading-relaxed ${
                          isDarkMode ? 'text-slate-300' : 'text-slate-700'
                        }`}
                      >
                        “{review.comment}”
                      </Text>
                    </View>
                  </View>
                ))
              )}
            </View>
          </View>
        )}

        {/* ----------------- NOTIFICATIONS VIEW ----------------- */}
        {activeTab === 'notifications' && (
          <View
            className={`p-5 rounded-3xl border shadow-sm ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80'
            }`}
          >
            {/* Title & Description Header */}
            <Text
              className={`text-lg font-black tracking-tight uppercase ${
                isDarkMode ? 'text-slate-50' : 'text-slate-900'
              }`}
            >
              {isBangla ? 'নোটিফিকেশন' : 'NOTIFICATIONS'}
            </Text>
            <Text
              className={`text-xs font-semibold mt-1 mb-5 ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              {isBangla
                ? 'অর্ডার ট্র্যাকিং, সিস্টেম আপডেট এবং বিশেষ অফার কুপনের জন্য আপডেট থাকুন।'
                : 'Stay updated with order logs, system status alert announcements, and hot promo coupons.'}
            </Text>

            <View className="gap-3.5">
              {notifications.length === 0 ? (
                <View
                  className={`p-8 rounded-2xl border items-center justify-center text-center ${
                    isDarkMode ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <View
                    className={`w-14 h-14 rounded-2xl items-center justify-center mb-3 border ${
                      isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-blue-50 border-blue-200'
                    }`}
                  >
                    <Ionicons name="notifications-outline" size={26} color="#60A5FA" />
                  </View>
                  <Text
                    className={`text-sm font-bold ${
                      isDarkMode ? 'text-slate-200' : 'text-slate-800'
                    }`}
                  >
                    {isBangla ? 'কোনো নোটিফিকেশন নেই' : 'No notifications yet'}
                  </Text>
                  <Text
                    className={`text-xs font-medium text-center mt-1 leading-relaxed max-w-[260px] ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {isBangla
                      ? 'নতুন অফার, অর্ডার আপডেট অথবা অ্যাকাউন্টের নোটিফিকেশন এখানে পাবেন।'
                      : 'You will receive order logs, hot promo alerts, and system updates here.'}
                  </Text>
                </View>
              ) : (
                notifications.map((notif) => (
                  <View
                    key={notif.id}
                    className={`p-4 rounded-2xl border flex-row items-start ${
                      isDarkMode ? 'bg-slate-950/70 border-slate-700' : 'bg-white border-slate-900'
                    }`}
                  >
                    {/* Left Icon Container */}
                    <View
                      className={`w-12 h-16 rounded-2xl border items-center justify-center mr-3.5 ${
                        isDarkMode
                          ? 'bg-amber-950/60 border-amber-800'
                          : 'bg-amber-100/70 border-amber-200'
                      }`}
                    >
                      <Ionicons name={notif.icon || 'notifications-outline'} size={22} color={isDarkMode ? '#FBBF24' : '#D97706'} />
                    </View>

                    {/* Right Details */}
                    <View className="flex-1">
                      <View className="flex-row items-center justify-between mb-1">
                        <Text
                          className={`text-sm font-black flex-1 mr-2 ${
                            isDarkMode ? 'text-slate-50' : 'text-slate-900'
                          }`}
                        >
                          {notif.title}
                        </Text>
                        <Text className="text-xs font-bold text-slate-400">{notif.time}</Text>
                      </View>
                      <Text
                        className={`text-xs font-semibold leading-relaxed ${
                          isDarkMode ? 'text-slate-300' : 'text-slate-600'
                        }`}
                      >
                        {notif.message}
                      </Text>
                    </View>
                  </View>
                ))
              )}
            </View>
          </View>
        )}
        {activeTab === 'delivery' && (
          <>
            {/* MAIN HUB CARD 1 */}
            <View
              className={`p-5 rounded-2xl border shadow-sm ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80'
              }`}
            >
              {/* Header Title & Icon */}
              <View className="flex-row items-center gap-3 mb-2">
                <View
                  className={`w-11 h-11 rounded-2xl items-center justify-center border ${
                    isDarkMode
                      ? 'bg-amber-950/60 border-amber-800'
                      : 'bg-amber-50 border-amber-200'
                  }`}
                >
                  <Ionicons name="bicycle" size={24} color="#F59E0B" />
                </View>
                <Text
                  className={`text-lg font-black tracking-tight ${
                    isDarkMode ? 'text-slate-50' : 'text-slate-900'
                  }`}
                >
                  Delivery Partners & Rider Hub
                </Text>
              </View>

              <Text
                className={`text-xs font-semibold leading-relaxed mb-3.5 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {isBangla
                  ? 'আপনার প্রতিটি অর্ডারের নির্দিষ্ট ডেলিভারি রাইডারের সাথে সরাসরি মাস্কড কল বা লাইভ চ্যাটের মাধ্যমে যোগাযোগ করুন।'
                  : 'Directly contact assigned delivery partners for each of your orders via secure masked phone calls or live chat.'}
              </Text>

              {/* Masked Calls Badge */}
              <View className="flex-row items-center mb-4">
                <View
                  className={`flex-row items-center gap-1.5 px-3 py-1.5 rounded-xl border ${
                    isDarkMode
                      ? 'bg-emerald-950/60 border-emerald-800'
                      : 'bg-emerald-50 border-emerald-200'
                  }`}
                >
                  <Ionicons name="lock-closed-outline" size={14} color="#10B981" />
                  <Text className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    Masked Calls
                  </Text>
                </View>
              </View>

              {/* Divider Line */}
              <View
                className={`h-[1px] w-full mb-4 ${
                  isDarkMode ? 'bg-slate-800' : 'bg-slate-100'
                }`}
              />

              {/* 3 STAT CARDS GRID */}
              <View className="gap-3">
                <View className="flex-row items-center gap-3">
                  {/* Stat 1: Active Deliveries */}
                  <View
                    className={`flex-1 p-3.5 rounded-2xl border flex-row items-center gap-3 ${
                      isDarkMode ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50/70 border-slate-100'
                    }`}
                  >
                    <View
                      className={`w-10 h-10 rounded-xl items-center justify-center border ${
                        isDarkMode ? 'bg-emerald-950/80 border-emerald-800' : 'bg-emerald-100/70 border-emerald-200'
                      }`}
                    >
                      <Ionicons name="time-outline" size={20} color={isDarkMode ? '#34D399' : '#059669'} />
                    </View>
                    <View className="flex-1">
                      <Text className="text-[10px] font-black text-slate-400 tracking-wider uppercase">
                        ACTIVE DELIVERIES
                      </Text>
                      <Text
                        className={`text-lg font-black ${
                          isDarkMode ? 'text-slate-50' : 'text-slate-900'
                        }`}
                      >
                        {activeDeliveriesCount}
                      </Text>
                    </View>
                  </View>

                  {/* Stat 2: Assigned Riders */}
                  <View
                    className={`flex-1 p-3.5 rounded-2xl border flex-row items-center gap-3 ${
                      isDarkMode ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50/70 border-slate-100'
                    }`}
                  >
                    <View
                      className={`w-10 h-10 rounded-xl items-center justify-center border ${
                        isDarkMode ? 'bg-amber-950/80 border-amber-800' : 'bg-amber-100/70 border-amber-200'
                      }`}
                    >
                      <Ionicons name="bicycle-outline" size={20} color={isDarkMode ? '#FBBF24' : '#D97706'} />
                    </View>
                    <View className="flex-1">
                      <Text className="text-[10px] font-black text-slate-400 tracking-wider uppercase">
                        ASSIGNED RIDERS
                      </Text>
                      <Text
                        className={`text-lg font-black ${
                          isDarkMode ? 'text-slate-50' : 'text-slate-900'
                        }`}
                      >
                        {assignedRidersCount}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Stat 3: Privacy Protection Banner */}
                <View
                  className={`p-3.5 rounded-2xl border flex-row items-center gap-3 ${
                    isDarkMode ? 'bg-slate-950/70 border-slate-800' : 'bg-blue-50/40 border-blue-100/60'
                  }`}
                >
                  <View
                    className={`w-10 h-10 rounded-xl items-center justify-center border ${
                      isDarkMode ? 'bg-blue-950/80 border-blue-800' : 'bg-blue-100/70 border-blue-200'
                    }`}
                  >
                    <Ionicons name="shield-checkmark-outline" size={20} color={isDarkMode ? '#60A5FA' : '#2563EB'} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-[10px] font-black text-slate-400 tracking-wider uppercase">
                      PRIVACY PROTECTION
                    </Text>
                    <Text className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                      100% Active
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* FILTER & SEARCH CARD */}
            <View
              className={`p-4 rounded-2xl border shadow-sm ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80'
              }`}
            >
              {/* Filter Pills */}
              <View className="flex-row items-center gap-2 mb-3.5">
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setDeliveryFilter('all')}
                  className={`px-4 py-2 rounded-2xl ${
                    deliveryFilter === 'all'
                      ? 'bg-[#0F172A] shadow-sm'
                      : isDarkMode
                      ? 'bg-slate-800'
                      : 'bg-slate-100'
                  }`}
                >
                  <Text
                    className={`text-xs font-black ${
                      deliveryFilter === 'all'
                        ? 'text-white'
                        : isDarkMode
                        ? 'text-slate-400'
                        : 'text-slate-700'
                    }`}
                  >
                    {isBangla ? 'সব অর্ডার' : 'All Orders'} ({deliveryOrders.length})
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setDeliveryFilter('active')}
                  className={`px-4 py-2 rounded-2xl ${
                    deliveryFilter === 'active'
                      ? 'bg-[#0F172A] shadow-sm'
                      : isDarkMode
                      ? 'bg-slate-800'
                      : 'bg-slate-100'
                  }`}
                >
                  <Text
                    className={`text-xs font-black ${
                      deliveryFilter === 'active'
                        ? 'text-white'
                        : isDarkMode
                        ? 'text-slate-400'
                        : 'text-slate-700'
                    }`}
                  >
                    {isBangla ? 'সক্রিয়' : 'Active'} ({activeDeliveriesCount})
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setDeliveryFilter('completed')}
                  className={`px-4 py-2 rounded-2xl ${
                    deliveryFilter === 'completed'
                      ? 'bg-[#0F172A] shadow-sm'
                      : isDarkMode
                      ? 'bg-slate-800'
                      : 'bg-slate-100'
                  }`}
                >
                  <Text
                    className={`text-xs font-black ${
                      deliveryFilter === 'completed'
                        ? 'text-white'
                        : isDarkMode
                        ? 'text-slate-400'
                        : 'text-slate-700'
                    }`}
                  >
                    {isBangla ? 'সম্পন্ন' : 'Completed'} ({completedDeliveriesCount})
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Search Order or Rider Input */}
              <View
                className={`flex-row items-center px-3.5 h-11 rounded-2xl border ${
                  isDarkMode
                    ? 'bg-slate-950 border-slate-800'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <Ionicons name="search-outline" size={17} color="#94A3B8" style={{ marginRight: 8 }} />
                <TextInput
                  value={searchOrderQuery}
                  onChangeText={setSearchOrderQuery}
                  placeholder={isBangla ? 'অর্ডার বা রাইডার খুঁজুন...' : 'Search order or rider...'}
                  placeholderTextColor={isDarkMode ? '#64748B' : '#94A3B8'}
                  className={`flex-1 text-xs font-semibold py-0 ${
                    isDarkMode ? 'text-slate-100' : 'text-slate-900'
                  }`}
                />
              </View>
            </View>

            {/* RIDER ORDER CARDS LIST */}
            <View className="gap-4">
              {filteredDeliveryOrders.length === 0 ? (
                <View
                  className={`p-8 rounded-3xl border items-center justify-center text-center ${
                    isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/90'
                  }`}
                >
                  <View
                    className={`w-16 h-16 rounded-2xl items-center justify-center mb-3.5 border ${
                      isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-amber-50 border-amber-200'
                    }`}
                  >
                    <Ionicons name="bicycle-outline" size={32} color="#F59E0B" />
                  </View>
                  <Text
                    className={`text-base font-black tracking-tight mb-1 text-center ${
                      isDarkMode ? 'text-slate-100' : 'text-slate-900'
                    }`}
                  >
                    {isBangla ? 'কোনো সক্রিয় ডেলিভারি বা রাইডার নেই' : 'No Active Deliveries or Riders'}
                  </Text>
                  <Text
                    className={`text-xs font-semibold text-center leading-relaxed max-w-[280px] ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {isBangla
                      ? 'আপনার কোনো চলমান অর্ডার থাকলে নির্ধারিত ডেলিভারি রাইডারের তথ্য, ফোন ও চ্যাট অপশন এখানে দেখা যাবে।'
                      : 'When you have active orders, assigned delivery partner details, live tracking, and contact options will appear here.'}
                  </Text>
                </View>
              ) : (
                filteredDeliveryOrders.map((order) => (
                  <View
                    key={order.id}
                    className={`p-4 rounded-3xl border shadow-sm ${
                      isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/90'
                    }`}
                  >
                    {/* Header: Order ID & Track */}
                    <View className="flex-row items-center justify-between mb-2">
                      <View className="flex-row items-center gap-2">
                        <Text
                          className={`text-base font-black ${
                            isDarkMode ? 'text-slate-50' : 'text-slate-900'
                          }`}
                        >
                          {order.id}
                        </Text>
                        <Text className="text-xs font-bold text-slate-400">• {order.date}</Text>
                      </View>
                      <View
                        className={`px-2.5 py-0.5 rounded-full border ${
                          isDarkMode
                            ? 'bg-amber-950/60 border-amber-800'
                            : 'bg-amber-50 border-amber-200'
                        }`}
                      >
                        <Text
                          className={`text-[10px] font-black uppercase ${
                            isDarkMode ? 'text-amber-400' : 'text-amber-600'
                          }`}
                        >
                          {isBangla ? order.statusLabelBn : order.statusLabelEn}
                        </Text>
                      </View>
                    </View>

                    {/* Price & Track Link */}
                    <View className="flex-row items-center justify-between mb-4">
                      <Text
                        className={`text-sm font-extrabold ${
                          isDarkMode ? 'text-slate-300' : 'text-slate-700'
                        }`}
                      >
                        Total:{' '}
                        <Text className="font-black text-slate-900 dark:text-slate-50 text-base">
                          ৳{order.totalAmount}
                        </Text>
                      </Text>

                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('OrderTrackingTab')}
                        className="flex-row items-center gap-1"
                      >
                        <Text className="text-xs font-black text-amber-600 dark:text-amber-400">
                          {isBangla ? 'ট্র্যাক করুন' : 'Track'}
                        </Text>
                        <Ionicons name="arrow-forward" size={13} color="#F59E0B" />
                      </TouchableOpacity>
                    </View>

                    {/* Divider Line */}
                    <View
                      className={`h-[1px] w-full mb-3.5 ${
                        isDarkMode ? 'bg-slate-800' : 'bg-slate-100'
                      }`}
                    />

                    {/* Ordered Items & Delivery Address */}
                    <View className="mb-4 gap-2">
                      <View>
                        <Text className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase mb-0.5">
                          {isBangla ? 'অর্ডারকৃত আইটেম:' : 'ORDERED ITEMS:'}
                        </Text>
                        <Text
                          className={`text-xs font-bold ${
                            isDarkMode ? 'text-slate-200' : 'text-slate-800'
                          }`}
                        >
                          {order.itemsSummary}
                        </Text>
                      </View>

                      <View>
                        <Text className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase mb-0.5">
                          {isBangla ? 'ডেলিভারি ঠিকানা:' : 'DELIVERY ADDRESS:'}
                        </Text>
                        <Text
                          numberOfLines={2}
                          className={`text-xs font-semibold ${
                            isDarkMode ? 'text-slate-300' : 'text-slate-600'
                          }`}
                        >
                          {order.deliveryAddress || user.address || (isBangla ? 'ঠিকানা নির্ধারণ করা হয়নি' : 'No address set')}
                        </Text>
                      </View>
                    </View>

                    {/* RIDER INFO INNER CARD BOX */}
                    {order.rider && (
                      <View
                        className={`p-3.5 rounded-2xl border mb-3 ${
                          isDarkMode
                            ? 'bg-slate-950/70 border-slate-800'
                            : 'bg-slate-50/80 border-slate-100'
                        }`}
                      >
                        <View className="flex-row items-center mb-3">
                          <View className="relative mr-3">
                            <Image
                              source={{
                                uri: order.rider.photoUrl,
                              }}
                              className="w-12 h-12 rounded-2xl bg-slate-200 border-2 border-emerald-500"
                              style={{ width: 48, height: 48, borderRadius: 16 }}
                            />
                            <View className="w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white absolute bottom-0 right-0" />
                          </View>

                          <View className="flex-1">
                            <View className="flex-row items-center gap-2">
                              <Text
                                className={`text-sm font-black ${
                                  isDarkMode ? 'text-slate-50' : 'text-slate-900'
                                }`}
                              >
                                {order.rider.name}
                              </Text>
                              <View className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30">
                                <Text className="text-[10px] font-black text-amber-600 dark:text-amber-400">
                                  ★ {order.rider.rating}
                                </Text>
                              </View>
                            </View>

                            <View className="flex-row items-center gap-1.5 mt-1">
                              <Ionicons name="bicycle-outline" size={13} color={isDarkMode ? '#94A3B8' : '#64748B'} />
                              <Text
                                numberOfLines={1}
                                className={`text-[11px] font-semibold ${
                                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                                }`}
                              >
                                {order.rider.vehicleInfo} • {order.rider.deliveryCount}
                              </Text>
                            </View>

                            <View className="flex-row items-center gap-1 mt-1">
                              <Ionicons name="lock-closed-outline" size={12} color="#10B981" />
                              <Text className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                                {isBangla ? 'নিরাপত্তার জন্য নম্বর মাস্কড' : 'Number Masked For Privacy'}
                              </Text>
                            </View>
                          </View>
                        </View>

                        {/* 2 Action Buttons Grid */}
                        <View className="flex-row items-center gap-2.5">
                          <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={() => handleCallRider(order.rider?.phone)}
                            className="flex-1 py-3 rounded-xl bg-[#10B981] active:bg-emerald-600 flex-row items-center justify-center gap-1.5 shadow-sm shadow-emerald-500/20"
                          >
                            <Ionicons name="call" size={16} color="#FFFFFF" />
                            <Text className="text-xs font-black text-white">
                              {isBangla ? 'কল রাইডার' : 'Call Rider'}
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={() => handleOpenChat(order.id, order.rider?.name || 'Rider')}
                            className="flex-1 py-3 rounded-xl bg-[#F59E0B] active:bg-amber-600 flex-row items-center justify-center gap-1.5 shadow-sm shadow-amber-500/20"
                          >
                            <Ionicons name="chatbox-ellipses" size={16} color="#FFFFFF" />
                            <Text className="text-xs font-black text-white">
                              {isBangla ? 'মেসেজ' : 'Message'}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}

                    {/* Instant Message Chips */}
                    {order.rider && (
                      <View className="flex-row items-center gap-2 flex-wrap pt-1">
                        <Text className="text-[11px] font-extrabold text-slate-400 mr-1">
                          {isBangla ? 'দ্রুত বার্তা:' : 'Instant Message:'}
                        </Text>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => handleOpenChat(order.id, order.rider?.name || 'Rider')}
                          className={`px-3 py-1.5 rounded-full border flex-row items-center gap-1.5 ${
                            isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                          }`}
                        >
                          <Ionicons name="location-outline" size={13} color={isDarkMode ? '#FBBF24' : '#D97706'} />
                          <Text
                            className={`text-xs font-bold ${
                              isDarkMode ? 'text-slate-300' : 'text-slate-700'
                            }`}
                          >
                            {isBangla ? 'আপনি কোন রোডে আছেন?' : 'Which road are you on?'}
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => handleOpenChat(order.id, order.rider?.name || 'Rider')}
                          className={`px-3 py-1.5 rounded-full border flex-row items-center gap-1.5 ${
                            isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                          }`}
                        >
                          <Ionicons name="call-outline" size={13} color={isDarkMode ? '#34D399' : '#059669'} />
                          <Text
                            className={`text-xs font-bold ${
                              isDarkMode ? 'text-slate-300' : 'text-slate-700'
                            }`}
                          >
                            {isBangla ? 'গেটে এসে কল দিন' : 'Please call at gate'}
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => handleOpenChat(order.id, order.rider?.name || 'Rider')}
                          className={`px-3 py-1.5 rounded-full border flex-row items-center gap-1.5 ${
                            isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                          }`}
                        >
                          <Ionicons name="thumbs-up-outline" size={13} color={isDarkMode ? '#818CF8' : '#4F46E5'} />
                          <Text
                            className={`text-xs font-bold ${
                              isDarkMode ? 'text-slate-300' : 'text-slate-700'
                            }`}
                          >
                            {isBangla ? 'আমি অপেক্ষা করছি' : 'I am waiting'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                ))
              )}
            </View>
          </>
        )}
      </ScrollView>

      {/* RIDER LIVE CHAT MODAL */}
      <RiderChatModal
        visible={isChatModalVisible}
        onClose={() => setIsChatModalVisible(false)}
        orderId={chatOrderId}
        riderName={chatRiderName}
      />
    </View>
  );
};
