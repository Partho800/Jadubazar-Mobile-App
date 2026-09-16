import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { AppText as Text } from '../common/AppText';

export interface FoodTrustFeatureItem {
  id: string;
  title: string;
  subtitle: string;
  iconName: any;
  bgColor: string;
  iconColor: string;
  borderColor?: string;
}

const TRUST_FEATURES: FoodTrustFeatureItem[] = [
  {
    id: 'tf-1',
    title: 'Express Fast Delivery',
    subtitle: 'Swift delivery directly to your doorstep',
    iconName: 'bus-outline',
    bgColor: '#ECFDF5',
    iconColor: '#059669',
  },
  {
    id: 'tf-2',
    title: '100% Genuine & Fresh',
    subtitle: 'Directly sourced from verified merchants',
    iconName: 'shield-checkmark-outline',
    bgColor: '#F0FDFA',
    iconColor: '#0D9488',
    borderColor: '#6EE7B7',
  },
  {
    id: 'tf-3',
    title: 'Secure & Easy Payment',
    subtitle: 'bKash, Nagad, Cards & Cash on Delivery',
    iconName: 'card-outline',
    bgColor: '#EFF6FF',
    iconColor: '#2563EB',
  },
  {
    id: 'tf-4',
    title: '24/7 Dedicated Support',
    subtitle: 'Instant support assistance anytime',
    iconName: 'headset-outline',
    bgColor: '#F5F3FF',
    iconColor: '#7C3AED',
  },
];

export const FoodTrustFeatures: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { width } = useWindowDimensions();

  // 1 tab 2 card layout: 2 cards per row on mobile screens (< 768px), 4 cards per row on desktop
  const isDesktop = width >= 768;

  return (
    <View className="my-6 px-4 w-full mb-10">
      <View className="flex-row flex-wrap justify-between gap-y-3.5">
        {TRUST_FEATURES.map((item) => (
          <View
            key={item.id}
            style={{
              width: isDesktop ? '23.8%' : '48.5%',
              backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
              borderColor: item.borderColor || (isDarkMode ? '#1E293B' : '#E2E8F0'),
              borderWidth: 1,
              borderRadius: 20,
            }}
            className="p-3 sm:p-4 flex-row items-center gap-2.5 sm:gap-3 shadow-xs"
          >
            {/* Left Icon Box */}
            <View
              style={{ backgroundColor: item.bgColor }}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl items-center justify-center shrink-0"
            >
              <Ionicons name={item.iconName} size={22} color={item.iconColor} />
            </View>

            {/* Right Title & Subtitle */}
            <View className="flex-1 min-w-0">
              <Text
                numberOfLines={1}
                className={`text-xs sm:text-sm font-black tracking-tight ${
                  isDarkMode ? 'text-slate-50' : 'text-slate-900'
                }`}
              >
                {item.title}
              </Text>
              <Text
                numberOfLines={2}
                className="text-[10px] sm:text-xs font-semibold text-slate-500 mt-0.5 leading-tight"
              >
                {item.subtitle}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
