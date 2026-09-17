import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useProduct } from '../../context/ProductContext';
import { cartStore } from '../../store/cartStore';
import { AppText as Text } from '../common/AppText';
import { DiscountRibbonBadge } from '../common/DiscountRibbonBadge';

export interface WeightVariant {
  weight: string;
  price: number;
  oldPrice?: number;
}

export interface HappyHourProduct {
  id: string;
  brand: string;
  title: string;
  imageUrl: string;
  discountText: string;
  weight: string;
  rating: number;
  reviewsCount: number;
  oldPrice: number;
  price: number;
  category: string;
  variants?: WeightVariant[];
}

import { groceryData } from '../../data/productsData';

const HAPPY_HOUR_PRODUCTS: HappyHourProduct[] = groceryData.happyHour as HappyHourProduct[];

const FILTER_TABS = [
  { id: 'all', labelKey: 'allDeals' },
  { id: 'atta', labelKey: 'attaMaidaSuji' },
  { id: 'dryVeg', labelKey: 'dryVegetables' },
  { id: 'rice', labelKey: 'packedRice' },
  { id: 'oil', labelKey: 'oilGhee' },
];

interface GroceryHappyHourProps {
  onAddToCart?: (product: HappyHourProduct) => void;
  onViewAllPress?: () => void;
}

