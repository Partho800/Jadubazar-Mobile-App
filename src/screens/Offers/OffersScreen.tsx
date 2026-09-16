import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Clipboard,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { Header } from '../../components/common/Header/Header';
import { AppText as Text } from '../../components/common/AppText';

export interface OfferCouponItem {
  id: string;
  code: string;
  title: string;
  description: string;
  discountVal: string;
  discountSub: string;
  categoryTag: string;
  categoryKey: 'all' | 'ecommerce' | 'grocery' | 'food' | 'pharmacy' | 'services';
  minOrder: string;
  expiry: string;
  leftBgColor: string;
}

const OFFERS_DATA: OfferCouponItem[] = [
  {
    id: 'off1',
    code: 'JADUFIRST',
    title: 'Flat 20% Off on First Order',
    description: 'Valid on grocery and food delivery orders above ৳500.',
    discountVal: '20%',
    discountSub: 'OFF',
    categoryTag: 'ALL',
    categoryKey: 'all',
    minOrder: '৳500',
    expiry: '31 Dec 2026',
    leftBgColor: '#4F46E5',
  },
  {
    id: 'off2',
    code: 'JADUTECH',
    title: 'Flat 15% Off on Tech & Electronics',
    description: 'Get up to ৳2,000 off on smart gadgets, accessories, and electronics.',
    discountVal: '15%',
    discountSub: 'OFF',
    categoryTag: 'ECOMMERCE',
    categoryKey: 'ecommerce',
    minOrder: '৳1500',
    expiry: '30 Nov 2026',
    leftBgColor: '#2563EB',
  },
  {
    id: 'off3',
    code: 'GROCERY50',
    title: 'Flat ৳50 Off on Daily Groceries',
    description: 'Save instant ৳50 on fresh vegetables, milk and monthly groceries.',
    discountVal: '৳50',
    discountSub: 'OFF',
    categoryTag: 'GROCERY',
    categoryKey: 'grocery',
    minOrder: '৳600',
    expiry: '31 Dec 2026',
    leftBgColor: '#059669',
  },
  {
    id: 'off4',
    code: 'FOODIE100',
    title: 'Flat ৳100 Off on Kacchi & Biryani',
    description: 'Enjoy delicious food delivery from top rated kitchens.',
    discountVal: '৳100',
    discountSub: 'OFF',
    categoryTag: 'FOOD',
    categoryKey: 'food',
    minOrder: '৳500',
    expiry: '29 Sep 2026',
    leftBgColor: '#FF6B00',
  },
  {
    id: 'off5',
    code: 'HEALTH10',
    title: 'Flat 10% Off on Pharmacy Essentials',
    description: 'Valid on genuine healthcare products and supplements.',
    discountVal: '10%',
    discountSub: 'OFF',
    categoryTag: 'PHARMACY',
    categoryKey: 'pharmacy',
    minOrder: '৳400',
    expiry: '30 Sep 2026',
    leftBgColor: '#009689',
  },
  {
    id: 'off6',
    code: 'CLEAN300',
    title: 'Flat ৳300 Off on Home Services',
    description: 'Save big on deep cleaning, AC servicing and repair packages.',
    discountVal: '৳300',
    discountSub: 'OFF',
    categoryTag: 'SERVICES',
    categoryKey: 'services',
    minOrder: '৳2000',
    expiry: '30 Sep 2026',
    leftBgColor: '#432DD7',
  },
  {
    id: 'off7',
    code: 'FREEDEL',
    title: 'Free Express Delivery',
    description: 'Zero shipping cost on orders above ৳1,200 across all items.',
    discountVal: 'FREE',
    discountSub: 'SHIP',
    categoryTag: 'ALL',
    categoryKey: 'all',
    minOrder: '৳1200',
    expiry: '31 Dec 2026',
    leftBgColor: '#8B5CF6',
  },
];

const CATEGORY_TABS = [
  { key: 'all', title: 'All Offers', icon: 'grid-outline', count: 7 },
  { key: 'ecommerce', title: 'E-Commerce', icon: 'bag-handle-outline', count: 2 },
  { key: 'grocery', title: 'Grocery', icon: 'cart-outline', count: 1 },
  { key: 'food', title: 'Food', icon: 'restaurant-outline', count: 1 },
  { key: 'pharmacy', title: 'Pharmacy', icon: 'medkit-outline', count: 1 },
  { key: 'services', title: 'Services', icon: 'build-outline', count: 1 },
];

