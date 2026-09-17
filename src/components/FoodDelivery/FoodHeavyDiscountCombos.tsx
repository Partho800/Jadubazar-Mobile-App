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
import { FoodItem } from './FoodPopularBiryani';

const COMBO_PRODUCTS: FoodItem[] = [
  {
    id: 'comb1',
    brand: 'JADUBAZAR KITCHEN',
    title: 'Family Feast Combo (4 Persons)',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
    discountText: '35% OFF',
    rating: 4.9,
    reviewsCount: 520,
    deliveryTime: '35-45 mins',
    oldPrice: 1770,
    price: 1150,
  },
  {
    id: 'comb2',
    brand: 'STAR KACCHI',
    title: 'Kacchi + Jorda + Borhani Value Box',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    discountText: '25% OFF',
    rating: 4.9,
    reviewsCount: 430,
    deliveryTime: '25-35 mins',
    oldPrice: 640,
    price: 480,
  },
  {
    id: 'comb3',
    brand: 'DOMINOS',
    title: '2 Medium Pizzas + 1L Coke Combo',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    discountText: '30% OFF',
    rating: 4.8,
    reviewsCount: 380,
    deliveryTime: '30-40 mins',
    oldPrice: 1270,
    price: 890,
  },
];

interface FoodHeavyDiscountCombosProps {
  onAddToCart?: (item: FoodItem) => void;
  onViewAllPress?: () => void;
}

export const FoodHeavyDiscountCombos: React.FC<FoodHeavyDiscountCombosProps> = ({
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
      {/* 1. Header Row - 1 Line Layout */}
      <View className="flex-row items-center justify-between px-4 mb-3 gap-1.5 w-full">
        <Text
          numberOfLines={1}
          className={`text-base sm:text-xl font-black tracking-tight shrink min-w-0 ${
            isDarkMode ? 'text-slate-50' : 'text-slate-900'
          }`}
        >
          🏷️ {t('heavyDiscountCombosTitle')}
        </Text>

        <View className="flex-row items-center gap-1 sm:gap-1.5 shrink-0">
          <View
            className={`flex-row items-center rounded-full border p-0.5 shadow-xs ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100/80 border-slate-200'
            }`}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleScrollPrev}
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full items-center justify-center ${
                isDarkMode ? 'bg-slate-800' : 'bg-white shadow-xs'
              }`}
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
            className="flex-row items-center px-2.5 sm:px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 dark:bg-amber-950/60 shadow-xs gap-1"
          >
            <Text
              numberOfLines={1}
              className="text-[11px] sm:text-xs font-bold text-[#EA580C]"
            >
              {t('viewAllBtn')}
            </Text>
            <Ionicons name="chevron-forward" size={12} color="#EA580C" />
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
        {COMBO_PRODUCTS.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.9}
            onPress={() =>
              openProductDetails({
                id: item.id,
                title: item.title,
                brand: item.brand,
                category: 'ECOMMERCE',
                price: `৳${item.price}`,
                oldPrice: item.oldPrice ? `৳${item.oldPrice}` : undefined,
                imageUrl: item.imageUrl,
                rating: item.rating,
                reviewsCount: item.reviewsCount,
                discountBadge: item.discountText,
              })
            }
            style={{ borderRadius: 12 }}
            className={`w-[158px] sm:w-[210px] md:w-[230px] rounded-xl border overflow-hidden shadow-xs relative ${
              isDarkMode
                ? 'bg-slate-950 border-slate-800'
                : 'bg-white border-slate-200/90'
            }`}
          >
            <View className="w-full h-[165px] sm:h-[185px] bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
              {item.discountText ? (
                <View className="absolute top-0 left-3 z-10">
                  <DiscountRibbonBadge discountText={item.discountText} />
                </View>
              ) : null}

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

              <Image
                source={{ uri: item.imageUrl }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>

            <View className="p-3 pt-2.5 pb-3 justify-between flex-1">
              <View>
                <Text className="text-[10px] font-extrabold text-orange-600 tracking-wider uppercase mb-0.5">
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

              <View className="flex-row items-center justify-between pt-1">
                <View>
                  {item.oldPrice ? (
                    <Text className="text-[10px] sm:text-xs font-semibold text-slate-400 line-through">
                      ৳{item.oldPrice}
                    </Text>
                  ) : null}
                  <Text
                    className={`text-sm sm:text-base font-black ${
                      isDarkMode ? 'text-slate-50' : 'text-slate-900'
                    }`}
                  >
                    ৳{item.price}
                  </Text>
                </View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    cartStore.addItem({
                      id: item.id,
                      name: item.title,
                      price: item.price,
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
        ))}
      </ScrollView>
    </View>
  );
};
