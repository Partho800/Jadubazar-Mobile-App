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

export interface CategoryCardData {
  id: string;
  titleKey: string;
  imageUrl: string;
}

const CATEGORY_CARDS: CategoryCardData[] = [
  {
    id: 'fruits',
    titleKey: 'catFreshFruits',
    imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'vegetables',
    titleKey: 'catVegetables',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'meat',
    titleKey: 'catMeat',
    imageUrl: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'dairy',
    titleKey: 'catDairy',
    imageUrl: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'bakery',
    titleKey: 'catBakery',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'beverages',
    titleKey: 'catBeverages',
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
  },
];

interface GroceryShopByCategoryProps {
  onCategoryPress?: (categoryId: string) => void;
  onAllCategoriesPress?: () => void;
}

export const GroceryShopByCategory: React.FC<GroceryShopByCategoryProps> = ({
  onCategoryPress,
  onAllCategoriesPress,
}) => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const scrollX = useRef<number>(0);

  const cardWidth = width >= 640 ? 276 : 246; // card width (260/230) + gap (16)

  const handleScrollPrev = () => {
    const targetX = Math.max(0, scrollX.current - cardWidth);
    scrollX.current = targetX;
    scrollRef.current?.scrollTo({ x: targetX, animated: true });
  };

  const handleScrollNext = () => {
    const maxScroll = (CATEGORY_CARDS.length - 1) * cardWidth;
    const targetX = Math.min(maxScroll, scrollX.current + cardWidth);
    scrollX.current = targetX;
    scrollRef.current?.scrollTo({ x: targetX, animated: true });
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollX.current = event.nativeEvent.contentOffset.x;
  };

  return (
    <View className="my-6 w-full">
      {/* 1. Header Row (Strictly 1 single line layout on mobile & web) */}
      <View className="flex-row items-center justify-between px-4 mb-4 gap-2">
        {/* Left Side: Title & Subtitle */}
        <View className="flex-1 pr-1">
          <Text
            numberOfLines={1}
            className={`text-base sm:text-2xl font-black tracking-tight ${
              isDarkMode ? 'text-slate-50' : 'text-slate-900'
            }`}
          >
            {t('shopByCategoryTitle')}
          </Text>
          <Text
            numberOfLines={1}
            className={`text-[11px] sm:text-sm font-medium ${
              isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            {t('groceryCategorySub')}
          </Text>
        </View>

        {/* Right Side: Prev / Next 1-Card Step Arrows & All Categories Button */}
        <View className="flex-row items-center gap-1.5 shrink-0">
          {/* Scroll Prev (<) */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleScrollPrev}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border items-center justify-center shadow-xs ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <Ionicons
              name="chevron-back"
              size={16}
              color={isDarkMode ? '#94A3B8' : '#475569'}
            />
          </TouchableOpacity>

          {/* Scroll Next (>) */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleScrollNext}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border items-center justify-center shadow-xs ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <Ionicons
              name="chevron-forward"
              size={16}
              color={isDarkMode ? '#94A3B8' : '#475569'}
            />
          </TouchableOpacity>

          {/* All Categories Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onAllCategoriesPress}
            className={`flex-row items-center px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full border shadow-xs gap-1 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <Text
              numberOfLines={1}
              className={`text-[11px] sm:text-sm font-bold ${
                isDarkMode ? 'text-slate-100' : 'text-slate-800'
              }`}
            >
              {t('allCategories')}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={14}
              color={isDarkMode ? '#94A3B8' : '#475569'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. Horizontal Scrollable Category Cards with Snap & Step Scroll */}
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
      >
        {CATEGORY_CARDS.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            activeOpacity={0.9}
            onPress={() => onCategoryPress?.(cat.id)}
            className="w-[230px] sm:w-[260px] h-[310px] sm:h-[340px] rounded-3xl overflow-hidden relative shadow-md bg-slate-900"
          >
            {/* Direct Image URL Link */}
            <Image
              source={{ uri: cat.imageUrl }}
              className="w-full h-full absolute inset-0"
              resizeMode="cover"
            />

            {/* Dark Gradient Overlay at Bottom */}
            <View className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent justify-end p-5">
              {/* Category Name */}
              <Text className="text-xl font-black text-white tracking-wide mb-1">
                {t(cat.titleKey)}
              </Text>

              {/* Action Link: SHOP NOW ➔ */}
              <View className="flex-row items-center gap-1">
                <Text className="text-emerald-400 font-black text-xs tracking-wider uppercase">
                  {t('shopNow')}
                </Text>
                <Ionicons name="arrow-forward" size={14} color="#34D399" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
