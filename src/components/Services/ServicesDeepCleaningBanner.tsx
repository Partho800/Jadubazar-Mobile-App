import React from 'react';
import { View, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { AppText as Text } from '../common/AppText';

const CLEANING_IMAGE_URL =
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80';

interface ServicesDeepCleaningBannerProps {
  onBookServicePress?: () => void;
}

export const ServicesDeepCleaningBanner: React.FC<ServicesDeepCleaningBannerProps> = ({
  onBookServicePress,
}) => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const { width } = useWindowDimensions();

  const isWide = width >= 768;

  return (
    <View className="my-8 w-full max-w-[1100px] self-center px-4">
      {/* Outer Banner Card with Soft Low-Opacity Border */}
      <View
        className={`w-full rounded-[32px] overflow-hidden flex-col md:flex-row items-center justify-between border shadow-sm ${
          isDarkMode
            ? 'bg-slate-900 border-slate-800/60 shadow-none'
            : 'bg-white border-slate-200/50 shadow-slate-200/30'
        }`}
      >
        {/* Left Content Column */}
        <View className="flex-1 p-6 sm:p-10 items-start">
          {/* 1. Verified Services Badge */}
          <View
            className={`px-3.5 py-1 rounded-full border mb-4 ${
              isDarkMode
                ? 'bg-purple-950/80 border-purple-800'
                : 'bg-purple-100/90 border-purple-200'
            }`}
          >
            <Text
              className={`text-[11px] sm:text-xs font-black uppercase tracking-wider ${
                isDarkMode ? 'text-purple-300' : 'text-[#4C1D95]'
              }`}
            >
              {t('verifiedServicesTag') !== 'verifiedServicesTag'
                ? t('verifiedServicesTag')
                : 'VERIFIED SERVICES'}
            </Text>
          </View>

          {/* 2. Headline Title */}
          <Text
            className={`text-2xl sm:text-3xl md:text-4xl font-black text-left tracking-tight leading-tight mb-3 ${
              isDarkMode ? 'text-slate-50' : 'text-[#0F172A]'
            }`}
          >
            {t('deepCleaningTitle') !== 'deepCleaningTitle'
              ? t('deepCleaningTitle')
              : 'Deep Home Cleaning by Verified Professionals'}
          </Text>

          {/* 3. Subtitle Description */}
          <Text
            className={`text-xs sm:text-base font-medium text-left leading-relaxed mb-6 max-w-[540px] ${
              isDarkMode ? 'text-slate-300' : 'text-[#475569]'
            }`}
          >
            {t('deepCleaningSub') !== 'deepCleaningSub'
              ? t('deepCleaningSub')
              : 'Make your home sparkle. Save 20% on booking home sanitization & cleaning services.'}
          </Text>

          {/* 4. Action Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onBookServicePress}
            className="bg-[#5B50E6] hover:bg-[#432DD7] flex-row items-center justify-center rounded-2xl px-6 py-3.5 shadow-md shadow-purple-600/25 gap-2"
          >
            <Text className="text-white text-xs sm:text-sm font-extrabold tracking-wide">
              {t('bookServiceNow') !== 'bookServiceNow'
                ? t('bookServiceNow')
                : 'Book Service Now'}
            </Text>
            <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Right Image Area */}
        <View className="w-full md:w-[45%] h-[240px] md:h-[360px] relative overflow-hidden bg-slate-100 dark:bg-slate-950">
          <Image
            source={{ uri: CLEANING_IMAGE_URL }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
      </View>
    </View>
  );
};
