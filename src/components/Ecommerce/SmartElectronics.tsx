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
import { AppText as Text } from '../common/AppText';

export interface GadgetItem {
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

const GADGET_PRODUCTS: GadgetItem[] = [
  {
    id: '1',
    brand: 'APPLE',
    weight: '0.24 KG',
    title: 'iPhone 14 Pro Max',
    imageUrl:
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80',
    oldPrice: '৳135,000',
    price: '৳125,000',
    rating: 4.8,
    reviewsCount: 412,
    discount: '8%',
  },
  {
    id: '2',
    brand: 'SAMSUNG',
    weight: '0.23 KG',
    title: 'Samsung S24 Ultra',
    imageUrl:
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80',
    oldPrice: '৳145,000',
    price: '৳132,000',
    rating: 4.7,
    reviewsCount: 320,
    discount: '9%',
  },
  {
    id: '3',
    brand: 'APPLE',
    weight: '1.60 KG',
    title: 'MacBook Pro M3',
    imageUrl:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    oldPrice: '৳210,000',
    price: '৳185,000',
    rating: 4.9,
    reviewsCount: 580,
    discount: '12%',
  },
  {
    id: '4',
    brand: 'SONY',
    weight: '0.25 KG',
    title: 'Sony WH-1000XM5',
    imageUrl:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    oldPrice: '৳42,000',
    price: '৳35,700',
    rating: 4.8,
    reviewsCount: 215,
    discount: '15%',
  },
  {
    id: '5',
    brand: 'APPLE',
    weight: '0.06 KG',
    title: 'Apple Watch Ultra 2',
    imageUrl:
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80',
    oldPrice: '৳95,000',
    price: '৳85,500',
    rating: 4.9,
    reviewsCount: 189,
    discount: '10%',
  },
  {
    id: '6',
    brand: 'APPLE',
    weight: '0.68 KG',
    title: 'iPad Pro 12.9"',
    imageUrl:
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80',
    oldPrice: '৳140,000',
    price: '৳130,000',
    rating: 4.7,
    reviewsCount: 310,
    discount: '7%',
  },
];

export const SmartElectronics: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { width } = useWindowDimensions();
  const { t, isBangla } = useLanguage();
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  const [scrollIndex, setScrollIndex] = useState(0);

  const scrollViewRef = useRef<ScrollView>(null);
  const cardWidth = Math.min((width - 48) / 2, 210);
  const itemFullWidth = cardWidth + 14;

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const scrollNext = () => {
    if (scrollViewRef.current && scrollIndex < GADGET_PRODUCTS.length - 1) {
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
    if (index !== scrollIndex && index >= 0 && index < GADGET_PRODUCTS.length) {
      setScrollIndex(index);
    }
  };

  const isPrevDisabled = scrollIndex === 0;
  const isNextDisabled = scrollIndex >= GADGET_PRODUCTS.length - 1;

  return (
    <View className="mb-11">
      {/* Section Header */}
      <View className="mx-4 mb-4">
        <View className="flex-row items-start justify-between gap-2">
          {/* Left Title Column with Top Badge */}
          <View className="flex-1 flex-shrink pr-1">
            {/* Top Pill Badge */}
            <View className="self-start bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full mb-1.5">
              <Text className="text-blue-600 text-[10px] font-black uppercase tracking-wider">
                {isBangla ? '৬টি প্রডাক্ট' : '6 Items'}
              </Text>
            </View>

            {/* Title Row */}
            <View className="flex-row items-center gap-2">
              <View className="w-7 h-7 rounded-lg bg-blue-500/10 items-center justify-center">
                <Ionicons name="laptop-outline" size={16} color="#2563EB" />
              </View>
              <Text
                className={`text-base sm:text-lg font-black tracking-tight ${
                  isDarkMode ? 'text-slate-50' : 'text-slate-900'
                }`}
              >
                {t('smartElectronicsTitle')}
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
          {t('smartElectronicsSub')}
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
        {GADGET_PRODUCTS.map((item) => {
          const isFav = !!favorites[item.id];
          return (
            <View
              key={item.id}
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
                className="w-full h-[155px] bg-zinc-900 overflow-hidden relative items-center justify-center"
              >
                {/* Red Discount Ribbon Badge */}
                <View className="absolute top-0 left-3 bg-red-600 px-2 pt-1.5 pb-2 rounded-b items-center z-10">
                  <Text className="text-white text-xs font-black leading-none">
                    {item.discount}
                  </Text>
                  <Text className="text-white text-[8px] font-extrabold tracking-wider">
                    OFF
                  </Text>
                </View>

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
                    name="star-half"
                    size={12}
                    color="#F59E0B"
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
                    className="w-[38px] h-[38px] rounded-full bg-slate-900 items-center justify-center shadow-md"
                  >
                    <Ionicons name="cart-outline" size={18} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
