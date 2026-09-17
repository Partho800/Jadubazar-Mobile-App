import React, { useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
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

export interface HotTrendingProduct {
  id: string;
  brand: string;
  title: string;
  imageUrl: string;
  discountText?: string;
  weight: string;
  rating: number;
  reviewsCount: number;
  oldPrice?: number;
  price: number;
  variants?: WeightVariant[];
}

const HOT_TRENDING_PRODUCTS: HotTrendingProduct[] = [
  {
    id: 'ht1',
    brand: 'HAPPY COW',
    title: 'Happy Cow Instant Milk Powder 1kg',
    imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
    discountText: '৳100 OFF',
    weight: '1KG',
    rating: 4.8,
    reviewsCount: 120,
    oldPrice: 850,
    price: 750,
    variants: [
      { weight: '1kg', price: 750, oldPrice: 850 },
      { weight: '500g', price: 390, oldPrice: 440 },
    ],
  },
  {
    id: 'ht2',
    brand: "FOSTER CLARK'S",
    title: "Foster Clark's Orange Instant Drink Powder 1kg",
    imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
    discountText: '৳120 OFF',
    weight: '1KG',
    rating: 4.8,
    reviewsCount: 120,
    oldPrice: 1300,
    price: 1180,
    variants: [
      { weight: '1kg', price: 1180, oldPrice: 1300 },
      { weight: '500g', price: 620, oldPrice: 680 },
    ],
  },
  {
    id: 'ht3',
    brand: 'AABESH',
    title: 'Aabesh Masala Tea (Buy4 Get 1 Free)',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    discountText: '৳65 OFF',
    weight: '400G',
    rating: 4.8,
    reviewsCount: 120,
    oldPrice: 630,
    price: 565,
    variants: [
      { weight: '400g', price: 565, oldPrice: 630 },
      { weight: '200g', price: 295, oldPrice: 330 },
    ],
  },
  {
    id: 'ht4',
    brand: 'NESCAFE',
    title: 'Nescafe Classic Instant Coffee Jar 200g',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    discountText: '৳110 OFF',
    weight: '200G',
    rating: 4.9,
    reviewsCount: 185,
    oldPrice: 1000,
    price: 890,
    variants: [
      { weight: '200g', price: 890, oldPrice: 1000 },
      { weight: '100g', price: 460, oldPrice: 510 },
    ],
  },
  {
    id: 'ht5',
    brand: 'TANG',
    title: 'Tang Orange Instant Drink Powder 500g',
    imageUrl: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80',
    discountText: '৳50 OFF',
    weight: '500G',
    rating: 4.8,
    reviewsCount: 140,
    oldPrice: 470,
    price: 420,
    variants: [
      { weight: '500g', price: 420, oldPrice: 470 },
      { weight: '250g', price: 220, oldPrice: 245 },
    ],
  },
];

interface GroceryHotTrendingProps {
  onAddToCart?: (product: HotTrendingProduct) => void;
  onViewAllPress?: () => void;
}

export const GroceryHotTrending: React.FC<GroceryHotTrendingProps> = ({
  onAddToCart,
  onViewAllPress,
}) => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const scrollX = useRef<number>(0);
  const { openProductDetails } = useProduct();
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, WeightVariant>>({});

  const cardStep = width >= 640 ? 246 : 168;

  const handleScrollPrev = () => {
    const targetX = Math.max(0, scrollX.current - cardStep);
    scrollRef.current?.scrollTo({ x: targetX, animated: true });
  };

  const handleScrollNext = () => {
    scrollRef.current?.scrollTo({ x: scrollX.current + cardStep, animated: true });
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollX.current = event.nativeEvent.contentOffset.x;
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <View className="my-6 w-full relative">
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

      {/* 1. Header Row - Strictly 1 Line Layout */}
      <View className="flex-row items-center justify-between px-4 mb-4 gap-1.5 w-full">
        {/* Left Side: Title + Emoji + Count Badge */}
        <View className="flex-1 flex-row items-center gap-1.5 min-w-0 shrink">
          <Text
            numberOfLines={1}
            className={`text-xs sm:text-base md:text-xl font-black tracking-tight shrink min-w-0 ${
              isDarkMode ? 'text-slate-50' : 'text-slate-900'
            }`}
          >
            {t('hotTrendingTitle')} 🔥
          </Text>
          <View className="bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full shrink-0">
            <Text className="text-emerald-700 dark:text-emerald-400 text-[10px] sm:text-[11px] font-extrabold">
              {t('itemsCountTag')}
            </Text>
          </View>
        </View>

        {/* Right Side: Prev / Next Arrows Pill & View All Button */}
        <View className="flex-row items-center gap-1 sm:gap-1.5 shrink-0">
          <View
            className={`flex-row items-center rounded-full border p-0.5 shadow-xs ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100/80 border-slate-200'
            }`}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleScrollPrev}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full items-center justify-center"
            >
              <Ionicons
                name="chevron-back"
                size={14}
                color={isDarkMode ? '#94A3B8' : '#475569'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleScrollNext}
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full items-center justify-center ${
                isDarkMode ? 'bg-slate-800' : 'bg-white shadow-xs'
              }`}
            >
              <Ionicons
                name="chevron-forward"
                size={14}
                color={isDarkMode ? '#94A3B8' : '#475569'}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onViewAllPress}
            className={`flex-row items-center px-2.5 sm:px-3.5 py-1.5 rounded-full border shadow-xs gap-1 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <Text
              numberOfLines={1}
              className={`text-[11px] sm:text-xs font-bold ${
                isDarkMode ? 'text-slate-100' : 'text-slate-800'
              }`}
            >
              {t('viewAllBtn')}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={12}
              color={isDarkMode ? '#94A3B8' : '#475569'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. Product Cards Carousel */}
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 10 }}
      >
        {HOT_TRENDING_PRODUCTS.map((item) => {
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
              {/* Product Image Box */}
              <View className="w-full h-[165px] sm:h-[185px] bg-slate-50 dark:bg-slate-900 relative items-center justify-center overflow-hidden">
                {/* Discount Ribbon Badge */}
                {activeDiscountText ? (
                  <View className="absolute top-0 left-3 z-10">
                    <DiscountRibbonBadge discountText={activeDiscountText} />
                  </View>
                ) : null}

                {/* Wishlist Heart Button */}
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

                {/* Weight Tag Badge Button */}
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

              {/* Product Info Content Area */}
              <View className="p-3 pt-2.5 pb-3 justify-between flex-1">
                <View>
                  <Text className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase mb-0.5">
                    {item.brand}
                  </Text>
                  <Text
                    numberOfLines={2}
                    className={`text-xs sm:text-sm font-extrabold leading-4 mb-1.5 ${
                      isDarkMode ? 'text-slate-100' : 'text-slate-900'
                    }`}
                  >
                    {item.title}
                  </Text>

                  <View className="flex-row items-center gap-1 mb-2">
                    <Ionicons name="star" size={13} color="#F59E0B" />
                    <Text className="text-xs font-black text-slate-700 dark:text-slate-300">
                      {item.rating}
                    </Text>
                    <Text className="text-[11px] font-semibold text-slate-400">
                      ({item.reviewsCount})
                    </Text>
                  </View>
                </View>

                {/* Price & + Add Button Row */}
                <View className="flex-row items-center justify-between pt-1">
                  <View>
                    {currentVariant.oldPrice ? (
                      <Text className="text-[10px] sm:text-xs font-semibold text-slate-400 line-through">
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
    </View>
  );
};
