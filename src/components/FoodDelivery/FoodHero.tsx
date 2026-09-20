import React from 'react';
import { View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { AppText as Text } from '../common/AppText';

interface FoodHeroProps {
  onOrderOnlinePress?: () => void;
  onViewMenuPress?: () => void;
}

export const FoodHero: React.FC<FoodHeroProps> = ({
  onOrderOnlinePress,
  onViewMenuPress,
}) => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();

  const AVATARS = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
  ];

  return (
    <View className="w-full relative mb-6 overflow-hidden">
      {/* 1. Main Background Image Banner */}
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
        }}
        className="w-full min-h-[460px] sm:min-h-[520px] justify-center items-center px-4 pt-10 pb-16 relative"
        resizeMode="cover"
      >
        {/* Top Smooth Transition Fade */}
        <LinearGradient
          colors={
            isDarkMode
              ? ['#0F172A', 'rgba(15,23,42,0.6)', 'transparent']
              : ['#FFFFFF', 'rgba(255,255,255,0.7)', 'transparent']
          }
          locations={[0, 0.45, 1]}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 55,
            zIndex: 5,
          }}
          pointerEvents="none"
        />

        {/* Dark Gradient Overlay for Contrast */}
        <View className="absolute inset-0 bg-black/65" />

        {/* Content Container */}
        <View className="z-10 items-center max-w-[540px] text-center">
          {/* Top Tagline */}
          <Text className="font-serif italic text-[#FBBF24] text-xs sm:text-base font-bold tracking-wider mb-2 text-center">
            {t('bigFlavorFastDelivery')}
          </Text>

          {/* Main Headline */}
          <Text className="text-center font-black text-2xl sm:text-4xl md:text-5xl leading-tight uppercase tracking-tight mb-2">
            <Text className="text-white font-black">{t('fastFoodTitle')}</Text>
            <Text className="text-[#FBBF24] font-black">{t('madeFreshForYou')}</Text>
          </Text>

          {/* Subtitle */}
          <Text className="text-slate-200 text-xs sm:text-sm md:text-base font-semibold text-center my-3 leading-snug max-w-[460px]">
            {t('foodHeroSub')}
          </Text>

          {/* Action Buttons Row */}
          <View className="flex-row items-center justify-center gap-3 my-4 flex-wrap">
            {/* ORDER ONLINE Button */}
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={onOrderOnlinePress}
              className="bg-[#F59E0B] active:bg-amber-600 px-6 sm:px-7 py-3 rounded-full flex-row items-center gap-2 shadow-lg"
            >
              <Text className="text-slate-950 text-xs sm:text-sm font-black uppercase tracking-wider">
                {t('orderOnline')}
              </Text>
              <Ionicons name="arrow-forward" size={16} color="#0F172A" />
            </TouchableOpacity>

            {/* VIEW MENU Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={onViewMenuPress}
              className="border-2 border-white/90 active:bg-white/20 px-6 sm:px-7 py-3 rounded-full flex-row items-center gap-1.5 shadow-xs"
            >
              <Text className="text-white text-xs sm:text-sm font-black uppercase tracking-wider">
                {t('viewMenu')}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Customer Rating & Avatars Row */}
          <View className="flex-row items-center justify-center gap-2 mt-2">
            <View className="flex-row items-center">
              {AVATARS.map((url, i) => (
                <Image
                  key={i}
                  source={{ uri: url }}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-amber-400 ${
                    i > 0 ? '-ml-2.5' : ''
                  }`}
                />
              ))}
            </View>

            <View className="items-start pl-1">
              <Text className="text-slate-200 text-[11px] sm:text-xs font-bold">
                {t('joinHappyCustomers')}
              </Text>
              <View className="flex-row items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Ionicons key={idx} name="star" size={11} color="#F59E0B" />
                ))}
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>

      {/* 2. Floating Feature Box Overlapping Bottom Banner */}
      <View className="px-4">
        <View
          style={{ borderRadius: 24 }}
          className={`w-full p-4 sm:p-5 shadow-2xl border -mt-12 sm:-mt-16 z-20 ${
            isDarkMode
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-100'
          }`}
        >
          <View className="flex-row flex-wrap sm:flex-nowrap justify-between gap-y-4 gap-x-2">
            {/* 1. FAST DELIVERY */}
            <View className="w-[48%] sm:w-[24%] items-center text-center">
              <View
                style={{ backgroundColor: isDarkMode ? '#451A03' : '#FFEDD5' }}
                className="w-12 h-12 rounded-full items-center justify-center mb-2 shadow-xs"
              >
                <Ionicons name="bicycle-outline" size={24} color="#FF6B00" />
              </View>
              <Text
                className={`text-xs font-extrabold uppercase text-center mb-0.5 ${
                  isDarkMode ? 'text-slate-100' : 'text-slate-900'
                }`}
              >
                {t('foodFastDelivery')}
              </Text>
              <Text
                className={`text-[10px] sm:text-xs text-center font-medium leading-3.5 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {t('foodFastDeliverySub')}
              </Text>
            </View>

            {/* 2. FRESH INGREDIENTS */}
            <View className="w-[48%] sm:w-[24%] items-center text-center">
              <View
                style={{ backgroundColor: isDarkMode ? '#451A03' : '#FFEDD5' }}
                className="w-12 h-12 rounded-full items-center justify-center mb-2 shadow-xs"
              >
                <Ionicons name="leaf-outline" size={24} color="#FF6B00" />
              </View>
              <Text
                className={`text-xs font-extrabold uppercase text-center mb-0.5 ${
                  isDarkMode ? 'text-slate-100' : 'text-slate-900'
                }`}
              >
                {t('foodFreshIngredients')}
              </Text>
              <Text
                className={`text-[10px] sm:text-xs text-center font-medium leading-3.5 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {t('foodFreshIngredientsSub')}
              </Text>
            </View>

            {/* 3. HOT & TASTY */}
            <View className="w-[48%] sm:w-[24%] items-center text-center">
              <View
                style={{ backgroundColor: isDarkMode ? '#451A03' : '#FFEDD5' }}
                className="w-12 h-12 rounded-full items-center justify-center mb-2 shadow-xs"
              >
                <Ionicons name="flame-outline" size={24} color="#FF6B00" />
              </View>
              <Text
                className={`text-xs font-extrabold uppercase text-center mb-0.5 ${
                  isDarkMode ? 'text-slate-100' : 'text-slate-900'
                }`}
              >
                {t('foodHotTasty')}
              </Text>
              <Text
                className={`text-[10px] sm:text-xs text-center font-medium leading-3.5 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {t('foodHotTastySub')}
              </Text>
            </View>

            {/* 4. BEST PRICES */}
            <View className="w-[48%] sm:w-[24%] items-center text-center">
              <View
                style={{ backgroundColor: isDarkMode ? '#451A03' : '#FFEDD5' }}
                className="w-12 h-12 rounded-full items-center justify-center mb-2 shadow-xs"
              >
                <Ionicons name="pricetag-outline" size={24} color="#FF6B00" />
              </View>
              <Text
                className={`text-xs font-extrabold uppercase text-center mb-0.5 ${
                  isDarkMode ? 'text-slate-100' : 'text-slate-900'
                }`}
              >
                {t('foodBestPrices')}
              </Text>
              <Text
                className={`text-[10px] sm:text-xs text-center font-medium leading-3.5 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {t('foodBestPricesSub')}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
