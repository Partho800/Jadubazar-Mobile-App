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

export interface FoodItem {
  id: string;
  brand: string;
  title: string;
  imageUrl: string;
  discountText?: string;
  rating: number;
  reviewsCount: number;
  deliveryTime: string;
  oldPrice?: number;
  price: number;
}

const NIGHT_OWL_PRODUCTS: FoodItem[] = [
  {
    id: 'night1',
    brand: 'JADUBAZAR KITCHEN',
    title: 'Kacchi & Borhani Combo Box',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    discountText: '25% OFF',
    rating: 4.9,
    reviewsCount: 310,
    deliveryTime: '20-30 mins',
    oldPrice: 480,
    price: 360,
  },
  {
    id: 'night2',
    brand: 'BURGER LAB',
    title: 'Double Cheese Beef Burger Meal',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    discountText: '30% OFF',
    rating: 4.8,
    reviewsCount: 190,
    deliveryTime: '15-25 mins',
    oldPrice: 415,
    price: 290,
  },
  {
    id: 'night3',
    brand: 'CHILLI ON',
    title: 'Crispy Fried Chicken (4 Pcs Combo)',
    imageUrl: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80',
    discountText: '20% OFF',
    rating: 4.7,
    reviewsCount: 145,
    deliveryTime: '20-30 mins',
    oldPrice: 400,
    price: 320,
  },
];

interface FoodNightOwlDealsProps {
  onAddToCart?: (item: FoodItem) => void;
  onViewAllPress?: () => void;
}

export const FoodNightOwlDeals: React.FC<FoodNightOwlDealsProps> = ({
  onAddToCart,
  onViewAllPress,
}) => {
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
    <View className="my-6 py-5 w-full bg-[#3B0764] rounded-2xl relative overflow-hidden shadow-lg">
      {/* 1. Dark Purple Header Row - 1 Line Layout */}
      <View className="flex-row items-center justify-between px-4 mb-4 gap-1.5 w-full">
        <View className="flex-1 flex-row items-center gap-1.5 min-w-0 shrink">
          <Text
            numberOfLines={1}
            className="text-xs sm:text-base md:text-xl font-black tracking-tight text-white shrink min-w-0 uppercase"
          >
            🌙 {t('nightOwlDealsTitle')}
          </Text>
          <View className="bg-[#581C87] border border-purple-400/30 px-2 py-0.5 rounded-full shrink-0">
            <Text className="text-purple-300 text-[10px] sm:text-[11px] font-extrabold uppercase">
              FLASHSALE
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-1 sm:gap-1.5 shrink-0">
          <View className="flex-row items-center bg-[#581C87] border border-purple-400/30 p-0.5 rounded-full shadow-xs">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleScrollPrev}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full items-center justify-center"
            >
              <Ionicons name="chevron-back" size={14} color="#C084FC" />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleScrollNext}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#7E22CE] items-center justify-center shadow-xs"
            >
              <Ionicons name="chevron-forward" size={14} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onViewAllPress}
            className="flex-row items-center bg-[#581C87] border border-purple-400/30 px-2.5 sm:px-3.5 py-1.5 rounded-full shadow-xs gap-1"
          >
            <Text numberOfLines={1} className="text-[11px] sm:text-xs font-bold text-white">
              {t('viewAllBtn')}
            </Text>
            <Ionicons name="chevron-forward" size={12} color="#C084FC" />
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
        {NIGHT_OWL_PRODUCTS.map((item) => (
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
            className="w-[158px] sm:w-[210px] md:w-[230px] rounded-xl border border-purple-900 bg-white overflow-hidden shadow-xs relative"
          >
            {/* Image Box */}
            <View className="w-full h-[165px] sm:h-[185px] bg-slate-50 relative overflow-hidden">
              {item.discountText ? (
                <View className="absolute top-0 left-3 z-10">
                  <DiscountRibbonBadge discountText={item.discountText} />
                </View>
              ) : null}

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => toggleWishlist(item.id)}
                className="absolute top-2.5 right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-slate-200/60 items-center justify-center z-10 shadow-xs"
              >
                <Ionicons
                  name={wishlist[item.id] ? 'heart' : 'heart-outline'}
                  size={15}
                  color={wishlist[item.id] ? '#EF4444' : '#64748B'}
                />
              </TouchableOpacity>

              <Image
                source={{ uri: item.imageUrl }}
                className="w-full h-full"
                resizeMode="cover"
              />

              <View className="bg-slate-900/85 px-2 py-0.5 rounded-lg flex-row items-center gap-1 absolute bottom-2 right-2 z-10">
                <Ionicons name="time-outline" size={11} color="#C084FC" />
                <Text className="text-white text-[9px] font-bold">
                  {item.deliveryTime}
                </Text>
              </View>
            </View>

            {/* Info Box */}
            <View className="p-3 pt-2.5 pb-3 justify-between flex-1">
              <View>
                <Text className="text-[10px] font-extrabold text-purple-600 tracking-wider uppercase mb-0.5">
                  {item.brand}
                </Text>
                <Text
                  numberOfLines={2}
                  className="text-xs sm:text-sm font-extrabold leading-4 mb-1.5 text-slate-900"
                >
                  {item.title}
                </Text>

                <View className="flex-row items-center gap-1 mb-2">
                  <Ionicons name="star" size={13} color="#F59E0B" />
                  <Text className="text-xs font-black text-slate-700">
                    {item.rating}
                  </Text>
                  <Text className="text-[11px] font-semibold text-slate-400">
                    ({item.reviewsCount})
                  </Text>
                </View>
              </View>

              {/* Price & Button */}
              <View className="flex-row items-center justify-between pt-1">
                <View>
                  {item.oldPrice ? (
                    <Text className="text-[10px] sm:text-xs font-semibold text-slate-400 line-through">
                      ৳{item.oldPrice}
                    </Text>
                  ) : null}
                  <Text className="text-sm sm:text-base font-black text-slate-900">
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
                  className="bg-[#7E22CE] active:bg-purple-800 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl flex-row items-center justify-center shadow-xs"
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
