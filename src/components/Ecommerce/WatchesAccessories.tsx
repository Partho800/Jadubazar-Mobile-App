import React, { useState, useRef } from 'react';
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

export interface AccessoryProductItem {
  id: string;
  brand: string;
  weight: string;
  title: string;
  imageUrl: string;
  oldPrice: string;
  price: string;
  rating: number;
  reviewsCount: number;
  discount: string;
}

const ACCESSORY_PRODUCTS: AccessoryProductItem[] = [
  {
    id: 'w1',
    brand: 'JADU TECH',
    weight: '0.10 KG',
    title: 'Smart Watch Series 9 GPS',
    imageUrl:
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80',
    oldPrice: '৳21,500',
    price: '৳18,500',
    rating: 4.8,
    reviewsCount: 103,
    discount: '14%',
  },
  {
    id: 'w2',
    brand: 'JADU STUDIO',
    weight: '0.05 KG',
    title: 'Classic Aviator Sunglasses',
    imageUrl:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80',
    oldPrice: '৳2,500',
    price: '৳2,200',
    rating: 4.7,
    reviewsCount: 57,
    discount: '12%',
  },
  {
    id: 'w3',
    brand: 'JADU LUXE',
    weight: '0.15 KG',
    title: 'Minimalist Leather Wallet',
    imageUrl:
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80',
    oldPrice: '৳3,200',
    price: '৳2,720',
    rating: 4.9,
    reviewsCount: 142,
    discount: '15%',
  },
  {
    id: 'w4',
    brand: 'JADU CHRONO',
    weight: '0.20 KG',
    title: 'Vintage Chronograph Leather Watch',
    imageUrl:
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80',
    oldPrice: '৳25,000',
    price: '৳20,000',
    rating: 4.9,
    reviewsCount: 89,
    discount: '20%',
  },
  {
    id: 'w5',
    brand: 'JADU OPTICS',
    weight: '0.06 KG',
    title: 'Retro Round Metal Sunglasses',
    imageUrl:
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80',
    oldPrice: '৳2,800',
    price: '৳2,296',
    rating: 4.8,
    reviewsCount: 110,
    discount: '18%',
  },
  {
    id: 'w6',
    brand: 'JADU CRAFT',
    weight: '0.30 KG',
    title: 'Handcrafted Leather Belt',
    imageUrl:
      'https://images.unsplash.com/photo-1624222247344-550fb8ec5522?auto=format&fit=crop&w=600&q=80',
    oldPrice: '৳2,200',
    price: '৳1,980',
    rating: 4.7,
    reviewsCount: 76,
    discount: '10%',
  },
];

