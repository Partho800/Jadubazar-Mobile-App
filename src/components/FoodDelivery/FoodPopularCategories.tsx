import React, { useRef } from 'react';
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

export interface FoodCategoryItem {
  id: string;
  name: string;
  imageUrl: string;
}

import { foodData } from '../../data/productsData';

const FOOD_CATEGORIES: FoodCategoryItem[] = ((foodData as any).popularCategories || []) as FoodCategoryItem[];

interface FoodPopularCategoriesProps {
  onCategoryPress?: (id: string) => void;
  onViewAllPress?: () => void;
}

export const FoodPopularCategories: React.FC<FoodPopularCategoriesProps> = ({
  onCategoryPress,
  onViewAllPress,
}) => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const scrollX = useRef<number>(0);

  const cardStep = width >= 640 ? 180 : 140;

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

  return (
    <View className="my-5 w-full relative">
      {/* 1. Header Row - 1 Line Layout */}
      <View className="flex-row items-center justify-between px-4 mb-3 gap-1.5 w-full">
        <Text
          numberOfLines={1}
          className={`text-base sm:text-xl font-black tracking-tight shrink min-w-0 ${
            isDarkMode ? 'text-slate-50' : 'text-slate-900'
          }`}
        >
          {t('popularCategoriesTitle')}
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

      {/* 2. Horizontal Carousel */}
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
      >
        {FOOD_CATEGORIES.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.88}
            onPress={() => onCategoryPress?.(item.id)}
            style={{ borderRadius: 16 }}
            className={`w-[130px] sm:w-[160px] rounded-2xl border overflow-hidden shadow-xs ${
              isDarkMode
                ? 'bg-slate-950 border-slate-800'
                : 'bg-white border-slate-200/90'
            }`}
          >
            <View className="w-full h-[120px] sm:h-[140px] relative overflow-hidden bg-slate-100 dark:bg-slate-900">
              <Image
                source={{ uri: item.imageUrl }}
                className="w-full h-full"
                resizeMode="cover"
              />
              <View className="absolute inset-0 bg-black/25" />

              <View className="absolute bottom-2 left-2 right-2">
                <Text
                  numberOfLines={1}
                  className="text-white text-xs sm:text-sm font-extrabold drop-shadow-md text-center"
                >
                  {item.name}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
