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
import { useProduct } from '../../context/ProductContext';
import { AppText as Text } from '../common/AppText';

export interface PreOrderPlatterItem {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  discountBadge?: string;
  prepTime?: string;
  timeTag?: string;
}

const PREORDER_PLATTERS: PreOrderPlatterItem[] = [
  {
    id: 'po-1',
    name: 'Grand Royal Basmati Kacchi Platter',
    category: 'Platters',
    price: 2950,
    originalPrice: 3400,
    rating: 5.0,
    reviewsCount: 340,
    discountBadge: '৳450 OFF',
    timeTag: '24h Pre-Order Only',
    prepTime: '24h Advance',
    imageUrl:
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'po-2',
    name: 'Mega Sizzling BBQ & Kebab Platter (Serves 5-6)',
    category: 'Platters',
    price: 2450,
    originalPrice: 2800,
    rating: 4.9,
    reviewsCount: 280,
    discountBadge: '৳350 OFF',
    timeTag: '24h Pre-Order Only',
    prepTime: '24h Advance',
    imageUrl:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'po-3',
    name: 'Signature Mughlai Feast Platter',
    category: 'Platters',
    price: 3800,
    originalPrice: 4400,
    rating: 5.0,
    reviewsCount: 195,
    discountBadge: '৳600 OFF',
    timeTag: '24h Pre-Order Only',
    prepTime: '24h Advance',
    imageUrl:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
  },
];

interface FoodPreOrderPlattersProps {
  onPreOrderPress?: (item: PreOrderPlatterItem) => void;
  onViewAllPress?: () => void;
}

