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
import { AppText as Text } from '../common/AppText';

export interface KitchenLocationItem {
  id: string;
  name: string;
  categories: string;
  rating: number;
  deliveryTime: string;
  logoUrl: string;
  isActive?: boolean;
}

const KITCHEN_LOCATIONS: KitchenLocationItem[] = [
  {
    id: 'kl-1',
    name: 'Dhanmondi',
    categories: 'BIRYANI • BURGERS',
    rating: 4.9,
    deliveryTime: '20-30 min',
    logoUrl:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'kl-2',
    name: 'Gulshan 1',
    categories: 'GOURMET PIZZA • PASTA',
    rating: 4.9,
    deliveryTime: '25-35 min',
    logoUrl:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80',
    isActive: true,
  },
  {
    id: 'kl-3',
    name: 'Banani',
    categories: 'SNACKS • SHAKES',
    rating: 4.8,
    deliveryTime: '15-25 min',
    logoUrl:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'kl-4',
    name: 'Uttara',
    categories: 'KABOB • CHINESE',
    rating: 4.9,
    deliveryTime: '20-30 min',
    logoUrl:
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'kl-5',
    name: 'Mirpur 10',
    categories: 'DESSERTS • SWEETS',
    rating: 4.7,
    deliveryTime: '25-35 min',
    logoUrl:
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=300&q=80',
  },
];

interface FoodPopularKitchensProps {
  onKitchenPress?: (kitchen: KitchenLocationItem) => void;
  onMenuPress?: (kitchen: KitchenLocationItem) => void;
}

export const FoodPopularKitchens: React.FC<FoodPopularKitchensProps> = ({
  onKitchenPress,
  onMenuPress,
}) => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const scrollX = useRef<number>(0);
  const [selectedId, setSelectedId] = useState<string>('kl-2');

  const cardWidth = width >= 640 ? 250 : 220;
  const cardHeight = width >= 640 ? 190 : 175;
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
      {/* 1. Header Row */}
      <View className="flex-row items-center justify-between px-4 mb-4 gap-2 w-full">
        {/* Storefront Icon & Title */}
        <View className="flex-row items-center gap-2 flex-1 min-w-0 shrink">
          <Ionicons name="storefront" size={24} color="#FF6B00" />
          <Text
            numberOfLines={1}
            className={`text-xl sm:text-2xl font-black tracking-tight shrink min-w-0 ${
              isDarkMode ? 'text-slate-50' : 'text-slate-900'
            }`}
          >
            JaduBazar Kitchen
          </Text>
        </View>

        {/* Circular Scroll Buttons Container */}
        <View className="flex-row items-center gap-1.5 shrink-0">
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
        {KITCHEN_LOCATIONS.map((item) => {
          const isSelected = selectedId === item.id || item.isActive;
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.9}
              onPress={() => {
                setSelectedId(item.id);
                onKitchenPress?.(item);
              }}
              style={{
                width: cardWidth,
                height: cardHeight,
                flexShrink: 0,
                borderRadius: 20,
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderColor: 'rgba(0, 0, 0, 0.08)',
              }}
              className="p-4 flex-col justify-between overflow-hidden relative shadow-md shrink-0 bg-white"
            >
              {/* Top Row: Thumbnail Logo & Active Badge */}
              <View className="flex-row items-start justify-between w-full">
                <View
                  style={{ width: 54, height: 54, borderRadius: 16, overflow: 'hidden' }}
                  className="bg-slate-100 border border-slate-200/60 shadow-xs shrink-0"
                >
                  <Image
                    source={{ uri: item.logoUrl }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                  />
                </View>

                {isSelected ? (
                  <View className="bg-[#FF6B00] px-2.5 py-0.5 rounded-full shadow-xs">
                    <Text className="text-white text-[10px] sm:text-[11px] font-black uppercase">
                      Active
                    </Text>
                  </View>
                ) : null}
              </View>

              {/* Middle Section: Category, Name & Rating/Time */}
              <View className="mt-2">
                <Text
                  numberOfLines={1}
                  className="text-slate-400 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider"
                >
                  {item.categories}
                </Text>

                <Text
                  numberOfLines={1}
                  className="text-slate-900 text-lg sm:text-xl font-black mt-0.5"
                >
                  {item.name}
                </Text>

                <View className="flex-row items-center gap-1.5 mt-1">
                  <Ionicons name="star" size={13} color="#F59E0B" />
                  <Text className="text-amber-500 font-extrabold text-xs sm:text-sm">
                    {item.rating}
                  </Text>
                  <Text className="text-slate-400 font-semibold text-xs">•</Text>
                  <Text className="text-slate-500 font-semibold text-xs">
                    {item.deliveryTime}
                  </Text>
                </View>
              </View>

              {/* Divider & Bottom Action: Menu > */}
              <View className="pt-2 border-t border-slate-100 flex-row items-center justify-end">
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => onMenuPress?.(item)}
                  className="flex-row items-center gap-0.5"
                >
                  <Text
                    style={{ color: '#FF6B00' }}
                    className="text-xs sm:text-sm font-extrabold"
                  >
                    Menu
                  </Text>
                  <Ionicons name="chevron-forward" size={14} color="#FF6B00" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
