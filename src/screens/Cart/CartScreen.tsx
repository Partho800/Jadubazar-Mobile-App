import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  StyleSheet,
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
  const { theme, isDarkMode } = useTheme();
  const { t, isBangla } = useLanguage();
  const { activeCategoryColor } = useCategory();

  const [cartItems, setCartItems] = useState<CartItem[]>(cartStore.getItems());
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [promoCode, setPromoCode] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);

  // Sync with cartStore
  useEffect(() => {
    let items = cartStore.getItems();
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
            setPromoCode('');
          },
        },
      ]
    );
  };

  const handleApplyPromo = (codeToApply?: string) => {
    const code = (codeToApply || promoCode).trim().toUpperCase();
    if (!code) {
      Alert.alert(isBangla ? 'প্রোমো কোড' : 'Promo Code', isBangla ? 'অনুগ্রহ করে একটি প্রোমো কোড লিখুন।' : 'Please enter a promo code.');
      return;
    }
    if (code === 'JADUFIRST' || code === 'JADU200') {
      const discount = Math.round(subtotal * 0.2);
      setAppliedDiscount(discount);
      setPromoCode(code);
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
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC' }]}>
      {/* 1. Global Header Bar */}
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 2. Top Title & Header Row */}
        <View style={styles.bagHeaderRow}>
          <View style={styles.bagTitleGroup}>
            <View
              style={[
                styles.bagIconBox,
                { backgroundColor: activeCategoryColor + '20' },
              ]}
            >
              <Ionicons name="bag-handle" size={20} color={activeCategoryColor} />
            </View>
            <Text
              style={[
                styles.bagTitle,
                { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
              ]}
            >
              {t('shoppingBag')}
            </Text>
            <View
              style={[
                styles.countBadgePill,
                { backgroundColor: activeCategoryColor + '20' },
              ]}
            >
              <Text style={[styles.countBadgePillText, { color: activeCategoryColor }]}>{totalItemCount} {t('items')}</Text>
            </View>
          </View>

          {cartItems.length > 0 && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleClearAll}
              style={[
                styles.clearAllBtn,
                { backgroundColor: isDarkMode ? '#451A1A' : '#FEF2F2' },
              ]}
            >
              <Ionicons name="trash-outline" size={14} color="#EF4444" />
              <Text style={styles.clearAllBtnText}>{t('clearAll')}</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* 3. Free Delivery Progress Tracker */}
        <View style={[styles.deliveryProgressCard, { backgroundColor: activeCategoryColor + '12', borderColor: activeCategoryColor + '35' }]}>
          <View style={styles.deliveryProgressHeader}>
            <View style={styles.deliveryLeftRow}>
              <Ionicons name="car-outline" size={18} color={activeCategoryColor} />
              <Text style={styles.deliveryProgressText}>
                {remainingForFreeDelivery > 0 ? (
                  isBangla ? (
                    <>
                      ফ্রি ডেলিভারির জন্য আরও <Text style={[styles.deliveryHighlight, { color: activeCategoryColor }]}>৳{remainingForFreeDelivery}</Text> যোগ করুন!
                    </>
                  ) : (
                    <>
                      Add <Text style={[styles.deliveryHighlight, { color: activeCategoryColor }]}>৳{remainingForFreeDelivery}</Text> more for{' '}
                      <Text style={[styles.deliveryBoldGreen, { color: activeCategoryColor }]}>FREE Delivery!</Text>
                    </>
                  )
                ) : (
                  <Text style={[styles.deliveryBoldGreen, { color: activeCategoryColor }]}>
                    {t('freeDeliveryUnlocked')}
                  </Text>
                )}
              </Text>
            </View>
            <Text style={[styles.deliveryPercentText, { color: activeCategoryColor }]}>{freeDeliveryPercent}%</Text>
          </View>

          <View style={[styles.progressBarTrack, { backgroundColor: activeCategoryColor + '25' }]}>
            <View style={[styles.progressBarFill, { width: `${freeDeliveryPercent}%`, backgroundColor: activeCategoryColor }]} />
          </View>
        </View>

        {cartItems.length === 0 ? (
          /* EMPTY CART VIEW */
          <EmptyBagCard />
        ) : (
          <>
            {/* 4. Select All Items Card */}
            <View
              style={[
                styles.cardBox,
                {
                  backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                  borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                },
              ]}
            >
              <View style={styles.selectAllRow}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleToggleSelectAll}
                  style={styles.checkboxLabelRow}
                >
                  <View
                    style={[
                      styles.checkboxSquare,
                      selectedIds.length === cartItems.length
                        ? [styles.checkboxSquareChecked, { backgroundColor: activeCategoryColor, borderColor: activeCategoryColor }]
                        : { borderColor: isDarkMode ? '#64748B' : '#CBD5E1' },
                    ]}
                  >
                    {selectedIds.length === cartItems.length && (
                      <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                    )}
                  </View>
                  <Text
                    style={[
                      styles.selectAllText,
                      { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                    ]}
                  >
                    {t('selectAllItems')}
                  </Text>
                </TouchableOpacity>

                <View
                  style={[
                    styles.selectedCountBadge,
                    { backgroundColor: activeCategoryColor + '18' },
                  ]}
                >
                  <Text style={[styles.selectedCountBadgeText, { color: activeCategoryColor }]}>
                    {selectedIds.length} / {cartItems.length} {t('selectedCount')}
                  </Text>
                </View>
              </View>
            </View>

            {/* 5. Category Grouped Items Card (Grocery Essentials / Products) */}
            <View
              style={[
                styles.groupContainerCard,
                {
                  backgroundColor: isDarkMode ? '#1E293B' : '#F0FDF4',
                  borderColor: isDarkMode ? '#334155' : '#DCFCE7',
                },
              ]}
            >
              {/* Group Header */}
              <View style={styles.groupHeaderRow}>
                <View style={styles.groupTitleLeft}>
                  <Ionicons name="cart" size={20} color={activeCategoryColor} />
                  <Text
                    style={[
                      styles.groupTitleText,
                      { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                    ]}
                  >
                    {isBangla ? 'গ্রোসারী প্রয়োজনীয় পণ্য' : 'Grocery Essentials'}
                  </Text>
                  <View style={[styles.groupCountPill, { backgroundColor: activeCategoryColor }]}>
                    <Text style={[styles.groupCountPillText, { color: '#FFFFFF' }]}>{cartItems.length}</Text>
                  </View>
                </View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleToggleSelectAll}
                  style={styles.deselectBtn}
                >
                  <View
                    style={[
                      styles.checkboxSquare,
                      styles.checkboxSquareChecked,
                      { backgroundColor: activeCategoryColor, borderColor: activeCategoryColor, width: 18, height: 18 },
                    ]}
                  >
                    <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                  </View>
                  <Text style={styles.deselectBtnText}>
                    {selectedIds.length === cartItems.length ? t('deselectAll') : t('selectAllItems')}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Items List Inside Group */}
              <View style={styles.itemsListContainer}>
                {cartItems.map((item) => {
                  const isSelected = selectedIds.includes(item.id);

                  return (
                    <View
                      key={item.id}
                      style={[
                        styles.itemCard,
                        {
                          backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF',
                          borderColor: isDarkMode ? '#334155' : '#F1F5F9',
                        },
                      ]}
                    >
                      {/* Left Item Checkbox */}
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => handleToggleItemSelect(item.id)}
                        style={styles.itemCheckboxArea}
                      >
                        <View
                          style={[
                            styles.checkboxSquare,
                            isSelected
                              ? [styles.checkboxSquareChecked, { backgroundColor: activeCategoryColor, borderColor: activeCategoryColor }]
                              : { borderColor: isDarkMode ? '#64748B' : '#CBD5E1' },
                          ]}
                        >
                          {isSelected && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                        </View>
                      </TouchableOpacity>

                      {/* Item Thumbnail Image with Category Tag Overlay */}
                      <View style={styles.itemImageWrapper}>
                        <Image
                          source={{ uri: item.image }}
                          style={styles.itemImage}
                          resizeMode="cover"
                        />
                        <View style={[styles.categoryImageTag, { backgroundColor: activeCategoryColor }]}>
                          <Text style={styles.categoryImageTagText}>{t('grocery')}</Text>
                        </View>
                      </View>

                      {/* Right Item Content Info */}
                      <View style={styles.itemDetailsArea}>
                        <View style={styles.itemTitleRow}>
                          <View style={{ flex: 1, marginRight: 8 }}>
                            <Text
                              numberOfLines={1}
                              style={[
                                styles.itemNameText,
                                { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                              ]}
                            >
                              {item.name}
                            </Text>
                            <Text
                              style={[
                                styles.itemSubtext,
                                { color: isDarkMode ? '#94A3B8' : '#64748B' },
                              ]}
                            >
                              Pusti • 2 kg
                            </Text>
                          </View>

                          <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => cartStore.removeItem(item.id)}
                            style={styles.deleteIconBtn}
                          >
                            <Ionicons
                              name="trash-outline"
                              size={18}
                              color={isDarkMode ? '#64748B' : '#94A3B8'}
                            />
                          </TouchableOpacity>
                        </View>

                        <View style={styles.itemPriceQtyRow}>
                          <View style={styles.priceGroup}>
                            <Text
                              style={[
                                styles.itemPriceText,
                                { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                              ]}
                            >
                              ৳{item.price * item.quantity}
                            </Text>
                            <Text style={styles.itemUnitPriceText}>
                              ৳{item.price}/{isBangla ? 'ইউনিট' : 'unit'}
                            </Text>
                          </View>

                          {/* Stepper Quantity Control */}
                          <View
                            style={[
                              styles.stepperContainer,
                              { backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9' },
                            ]}
                          >
                            <TouchableOpacity
                              activeOpacity={0.7}
                              onPress={() =>
                                cartStore.updateQuantity(item.id, item.quantity - 1)
                              }
                              style={styles.stepperBtn}
                            >
                              <Ionicons
                                name="remove"
                                size={14}
                                color={isDarkMode ? '#F8FAFC' : '#0F172A'}
                              />
                            </TouchableOpacity>

                            <Text
                              style={[
                                styles.stepperValueText,
                                { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                              ]}
                            >
                              {item.quantity}
                            </Text>

                            <TouchableOpacity
                              activeOpacity={0.7}
                              onPress={() =>
                                cartStore.updateQuantity(item.id, item.quantity + 1)
                              }
                              style={styles.stepperBtn}
                            >
                              <Ionicons
                                name="add"
                                size={14}
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

            {/* 7. ORDER SUMMARY Card */}
            <View
              style={[
                styles.cardBox,
                {
                  backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                  borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                },
              ]}
            >
              <Text style={styles.summaryHeaderTitle}>{t('orderSummaryTitle')}</Text>

              <View style={styles.summaryRow}>
                <Text
                  style={[
                    styles.summaryLabelText,
                    { color: isDarkMode ? '#94A3B8' : '#475569' },
                  ]}
                >
                  {t('itemsSubtotal')}
                </Text>
                <Text
                  style={[
                    styles.summaryValText,
                    { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                  ]}
                >
                  ৳{subtotal}
                </Text>
              </View>

              <View style={styles.summaryRow}>
                <Text
                  style={[
                    styles.summaryLabelText,
                    { color: isDarkMode ? '#94A3B8' : '#475569' },
                  ]}
                >
                  {t('deliveryCharge')}
                </Text>
                <Text
                  style={[
                    styles.summaryValText,
                    { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                  ]}
                >
                  {deliveryCharge === 0 ? t('freeText') : `৳${deliveryCharge}`}
                </Text>
              </View>

              {appliedDiscount > 0 && (
                <View style={styles.summaryRow}>
                  <Text style={[styles.summaryLabelText, { color: '#10B981' }]}>
                    {t('promoDiscount')} (20%)
                  </Text>
                  <Text style={[styles.summaryValText, { color: '#10B981' }]}>
                    -৳{appliedDiscount}
                  </Text>
                </View>
              )}

              <View style={styles.summaryDivider} />

              <View style={styles.summaryRow}>
                <Text
                  style={[
                    styles.grandTotalLabel,
                    { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                  ]}
                >
                  {t('grandTotalTitle')}
                </Text>
                <Text style={[styles.grandTotalValue, { color: activeCategoryColor }]}>৳{grandTotal}</Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {/* 8. Sticky Bottom Checkout Bar */}
      {cartItems.length > 0 && (
        <View
          style={[
            styles.stickyCheckoutBar,
            {
              backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
            },
          ]}
        >
          <View style={styles.stickyLeftGroup}>
            <Text style={styles.stickyGrandLabel}>
              {t('grandTotalHeader')} ({selectedIds.length} {t('items')})
            </Text>
            <Text style={[styles.stickyGrandVal, { color: activeCategoryColor }]}>৳{grandTotal}</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleCheckout}
            style={[styles.checkoutButton, { backgroundColor: activeCategoryColor, shadowColor: activeCategoryColor }]}
          >
            <Text style={[styles.checkoutBtnText, { color: '#FFFFFF' }]}>{t('checkoutBtn')}</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 180 : 170,
  },
  bagHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  bagTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bagIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bagTitle: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  countBadgePill: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  countBadgePillText: {
    color: '#D97706',
    fontSize: 11,
    fontWeight: '800',
  },
  clearAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  clearAllBtnText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '800',
  },
  deliveryProgressCard: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
  },
  deliveryProgressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  deliveryLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  deliveryProgressText: {
    fontSize: 13,
    color: '#065F46',
    fontWeight: '600',
  },
  deliveryHighlight: {
    color: '#D97706',
    fontWeight: '900',
  },
  deliveryBoldGreen: {
    color: '#059669',
    fontWeight: '900',
  },
  deliveryPercentText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#059669',
  },
  progressBarTrack: {
    height: 7,
    borderRadius: 4,
    backgroundColor: '#D1FAE5',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  emptyCartState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '900',
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  cardBox: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  selectAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkboxLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkboxSquare: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSquareChecked: {
    backgroundColor: '#F59E0B',
    borderColor: '#F59E0B',
  },
  selectAllText: {
    fontSize: 15,
    fontWeight: '900',
  },
  selectedCountBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  selectedCountBadgeText: {
    color: '#D97706',
    fontSize: 11,
    fontWeight: '800',
  },
  groupContainerCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 14,
    marginBottom: 16,
  },
  groupHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  groupTitleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  groupTitleText: {
    fontSize: 16,
    fontWeight: '900',
  },
  groupCountPill: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 7,
    paddingVertical: 1,
    borderRadius: 10,
  },
  groupCountPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#059669',
  },
  deselectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  deselectBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  itemsListContainer: {
    gap: 12,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
  },
  itemCheckboxArea: {
    marginRight: 10,
  },
  itemImageWrapper: {
    width: 72,
    height: 72,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#F8FAFC',
    marginRight: 12,
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  categoryImageTag: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#059669',
    paddingVertical: 2,
    alignItems: 'center',
  },
  categoryImageTagText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  itemDetailsArea: {
    flex: 1,
  },
  itemTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  itemNameText: {
    fontSize: 14,
    fontWeight: '900',
  },
  itemSubtext: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 1,
  },
  deleteIconBtn: {
    padding: 2,
  },
  itemPriceQtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  priceGroup: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  itemPriceText: {
    fontSize: 16,
    fontWeight: '900',
  },
  itemUnitPriceText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    height: 32,
    paddingHorizontal: 6,
    gap: 8,
  },
  stepperBtn: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperValueText: {
    fontSize: 13,
    fontWeight: '900',
    minWidth: 16,
    textAlign: 'center',
  },
  promoHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  promoHeaderText: {
    color: '#D97706',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  promoInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  promoInput: {
    flex: 1,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    fontSize: 13,
    fontWeight: '700',
  },
  applyBtn: {
    backgroundColor: '#F59E0B',
    height: 44,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyBtnText: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '900',
  },
  promoRecommendationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recommendationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bulbIcon: {
    fontSize: 12,
  },
  recommendationText: {
    fontSize: 12,
    fontWeight: '600',
  },
  promoCodePillBtn: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  promoCodePillText: {
    color: '#D97706',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  summaryHeaderTitle: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.5,
    marginBottom: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabelText: {
    fontSize: 13,
    fontWeight: '600',
  },
  summaryValText: {
    fontSize: 14,
    fontWeight: '800',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 10,
  },
  grandTotalLabel: {
    fontSize: 16,
    fontWeight: '900',
  },
  grandTotalValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#F59E0B',
  },
  stickyCheckoutBar: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 88 : 80,
    left: 12,
    right: 12,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 12,
    zIndex: 99,
  },
  stickyLeftGroup: {
    flex: 1,
  },
  stickyGrandLabel: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  stickyGrandVal: {
    color: '#F59E0B',
    fontSize: 22,
    fontWeight: '900',
  },
  checkoutButton: {
    backgroundColor: '#F59E0B',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 16,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  checkoutBtnText: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});