export const FoodPreOrderPlatters: React.FC<FoodPreOrderPlattersProps> = ({
  onPreOrderPress,
  onViewAllPress,
}) => {
  const { isDarkMode } = useTheme();
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const scrollX = useRef<number>(0);
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const { openProductDetails } = useProduct();
  const cardWidth = width >= 640 ? 250 : 220;
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

  return (
    <View className="my-5 w-full relative px-4">
      {/* Container Box with Light Purple Accent */}
      <View
        style={{ backgroundColor: '#F5F3FF', borderRadius: 24 }}
        className="w-full p-4 sm:p-5"
      >
        {/* Header Row - Aligned for Mobile & Browser */}
        <View className="flex-row items-center justify-between mb-4 w-full">
          {/* Ribbon SVG Icon & Title */}
          <View className="flex-row items-center flex-1 min-w-0 pr-2">
            <Ionicons name="ribbon" size={24} color="#8B5CF6" style={{ marginRight: 8 }} />
            <Text
              numberOfLines={2}
              style={{ color: '#0F172A' }}
              className="text-base sm:text-xl font-black tracking-tight flex-1"
            >
              Special 24h Advance Pre-Order Platters
            </Text>
          </View>

          {/* Right Action Controls */}
          <View className="flex-row items-center shrink-0">
            {/* Scroll Buttons */}
            <View
              style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderWidth: 1 }}
              className="flex-row items-center rounded-full p-1 shadow-xs"
            >
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleScrollPrev}
                style={{ backgroundColor: '#F8FAFC' }}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full items-center justify-center shadow-xs"
              >
                <Ionicons name="chevron-back" size={16} color="#334155" />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleScrollNext}
                style={{ backgroundColor: '#F8FAFC' }}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full items-center justify-center shadow-xs ml-1"
              >
                <Ionicons name="chevron-forward" size={16} color="#334155" />
              </TouchableOpacity>
            </View>

            {/* View All Purple Pill Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={onViewAllPress}
              style={{ backgroundColor: '#8B5CF6' }}
              className="px-3.5 py-1.5 rounded-full flex-row items-center ml-2 shadow-sm"
            >
              <Text style={{ color: '#FFFFFF' }} className="text-xs sm:text-sm font-black mr-1">
                View All
              </Text>
              <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Carousel ScrollView */}
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={{ flexGrow: 0 }}
          contentContainerStyle={{
            flexDirection: 'row',
            alignItems: 'stretch',
          }}
        >
          {PREORDER_PLATTERS.map((item, index) => {
            const isFaved = wishlist[item.id];
            const isLast = index === PREORDER_PLATTERS.length - 1;
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
                    status: 'In Stock',
                  })
                }
                style={{
                  width: cardWidth,
                  flexShrink: 0,
                  borderRadius: 20,
                  backgroundColor: '#FFFFFF',
                  marginRight: isLast ? 0 : 16,
                }}
                className="flex-col justify-between overflow-hidden relative shadow-md shrink-0 bg-white"
              >
                {/* Full Width Top Image */}
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

                  {/* Top Left Badges: Red Discount + Purple 24H Tag */}
                  <View className="absolute top-0 left-2 flex-row items-start gap-1 z-10">
                    {item.discountBadge && (
                      <View className="bg-red-600 px-2 py-1 rounded-b-md shadow-sm">
                        <Text className="text-white text-[10px] font-black leading-tight text-center">
                          {item.discountBadge}
                        </Text>
                      </View>
                    )}
                    <View className="bg-[#8B5CF6] px-1.5 py-1 rounded-b-md shadow-sm items-center">
                      <Ionicons name="calendar-outline" size={10} color="#FFFFFF" />
                      <Text className="text-white text-[9px] font-black uppercase leading-tight">
                        24H
                      </Text>
                    </View>
                  </View>

                  {/* Top Right Heart Wishlist Button */}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => toggleWishlist(item.id)}
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)' }}
                    className="w-7 h-7 rounded-full items-center justify-center shadow-xs absolute top-2 right-2 z-10"
                  >
                    <Ionicons
                      name={isFaved ? 'heart' : 'heart-outline'}
                      size={15}
                      color={isFaved ? '#EF4444' : '#64748B'}
                    />
                  </TouchableOpacity>

                  {/* Bottom Left Online Pay Pill */}
                  <View className="bg-black/75 px-2 py-0.5 rounded-full absolute bottom-2 left-2 flex-row items-center gap-1 z-10">
                    <Ionicons name="card-outline" size={11} color="#FFFFFF" />
                    <Text className="text-white text-[10px] font-bold">
                      Online Pay
                    </Text>
                  </View>
                </View>

                {/* Card Content Section */}
                <View className="p-3.5 flex-1 flex-col justify-between">
                  {/* Pre-Order Time Tag */}
                  <View className="flex-row items-center gap-1.5 mb-1">
                    <View className="border border-amber-300 bg-amber-50 px-2 py-0.5 rounded-md flex-row items-center gap-1">
                      <Ionicons name="time-outline" size={10} color="#D97706" />
                      <Text className="text-amber-800 text-[10px] font-bold">
                        {item.timeTag}
                      </Text>
                    </View>
                  </View>

                  {/* Title & Info */}
                  <View className="my-1">
                    <View className="flex-row items-center justify-between gap-1">
                      <Text
                        numberOfLines={1}
                        className="text-slate-900 text-sm sm:text-base font-black flex-1"
                      >
                        {item.name}
                      </Text>
                      <View className="w-3.5 h-3.5 border border-red-600 items-center justify-center p-0.5 shrink-0">
                        <View className="w-1.5 h-1.5 rounded-full bg-red-600" />
                      </View>
                    </View>

                    <Text className="text-slate-400 text-[11px] font-semibold mt-0.5">
                      From 24h • ৳ • {item.category}
                    </Text>
                  </View>

                  {/* Pricing & Purple Pre-Order Button */}
                  <View className="flex-row items-center justify-between mt-2 pt-1 border-t border-slate-100">
                    <View>
                      {item.originalPrice && (
                        <Text className="text-slate-400 text-[11px] line-through">
                          ৳{item.originalPrice}
                        </Text>
                      )}
                      <Text className="text-slate-900 text-lg sm:text-xl font-black">
                        ৳{item.price}
                      </Text>
                    </View>

                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={(e) => {
                        e?.stopPropagation?.();
                        onPreOrderPress?.(item);
                      }}
                      className="bg-[#8B5CF6] active:bg-purple-700 px-3 py-1.5 rounded-full flex-row items-center gap-1 shadow-sm"
                    >
                      <Ionicons name="calendar-outline" size={13} color="#FFFFFF" />
                      <Text className="text-white text-xs sm:text-sm font-black">
                        Pre-Order
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Rating Row */}
                  <View className="flex-row items-center gap-1 mt-1.5">
                    <Ionicons name="star" size={12} color="#F59E0B" />
                    <Text className="text-amber-500 font-extrabold text-xs">
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
    </View>
  );
};
