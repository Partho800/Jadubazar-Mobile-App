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
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { AppText as Text } from '../common/AppText';

export interface FavouriteCuisineItem {
  id: string;
  title: string;
  imageUrl: string;
}

const CUISINE_ITEMS: FavouriteCuisineItem[] = [
  {
    id: 'fc-1',
    title: 'Pre-Order Platters 👑',
    imageUrl:
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'fc-2',
    title: 'Breakfast ☕',
    imageUrl:
      'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'fc-3',
    title: 'Evening Snacks 🥟',
    imageUrl:
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'fc-4',
    title: 'Late Night Cravings 🌙',
    imageUrl:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'fc-5',
    title: 'Desserts & Sweets 🍨',
    imageUrl:
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=700&q=80',
  },
];

interface FoodFavouriteCuisinesProps {
  onCuisinePress?: (item: FavouriteCuisineItem) => void;
  onAllCuisinesPress?: () => void;
}

export const FoodFavouriteCuisines: React.FC<FoodFavouriteCuisinesProps> = ({
  onCuisinePress,
  onAllCuisinesPress,
}) => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const scrollX = useRef<number>(0);

  const cardWidth = width >= 640 ? 250 : 220;
  const cardHeight = width >= 640 ? 320 : 285;
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

  return (
    <View className="my-5 w-full relative">
      {/* 1. Header Row - 1 Line Layout */}
      <View className="flex-row items-center justify-between px-4 mb-4 gap-2 w-full">
        {/* Section Title */}
        <Text
          numberOfLines={1}
          className={`text-xl sm:text-2xl font-black tracking-tight shrink min-w-0 ${
            isDarkMode ? 'text-slate-50' : 'text-slate-900'
          }`}
        >
          {t('favouriteCuisinesTitle')}
        </Text>

        {/* Action & Nav Controls */}
        <View className="flex-row items-center gap-2 shrink-0">
          {/* Circular Scroll Buttons Container */}
          <View
            className={`flex-row items-center rounded-full border p-1 shadow-xs ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100/90 border-slate-200'
            }`}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleScrollPrev}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full items-center justify-center bg-white dark:bg-slate-800 shadow-xs"
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
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full items-center justify-center bg-white dark:bg-slate-800 shadow-xs ml-1"
            >
              <Ionicons
                name="chevron-forward"
                size={16}
                color={isDarkMode ? '#CBD5E1' : '#334155'}
              />
            </TouchableOpacity>
          </View>

          {/* All Cuisines Link */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onAllCuisinesPress}
            className="flex-row items-center px-2.5 sm:px-3 py-1.5 gap-1"
          >
            <Text
              style={{ color: '#FF6B00' }}
              className="text-xs sm:text-sm font-extrabold"
            >
              {t('allCuisines')}
            </Text>
            <Ionicons name="arrow-forward" size={14} color="#FF6B00" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. Horizontal Cards ScrollView */}
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
          alignItems: 'center',
          gap: 16,
        }}
      >
        {CUISINE_ITEMS.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.9}
            onPress={() => onCuisinePress?.(item)}
            style={{
              width: cardWidth,
              height: cardHeight,
              flexShrink: 0,
              borderRadius: 24,
            }}
            className="overflow-hidden relative shadow-lg bg-black border border-slate-800/80 shrink-0"
          >
            {/* Full Card Background Image */}
            <Image
              source={{ uri: item.imageUrl }}
              style={{
                width: cardWidth,
                height: cardHeight,
                position: 'absolute',
                top: 0,
                left: 0,
              }}
              resizeMode="cover"
            />

            {/* Smooth Dark Gradient Overlay at Bottom */}
            <LinearGradient
              colors={['transparent', 'rgba(0, 0, 0, 0.25)', 'rgba(0, 0, 0, 0.65)', 'rgba(0, 0, 0, 0.92)']}
              locations={[0, 0.35, 0.7, 1]}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: '65%',
              }}
            />

            {/* Bottom Text Content */}
            <View
              style={{
                position: 'absolute',
                bottom: 16,
                left: 16,
                right: 16,
                gap: 4,
              }}
            >
              <Text
                numberOfLines={2}
                className="text-white text-lg sm:text-xl font-black drop-shadow-md leading-tight"
              >
                {item.title}
              </Text>

              {/* Orange EXPLORE -> Link */}
              <View className="flex-row items-center gap-1.5 mt-0.5">
                <Text
                  style={{ color: '#FF6B00' }}
                  className="text-xs sm:text-sm font-black tracking-wider uppercase"
                >
                  {t('exploreAction')}
                </Text>
                <Ionicons name="arrow-forward" size={14} color="#FF6B00" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