export const OffersScreen: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { t, isBangla } = useLanguage();

  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    try {
      Clipboard.setString(code);
    } catch (e) {
      console.log('Clipboard error', e);
    }
    setCopiedCode(code);
    Alert.alert(
      isBangla ? 'কুপন কপি হয়েছে!' : 'Coupon Copied!',
      isBangla ? `প্রোমো কোড "${code}" ক্লিপবোর্ডে কপি করা হয়েছে।` : `Promo code "${code}" copied to clipboard.`
    );
    setTimeout(() => {
      setCopiedCode(null);
    }, 3000);
  };

  const filteredOffers = OFFERS_DATA.filter((item) => {
    const matchesTab = activeTab === 'all' || item.categoryKey === activeTab;
    const matchesSearch =
      item.code.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.trim().toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <View
      style={[
        styles.safeArea,
        { backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC' },
      ]}
    >
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HERO SECTION matching user screenshot */}
        <View
          style={[
            styles.heroContainer,
            {
              backgroundColor: isDarkMode ? '#1E293B' : '#F4F3FF',
              borderColor: isDarkMode ? '#334155' : '#EEEDFE',
            },
          ]}
        >
          {/* Top Pill Badge */}
          <View
            style={[
              styles.badgePill,
              {
                backgroundColor: isDarkMode ? '#312E81' : '#EEF2FF',
                borderColor: isDarkMode ? '#4338CA' : '#C7D2FE',
              },
            ]}
          >
            <Ionicons name="sparkles" size={14} color="#6366F1" />
            <Text style={styles.badgeText}>{isBangla ? 'এক্সক্লুসিভ ডিল ও কুপন' : 'EXCLUSIVE DEALS & SAVINGS'}</Text>
          </View>

          {/* Headline Title */}
          <Text
            style={[
              styles.heroTitle,
              { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
            ]}
          >
            {isBangla ? 'প্রোমোশনাল ' : 'Promotional '}
            <Text style={styles.heroHighlightChip}>{isBangla ? 'অফার' : 'Offers'}</Text> {isBangla ? 'ও কুপন' : '& Coupons'}
          </Text>

          {/* Subtitle */}
          <Text
            style={[
              styles.heroSubtitle,
              { color: isDarkMode ? '#94A3B8' : '#64748B' },
            ]}
          >
            {isBangla ? 'নিচের যেকোনো কোড কপি করুন এবং চেকআউট পেজে পেস্ট করে বিশেষ ছাড় উপভোগ করুন।' : 'Copy any code below and apply it at checkout to unlock big savings on your order.'}
          </Text>

          {/* Stats Summary Cards Row */}
          <View style={styles.statsRow}>
            {/* Stat Card 1: White Card */}
            <View
              style={[
                styles.statCardWhite,
                {
                  backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF',
                  borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                },
              ]}
            >
              <Text
                style={[
                  styles.statNumberBlack,
                  { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                ]}
              >
                7
              </Text>
              <Text
                style={[
                  styles.statLabelGray,
                  { color: isDarkMode ? '#94A3B8' : '#64748B' },
                ]}
              >
                {isBangla ? 'সক্রিয় অফার' : 'ACTIVE OFFERS'}
              </Text>
            </View>

            {/* Stat Card 2: Purple Filled Card */}
            <View style={styles.statCardPurple}>
              <Text style={styles.statNumberWhite}>1025+</Text>
              <Text style={styles.statLabelLight}>{isBangla ? 'সর্বমোট সাশ্রয়' : 'TOTAL SAVINGS'}</Text>
            </View>
          </View>

          {/* Search Bar Input */}
          <View style={styles.searchSection}>
            <View
              style={[
                styles.searchBox,
                {
                  backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF',
                  borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                },
              ]}
            >
              <Ionicons
                name="search-outline"
                size={20}
                color={isDarkMode ? '#64748B' : '#94A3B8'}
                style={{ marginRight: 10 }}
              />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder={isBangla ? 'কোড, ক্যাটাগরি বা অফার সার্চ করুন...' : 'Search by code, category or offer name...'}
                placeholderTextColor={isDarkMode ? '#64748B' : '#94A3B8'}
                style={[
                  styles.searchInput,
                  { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                ]}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Ionicons
                    name="close-circle"
                    size={18}
                    color={isDarkMode ? '#64748B' : '#94A3B8'}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Category Filter Horizontal Tabs */}
          <View style={styles.tabsScrollWrapper}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tabsScrollContainer}
            >
              {CATEGORY_TABS.map((tab) => {
                const isActive = activeTab === tab.key;
                const tabTitle = tab.key === 'all' ? t('allOffers') : t(tab.key === 'food' ? 'foodDelivery' : tab.key);

                return (
                  <TouchableOpacity
                    key={tab.key}
                    activeOpacity={0.8}
                    onPress={() => setActiveTab(tab.key)}
                    style={[
                      styles.filterTabPill,
                      isActive
                        ? styles.filterTabPillActive
                        : [
                            styles.filterTabPillInactive,
                            {
                              backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF',
                              borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                            },
                          ],
                    ]}
                  >
                    <Ionicons
                      name={tab.icon as any}
                      size={16}
                      color={isActive ? '#FFFFFF' : isDarkMode ? '#94A3B8' : '#475569'}
                    />
                    <Text
                      style={[
                        styles.filterTabText,
                        isActive
                          ? styles.filterTabTextActive
                          : { color: isDarkMode ? '#E2E8F0' : '#334155' },
                      ]}
                    >
                      {tabTitle}
                    </Text>

                    <View
                      style={[
                        styles.tabCountBadge,
                        isActive
                          ? styles.tabCountBadgeActive
                          : { backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9' },
                      ]}
                    >
                      <Text
                        style={[
                          styles.tabCountBadgeText,
                          isActive
                            ? styles.tabCountBadgeTextActive
                            : { color: isDarkMode ? '#94A3B8' : '#475569' },
                        ]}
                      >
                        {tab.count}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>

        {/* OFFERS LIST FEED SECTION */}
        <View style={styles.offersListSection}>
          {/* Subtitle Header: Showing X offers */}
          <Text style={styles.showingOffersText}>
            {isBangla ? (
              <>
                মোট <Text style={styles.showingOffersCount}>{filteredOffers.length}</Text> টি অফার দেখানো হচ্ছে
              </>
            ) : (
              <>
                Showing <Text style={styles.showingOffersCount}>{filteredOffers.length}</Text> offers
              </>
            )}
          </Text>

          {filteredOffers.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons
                name="ticket-outline"
                size={40}
                color={isDarkMode ? '#475569' : '#94A3B8'}
              />
              <Text
                style={[
                  styles.emptyStateText,
                  { color: isDarkMode ? '#94A3B8' : '#64748B' },
                ]}
              >
                {isBangla ? 'আপনার অনুসন্ধানের সাথে মিল থাকা কোনো সক্রিয় কুপন পাওয়া যায়নি।' : 'No active coupons found matching your search.'}
              </Text>
            </View>
          ) : (
            filteredOffers.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.ticketCardContainer,
                  {
                    backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                    borderColor: isDarkMode ? '#334155' : '#F1F5F9',
                  },
                ]}
              >
                {/* Left Stub Block */}
                <View
                  style={[
                    styles.ticketLeftStub,
                    { backgroundColor: item.leftBgColor || '#4F46E5' },
                  ]}
                >
                  <Text style={styles.stubPercentSymbol}>%</Text>
                  <Text style={styles.stubDiscountValue}>{item.discountVal}</Text>
                  <Text style={styles.stubDiscountSub}>{item.discountSub}</Text>
                </View>

                {/* Vertical Dashed Line Divider */}
                <View style={styles.verticalDashedDivider} />

                {/* Top Notch Cutout */}
                <View
                  style={[
                    styles.topNotchCutout,
                    {
                      backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                      borderColor: isDarkMode ? '#334155' : '#F1F5F9',
                    },
                  ]}
                />

                {/* Bottom Notch Cutout */}
                <View
                  style={[
                    styles.bottomNotchCutout,
                    {
                      backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                      borderColor: isDarkMode ? '#334155' : '#F1F5F9',
                    },
                  ]}
                />

                {/* Right Details Section */}
                <View style={styles.ticketRightContent}>
                  {/* Top Meta Row: Category Tag & Expiry */}
                  <View style={styles.metaTopRow}>
                    <View
                      style={[
                        styles.categoryTagPill,
                        {
                          backgroundColor: isDarkMode ? '#312E81' : '#EEF2FF',
                          borderColor: isDarkMode ? '#4338CA' : '#E0E7FF',
                        },
                      ]}
                    >
                      <Ionicons name="pricetag-outline" size={11} color="#4F46E5" />
                      <Text style={styles.categoryTagText}>
                        {item.categoryKey === 'all' ? t('allOffers') : t(item.categoryKey === 'food' ? 'foodDelivery' : item.categoryKey)}
                      </Text>
                    </View>

                    <View style={styles.expiryRow}>
                      <Ionicons
                        name="time-outline"
                        size={13}
                        color={isDarkMode ? '#94A3B8' : '#94A3B8'}
                        style={{ marginRight: 3 }}
                      />
                      <Text
                        style={[
                          styles.expiryText,
                          { color: isDarkMode ? '#94A3B8' : '#64748B' },
                        ]}
                      >
                        {isBangla ? 'মেয়াদ:' : 'Expires:'} {item.expiry}
                      </Text>
                    </View>
                  </View>

                  {/* Title & Description */}
                  <Text
                    style={[
                      styles.couponTitle,
                      { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                    ]}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={[
                      styles.couponDesc,
                      { color: isDarkMode ? '#94A3B8' : '#64748B' },
                    ]}
                  >
                    {item.description}
                  </Text>

                  {/* Min Order Info */}
                  <Text
                    style={[
                      styles.minOrderText,
                      { color: isDarkMode ? '#64748B' : '#94A3B8' },
                    ]}
                  >
                    {isBangla ? 'নূন্যতম অর্ডার:' : 'Min. order:'} {item.minOrder}
                  </Text>

                  {/* Bottom Action Row: Code Pill + Copy Icon Button */}
                  <View style={styles.bottomActionRow}>
                    <View
                      style={[
                        styles.codePillBox,
                        { backgroundColor: isDarkMode ? '#0F172A' : '#F1F5F9' },
                      ]}
                    >
                      <Text
                        style={[
                          styles.codePillText,
                          { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                        ]}
                      >
                        {item.code}
                      </Text>
                    </View>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => handleCopyCode(item.code)}
                      style={[
                        styles.copyIconBtn,
                        copiedCode === item.code
                          ? styles.copyIconBtnCopied
                          : { backgroundColor: isDarkMode ? '#334155' : '#0F172A' },
                      ]}
                    >
                      <Ionicons
                        name={copiedCode === item.code ? 'checkmark' : 'copy-outline'}
                        size={17}
                        color="#FFFFFF"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          )}

          {/* HOW TO REDEEM SECTION matching user screenshot */}
          <View style={styles.redeemSectionWrapper}>
            <View style={styles.redeemCard}>
              <Text style={styles.redeemSubHeader}>{isBangla ? 'কীভাবে অফার রিডিম করবেন' : 'HOW TO REDEEM'}</Text>
              <Text style={styles.redeemTitle}>{isBangla ? 'প্রতি অর্ডারে ছাড় পাওয়ার ৩টি সহজ ধাপ' : '3 Simple Steps to Save'}</Text>

              <View style={styles.redeemStepsContainer}>
                {/* Step 01 */}
                <View style={styles.redeemStepRow}>
                  <View style={styles.stepBadgeBox}>
                    <Text style={styles.stepBadgeText}>01</Text>
                  </View>
                  <Text style={styles.stepLabelText}>{isBangla ? 'কুপন কোড কপি করুন' : 'Copy the code'}</Text>
                </View>

                {/* Step 02 */}
                <View style={styles.redeemStepRow}>
                  <View style={styles.stepBadgeBox}>
                    <Text style={styles.stepBadgeText}>02</Text>
                  </View>
                  <Text style={styles.stepLabelText}>{isBangla ? 'কার্টে পণ্য যোগ করুন' : 'Add items to cart'}</Text>
                </View>

                {/* Step 03 */}
                <View style={styles.redeemStepRow}>
                  <View style={styles.stepBadgeBox}>
                    <Text style={styles.stepBadgeText}>03</Text>
                  </View>
                  <Text style={styles.stepLabelText}>{isBangla ? 'চেকআউটে অ্যাপ্লাই করুন' : 'Apply at checkout'}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  heroContainer: {
    paddingTop: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 16,
  },
  badgeText: {
    color: '#6366F1',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: -0.5,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  heroHighlightChip: {
    backgroundColor: '#EEF2FF',
    color: '#6366F1',
    fontWeight: '900',
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  heroSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 32,
    lineHeight: 18,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCardWhite: {
    flex: 1,
    maxWidth: 160,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumberBlack: {
    fontSize: 28,
    fontWeight: '900',
  },
  statLabelGray: {
    fontSize: 10,
    fontWeight: '800',
    marginTop: 2,
    letterSpacing: 0.5,
  },
  statCardPurple: {
    flex: 1,
    maxWidth: 160,
    backgroundColor: '#6366F1',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  statNumberWhite: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  statLabelLight: {
    fontSize: 10,
    fontWeight: '800',
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 2,
    letterSpacing: 0.5,
  },
  searchSection: {
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 16,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    paddingVertical: 0,
  },
  tabsScrollWrapper: {
    width: '100%',
  },
  tabsScrollContainer: {
    paddingHorizontal: 16,
    gap: 10,
  },
  filterTabPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 22,
    gap: 6,
  },
  filterTabPillActive: {
    backgroundColor: '#6366F1',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  filterTabPillInactive: {
    borderWidth: 1,
  },
  filterTabText: {
    fontSize: 13,
    fontWeight: '700',
  },
  filterTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
  tabCountBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 12,
  },
  tabCountBadgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  tabCountBadgeText: {
    fontSize: 11,
    fontWeight: '800',
  },
  tabCountBadgeTextActive: {
    color: '#FFFFFF',
  },
  offersListSection: {
    padding: 16,
  },
  showingOffersText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 16,
  },
  showingOffersCount: {
    fontWeight: '900',
    color: '#0F172A',
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  emptyStateText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  ticketCardContainer: {
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 16,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    minHeight: 155,
  },
  ticketLeftStub: {
    width: '32%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  stubPercentSymbol: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 16,
    fontWeight: '800',
  },
  stubDiscountValue: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
    marginVertical: 1,
  },
  stubDiscountSub: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  verticalDashedDivider: {
    width: 1,
    height: '100%',
    borderRightWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#E2E8F0',
  },
  topNotchCutout: {
    position: 'absolute',
    top: -12,
    left: '32%',
    marginLeft: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    zIndex: 10,
  },
  bottomNotchCutout: {
    position: 'absolute',
    bottom: -12,
    left: '32%',
    marginLeft: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    zIndex: 10,
  },
  ticketRightContent: {
    flex: 1,
    padding: 14,
    justifyContent: 'space-between',
  },
  metaTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  categoryTagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 12,
    borderWidth: 1,
  },
  categoryTagText: {
    color: '#4F46E5',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  expiryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expiryText: {
    fontSize: 11,
    fontWeight: '600',
  },
  couponTitle: {
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: -0.2,
    marginBottom: 2,
  },
  couponDesc: {
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 15,
  },
  minOrderText: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 8,
  },
  bottomActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  codePillBox: {
    flex: 1,
    height: 38,
    borderRadius: 12,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  codePillText: {
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  copyIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyIconBtnCopied: {
    backgroundColor: '#10B981',
  },
  redeemSectionWrapper: {
    marginTop: 10,
    marginBottom: 20,
  },
  redeemCard: {
    backgroundColor: '#7C3AED',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  redeemSubHeader: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  redeemTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.3,
    marginBottom: 20,
  },
  redeemStepsContainer: {
    gap: 14,
  },
  redeemStepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  stepBadgeBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBadgeText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
  stepLabelText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
});