export const WatchesAccessories: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { width } = useWindowDimensions();
  const { t, isBangla } = useLanguage();
  const { openProductDetails } = useProduct();
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  const [scrollIndex, setScrollIndex] = useState(0);

  const scrollViewRef = useRef<ScrollView>(null);
  const cardWidth = Math.min((width - 48) / 2, 210);
  const itemFullWidth = cardWidth + 14;

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const scrollNext = () => {
    if (scrollViewRef.current && scrollIndex < ACCESSORY_PRODUCTS.length - 1) {
      const nextIndex = scrollIndex + 1;
      scrollViewRef.current.scrollTo({
        x: nextIndex * itemFullWidth,
        animated: true,
      });
      setScrollIndex(nextIndex);
    }
  };

  const scrollPrev = () => {
    if (scrollViewRef.current && scrollIndex > 0) {
      const prevIndex = scrollIndex - 1;
      scrollViewRef.current.scrollTo({
        x: prevIndex * itemFullWidth,
        animated: true,
      });
      setScrollIndex(prevIndex);
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / itemFullWidth);
    if (index !== scrollIndex && index >= 0 && index < ACCESSORY_PRODUCTS.length) {
      setScrollIndex(index);
    }
  };

  const isPrevDisabled = scrollIndex === 0;
  const isNextDisabled = scrollIndex >= ACCESSORY_PRODUCTS.length - 1;

  return (
    <View className="mb-11">
      {/* Section Header */}
      <View className="mx-4 mb-4">
        <View className="flex-row items-start justify-between gap-2">
          {/* Left Title Column with Top Badge */}
          <View className="flex-1 flex-shrink pr-1">
            {/* Top Pill Badge */}
            <View className="self-start bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full mb-1.5">
              <Text className="text-amber-600 text-[10px] font-black uppercase tracking-wider">
                {isBangla ? '৬টি প্রডাক্ট' : '6 Items'}
              </Text>
            </View>

            {/* Title Row */}
            <View className="flex-row items-center gap-2">
              <View className="w-7 h-7 rounded-lg bg-amber-500/10 items-center justify-center">
                <Ionicons name="watch-outline" size={16} color="#D97706" />
              </View>
              <Text
                className={`text-base sm:text-lg font-black tracking-tight ${
                  isDarkMode ? 'text-slate-50' : 'text-slate-900'
                }`}
              >
                {t('watchesTitle')}
              </Text>
            </View>
          </View>

          {/* Right Action Controls */}
          <View className="flex-row items-center gap-1.5 shrink-0 self-end">
            <View className="flex-row items-center bg-slate-100 rounded-full p-1 gap-1 shrink-0">
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={scrollPrev}
                disabled={isPrevDisabled}
                className={`w-7 h-7 rounded-full items-center justify-center shrink-0 ${
                  isPrevDisabled ? 'bg-transparent' : 'bg-white shadow-sm'
                }`}
              >
                <Ionicons
                  name="chevron-back"
                  size={15}
                  color={isPrevDisabled ? '#CBD5E1' : '#0F172A'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={scrollNext}
                disabled={isNextDisabled}
                className={`w-7 h-7 rounded-full items-center justify-center shrink-0 ${
                  isNextDisabled ? 'bg-transparent' : 'bg-white shadow-sm'
                }`}
              >
                <Ionicons
                  name="chevron-forward"
                  size={15}
                  color={isNextDisabled ? '#CBD5E1' : '#0F172A'}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              className="flex-row items-center gap-1 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm shrink-0"
            >
              <Text className="text-xs font-bold text-slate-900">{t('viewAll')}</Text>
              <Ionicons name="chevron-forward" size={14} color="#0F172A" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Subtitle below */}
        <Text
          className={`text-xs font-medium leading-5 mt-1.5 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          {t('watchesSub')}
        </Text>
      </View>

      {/* Horizontal Scroll Product List */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingLeft: 16, paddingRight: 8, gap: 14 }}
      >
        {ACCESSORY_PRODUCTS.map((item) => {
          const isFav = !!favorites[item.id];
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.9}
              onPress={() =>
                openProductDetails({
                  id: item.id,
                  title: item.title,
                  brand: item.brand,
                  price: item.price,
                  oldPrice: item.oldPrice,
                  imageUrl: item.imageUrl,
                  rating: item.rating,
                  reviewsCount: item.reviewsCount,
                  discountBadge: item.discount,
                  weight: item.weight,
                })
              }
              style={{ width: cardWidth, borderRadius: 14 }}
              className={`border overflow-hidden shadow-sm ${
                isDarkMode
                  ? 'bg-slate-800 border-slate-700'
                  : 'bg-white border-slate-200'
              }`}
            >
              {/* Product Image Box - Full Width with Top 14px Rounded Corners */}
              <View
                style={{ borderTopLeftRadius: 14, borderTopRightRadius: 14 }}
                className="w-full h-[155px] bg-slate-100 overflow-hidden relative items-center justify-center"
              >
                {/* Red Bookmark Discount Ribbon */}
                {item.discount ? (
                  <View className="absolute top-0 left-3 z-10">
                    <DiscountRibbonBadge discountText={item.discount} />
                  </View>
                ) : null}

                {/* Favorite Heart Button */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => toggleFavorite(item.id)}
                  className="absolute top-2.5 right-2.5 w-[34px] h-[34px] rounded-full bg-white/85 items-center justify-center z-10"
                >
                  <Ionicons
                    name={isFav ? 'heart' : 'heart-outline'}
                    size={18}
                    color={isFav ? '#EF4444' : '#64748B'}
                  />
                </TouchableOpacity>

                {/* Image */}
                <Image
                  source={{ uri: item.imageUrl }}
                  style={{ width: '100%', height: '100%' }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>

              {/* Card Meta & Info */}
              <View className="p-3 pt-2.5 pb-3.5">
                {/* Brand & Weight Row */}
                <View className="flex-row items-center justify-between mb-0.5">
                  <Text className="text-[10px] font-extrabold text-slate-400 tracking-wider">
                    {item.brand}
                  </Text>
                  <Text className="text-[10px] font-semibold text-slate-400">
                    {item.weight}
                  </Text>
                </View>

                {/* Product Title */}
                <Text
                  className={`text-sm font-extrabold mb-1 ${
                    isDarkMode ? 'text-slate-50' : 'text-slate-900'
                  }`}
                  numberOfLines={1}
                >
                  {item.title}
                </Text>

                {/* Rating Row */}
                <View className="flex-row items-center mb-2.5">
                  {[1, 2, 3, 4].map((star) => (
                    <Ionicons
                      key={star}
                      name="star"
                      size={12}
                      color="#F59E0B"
                      style={{ marginRight: 1 }}
                    />
                  ))}
                  <Ionicons
                    name="star-outline"
                    size={12}
                    color="#CBD5E1"
                    style={{ marginRight: 3 }}
                  />
                  <Text className="text-xs font-semibold text-slate-400">
                    ({item.reviewsCount})
                  </Text>
                </View>

                {/* Price & Cart Action Row */}
                <View className="flex-row items-center justify-between">
                  <View className="justify-center">
                    <Text className="text-xs font-semibold text-slate-400 line-through mb-0.5">
                      {item.oldPrice}
                    </Text>
                    <Text
                      className={`text-base font-black tracking-tight ${
                        isDarkMode ? 'text-slate-50' : 'text-slate-900'
                      }`}
                    >
                      {item.price}
                    </Text>
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() =>
                      cartStore.addItem({
                        id: item.id,
                        name: item.title,
                        price: parseFloat(item.price.replace(/[^0-9.]/g, '')) || 100,
                        image: item.imageUrl,
                      })
                    }
                    className="w-[38px] h-[38px] rounded-full bg-slate-900 items-center justify-center shadow-md"
                  >
                    <Ionicons name="cart-outline" size={18} color="#FFFFFF" />
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