export const GroceryHappyHour: React.FC<GroceryHappyHourProps> = ({
  onAddToCart,
  onViewAllPress,
}) => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const { openProductDetails } = useProduct();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, WeightVariant>>({});

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredProducts =
    activeTab === 'all'
      ? HAPPY_HOUR_PRODUCTS
      : HAPPY_HOUR_PRODUCTS.filter((p) => p.category === activeTab);

  return (
    <View className="mx-4 my-6 relative">
      {/* Backdrop Overlay to Close Dropdown on Outside Tap */}
      {openDropdownId ? (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setOpenDropdownId(null)}
          style={{
            position: 'absolute',
            top: -1000,
            left: -1000,
            right: -1000,
            bottom: -1000,
            zIndex: 20,
            backgroundColor: 'transparent',
          }}
        />
      ) : null}

      {/* Main Container Card */}
      <View
        className={`rounded-3xl border shadow-md p-3.5 sm:p-5 ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-[#F8FAFC] border-slate-200/80'
        }`}
      >
        {/* 1. Header Row (HAPPY HOUR Title + Countdown Timer Pills) */}
        <View className="flex-row flex-wrap items-center justify-between gap-y-3 mb-4">
          {/* Section Title */}
          <Text
            className={`text-xl sm:text-2xl font-black tracking-tight ${
              isDarkMode ? 'text-slate-50' : 'text-slate-900'
            }`}
          >
            {t('happyHourTitle')}
          </Text>

          {/* Countdown Timer Pills */}
          <View className="flex-row items-center gap-1.5">
            {/* Hours Pill */}
            <View className="bg-[#E11D48] px-2.5 py-1 rounded-xl items-center justify-center">
              <Text className="text-white text-xs font-black">23</Text>
              <Text className="text-white text-[9px] font-bold tracking-tighter uppercase">
                {t('hoursLabel')}
              </Text>
            </View>

            {/* Minutes Pill */}
            <View className="bg-[#E11D48] px-2.5 py-1 rounded-xl items-center justify-center">
              <Text className="text-white text-xs font-black">17</Text>
              <Text className="text-white text-[9px] font-bold tracking-tighter uppercase">
                {t('minsLabel')}
              </Text>
            </View>

            {/* Seconds Pill */}
            <View className="bg-[#E11D48] px-2.5 py-1 rounded-xl items-center justify-center">
              <Text className="text-white text-xs font-black">32</Text>
              <Text className="text-white text-[9px] font-bold tracking-tighter uppercase">
                {t('secsLabel')}
              </Text>
            </View>

            {/* Left Badge */}
            <View
              className={`px-3 py-1.5 rounded-full border border-[#E11D48] shadow-xs ${
                isDarkMode ? 'bg-slate-900' : 'bg-white'
              }`}
            >
              <Text className="text-[#E11D48] text-xs font-bold">
                {t('leftText')}
              </Text>
            </View>

            {/* View All Button */}
            {onViewAllPress ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onViewAllPress}
                className={`flex-row items-center px-3 py-1.5 rounded-full border shadow-xs gap-1 cursor-pointer ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <Text className={`text-xs font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                  {t('viewAll')}
                </Text>
                <Ionicons name="chevron-forward" size={14} color={isDarkMode ? '#94A3B8' : '#475569'} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        {/* 2. Sub-Category Filter Bar (Horizontal Pill Tabs) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, paddingBottom: 4 }}
        >
          {FILTER_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                activeOpacity={0.8}
                onPress={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full border ${
                  isActive
                    ? 'bg-[#FBBF24] border-[#FBBF24] shadow-xs'
                    : isDarkMode
                    ? 'bg-slate-950 border-slate-800'
                    : 'bg-white border-slate-200'
                }`}
              >
                <Text
                  className={`text-xs font-bold ${
                    isActive
                      ? 'text-slate-950'
                      : isDarkMode
                      ? 'text-slate-300'
                      : 'text-slate-700'
                  }`}
                >
                  {t(tab.labelKey)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* 3. Divider Line */}
        <View
          className={`h-[1px] w-full my-4 ${
            isDarkMode ? 'bg-slate-800' : 'bg-slate-200/80'
          }`}
        />

        {/* 4. Product Cards Touch Swipe Carousel - E-Commerce Style Layout */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10, paddingRight: 4 }}
        >
          {filteredProducts.map((item) => {
            const currentVariant = selectedVariants[item.id] || {
              weight: item.weight,
              price: item.price,
              oldPrice: item.oldPrice,
            };
            const isOpen = openDropdownId === item.id;

            const activeDiscountText =
              currentVariant.oldPrice && currentVariant.oldPrice > currentVariant.price
                ? `৳${currentVariant.oldPrice - currentVariant.price} OFF`
                : item.discountText;

            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.9}
                onPress={() =>
                  openProductDetails({
                    id: item.id,
                    title: item.title,
                    brand: item.brand,
                    category: 'GROCERY',
                    price: `৳${currentVariant.price}`,
                    oldPrice: currentVariant.oldPrice ? `৳${currentVariant.oldPrice}` : undefined,
                    imageUrl: item.imageUrl,
                    rating: item.rating,
                    reviewsCount: item.reviewsCount,
                    discountBadge: activeDiscountText,
                    weight: currentVariant.weight,
                  })
                }
                style={{ borderRadius: 12 }}
                className={`w-[158px] sm:w-[210px] md:w-[230px] rounded-xl border overflow-hidden shadow-xs relative ${
                  isDarkMode
                    ? 'bg-slate-950 border-slate-800'
                    : 'bg-white border-slate-200/90'
                }`}
              >
                {/* Product Image Box - Full Width to Top, Left, Right Edge */}
                <View className="w-full h-[165px] sm:h-[185px] bg-slate-100 dark:bg-slate-900 relative items-center justify-center overflow-hidden">
                  {/* Discount Badge Ribbon (Top Left) */}
                  {activeDiscountText ? (
                    <View className="absolute top-0 left-3 z-10">
                      <DiscountRibbonBadge discountText={activeDiscountText} />
                    </View>
                  ) : null}

                  {/* Wishlist Heart Icon (Top Right) */}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => toggleWishlist(item.id)}
                    className={`absolute top-2.5 right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full items-center justify-center z-10 shadow-sm border ${
                      isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'
                    }`}
                  >
                    <Ionicons
                      name={wishlist[item.id] ? 'heart' : 'heart-outline'}
                      size={15}
                      color={wishlist[item.id] ? '#EF4444' : isDarkMode ? '#F8FAFC' : '#334155'}
                    />
                  </TouchableOpacity>

                  {/* Full Bleed Image */}
                  <Image
                    source={{ uri: item.imageUrl }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />

                  {/* Interactive Weight Options Dropdown Popup */}
                  {isOpen && item.variants && (
                    <View
                      className={`absolute top-2 left-2 right-2 rounded-xl shadow-2xl border overflow-hidden py-0.5 z-30 ${
                        isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
                      }`}
                    >
                      {item.variants.map((v) => {
                        const isSelected =
                          v.weight.toLowerCase() === currentVariant.weight.toLowerCase();
                        return (
                          <TouchableOpacity
                            key={v.weight}
                            activeOpacity={0.8}
                            onPress={() => {
                              setSelectedVariants((prev) => ({ ...prev, [item.id]: v }));
                              setOpenDropdownId(null);
                            }}
                            className={`flex-row items-center justify-between px-3 py-1.5 rounded-none ${
                              isSelected
                                ? 'bg-[#6F4E37] dark:bg-amber-950'
                                : 'bg-transparent'
                            }`}
                          >
                            <Text
                              className={`text-[11px] ${
                                isSelected
                                  ? 'font-black text-amber-300'
                                  : 'font-semibold text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              {v.weight}
                            </Text>
                            <Text
                              className={`text-[11px] ${
                                isSelected
                                  ? 'font-black text-amber-300'
                                  : 'font-bold text-slate-500 dark:text-slate-400'
                              }`}
                            >
                              ৳{v.price}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  )}

                  {/* Weight Tag Badge Button with Chevron Toggle */}
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => setOpenDropdownId(isOpen ? null : item.id)}
                    className="bg-slate-800/90 px-2 py-0.5 rounded-lg flex-row items-center gap-0.5 absolute bottom-2 right-2 z-10 shadow-xs"
                  >
                    <Text className="text-white text-[9px] sm:text-[10px] font-black uppercase">
                      {currentVariant.weight}
                    </Text>
                    <Ionicons
                      name={isOpen ? 'chevron-up' : 'chevron-down'}
                      size={11}
                      color="#FFFFFF"
                    />
                  </TouchableOpacity>
                </View>

                {/* Product Info Content Area (Padding below image) */}
                <View className="p-3 pt-2.5 pb-3">
                  <Text className="text-[9px] sm:text-[10px] font-black uppercase text-slate-400 tracking-wider mb-0.5">
                    {item.brand}
                  </Text>
                  <Text
                    numberOfLines={2}
                    className={`text-xs sm:text-sm font-bold leading-4 sm:leading-5 mb-1 ${
                      isDarkMode ? 'text-slate-100' : 'text-slate-900'
                    }`}
                  >
                    {item.title}
                  </Text>

                  {/* Rating */}
                  <View className="flex-row items-center gap-1 mb-2.5">
                    <Ionicons name="star" size={12} color="#F59E0B" />
                    <Text
                      className={`text-[11px] sm:text-xs font-semibold ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      {item.rating}{' '}
                      <Text className="text-slate-400 font-normal">
                        ({item.reviewsCount})
                      </Text>
                    </Text>
                  </View>

                  {/* Price & Add Button Row */}
                  <View className="flex-row items-center justify-between mt-auto">
                    <View>
                      {currentVariant.oldPrice ? (
                        <Text className="text-[10px] sm:text-[11px] line-through text-slate-400 font-semibold">
                          ৳{currentVariant.oldPrice}
                        </Text>
                      ) : null}
                      <Text
                        className={`text-sm sm:text-base font-black ${
                          isDarkMode ? 'text-slate-50' : 'text-slate-900'
                        }`}
                      >
                        ৳{currentVariant.price}
                      </Text>
                    </View>

                    {/* + Add Button */}
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        cartStore.addItem({
                          id: item.id,
                          name: item.title,
                          price: currentVariant.price,
                          image: item.imageUrl,
                        });
                        onAddToCart?.(item);
                      }}
                      className="bg-[#059669] active:bg-emerald-700 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl flex-row items-center justify-center shadow-xs"
                    >
                      <Text className="text-white text-[11px] sm:text-xs font-black">
                        {t('addBtnText')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* 5. Footer Subtitle */}
        <View
          className={`h-[1px] w-full mt-4 mb-3 ${
            isDarkMode ? 'bg-slate-800' : 'bg-slate-200/60'
          }`}
        />
        <Text
          className={`text-xs font-semibold text-center ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          {filteredProducts.length} {t('happyHourSub')}
        </Text>
      </View>
    </View>
  );
};
