import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Alert,
  Modal,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useCategory } from '../../context/CategoryContext';
import { Header } from '../../components/common/Header/Header';
import { EmptyBagCard } from '../../components/common/EmptyBagCard';
import { cartStore, CartItem } from '../../store/cartStore';
import { AppText as Text } from '../../components/common/AppText';

export const CheckoutScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { isDarkMode } = useTheme();
  const { t, isBangla } = useLanguage();
  const { activeCategory, activeCategoryColor } = useCategory();

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(cartStore.getItems());
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [promoCode, setPromoCode] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(null);
  const [showCoupons, setShowCoupons] = useState<boolean>(false);

  // Form State
  const [fullName, setFullName] = useState<string>('');
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [addressOption, setAddressOption] = useState<'saved' | 'location' | 'custom'>('location');
  const [savedAddress, setSavedAddress] = useState<string>('');
  const [customAddress, setCustomAddress] = useState<string>('');
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [detectedAddress, setDetectedAddress] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad' | 'card'>('bkash');
  const [orderNotes, setOrderNotes] = useState<string>('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleUseCurrentLocation = () => {
    setAddressOption('location');
    setIsLocating(true);
    setDetectedAddress('');

    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await res.json();
            if (data && data.display_name) {
              setDetectedAddress(data.display_name);
              setValidationError(null);
            } else {
              setDetectedAddress(`GPS: Lat ${latitude.toFixed(5)}, Lon ${longitude.toFixed(5)}`);
              setValidationError(null);
            }
          } catch (e) {
            setDetectedAddress(`GPS: Lat ${latitude.toFixed(5)}, Lon ${longitude.toFixed(5)}`);
            setValidationError(null);
          } finally {
            setIsLocating(false);
          }
        },
        (error) => {
          console.log('Location error:', error);
          setIsLocating(false);
          Alert.alert(
            isBangla ? 'অ্যাড্রেস সনাক্ত করা যায়নি' : 'GPS Permission Required',
            isBangla
              ? 'আপনার ডিভাইস/ব্রাউজারে লোকেশন পারমিশন চালু করুন।'
              : 'Please allow GPS location permission in your device/browser settings.'
          );
        },
        { enableHighAccuracy: true, timeout: 12000 }
      );
    } else {
      setIsLocating(false);
      Alert.alert(
        isBangla ? 'জিপিএস সাপোর্ট করছে না' : 'GPS Not Supported',
        isBangla
          ? 'আপনার ব্রাউজারে লোকেশন সুবিধা নেই।'
          : 'Geolocation is not supported on this browser.'
      );
    }
  };

  useEffect(() => {
    let items = cartStore.getItems();
    const validItems = items.map((item) => ({
      ...item,
      image:
        item.image && item.image.trim() !== '' && !item.image.includes('83865001e8ac')
          ? item.image
          : (item as any).imageUrl ||
            'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=500&q=80',
    }));

    setCartItems(validItems);
    setSelectedItemIds(validItems.map((i) => i.id));

    return cartStore.subscribe(() => {
      const currentItems = cartStore.getItems().map((item) => ({
        ...item,
        image:
          item.image && item.image.trim() !== '' && !item.image.includes('83865001e8ac')
            ? item.image
            : (item as any).imageUrl ||
              'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=500&q=80',
      }));
      setCartItems(currentItems);
      setSelectedItemIds((prev) => prev.filter((id) => currentItems.some((i) => i.id === id)));
    });
  }, []);

  const selectedItems = cartItems.filter((i) => selectedItemIds.includes(i.id));
  const subtotal = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryCharge = subtotal > 0 ? 45 : 0;
  const grandTotal = Math.max(0, subtotal + deliveryCharge - appliedDiscount);

  const categoryTitle = useMemo(() => {
    switch (activeCategory) {
      case 'grocery':
        return isBangla ? 'গ্রোসারী' : 'Grocery';
      case 'food':
        return isBangla ? 'ফুড ডেলিভারি' : 'Food Delivery';
      case 'pharmacy':
        return isBangla ? 'ফার্মেসি' : 'Pharmacy';
      case 'services':
        return isBangla ? 'সার্ভিসেস' : 'Services';
      case 'ecommerce':
      default:
        return isBangla ? 'ই-কমার্স' : 'E-Commerce';
    }
  }, [activeCategory, isBangla]);

  const handleApplyPromo = (codeToApply?: string) => {
    const code = (codeToApply || promoCode).trim().toUpperCase();
    if (!code) {
      Alert.alert(
        isBangla ? 'কুপন কোড লিখুন' : 'Enter Coupon Code',
        isBangla ? 'অনুগ্রহ করে একটি কুপন কোড প্রবেশ করান।' : 'Please enter a coupon code.'
      );
      return;
    }
    if (code === 'JADUFIRST' || code === 'JADU200') {
      const discount = Math.round(subtotal * 0.2);
      setAppliedDiscount(discount);
      setPromoCode(code);
      setAppliedCouponCode(code);
      Alert.alert(
        isBangla ? 'প্রোমো প্রয়োগ সফল!' : 'Promo Applied!',
        isBangla ? `২০% ছাড় (৳${discount}) আপনার বিলে যুক্ত করা হয়েছে।` : `20% discount (৳${discount}) applied to your order.`
      );
    } else {
      Alert.alert(
        isBangla ? 'অকার্যকর কোড' : 'Invalid Code',
        isBangla ? 'কোডটি সঠিক নয়। ২০% ছাড়ের জন্য "JADUFIRST" ব্যবহার করুন।' : 'Code not valid. Try using "JADUFIRST" for 20% off.'
      );
    }
  };

  const handleRemovePromo = () => {
    setAppliedDiscount(0);
    setPromoCode('');
    setAppliedCouponCode(null);
    Alert.alert(
      isBangla ? 'কুপন বাতিল করা হয়েছে' : 'Coupon Removed',
      isBangla ? 'কুপন কোড সফলভাবে সরিয়ে ফেলা হয়েছে।' : 'Coupon discount has been removed from your bill.'
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedItemIds.length === cartItems.length) {
      setSelectedItemIds([]);
    } else {
      setSelectedItemIds(cartItems.map((i) => i.id));
    }
  };

  const handleToggleItemSelect = (id: string) => {
    if (selectedItemIds.includes(id)) {
      setSelectedItemIds(selectedItemIds.filter((i) => i !== id));
    } else {
      setSelectedItemIds([...selectedItemIds, id]);
    }
  };

  const handlePlaceOrder = () => {
    setValidationError(null);

    // 1. Full Name Validation
    if (!fullName.trim()) {
      const msg = isBangla
        ? 'আপনার পুরো নাম (Full Name) প্রদান করা বাধ্যতামূলক।'
        : 'Full Name is required! Please enter your full name.';
      setValidationError(msg);
      Alert.alert(isBangla ? 'আবশ্যিক তথ্য বাকি' : 'Required Field Missing', msg);
      return;
    }

    // 2. Delivery Address Validation
    let isAddressValid = false;
    let addressMsg = '';

    if (addressOption === 'saved') {
      if (savedAddress && savedAddress.trim()) {
        isAddressValid = true;
      } else {
        addressMsg = isBangla
          ? 'সংরক্ষিত কোনো ঠিকানা নেই! জিপিএস দিয়ে অটো ডিটেক্ট করুন অথবা কাস্টম ঠিকানা প্রদান করুন।'
          : 'No saved address available! Auto-detect via GPS or enter custom address.';
      }
    } else if (addressOption === 'location') {
      if (detectedAddress && detectedAddress.trim()) {
        isAddressValid = true;
      } else {
        addressMsg = isBangla
          ? 'জিপিএস ঠিকানা সনাক্ত করা হয়নি! "Use Current Location" বাটনে ক্লিক করে ঠিকানা সনাক্ত করুন।'
          : 'GPS location not detected! Please click "Use Current Location" button.';
      }
    } else if (addressOption === 'custom') {
      if (customAddress && customAddress.trim()) {
        isAddressValid = true;
      } else {
        addressMsg = isBangla
          ? 'কাস্টম ঠিকানার ঘরটিতে আপনার পুরো ডেলিভারি ঠিকানা লিখুন।'
          : 'Please type your house, road and area in custom address.';
      }
    }

    if (!isAddressValid) {
      setValidationError(addressMsg);
      Alert.alert(isBangla ? 'ঠিকানা আবশ্যিক' : 'Delivery Address Required', addressMsg);
      return;
    }

    // 3. Items Selection Validation
    if (selectedItemIds.length === 0) {
      const msg = isBangla
        ? 'অর্ডার প্রসেস করতে অন্তত ১টি পণ্য সিলেক্ট করুন।'
        : 'Please select at least 1 item for checkout.';
      setValidationError(msg);
      Alert.alert(isBangla ? 'পণ্য সিলেক্ট করুন' : 'No Items Selected', msg);
      return;
    }

    const newOrderId = `JB-${Math.floor(100000 + Math.random() * 900000)}`;
    const finalAmount = grandTotal;
    cartStore.clearCart();

    try {
      navigation.navigate('OrderSuccessTab', {
        orderId: newOrderId,
        totalAmount: finalAmount,
        estimatedDelivery: isBangla ? '৪৫ মিনিট' : '45 Minutes',
      });
    } catch (e) {
      console.log('Navigation error:', e);
      setIsSuccessModalOpen(true);
    }
  };

  const handleOrderSuccessFinish = () => {
    setIsSuccessModalOpen(false);
    cartStore.clearCart();
    try {
      navigation.navigate('OrderSuccessTab', {
        orderId: `JB-${Math.floor(100000 + Math.random() * 900000)}`,
        totalAmount: grandTotal || 195,
        estimatedDelivery: isBangla ? '৪৫ মিনিট' : '45 Minutes',
      });
    } catch (e) {
      console.log('Navigation error:', e);
    }
  };

  return (
    <View className={`flex-1 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <Header />

      {/* STICKY FLOATING VALIDATION NOTIFICATION BANNER */}
      {validationError && (
        <View
          style={{ zIndex: 9999, elevation: 20 }}
          className={`mx-4 mt-3 p-3.5 rounded-2xl border-2 shadow-xl flex-row items-center justify-between ${
            isDarkMode
              ? 'bg-red-950 border-red-700'
              : 'bg-red-50 border-red-400'
          }`}
        >
          <View className="flex-row items-center flex-1 mr-2">
            <Ionicons name="alert-circle" size={22} color="#EF4444" className="mr-2.5" />
            <Text
              className={`text-xs sm:text-sm font-black leading-snug flex-1 ${
                isDarkMode ? 'text-red-200' : 'text-red-900'
              }`}
            >
              {validationError}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setValidationError(null)}
            className={`w-7 h-7 rounded-full items-center justify-center ml-2 ${
              isDarkMode ? 'bg-red-900/60' : 'bg-red-200/60'
            }`}
          >
            <Ionicons name="close" size={18} color="#EF4444" />
          </TouchableOpacity>
        </View>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
        className="px-4 pt-4"
      >

        {/* Top Title Section */}
        <View className="mb-4">
          <View className="flex-row items-center gap-2.5 mb-1.5">
            <View
              style={{ backgroundColor: activeCategoryColor + '18' }}
              className="w-10 h-10 rounded-2xl items-center justify-center"
            >
              <Ionicons name="bag-handle" size={22} color={activeCategoryColor} />
            </View>
            <Text
              className={`text-xl sm:text-2xl font-black tracking-tight ${
                isDarkMode ? 'text-slate-50' : 'text-slate-900'
              }`}
            >
              Store & {categoryTitle} Checkout
            </Text>
          </View>
          <Text
            className={`text-xs sm:text-sm font-medium mb-3 ${
              isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Review items, configure delivery parameters, and choose payment.
          </Text>

          {/* Filter Pill */}
          <View className="flex-row items-center">
            <View
              style={{
                backgroundColor: activeCategoryColor + '18',
                borderColor: activeCategoryColor + '40',
              }}
              className="px-3.5 py-1.5 rounded-full border flex-row items-center gap-1.5"
            >
              <Ionicons name="cube" size={14} color={activeCategoryColor} />
              <Text
                style={{ color: activeCategoryColor }}
                className="text-xs font-black"
              >
                All Products ({selectedItemIds.length})
              </Text>
            </View>
          </View>
        </View>

        {cartItems.length === 0 ? (
          <EmptyBagCard />
        ) : (
          <>
            {/* SECTION 1: Contact Information */}
        <View
          className={`p-4 rounded-3xl border mb-4 shadow-sm ${
            isDarkMode
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-100 shadow-slate-200/50'
          }`}
        >
          <View className="flex-row items-center gap-2 mb-3.5">
            <View
              style={{ backgroundColor: activeCategoryColor }}
              className="w-6 h-6 rounded-full items-center justify-center"
            >
              <Text className="text-white text-xs font-black">1</Text>
            </View>
            <Ionicons name="person-outline" size={18} color={activeCategoryColor} />
            <Text
              className={`text-base font-extrabold ${
                isDarkMode ? 'text-slate-50' : 'text-slate-900'
              }`}
            >
              Contact Information
            </Text>
          </View>

          <View className="gap-1 mb-3">
            <Text className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              FULL NAME <Text className="text-red-500">*</Text>
            </Text>
            <View
              className={`flex-row items-center px-3 h-11 rounded-xl border ${
                validationError && !fullName.trim()
                  ? 'border-red-500 bg-red-50/20'
                  : isDarkMode
                  ? 'bg-slate-950 border-slate-800'
                  : 'bg-white border-slate-200'
              }`}
            >
              <Ionicons name="person-outline" size={16} color={validationError && !fullName.trim() ? '#EF4444' : '#94A3B8'} className="mr-2" />
              <TextInput
                value={fullName}
                onChangeText={(val) => {
                  setFullName(val);
                  if (val.trim()) setValidationError(null);
                }}
                placeholder="Enter your full name"
                placeholderTextColor={isDarkMode ? '#64748B' : '#94A3B8'}
                className={`flex-1 text-xs sm:text-sm font-semibold ${
                  isDarkMode ? 'text-slate-100' : 'text-slate-900'
                }`}
              />
            </View>
          </View>

          <View className="gap-1">
            <Text className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              EMAIL ADDRESS (OPTIONAL)
            </Text>
            <View
              className={`flex-row items-center px-3 h-11 rounded-xl border ${
                isDarkMode
                  ? 'bg-slate-950 border-slate-800'
                  : 'bg-white border-slate-200'
              }`}
            >
              <Ionicons name="mail-outline" size={16} color="#94A3B8" className="mr-2" />
              <TextInput
                value={emailAddress}
                onChangeText={setEmailAddress}
                placeholder="example@email.com"
                keyboardType="email-address"
                placeholderTextColor={isDarkMode ? '#64748B' : '#94A3B8'}
                className={`flex-1 text-xs sm:text-sm font-semibold ${
                  isDarkMode ? 'text-slate-100' : 'text-slate-900'
                }`}
              />
            </View>
          </View>
        </View>

        {/* SECTION 2: 1. Delivery Address */}
        <View
          className={`p-4 rounded-3xl border mb-4 shadow-sm ${
            isDarkMode
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-100 shadow-slate-200/50'
          }`}
        >
          <View className="flex-row items-center gap-2 mb-3.5">
            <View
              style={{ backgroundColor: activeCategoryColor }}
              className="w-6 h-6 rounded-full items-center justify-center"
            >
              <Text className="text-white text-xs font-black">2</Text>
            </View>
            <Ionicons name="location-outline" size={18} color={activeCategoryColor} />
            <Text
              className={`text-base font-extrabold ${
                isDarkMode ? 'text-slate-50' : 'text-slate-900'
              }`}
            >
              1. Delivery Address <Text className="text-red-500">*</Text>
            </Text>
          </View>

          <View className="gap-2.5">
            {/* Option 1: Saved Address */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setAddressOption('saved')}
              style={
                addressOption === 'saved'
                  ? {
                      borderColor: activeCategoryColor,
                      backgroundColor: activeCategoryColor + '10',
                    }
                  : undefined
              }
              className={`p-3 rounded-2xl border ${
                addressOption === 'saved'
                  ? ''
                  : isDarkMode
                  ? 'bg-slate-950 border-slate-800'
                  : 'bg-white border-slate-200'
              }`}
            >
              <View className="flex-row items-center">
                <Ionicons
                  name={addressOption === 'saved' ? 'radio-button-on' : 'radio-button-off'}
                  size={18}
                  color={addressOption === 'saved' ? activeCategoryColor : '#94A3B8'}
                  className="mr-2.5"
                />
                <Text
                  className={`text-sm font-extrabold ${
                    isDarkMode ? 'text-slate-100' : 'text-slate-900'
                  }`}
                >
                  Saved Address
                </Text>
              </View>
              <Text
                className={`text-xs font-medium mt-1 pl-7 leading-relaxed ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                {savedAddress
                  ? savedAddress
                  : isBangla
                  ? 'সংরক্ষিত কোনো ঠিকানা নেই। জিপিএস দিয়ে অটো সেট করুন অথবা নতুন ঠিকানা লিখুন।'
                  : 'No saved address available. Use Current Location or enter custom address.'}
              </Text>
            </TouchableOpacity>

            {/* Option 2: Use Current Location */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleUseCurrentLocation}
              style={
                addressOption === 'location'
                  ? {
                      borderColor: activeCategoryColor,
                      backgroundColor: activeCategoryColor + '10',
                    }
                  : undefined
              }
              className={`p-3 rounded-2xl border ${
                addressOption === 'location'
                  ? ''
                  : isDarkMode
                  ? 'bg-slate-950 border-slate-800'
                  : 'bg-white border-slate-200'
              }`}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center flex-1">
                  <Ionicons
                    name={addressOption === 'location' ? 'radio-button-on' : 'radio-button-off'}
                    size={18}
                    color={addressOption === 'location' ? activeCategoryColor : '#94A3B8'}
                    className="mr-2.5"
                  />
                  <Ionicons name="navigate" size={16} color={activeCategoryColor} className="mr-1.5" />
                  <Text
                    className={`text-sm font-extrabold ${
                      isDarkMode ? 'text-slate-100' : 'text-slate-900'
                    }`}
                  >
                    Use Current Location
                  </Text>
                </View>

                {isLocating && (
                  <View
                    style={{ backgroundColor: activeCategoryColor + '20' }}
                    className="flex-row items-center gap-1.5 px-2.5 py-1 rounded-full"
                  >
                    <ActivityIndicator size="small" color={activeCategoryColor} />
                    <Text
                      style={{ color: activeCategoryColor }}
                      className="text-[10px] font-black"
                    >
                      Detecting...
                    </Text>
                  </View>
                )}
              </View>

              {isLocating ? (
                <Text
                  className={`text-xs font-medium mt-1 pl-7 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  {isBangla ? 'GPS অবস্থান পাওয়া যাচ্ছে...' : 'Fetching live GPS location...'}
                </Text>
              ) : detectedAddress && addressOption === 'location' ? (
                <View className="mt-1.5 pl-7">
                  <View className="flex-row items-center gap-1 mb-1">
                    <Ionicons name="checkmark-circle" size={14} color={activeCategoryColor} />
                    <Text
                      style={{ color: activeCategoryColor }}
                      className="text-[11px] font-black uppercase tracking-wider"
                    >
                      {isBangla ? 'লাইভ জিপিএস লোকেশন সেট হয়েছে' : 'LIVE GPS LOCATION DETECTED'}
                    </Text>
                  </View>
                  <Text
                    className={`text-xs font-semibold leading-relaxed ${
                      isDarkMode ? 'text-slate-200' : 'text-slate-800'
                    }`}
                  >
                    {detectedAddress}
                  </Text>
                </View>
              ) : (
                <Text
                  className={`text-xs font-medium mt-1 pl-7 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  Click to auto-detect via GPS
                </Text>
              )}
            </TouchableOpacity>

            {/* Option 3: Enter Custom Address */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setAddressOption('custom')}
              style={
                addressOption === 'custom'
                  ? {
                      borderColor: activeCategoryColor,
                      backgroundColor: activeCategoryColor + '10',
                    }
                  : undefined
              }
              className={`p-3 rounded-2xl border ${
                addressOption === 'custom'
                  ? ''
                  : isDarkMode
                  ? 'bg-slate-950 border-slate-800'
                  : 'bg-white border-slate-200'
              }`}
            >
              <View className="flex-row items-center">
                <Ionicons
                  name={addressOption === 'custom' ? 'radio-button-on' : 'radio-button-off'}
                  size={18}
                  color={addressOption === 'custom' ? activeCategoryColor : '#94A3B8'}
                  className="mr-2.5"
                />
                <Text
                  className={`text-sm font-extrabold ${
                    isDarkMode ? 'text-slate-100' : 'text-slate-900'
                  }`}
                >
                  Enter Custom Address
                </Text>
              </View>
              <Text
                className={`text-xs font-medium mt-1 pl-7 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                Manually type your delivery address
              </Text>

              {addressOption === 'custom' && (
                <TextInput
                  value={customAddress}
                  onChangeText={setCustomAddress}
                  placeholder="Type house, road, area..."
                  placeholderTextColor={isDarkMode ? '#64748B' : '#94A3B8'}
                  multiline
                  numberOfLines={2}
                  className={`mt-2.5 ml-7 p-2.5 rounded-xl border text-xs font-medium ${
                    isDarkMode
                      ? 'bg-slate-950 border-slate-800 text-slate-100'
                      : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* SECTION 3: 3. Payment Method */}
        <View
          className={`p-4 rounded-3xl border mb-4 shadow-sm ${
            isDarkMode
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-100 shadow-slate-200/50'
          }`}
        >
          <View className="flex-row items-center gap-2 mb-3.5">
            <View
              style={{ backgroundColor: activeCategoryColor }}
              className="w-6 h-6 rounded-full items-center justify-center"
            >
              <Text className="text-white text-xs font-black">3</Text>
            </View>
            <Ionicons name="card-outline" size={18} color={activeCategoryColor} />
            <Text
              className={`text-base font-extrabold ${
                isDarkMode ? 'text-slate-50' : 'text-slate-900'
              }`}
            >
              3. Payment Method
            </Text>
          </View>

          <View className="gap-2.5">
            {[
              { id: 'cod', title: 'Cash on Delivery', sub: 'Pay with physical cash' },
              { id: 'bkash', title: 'bKash Wallet', sub: 'Pay instantly via mobile wallet' },
              { id: 'nagad', title: 'Nagad Wallet', sub: 'Pay instantly via mobile wallet' },
              { id: 'card', title: 'Credit / Debit Card', sub: 'Visa, Mastercard, AMEX' },
            ].map((pm) => {
              const isSelected = paymentMethod === pm.id;
              return (
                <TouchableOpacity
                  key={pm.id}
                  activeOpacity={0.8}
                  onPress={() => setPaymentMethod(pm.id as any)}
                  style={
                    isSelected
                      ? {
                          borderColor: activeCategoryColor,
                          backgroundColor: activeCategoryColor + '10',
                        }
                      : undefined
                  }
                  className={`p-3 rounded-2xl border ${
                    isSelected
                      ? ''
                      : isDarkMode
                      ? 'bg-slate-950 border-slate-800'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <View className="flex-row items-center">
                    <Ionicons
                      name={isSelected ? 'radio-button-on' : 'radio-button-off'}
                      size={18}
                      color={isSelected ? activeCategoryColor : '#94A3B8'}
                      className="mr-2.5"
                    />
                    <Text
                      className={`text-sm font-extrabold ${
                        isDarkMode ? 'text-slate-100' : 'text-slate-900'
                      }`}
                    >
                      {pm.title}
                    </Text>
                  </View>
                  <Text
                    className={`text-xs font-medium mt-1 pl-7 ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {pm.sub}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* SECTION 4: Order Notes (Optional) */}
        <View
          className={`p-4 rounded-3xl border mb-4 shadow-sm ${
            isDarkMode
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-100 shadow-slate-200/50'
          }`}
        >
          <View className="flex-row items-center mb-3">
            <Ionicons name="document-text-outline" size={18} color="#64748B" className="mr-1.5" />
            <Text
              className={`text-base font-extrabold ${
                isDarkMode ? 'text-slate-50' : 'text-slate-900'
              }`}
            >
              Order Notes <Text className="text-slate-400 font-medium">(Optional)</Text>
            </Text>
          </View>

          <TextInput
            value={orderNotes}
            onChangeText={setOrderNotes}
            placeholder="Special instructions, requests, or any notes for your order..."
            placeholderTextColor={isDarkMode ? '#64748B' : '#94A3B8'}
            multiline
            numberOfLines={3}
            className={`p-3 rounded-2xl border text-xs sm:text-sm font-medium ${
              isDarkMode
                ? 'bg-slate-950 border-slate-800 text-slate-100'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          />
        </View>

        {/* SECTION 5: ORDER SUMMARY CARD */}
        <View
          className={`p-4 rounded-3xl border mb-4 shadow-sm ${
            isDarkMode
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-100 shadow-slate-200/50'
          }`}
        >
          {/* Header Row: Title & Select All */}
          <View
            className={`flex-row items-center justify-between pb-3 border-b ${
              isDarkMode ? 'border-slate-800' : 'border-slate-100'
            }`}
          >
            <View className="flex-row items-center gap-1.5">
              <Ionicons name="bag-check-outline" size={18} color="#64748B" />
              <Text className="text-xs font-black uppercase tracking-wider text-slate-400">
                ORDER SUMMARY
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleToggleSelectAll}
              className="flex-row items-center gap-1"
            >
              <Ionicons
                name={selectedItemIds.length === cartItems.length ? 'checkmark-circle' : 'ellipse-outline'}
                size={18}
                color={selectedItemIds.length === cartItems.length ? activeCategoryColor : '#94A3B8'}
              />
              <Text
                className={`text-xs font-extrabold ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                Select All ({selectedItemIds.length}/{cartItems.length})
              </Text>
            </TouchableOpacity>
          </View>

          {/* Cart Item Row List */}
          <View className="gap-2.5 my-3">
            {cartItems.map((item) => {
              const isSelected = selectedItemIds.includes(item.id);
              return (
                <View
                  key={item.id}
                  style={
                    isSelected
                      ? {
                          borderColor: activeCategoryColor,
                          backgroundColor: activeCategoryColor + '10',
                        }
                      : undefined
                  }
                  className={`flex-row items-center p-2.5 rounded-2xl border ${
                    isSelected
                      ? ''
                      : isDarkMode
                      ? 'bg-slate-950 border-slate-800'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <TouchableOpacity
                    onPress={() => handleToggleItemSelect(item.id)}
                    className="mr-2"
                  >
                    <Ionicons
                      name={isSelected ? 'checkmark-circle' : 'ellipse-outline'}
                      size={20}
                      color={isSelected ? activeCategoryColor : '#CBD5E1'}
                    />
                  </TouchableOpacity>

                  <View className={`w-12 h-12 rounded-xl overflow-hidden items-center justify-center border ${
                    isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
                  }`}>
                    <Image
                      source={{
                        uri:
                          item.image ||
                          (item as any).imageUrl ||
                          'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=500&q=80',
                      }}
                      style={{ width: 48, height: 48 }}
                      resizeMode="cover"
                    />
                  </View>

                  <View className="flex-1 px-2.5">
                    <Text
                      numberOfLines={1}
                      className={`text-xs sm:text-sm font-extrabold ${
                        isDarkMode ? 'text-slate-100' : 'text-slate-900'
                      }`}
                    >
                      {item.name}
                    </Text>
                    <View className="flex-row items-center gap-1.5 mt-0.5">
                      <Text className="text-[11px] font-bold text-slate-400">
                        x{item.quantity}
                      </Text>
                      <View
                        style={{ backgroundColor: activeCategoryColor + '20' }}
                        className="px-1.5 py-0.5 rounded"
                      >
                        <Text
                          style={{ color: activeCategoryColor }}
                          className="text-[9px] font-black uppercase"
                        >
                          {activeCategory.toUpperCase()}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <Text
                    className={`text-sm font-black ${
                      isDarkMode ? 'text-slate-50' : 'text-slate-900'
                    }`}
                  >
                    ৳{item.price * item.quantity}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* Promo / Coupon Input Section */}
          <View
            className={`pt-3 border-t mt-1.5 ${
              isDarkMode ? 'border-slate-800' : 'border-slate-100'
            }`}
          >
            <View className="flex-row items-center justify-between gap-1.5 mb-2">
              <View className="flex-row items-center gap-1.5">
                <Ionicons name="pricetag-outline" size={16} color={activeCategoryColor} />
                <Text
                  style={{ color: activeCategoryColor }}
                  className="text-[11px] font-black uppercase tracking-wider"
                >
                  PROMO / COUPON CODE
                </Text>
              </View>
              {appliedCouponCode && (
                <View className="bg-emerald-500/20 px-2.5 py-0.5 rounded-full flex-row items-center gap-1">
                  <Ionicons name="checkmark-circle" size={12} color="#10B981" />
                  <Text className="text-[10px] font-black text-emerald-600 dark:text-emerald-400">
                    {isBangla ? 'প্রযুক্ত হয়েছে' : 'APPLIED'} (-৳{appliedDiscount})
                  </Text>
                </View>
              )}
            </View>

            <View className="flex-row items-center gap-2">
              <TextInput
                value={promoCode}
                onChangeText={setPromoCode}
                editable={!appliedCouponCode}
                placeholder="COUPON CODE (E.G. JADUFIRST)"
                placeholderTextColor={isDarkMode ? '#64748B' : '#94A3B8'}
                autoCapitalize="characters"
                className={`flex-1 h-11 px-3 rounded-xl border text-xs font-bold ${
                  appliedCouponCode
                    ? isDarkMode
                      ? 'bg-emerald-950/40 border-emerald-600/60 text-emerald-400'
                      : 'bg-emerald-50 border-emerald-300 text-emerald-700'
                    : isDarkMode
                    ? 'bg-slate-950 border-slate-800 text-slate-100'
                    : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
              {appliedCouponCode ? (
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={handleRemovePromo}
                  className="px-4 h-11 rounded-xl items-center justify-center bg-red-500 flex-row gap-1"
                >
                  <Ionicons name="close-circle" size={14} color="#FFFFFF" />
                  <Text className="text-xs font-black text-white">
                    {isBangla ? 'বাতিল' : 'CANCEL'}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => handleApplyPromo()}
                  style={{ backgroundColor: promoCode.trim() ? activeCategoryColor : isDarkMode ? '#334155' : '#E2E8F0' }}
                  className="px-4 h-11 rounded-xl items-center justify-center"
                >
                  <Text
                    className={`text-xs font-black ${
                      promoCode.trim()
                        ? 'text-white'
                        : isDarkMode
                        ? 'text-slate-400'
                        : 'text-slate-600'
                    }`}
                  >
                    {isBangla ? 'প্রয়োগ' : 'APPLY'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* View Available Coupons */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setShowCoupons(!showCoupons)}
              className="flex-row items-center justify-between mt-2.5"
            >
              <View className="flex-row items-center gap-1.5">
                <Ionicons name="sparkles" size={14} color={activeCategoryColor} />
                <Text className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {isBangla ? 'উপলব্ধ কুপন সমূহ দেখুন' : 'View Available Coupons'}
                </Text>
              </View>
              <Ionicons
                name={showCoupons ? 'chevron-up' : 'chevron-down'}
                size={16}
                color="#64748B"
              />
            </TouchableOpacity>

            {showCoupons && (
              <View className="mt-2 gap-2">
                <View
                  style={{
                    backgroundColor: appliedCouponCode === 'JADUFIRST' ? (isDarkMode ? '#064E3B' : '#ECFDF5') : activeCategoryColor + '12',
                    borderColor: appliedCouponCode === 'JADUFIRST' ? '#10B981' : activeCategoryColor + '40',
                  }}
                  className="p-3 rounded-2xl border flex-row items-center justify-between"
                >
                  <View className="flex-1 pr-2">
                    <View className="flex-row items-center gap-2">
                      <Text
                        style={{ color: appliedCouponCode === 'JADUFIRST' ? '#10B981' : activeCategoryColor }}
                        className="text-xs font-black"
                      >
                        JADUFIRST
                      </Text>
                      {appliedCouponCode === 'JADUFIRST' && (
                        <View className="bg-emerald-500 px-2 py-0.5 rounded-full flex-row items-center gap-1">
                          <Ionicons name="checkmark" size={10} color="#FFFFFF" />
                          <Text className="text-[9px] font-black text-white">APPLIED</Text>
                        </View>
                      )}
                    </View>
                    <Text
                      style={{ color: appliedCouponCode === 'JADUFIRST' ? (isDarkMode ? '#A7F3D0' : '#047857') : activeCategoryColor }}
                      className="text-[11px] font-semibold mt-0.5 opacity-90"
                    >
                      {isBangla ? 'মোট বিলে ২০% ছাড়' : '20% discount on total bill'}
                    </Text>
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      if (appliedCouponCode === 'JADUFIRST') {
                        handleRemovePromo();
                      } else {
                        handleApplyPromo('JADUFIRST');
                      }
                    }}
                    className={`px-3 py-1.5 rounded-xl ${
                      appliedCouponCode === 'JADUFIRST' ? 'bg-red-500' : 'bg-emerald-600'
                    }`}
                  >
                    <Text className="text-[11px] font-black text-white">
                      {appliedCouponCode === 'JADUFIRST' ? (isBangla ? 'বাতিল' : 'CANCEL') : (isBangla ? 'প্রয়োগ' : 'APPLY')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          {/* Pricing Breakdown Rows */}
          <View
            className={`pt-3.5 border-t mt-3 gap-2 ${
              isDarkMode ? 'border-slate-800' : 'border-slate-100'
            }`}
          >
            <View className="flex-row items-center justify-between">
              <Text
                className={`text-xs sm:text-sm font-semibold ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                Items Subtotal
              </Text>
              <Text
                className={`text-sm font-extrabold ${
                  isDarkMode ? 'text-slate-100' : 'text-slate-900'
                }`}
              >
                ৳{subtotal}
              </Text>
            </View>

            <View className="flex-row items-center justify-between">
              <Text
                className={`text-xs sm:text-sm font-semibold ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                Delivery Charge
              </Text>
              <Text
                className={`text-sm font-extrabold ${
                  isDarkMode ? 'text-slate-100' : 'text-slate-900'
                }`}
              >
                ৳{deliveryCharge}
              </Text>
            </View>

            {appliedDiscount > 0 && (
              <View className="flex-row items-center justify-between">
                <Text
                  style={{ color: activeCategoryColor }}
                  className="text-xs sm:text-sm font-semibold"
                >
                  Discount (20%)
                </Text>
                <Text
                  style={{ color: activeCategoryColor }}
                  className="text-sm font-extrabold"
                >
                  -৳{appliedDiscount}
                </Text>
              </View>
            )}

            <View
              className={`h-[1px] my-1 ${
                isDarkMode ? 'bg-slate-800' : 'bg-slate-100'
              }`}
            />

            <View className="flex-row items-center justify-between">
              <Text
                className={`text-base font-black ${
                  isDarkMode ? 'text-slate-50' : 'text-slate-900'
                }`}
              >
                Amount Pay
              </Text>
              <Text
                style={{ color: activeCategoryColor }}
                className="text-xl font-black"
              >
                ৳{grandTotal}
              </Text>
            </View>
          </View>

          {/* Security SSL Banner */}
          <View
            style={{
              backgroundColor: activeCategoryColor + '12',
              borderColor: activeCategoryColor + '35',
            }}
            className="flex-row items-center p-3 rounded-2xl border mt-3.5"
          >
            <Ionicons name="shield-checkmark" size={18} color={activeCategoryColor} className="mr-2" />
            <Text
              className={`flex-1 text-[11px] font-extrabold leading-snug ${
                isDarkMode ? 'text-slate-200' : 'text-slate-900'
              }`}
            >
              Security SSL verified. All mock gateway actions will immediately record orders into account history.
            </Text>
          </View>

          {/* Place Secure Order Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handlePlaceOrder}
            style={{ backgroundColor: activeCategoryColor, shadowColor: activeCategoryColor }}
            className="mt-4 py-3.5 rounded-2xl flex-row items-center justify-center shadow-lg"
          >
            <Text className="text-white text-sm font-black uppercase tracking-wider">
              PLACE SECURE ORDER
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" className="ml-1.5" />
          </TouchableOpacity>
        </View>
        </>
        )}
      </ScrollView>

      {/* SUCCESS MODAL */}
      <Modal
        visible={isSuccessModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsSuccessModalOpen(false)}
      >
        <View className="flex-1 bg-black/60 items-center justify-center p-6">
          <View
            className={`w-full max-w-sm p-6 rounded-3xl items-center shadow-xl ${
              isDarkMode ? 'bg-slate-900' : 'bg-white'
            }`}
          >
            <View
              style={{ backgroundColor: activeCategoryColor }}
              className="w-16 h-16 rounded-full items-center justify-center mb-4"
            >
              <Ionicons name="checkmark" size={36} color="#FFFFFF" />
            </View>

            <Text
              className={`text-xl font-black text-center mb-2 ${
                isDarkMode ? 'text-slate-50' : 'text-slate-900'
              }`}
            >
              {isBangla ? 'অর্ডার সফল হয়েছে!' : 'Order Placed Successfully!'}
            </Text>

            <Text
              className={`text-xs sm:text-sm font-medium text-center leading-relaxed mb-6 ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              {isBangla
                ? `আপনার মোট বিল ৳${grandTotal}। দ্রুত ডেলিভারির জন্য প্রসেসিং করা হচ্ছে।`
                : `Your order total total is ৳${grandTotal}. Thank you for shopping with Jadubazar!`}
            </Text>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleOrderSuccessFinish}
              style={{ backgroundColor: activeCategoryColor }}
              className="w-full py-3 rounded-xl items-center justify-center"
            >
              <Text className="text-white text-sm font-extrabold">
                {isBangla ? 'হোম পেজে ফিরে যান' : 'Back to Home'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
