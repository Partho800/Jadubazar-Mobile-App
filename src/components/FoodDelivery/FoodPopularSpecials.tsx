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

import { foodData } from '../../data/productsData';

export interface FoodDishItem {
  id: string;
  name: string;
  category: string;
  filterCategory: 'platters' | 'breakfast' | 'evening';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  discountBadge?: string;
  isHot?: boolean;
  isPreOrder?: boolean;
  isOutOfStock?: boolean;
  timeTag?: string;
  prepTime?: string;
}

const SPECIAL_DISHES: FoodDishItem[] = foodData.specialDishes as FoodDishItem[];

const FILTER_PILLS = [
  { id: 'f1', label: 'All Dishes', iconName: 'restaurant-outline' },
  { id: 'f2', label: 'Platters', iconName: 'ribbon-outline' },
  { id: 'f3', label: 'Breakfast', iconName: 'cafe-outline' },
  { id: 'f4', label: 'Evening Specials', iconName: 'fast-food-outline' },
];

interface FoodPopularSpecialsProps {
  onAddToCart?: (item: FoodDishItem) => void;
  onViewAllPress?: () => void;
}

export const FoodPopularSpecials: React.FC<FoodPopularSpecialsProps> = ({
  onAddToCart,
  onViewAllPress,
}) => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const { openProductDetails } = useProduct();
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const scrollX = useRef<number>(0);
  const [activeFilter, setActiveFilter] = useState('f1');
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const cardWidth = width >= 640 ? 260 : 225;
  const cardStep = cardWidth + 16;

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

  // Filter products based on selected tab
  const filteredDishes = SPECIAL_DISHES.filter((dish) => {
    if (activeFilter === 'f2') return dish.filterCategory === 'platters';
    if (activeFilter === 'f3') return dish.filterCategory === 'breakfast';
    if (activeFilter === 'f4') return dish.filterCategory === 'evening';
    return true; // 'f1' All Dishes
  });

  return (
    <View className="my-5 w-full relative">
      {/* 1. Header Row */}
      <View className="flex-row items-center justify-between px-4 mb-3.5 w-full">
        <View className="flex-row items-center flex-1 min-w-0 pr-2">
          <Ionicons name="flame" size={24} color="#FF6B00" style={{ marginRight: 8 }} />
          <Text
            numberOfLines={2}
            className={`text-lg sm:text-2xl font-black tracking-tight flex-1 ${
              isDarkMode ? 'text-slate-50' : 'text-slate-900'
            }`}
          >
            Popular Dishes & Chef Specials
          </Text>
        </View>

        <View className="flex-row items-center shrink-0">
          <View
            className={`flex-row items-center rounded-full border p-1 shadow-xs ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100/90 border-slate-200'
            }`}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleScrollPrev}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full items-center justify-center shadow-xs ${
                isDarkMode ? 'bg-slate-800' : 'bg-white'
              }`}
            >
              <Ionicons
                name="chevron-back"
                size={16}
                color={isDarkMode ? '#CBD5E1' : '#334155'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleScrollNext}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full items-center justify-center shadow-xs ml-1 ${
                isDarkMode ? 'bg-slate-800' : 'bg-white'
              }`}
            >
              <Ionicons
                name="chevron-forward"
                size={16}
                color={isDarkMode ? '#CBD5E1' : '#334155'}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onViewAllPress}
            className="flex-row items-center px-2 py-1 ml-1"
          >
            <Text style={{ color: '#FF6B00' }} className="text-xs sm:text-sm font-extrabold mr-0.5">
              View All
            </Text>
            <Ionicons name="arrow-forward" size={14} color="#FF6B00" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. Filter Pills Row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4 mb-4"
        contentContainerStyle={{ paddingRight: 16 }}
      >
        {FILTER_PILLS.map((pill) => {
          const isActive = activeFilter === pill.id;
          return (
            <TouchableOpacity
              key={pill.id}
              activeOpacity={0.8}
              onPress={() => setActiveFilter(pill.id)}
              style={{
                backgroundColor: isActive ? '#FF6B00' : '#FFFFFF',
                borderColor: isActive ? '#FF6B00' : '#E2E8F0',
                marginRight: 10,
              }}
              className="px-4 py-2 rounded-full border shadow-xs flex-row items-center gap-1.5"
            >
              <Ionicons
                name={pill.iconName as any}
                size={16}
                color={isActive ? '#FFFFFF' : '#FF6B00'}
              />
              <Text
                className={`text-xs sm:text-sm font-black ${
                  isActive ? 'text-white' : 'text-slate-800'
                }`}
              >
                {pill.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* 3. Dishes Cards ScrollView */}
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ flexGrow: 0 }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'stretch',
        }}
      >
        {filteredDishes.map((item, index) => {
          const isFaved = wishlist[item.id];
          const isLast = index === filteredDishes.length - 1;
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.92}
              onPress={() =>
                openProductDetails({
                  id: item.id,
                  title: item.name,
                  price: `৳${item.price}`,
                  oldPrice: item.originalPrice ? `৳${item.originalPrice}` : undefined,
                  imageUrl: item.imageUrl,
                  category: 'Food delivery',
                  rating: item.rating,
                  reviewsCount: item.reviewsCount,
                  discountBadge: item.discountBadge,
                  status: item.isOutOfStock ? 'Stock Out' : 'In Stock',
                })
              }
              style={{
                width: cardWidth,
                flexShrink: 0,
                borderRadius: 20,
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderColor: 'rgba(0, 0, 0, 0.08)',
                marginRight: isLast ? 0 : 16,
              }}
              className="flex-col justify-between overflow-hidden relative shadow-md shrink-0 bg-white"
            >
              {/* Full Width Top Image (Edge-to-Edge) */}
              <View
                style={{
                  width: '100%',
                  height: 155,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  overflow: 'hidden',
                  position: 'relative',
                }}
                className="bg-slate-100"
              >
                <Image
                  source={{ uri: item.imageUrl }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                />

                {/* Top Left Ribbon Badges */}
                <View className="absolute top-0 left-2 flex-row items-start gap-1 z-10">
                  {item.discountBadge && (
                    <View className="bg-[#E11D48] px-2 py-1 rounded-b-md shadow-sm">
                      <Text className="text-white text-[10px] font-black leading-tight text-center">
                        {item.discountBadge}
                      </Text>
                    </View>
                  )}
                  {item.isHot && (
                    <View className="bg-[#FF6B00] px-1.5 py-1 rounded-b-md shadow-sm items-center">
                      <Ionicons name="flame" size={11} color="#FFFFFF" />
                      <Text className="text-white text-[9px] font-black uppercase leading-tight">
                        HOT
                      </Text>
                    </View>
                  )}
                </View>

                {/* Top Right Heart Wishlist Button */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => toggleWishlist(item.id)}
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)' }}
                  className="w-8 h-8 rounded-full items-center justify-center shadow-md absolute top-2 right-2 z-10"
                >
                  <Ionicons
                    name={isFaved ? 'heart' : 'heart-outline'}
                    size={16}
                    color={isFaved ? '#EF4444' : '#64748B'}
                  />
                </TouchableOpacity>

              </View>

              {/* Card Content Section */}
              <View className="p-3.5 flex-1 flex-col justify-between">
                {/* Tags Row */}
                {item.isOutOfStock ? (
                  <View className="flex-row items-center gap-1.5 mb-1 flex-wrap">
                    <View className="border border-red-200 bg-red-50 px-2.5 py-0.5 rounded-md">
                      <Text className="text-red-600 text-[10px] font-black">
                        Stock Out
                      </Text>
                    </View>
                  </View>
                ) : null}

                {/* Title & Info */}
                <View className="my-1">
                  <View className="flex-row items-center justify-between gap-1">
                    <Text
                      numberOfLines={1}
                      className="text-slate-900 text-base sm:text-lg font-black flex-1"
                    >
                      {item.name}
                    </Text>
                    <View className="w-3.5 h-3.5 border border-red-600 items-center justify-center p-0.5 shrink-0">
                      <View className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    </View>
                  </View>

                  <Text className="text-slate-400 text-[11px] font-semibold mt-0.5">
                    From 25 min • ৳ • {item.category}
                  </Text>
                </View>

                {/* Pricing & Add Button */}
                <View className="flex-row items-center justify-between mt-2 pt-1 border-t border-slate-100">
                  <View>
                    {item.originalPrice && (
                      <Text className="text-slate-400 text-xs line-through">
                        ৳{item.originalPrice}
                      </Text>
                    )}
                    <Text className="text-slate-900 text-xl sm:text-2xl font-black">
                      ৳{item.price}
                    </Text>
                  </View>

                  {item.isOutOfStock ? (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      className="border border-amber-400 bg-amber-50 px-3 py-1.5 rounded-full flex-row items-center gap-1"
                    >
                      <Ionicons name="time-outline" size={13} color="#D97706" />
                      <Text className="text-amber-800 text-xs font-bold">
                        Out of Stock
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={(e) => {
                        e?.stopPropagation?.();
                        cartStore.addItem({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          originalPrice: item.originalPrice,
                          image: item.imageUrl,
                        });
                        onAddToCart?.(item);
                      }}
                      className="border border-[#FF6B00] bg-orange-50 px-4 py-1.5 rounded-full"
                    >
                      <Text style={{ color: '#FF6B00' }} className="text-xs sm:text-sm font-black">
                        + Add
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>

                {/* Rating Row */}
                <View className="flex-row items-center gap-1 mt-1.5">
                  <Ionicons name="star" size={13} color="#F59E0B" />
                  <Text className="text-slate-900 font-extrabold text-xs">
                    {item.rating}
                  </Text>
                  <Text className="text-slate-400 font-semibold text-xs">
                    ({item.reviewsCount})
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
