import React, { useRef } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { AppText as Text } from '../common/AppText';

export interface PharmacyCategoryItem {
  id: string;
  titleKey: string;
  iconName: keyof typeof Ionicons.glyphMap;
  isDashedRing?: boolean;
}

const PHARMACY_CATEGORIES: PharmacyCategoryItem[] = [
  {
    id: 'medicines',
    titleKey: 'catMedicines',
    iconName: 'medkit-outline',
  },
  {
    id: 'health_products',
    titleKey: 'catHealthProducts',
    iconName: 'flask-outline',
  },
  {
    id: 'personal_care',
    titleKey: 'catPersonalCare',
    iconName: 'sparkles-outline',
  },
  {
    id: 'mother_baby',
    titleKey: 'catMotherBaby',
    iconName: 'happy-outline',
    isDashedRing: true,
  },
  {
    id: 'devices',
    titleKey: 'catDevices',
    iconName: 'pulse-outline',
  },
  {
    id: 'supplements',
    titleKey: 'catSupplements',
    iconName: 'nutrition-outline',
  },
  {
    id: 'diabetes_care',
    titleKey: 'catDiabetesCare',
    iconName: 'water-outline',
  },
  {
    id: 'ayurvedic',
    titleKey: 'catAyurvedic',
    iconName: 'leaf-outline',
  },
];

interface PharmacyShopByCategoryProps {
  onCategoryPress?: (categoryId: string) => void;
  onViewAllPress?: () => void;
}

export const PharmacyShopByCategory: React.FC<PharmacyShopByCategoryProps> = ({
  onCategoryPress,
  onViewAllPress,
}) => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const scrollX = useRef<number>(0);

  const cardWidth = width >= 640 ? 140 : 120; // width + gap

  const handleScrollPrev = () => {
    const targetX = Math.max(0, scrollX.current - cardWidth * 2);
    scrollX.current = targetX;
    scrollRef.current?.scrollTo({ x: targetX, animated: true });
  };

  const handleScrollNext = () => {
    const maxScroll = (PHARMACY_CATEGORIES.length - 3) * cardWidth;
    const targetX = Math.min(maxScroll, scrollX.current + cardWidth * 2);
    scrollX.current = targetX;
    scrollRef.current?.scrollTo({ x: targetX, animated: true });
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollX.current = event.nativeEvent.contentOffset.x;
  };

  return (
    <View className="my-6 w-full max-w-[1100px] self-center">
      {/* 1. Header Row */}
      <View className="flex-row items-center justify-between px-4 mb-5">
        <Text
          className={`text-xl sm:text-2xl font-black tracking-tight ${
            isDarkMode ? 'text-slate-50' : 'text-[#0F172A]'
          }`}
        >
          {t('shopByCategory')}
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onViewAllPress}
          className="flex-row items-center gap-1 px-1 py-1"
        >
          <Text
            className={`text-xs sm:text-sm font-extrabold ${
              isDarkMode ? 'text-teal-400' : 'text-[#0F172A]'
            }`}
          >
            {t('viewAll')}
          </Text>
          <Ionicons
            name="chevron-forward"
            size={14}
            color={isDarkMode ? '#2DD4BF' : '#0F172A'}
          />
        </TouchableOpacity>
      </View>

      {/* 2. Horizontal Scrollable Categories */}
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerClassName="px-4 gap-3.5"
      >
        {PHARMACY_CATEGORIES.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.85}
            onPress={() => onCategoryPress?.(item.id)}
            className="items-center w-[100px] sm:w-[120px]"
          >
            {/* Square Card Wrapper */}
            <View
              className={`w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-xl items-center justify-center shadow-sm border ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-white border-slate-100 shadow-slate-200/50'
              }`}
            >
              {item.isDashedRing ? (
                /* Dashed Circle Outer Ring for Baby Category */
                <View
                  className={`w-16 h-16 rounded-full border-2 border-dashed border-teal-400/80 items-center justify-center ${
                    isDarkMode ? 'bg-teal-900/40' : 'bg-teal-50'
                  }`}
                >
                  <Ionicons
                    name={item.iconName}
                    size={32}
                    color={isDarkMode ? '#2DD4BF' : '#0D9488'}
                  />
                </View>
              ) : (
                /* Standard Icon */
                <View
                  className={`w-16 h-16 rounded-xl items-center justify-center ${
                    isDarkMode ? 'bg-teal-900/40' : 'bg-teal-50'
                  }`}
                >
                  <Ionicons
                    name={item.iconName}
                    size={34}
                    color={isDarkMode ? '#2DD4BF' : '#0D9488'}
                  />
                </View>
              )}
            </View>

            {/* Category Title Below Card */}
            <Text
              numberOfLines={2}
              className={`text-xs sm:text-sm font-extrabold text-center mt-2.5 leading-snug ${
                isDarkMode ? 'text-slate-100' : 'text-[#0F172A]'
              }`}
            >
              {t(item.titleKey)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
