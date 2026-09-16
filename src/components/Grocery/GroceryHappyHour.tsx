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

const HAPPY_HOUR_PRODUCTS: HappyHourProduct[] = [
  // Atta, Maida & Suji (5 Products)
  {
    id: 'hp1',
    brand: 'SUNSHINE',
    title: 'Sunshine Maida 2kg',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80',
    discountText: '৳10 OFF',
    weight: '2 KG',
    rating: 4.8,
    reviewsCount: 95,
    oldPrice: 160,
    price: 150,
    category: 'atta',
    variants: [
      { weight: '2kg', price: 150, oldPrice: 160 },
      { weight: '1kg', price: 80, oldPrice: 85 },
      { weight: '500gm', price: 42, oldPrice: 45 },
      { weight: '250gm', price: 22, oldPrice: 24 },
    ],
  },
  {
    id: 'hp2',
    brand: 'PUSTI',
    title: 'Pusti Maida 2kg',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80',
    discountText: '৳10 OFF',
    weight: '2 KG',
    rating: 4.8,
    reviewsCount: 95,
    oldPrice: 150,
    price: 140,
    category: 'atta',
    variants: [
      { weight: '2kg', price: 140, oldPrice: 150 },
      { weight: '1kg', price: 72, oldPrice: 78 },
      { weight: '500gm', price: 38, oldPrice: 42 },
    ],
  },
  {
    id: 'hp3',
    brand: 'SUNSHINE',
    title: 'Sunshine Atta 2kg',
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=500&q=80',
    discountText: '৳15 OFF',
    weight: '2 KG',
    rating: 4.9,
    reviewsCount: 120,
    oldPrice: 130,
    price: 115,
    category: 'atta',
    variants: [
      { weight: '2kg', price: 115, oldPrice: 130 },
      { weight: '1kg', price: 60, oldPrice: 68 },
    ],
  },
  {
    id: 'hp4',
    brand: 'TEER',
    title: 'Teer Premium Suji 500g',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80',
    discountText: '৳5 OFF',
    weight: '500 GM',
    rating: 4.7,
    reviewsCount: 64,
    oldPrice: 60,
    price: 55,
    category: 'atta',
  },
  {
    id: 'hp5',
    brand: 'FRESH',
    title: 'Fresh Whole Wheat Atta 2kg',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80',
    discountText: '৳12 OFF',
    weight: '2 KG',
    rating: 4.8,
    reviewsCount: 110,
    oldPrice: 145,
    price: 133,
    category: 'atta',
  },

  // Dry Vegetables (5 Products)
  {
    id: 'hp6',
    brand: 'ORGANIC',
    title: 'Dried Shiitake Mushroom 200g',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=80',
    discountText: '৳20 OFF',
    weight: '200 GM',
    rating: 4.9,
    reviewsCount: 42,
    oldPrice: 280,
    price: 260,
    category: 'dryVeg',
  },
  {
    id: 'hp7',
    brand: 'PRAN',
    title: 'Dried Garlic Granules 250g',
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=500&q=80',
    discountText: '৳15 OFF',
    weight: '250 GM',
    rating: 4.7,
    reviewsCount: 38,
    oldPrice: 150,
    price: 135,
    category: 'dryVeg',
  },
  {
    id: 'hp8',
    brand: 'SPICE KING',
    title: 'Dehydrated Onion Flakes 200g',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80',
    discountText: '৳10 OFF',
    weight: '200 GM',
    rating: 4.8,
    reviewsCount: 55,
    oldPrice: 140,
    price: 130,
    category: 'dryVeg',
  },
  {
    id: 'hp9',
    brand: 'ITALIA',
    title: 'Sundried Tomatoes 150g',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80',
    discountText: '৳30 OFF',
    weight: '150 GM',
    rating: 4.9,
    reviewsCount: 68,
    oldPrice: 320,
    price: 290,
    category: 'dryVeg',
  },
  {
    id: 'hp10',
    brand: 'RADHUNI',
    title: 'Dried Red Chilli Whole 250g',
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=500&q=80',
    discountText: '৳10 OFF',
    weight: '250 GM',
    rating: 4.8,
    reviewsCount: 90,
    oldPrice: 180,
    price: 170,
    category: 'dryVeg',
  },

  // Packed Rice (5 Products)
  {
    id: 'hp11',
    brand: 'FRESH',
    title: 'Fresh Miniket Rice 5kg',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80',
    discountText: '৳25 OFF',
    weight: '5 KG',
    rating: 4.8,
    reviewsCount: 110,
    oldPrice: 380,
    price: 355,
    category: 'rice',
  },
  {
    id: 'hp12',
    brand: 'TEER',
    title: 'Nazirshail Rice 5kg',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80',
    discountText: '৳30 OFF',
    weight: '5 KG',
    rating: 4.9,
    reviewsCount: 145,
    oldPrice: 420,
    price: 390,
    category: 'rice',
  },
  {
    id: 'hp13',
    brand: 'PRAN',
    title: 'Chinigura Aromatic Rice 1kg',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80',
    discountText: '৳15 OFF',
    weight: '1 KG',
    rating: 4.9,
    reviewsCount: 230,
    oldPrice: 160,
    price: 145,
    category: 'rice',
  },
  {
    id: 'hp14',
    brand: 'ACI',
    title: 'Katari Bhog Special Rice 5kg',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80',
    discountText: '৳20 OFF',
    weight: '5 KG',
    rating: 4.7,
    reviewsCount: 75,
    oldPrice: 400,
    price: 380,
    category: 'rice',
  },
  {
    id: 'hp15',
    brand: 'INDIA GATE',
    title: 'Basmati Rice 2kg',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80',
    discountText: '৳40 OFF',
    weight: '2 KG',
    rating: 4.9,
    reviewsCount: 310,
    oldPrice: 450,
    price: 410,
    category: 'rice',
  },

  // Oil & Ghee (5 Products)
  {
    id: 'hp16',
    brand: 'RADHUNI',
    title: 'Pure Mustard Oil 1L',
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=80',
    discountText: '৳20 OFF',
    weight: '1 L',
    rating: 4.9,
    reviewsCount: 210,
    oldPrice: 260,
    price: 240,
    category: 'oil',
  },
  {
    id: 'hp17',
    brand: 'RUPCHANDA',
    title: 'Rupchanda Soybean Oil 2L',
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=80',
    discountText: '৳15 OFF',
    weight: '2 L',
    rating: 4.8,
    reviewsCount: 340,
    oldPrice: 330,
    price: 315,
    category: 'oil',
  },
  {
    id: 'hp18',
    brand: 'TEER',
    title: 'Teer Soybean Oil 5L',
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=80',
    discountText: '৳50 OFF',
    weight: '5 L',
    rating: 4.9,
    reviewsCount: 420,
    oldPrice: 810,
    price: 760,
    category: 'oil',
  },
  {
    id: 'hp19',
    brand: 'AARONG',
    title: 'Aarong Pure Ghee 500g',
    imageUrl: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=500&q=80',
    discountText: '৳35 OFF',
    weight: '500 GM',
    rating: 4.9,
    reviewsCount: 290,
    oldPrice: 680,
    price: 645,
    category: 'oil',
  },
  {
    id: 'hp20',
    brand: 'PRAN',
    title: 'Pran Mustard Oil 2L',
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=80',
    discountText: '৳25 OFF',
    weight: '2 L',
    rating: 4.8,
    reviewsCount: 180,
    oldPrice: 510,
    price: 485,
    category: 'oil',
  },
];

const FILTER_TABS = [
  { id: 'all', labelKey: 'allDeals' },
  { id: 'atta', labelKey: 'attaMaidaSuji' },
  { id: 'dryVeg', labelKey: 'dryVegetables' },
  { id: 'rice', labelKey: 'packedRice' },
  { id: 'oil', labelKey: 'oilGhee' },
];

interface GroceryHappyHourProps {
  onAddToCart?: (product: HappyHourProduct) => void;
}

export const GroceryHappyHour: React.FC<GroceryHappyHourProps> = ({
  onAddToCart,
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
                    className="absolute top-2.5 right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/85 dark:bg-slate-900/85 items-center justify-center z-10 shadow-xs"
                  >
                    <Ionicons
                      name={wishlist[item.id] ? 'heart' : 'heart-outline'}
                      size={15}
                      color={wishlist[item.id] ? '#EF4444' : isDarkMode ? '#94A3B8' : '#64748B'}
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
