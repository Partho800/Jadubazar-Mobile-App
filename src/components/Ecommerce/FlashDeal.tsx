import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useProduct } from '../../context/ProductContext';
import { AppText as Text } from '../common/AppText';

export interface DealProduct {
  id: string;
  brand: string;
  name: string;
  discountBadge: string;
  originalPrice: string;
  salePrice: string;
  rating: number;
  image: any;
}

const PRODUCTS: DealProduct[] = [
  {
    id: 'p1',
    brand: 'APPLE',
    name: 'iPhone 15 Pro Max 256GB',
    discountBadge: '81% OFF',
    originalPrice: '৳155,000',
    salePrice: '৳125,000',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'p2',
    brand: 'SAMSUNG',
    name: 'Galaxy Watch 6 Classic',
    discountBadge: '45% OFF',
    originalPrice: '৳45,000',
    salePrice: '৳28,500',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'p3',
    brand: 'SONY',
    name: 'WH-1000XM5 Wireless Headphone',
    discountBadge: '30% OFF',
    originalPrice: '৳38,000',
    salePrice: '৳29,900',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'p4',
    brand: 'NATIVE',
    name: 'Leather Everyday Wallet',
    discountBadge: '25% OFF',
    originalPrice: '৳6,500',
    salePrice: '৳4,800',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80',
  },
];

export const FlashDeal: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const { openProductDetails } = useProduct();

  const [timeLeft, setTimeLeft] = useState({
    days: 48,
    hours: 5,
    minutes: 27,
    seconds: 13,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0)
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => (num < 10 ? `0${num}` : `${num}`);

  return (
    <View
      className={`rounded-3xl border p-4 mx-4 mb-6 ${
        isDarkMode
          ? 'bg-slate-900 border-slate-800'
          : 'bg-blue-50/60 border-blue-100'
      }`}
    >
      {/* Sleek Single-Row Header */}
      <View className="flex-row items-center justify-between mb-4 gap-2 flex-wrap">
        <View className="flex-row items-center gap-2 flex-wrap flex-1">
          <View className="w-7 h-7 rounded-full bg-amber-100 justify-center items-center border border-amber-200">
            <Ionicons name="flash" size={16} color="#F59E0B" />
          </View>

          <Text className="text-lg font-black text-blue-700 tracking-tight">
            {t('flashDealTitle')}
          </Text>

          <View className="flex-row items-center gap-0.5 ml-1">
            <View className="bg-blue-600 rounded px-1.5 py-0.5 flex-row items-baseline gap-0.5 shadow-sm">
              <Text className="text-white text-xs font-black">
                {timeLeft.days}
              </Text>
              <Text className="text-white text-[9px] font-bold">d</Text>
            </View>
            <Text className="text-blue-600 text-xs font-black mx-0.5">:</Text>

            <View className="bg-blue-600 rounded px-1.5 py-0.5 flex-row items-baseline gap-0.5 shadow-sm">
              <Text className="text-white text-xs font-black">
                {formatNumber(timeLeft.hours)}
              </Text>
              <Text className="text-white text-[9px] font-bold">h</Text>
            </View>
            <Text className="text-blue-600 text-xs font-black mx-0.5">:</Text>

            <View className="bg-blue-600 rounded px-1.5 py-0.5 flex-row items-baseline gap-0.5 shadow-sm">
              <Text className="text-white text-xs font-black">
                {formatNumber(timeLeft.minutes)}
              </Text>
              <Text className="text-white text-[9px] font-bold">m</Text>
            </View>
            <Text className="text-blue-600 text-xs font-black mx-0.5">:</Text>

            <View className="bg-blue-600 rounded px-1.5 py-0.5 flex-row items-baseline gap-0.5 shadow-sm">
              <Text className="text-white text-xs font-black">
                {formatNumber(timeLeft.seconds)}
              </Text>
              <Text className="text-white text-[9px] font-bold">s</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className="flex-row items-center px-2.5 py-1 rounded-xl bg-blue-600/10"
        >
          <Text className="text-xs font-extrabold text-blue-600 mr-0.5">
            {t('viewAll')}
          </Text>
          <Ionicons name="chevron-forward" size={14} color="#2563EB" />
        </TouchableOpacity>
      </View>

      {/* Horizontal Product Cards Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 14, paddingRight: 4 }}
      >
        {PRODUCTS.map((prod) => (
          <TouchableOpacity
            key={prod.id}
            activeOpacity={0.9}
            onPress={() =>
              openProductDetails({
                id: prod.id,
                title: prod.name,
                brand: prod.brand,
                price: prod.salePrice,
                oldPrice: prod.originalPrice,
                imageUrl: typeof prod.image === 'string' ? prod.image : undefined,
                image: typeof prod.image !== 'string' ? prod.image : undefined,
                discountBadge: prod.discountBadge,
              })
            }
            style={{ borderRadius: 14 }}
            className={`w-[190px] h-[270px] border relative overflow-hidden shadow-sm ${
              isDarkMode
                ? 'bg-slate-800 border-slate-700'
                : 'bg-white border-slate-200'
            }`}
          >
            <View className="absolute top-0 right-0 bg-red-600 px-2.5 py-1 rounded-bl-xl z-10">
              <Text className="text-white text-[10px] font-extrabold">
                {prod.discountBadge}
              </Text>
            </View>

            <View
              style={{ borderTopLeftRadius: 14, borderTopRightRadius: 14 }}
              className="w-full h-[135px] overflow-hidden relative"
            >
              <Image
                source={typeof prod.image === 'string' ? { uri: prod.image } : prod.image}
                style={{ width: '100%', height: '100%' }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>

            <View className="flex-1 justify-between p-3 pt-2">
              <Text className="text-[10px] font-extrabold text-slate-400 tracking-wider">
                {prod.brand}
              </Text>
              <Text
                numberOfLines={2}
                className={`text-xs font-bold leading-4 mt-0.5 ${
                  isDarkMode ? 'text-slate-50' : 'text-slate-900'
                }`}
              >
                {prod.name}
              </Text>

              <View className="flex-row my-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons
                    key={star}
                    name="star"
                    size={12}
                    color="#F59E0B"
                    style={{ marginRight: 1 }}
                  />
                ))}
              </View>

              <Text className="text-xs font-semibold text-slate-400 line-through">
                {prod.originalPrice}
              </Text>
              <Text
                className={`text-base font-black ${
                  isDarkMode ? 'text-sky-400' : 'text-blue-700'
                }`}
              >
                {prod.salePrice}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
