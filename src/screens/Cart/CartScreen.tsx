import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Platform,
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

export const CartScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { isDarkMode } = useTheme();
  const { t, isBangla } = useLanguage();
  const { activeCategoryColor } = useCategory();

  const [cartItems, setCartItems] = useState<CartItem[]>(cartStore.getItems());
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);

  // Sync with cartStore
  useEffect(() => {
    const items = cartStore.getItems();
    const sanitizedItems = items.map((item) => ({
      ...item,
      image:
        !item.image || item.image.includes('83865001e8ac')
          ? 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=500&q=80'
          : item.image,
    }));

    setCartItems(sanitizedItems);
    setSelectedIds(sanitizedItems.map((i) => i.id));

    return cartStore.subscribe(() => {
      const currentItems = cartStore.getItems().map((item) => ({
        ...item,
        image:
          !item.image || item.image.includes('83865001e8ac')
            ? 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=500&q=80'
            : item.image,
      }));
      setCartItems(currentItems);
      setSelectedIds((prev) => prev.filter((id) => currentItems.some((item) => item.id === id)));
    });
  }, []);

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cartItems
    .filter((item) => selectedIds.includes(item.id))
    .reduce((acc, item) => acc + item.price * item.quantity, 0);

  const deliveryCharge = subtotal >= 1000 || subtotal === 0 ? 0 : 45;
  const remainingForFreeDelivery = Math.max(0, 1000 - subtotal);
  const freeDeliveryPercent = Math.min(100, Math.round((subtotal / 1000) * 100));

  const grandTotal = Math.max(0, subtotal + deliveryCharge - appliedDiscount);

  const handleToggleSelectAll = () => {
    if (selectedIds.length === cartItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(cartItems.map((i) => i.id));
    }
  };

  const handleToggleItemSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleClearAll = () => {
    Alert.alert(
      isBangla ? 'শপিং ব্যাগ খালি করুন' : 'Clear Shopping Bag',
      isBangla ? 'আপনি কি ব্যাগ থেকে সব পণ্য মুছে ফেলতে চান?' : 'Are you sure you want to remove all items from your bag?',
      [
        { text: isBangla ? 'বাতিল' : 'Cancel', style: 'cancel' },
        {
          text: isBangla ? 'সব মুছুন' : 'Clear All',
          style: 'destructive',
          onPress: () => {
            cartStore.clearCart();
            setAppliedDiscount(0);
          },
        },
      ]
    );
  };

  const handleCheckout = () => {
    if (selectedIds.length === 0) {
      Alert.alert(
        isBangla ? 'পণ্য সিলেক্ট করুন' : 'No Items Selected',
        isBangla ? 'চেকআউট করতে অন্তত ১টি পণ্য সিলেক্ট করুন।' : 'Please select at least 1 item to proceed to checkout.'
      );
      return;
    }
    try {
      navigation.navigate('CheckoutTab');
    } catch (e) {
      console.log('Navigation error:', e);
    }
  };

  return (
    <View
      style={{ backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC' }}
      className="flex-1"
    >
      {/* 1. Global Header Bar */}
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 12,
          paddingBottom: Platform.OS === 'ios' ? 180 : 160,
        }}
      >
        {/* 2. Top Title & Header Row */}
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center gap-2">
            <View
              style={{ backgroundColor: `${activeCategoryColor}20` }}
              className="w-8 h-8 rounded-full items-center justify-center"
            >
              <Ionicons name="bag-handle" size={18} color={activeCategoryColor} />
            </View>
            <Text
              className={`text-xl font-black tracking-tight ${
                isDarkMode ? 'text-slate-50' : 'text-slate-900'
              }`}
            >
              {t('shoppingBag')}
            </Text>
            <View
              style={{ backgroundColor: `${activeCategoryColor}18` }}
              className="px-2.5 py-0.5 rounded-full"
            >
              <Text style={{ color: activeCategoryColor }} className="text-xs font-black">
                {totalItemCount} {t('items')}
              </Text>
            </View>
          </View>

          {cartItems.length > 0 && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleClearAll}
              className={`flex-row items-center gap-1 px-3 py-1.5 rounded-full border active:scale-95 ${
                isDarkMode
                  ? 'border-red-900/60 bg-red-950/40'
                  : 'border-red-200 bg-red-50'
              }`}
            >
              <Ionicons name="trash-outline" size={13} color="#EF4444" />
              <Text className="text-xs font-extrabold text-red-500">{t('clearAll')}</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* 3. Free Delivery Progress Tracker */}
        <View
          style={{
            backgroundColor: `${activeCategoryColor}12`,
            borderColor: `${activeCategoryColor}30`,
          }}
          className="border rounded-2xl p-3.5 mb-4"
        >
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center gap-1.5 flex-1 mr-2">
              <Ionicons name="car-outline" size={17} color={activeCategoryColor} />
              <Text
                className={`text-xs font-semibold flex-1 ${
                  isDarkMode ? 'text-slate-200' : 'text-slate-700'
                }`}
              >
                {remainingForFreeDelivery > 0 ? (
                  isBangla ? (
                    <>
                      ফ্রি ডেলিভারির জন্য আরও{' '}
                      <Text style={{ color: activeCategoryColor }} className="font-black">
                        ৳{remainingForFreeDelivery}
                      </Text>{' '}
                      যোগ করুন!
                    </>
                  ) : (
                    <>
                      Add{' '}
                      <Text style={{ color: activeCategoryColor }} className="font-black">
                        ৳{remainingForFreeDelivery}
                      </Text>{' '}
                      more for{' '}
                      <Text style={{ color: activeCategoryColor }} className="font-black">
                        FREE Delivery!
                      </Text>
                    </>
                  )
                ) : (
                  <Text style={{ color: activeCategoryColor }} className="font-black">
                    {t('freeDeliveryUnlocked')}
                  </Text>
                )}
              </Text>
            </View>
            <Text style={{ color: activeCategoryColor }} className="text-xs font-black">
              {freeDeliveryPercent}%
            </Text>
          </View>

          {/* Progress bar line */}
          <View
            style={{ backgroundColor: `${activeCategoryColor}25` }}
            className="h-2 rounded-full overflow-hidden"
          >
            <View
              style={{
                width: `${freeDeliveryPercent}%`,
                backgroundColor: activeCategoryColor,
              }}
              className="h-full rounded-full"
            />
          </View>
        </View>

        {cartItems.length === 0 ? (
          /* EMPTY CART VIEW */
          <EmptyBagCard />
        ) : (
          <>
            {/* 4. Select All Items Card */}
            <View
              className={`p-3.5 px-4 rounded-2xl border mb-3.5 shadow-sm flex-row items-center justify-between ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-800 shadow-black/30'
                  : 'bg-white border-slate-200/80 shadow-slate-200/50'
              }`}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleToggleSelectAll}
                className="flex-row items-center gap-2.5 flex-1"
              >
                <View
                  style={{
                    backgroundColor:
                      selectedIds.length === cartItems.length
                        ? activeCategoryColor
                        : 'transparent',
                    borderColor:
                      selectedIds.length === cartItems.length
                        ? activeCategoryColor
                        : isDarkMode
                        ? '#475569'
                        : '#CBD5E1',
                  }}
                  className="w-5 h-5 rounded-md border-2 items-center justify-center"
                >
                  {selectedIds.length === cartItems.length && (
                    <Ionicons name="checkmark" size={13} color="#FFFFFF" />
                  )}
                </View>
                <Text
                  className={`text-sm font-black ${
                    isDarkMode ? 'text-slate-100' : 'text-slate-900'
                  }`}
                >
                  {t('selectAllItems')}
                </Text>
              </TouchableOpacity>

              <View
                style={{ backgroundColor: `${activeCategoryColor}15` }}
                className="px-2.5 py-1 rounded-full"
              >
                <Text style={{ color: activeCategoryColor }} className="text-xs font-black">
                  {selectedIds.length} / {cartItems.length} {t('selectedCount')}
                </Text>
              </View>
            </View>

            {/* 5. Category Grouped Items Card */}
            <View
              className={`p-3.5 rounded-2xl border mb-4 shadow-sm ${
                isDarkMode
                  ? 'bg-slate-900/90 border-slate-800'
                  : 'bg-white/95 border-slate-200/80'
              }`}
            >
              {/* Group Header */}
              <View
                className={`flex-row items-center justify-between mb-3 pb-2.5 border-b ${
                  isDarkMode ? 'border-slate-800' : 'border-slate-100'
                }`}
              >
                <View className="flex-row items-center gap-2">
                  <Ionicons name="cart" size={18} color={activeCategoryColor} />
                  <Text
                    className={`text-sm font-black ${
                      isDarkMode ? 'text-slate-100' : 'text-slate-900'
                    }`}
                  >
                    {isBangla ? 'গ্রোসারী প্রয়োজনীয় পণ্য' : 'Grocery Essentials'}
                  </Text>
                  <View
                    style={{ backgroundColor: activeCategoryColor }}
                    className="px-1.5 py-0.2 rounded-md"
                  >
                    <Text className="text-[10px] font-black text-white">{cartItems.length}</Text>
                  </View>
                </View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleToggleSelectAll}
                  className="flex-row items-center gap-1.5"
                >
                  <View
                    style={{
                      backgroundColor:
                        selectedIds.length === cartItems.length
                          ? activeCategoryColor
                          : 'transparent',
                      borderColor:
                        selectedIds.length === cartItems.length
                          ? activeCategoryColor
                          : isDarkMode
                          ? '#475569'
                          : '#CBD5E1',
                    }}
                    className="w-4 h-4 rounded border items-center justify-center"
                  >
                    {selectedIds.length === cartItems.length && (
                      <Ionicons name="checkmark" size={10} color="#FFFFFF" />
                    )}
                  </View>
                  <Text
                    className={`text-xs font-bold ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    {selectedIds.length === cartItems.length
                      ? t('deselectAll')
                      : t('selectAllItems')}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Items List Inside Group */}
              <View className="gap-2.5">
                {cartItems.map((item) => {
                  const isSelected = selectedIds.includes(item.id);

                  return (
                    <View
                      key={item.id}
                      className={`flex-row items-center p-3 rounded-2xl border ${
                        isDarkMode
                          ? 'bg-slate-950/60 border-slate-800/80'
                          : 'bg-slate-50/70 border-slate-100'
                      }`}
                    >
                      {/* Left Item Checkbox */}
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => handleToggleItemSelect(item.id)}
                        className="mr-2.5 py-2"
                      >
                        <View
                          style={{
                            backgroundColor: isSelected ? activeCategoryColor : 'transparent',
                            borderColor: isSelected
                              ? activeCategoryColor
                              : isDarkMode
                              ? '#475569'
                              : '#CBD5E1',
                          }}
                          className="w-5 h-5 rounded-md border-2 items-center justify-center"
                        >
                          {isSelected && <Ionicons name="checkmark" size={13} color="#FFFFFF" />}
                        </View>
                      </TouchableOpacity>

                      {/* Item Thumbnail Image with Category Tag */}
                      <View
                        className={`w-16 h-16 rounded-xl overflow-hidden relative mr-3 border ${
                          isDarkMode
                            ? 'bg-slate-800 border-slate-700/60'
                            : 'bg-white border-slate-200/60'
                        }`}
                      >
                        <Image
                          source={{ uri: item.image }}
                          className="w-full h-full"
                          resizeMode="cover"
                        />
                        <View
                          style={{ backgroundColor: activeCategoryColor }}
                          className="absolute bottom-0 left-0 right-0 py-0.5 items-center"
                        >
                          <Text className="text-[8px] font-black text-white tracking-widest uppercase">
                            {t('grocery')}
                          </Text>
                        </View>
                      </View>

                      {/* Right Item Content Info */}
                      <View className="flex-1">
                        <View className="flex-row items-start justify-between">
                          <View className="flex-1 mr-2">
                            <Text
                              numberOfLines={1}
                              className={`text-xs font-black ${
                                isDarkMode ? 'text-slate-100' : 'text-slate-900'
                              }`}
                            >
                              {item.name}
                            </Text>
                            <Text
                              className={`text-[10px] font-semibold mt-0.5 ${
                                isDarkMode ? 'text-slate-400' : 'text-slate-500'
                              }`}
                            >
                              Pusti • 2 kg
                            </Text>
                          </View>

                          <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => cartStore.removeItem(item.id)}
                            className="p-1 rounded-full active:bg-slate-200 dark:active:bg-slate-800"
                          >
                            <Ionicons
                              name="trash-outline"
                              size={16}
                              color={isDarkMode ? '#64748B' : '#94A3B8'}
                            />
                          </TouchableOpacity>
                        </View>

                        <View className="flex-row items-center justify-between mt-2">
                          <View className="flex-row items-baseline gap-1">
                            <Text
                              className={`text-sm font-black ${
                                isDarkMode ? 'text-slate-100' : 'text-slate-900'
                              }`}
                            >
                              ৳{item.price * item.quantity}
                            </Text>
                            <Text className="text-[10px] font-semibold text-slate-400">
                              ৳{item.price}/{isBangla ? 'ইউনিট' : 'unit'}
                            </Text>
                          </View>

                          {/* Stepper Quantity Control */}
                          <View
                            className={`flex-row items-center rounded-xl h-7 px-1.5 gap-1.5 border shadow-sm ${
                              isDarkMode
                                ? 'bg-slate-800 border-slate-700'
                                : 'bg-white border-slate-200'
                            }`}
                          >
                            <TouchableOpacity
                              activeOpacity={0.7}
                              onPress={() =>
                                cartStore.updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-5 h-5 items-center justify-center"
                            >
                              <Ionicons
                                name="remove"
                                size={13}
                                color={isDarkMode ? '#F8FAFC' : '#0F172A'}
                              />
                            </TouchableOpacity>

                            <Text
                              className={`text-xs font-black min-w-[14px] text-center ${
                                isDarkMode ? 'text-slate-100' : 'text-slate-900'
                              }`}
                            >
                              {item.quantity}
                            </Text>

                            <TouchableOpacity
                              activeOpacity={0.7}
                              onPress={() =>
                                cartStore.updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-5 h-5 items-center justify-center"
                            >
                              <Ionicons
                                name="add"
                                size={13}
                                color={isDarkMode ? '#F8FAFC' : '#0F172A'}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* 6. ORDER SUMMARY Card */}
            <View
              className={`p-4 rounded-2xl border mb-4 shadow-sm ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-white border-slate-200/80 shadow-slate-200/50'
              }`}
            >
              <Text className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
                {t('orderSummaryTitle')}
              </Text>

              <View className="flex-row items-center justify-between mb-2">
                <Text
                  className={`text-xs font-semibold ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  {t('itemsSubtotal')}
                </Text>
                <Text
                  className={`text-xs font-black ${
                    isDarkMode ? 'text-slate-100' : 'text-slate-900'
                  }`}
                >
                  ৳{subtotal}
                </Text>
              </View>

              <View className="flex-row items-center justify-between mb-2">
                <Text
                  className={`text-xs font-semibold ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  {t('deliveryCharge')}
                </Text>
                <Text
                  className={`text-xs font-black ${
                    isDarkMode ? 'text-slate-100' : 'text-slate-900'
                  }`}
                >
                  {deliveryCharge === 0 ? t('freeText') : `৳${deliveryCharge}`}
                </Text>
              </View>

              {appliedDiscount > 0 && (
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-xs font-semibold text-emerald-500">
                    {t('promoDiscount')} (20%)
                  </Text>
                  <Text className="text-xs font-black text-emerald-500">
                    -৳{appliedDiscount}
                  </Text>
                </View>
              )}

              <View
                className={`h-px my-2.5 ${
                  isDarkMode ? 'bg-slate-800' : 'bg-slate-100'
                }`}
              />

              <View className="flex-row items-center justify-between">
                <Text
                  className={`text-sm font-black ${
                    isDarkMode ? 'text-slate-100' : 'text-slate-900'
                  }`}
                >
                  {t('grandTotalTitle')}
                </Text>
                <Text style={{ color: activeCategoryColor }} className="text-base font-black">
                  ৳{grandTotal}
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {/* 7. Sticky Bottom Checkout Bar */}
      {cartItems.length > 0 && (
        <View
          style={{
            bottom: Platform.OS === 'ios' ? 88 : 80,
          }}
          className={`absolute left-3 right-3 rounded-2xl flex-row items-center justify-between px-4 py-3 border shadow-xl z-50 ${
            isDarkMode
              ? 'bg-slate-900 border-slate-800 shadow-black/50'
              : 'bg-white border-slate-200/80 shadow-slate-900/10'
          }`}
        >
          <View className="flex-1 mr-2">
            <Text className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
              {t('grandTotalHeader')} ({selectedIds.length} {t('items')})
            </Text>
            <Text style={{ color: activeCategoryColor }} className="text-lg font-black mt-0.5">
              ৳{grandTotal}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.88}
            onPress={handleCheckout}
            style={{
              backgroundColor: activeCategoryColor,
              shadowColor: activeCategoryColor,
            }}
            className="flex-row items-center gap-2 px-5 py-3 rounded-xl shadow-md active:scale-95"
          >
            <Text className="text-xs font-black text-white">{t('checkoutBtn')}</Text>
            <Ionicons name="arrow-forward" size={15} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
