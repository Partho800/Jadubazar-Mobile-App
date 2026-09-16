import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../context/LanguageContext';
import { AppText as Text } from '../common/AppText';

interface GroceryMeatFishBannersProps {
  onMeatPress?: () => void;
  onFishPress?: () => void;
}

export const GroceryMeatFishBanners: React.FC<GroceryMeatFishBannersProps> = ({
  onMeatPress,
  onFishPress,
}) => {
  const { t } = useLanguage();

  return (
    <View className="my-6 px-4 w-full gap-4">
      {/* 1. TOP BANNER: FRESH MEAT */}
      <TouchableOpacity
        activeOpacity={0.92}
        onPress={onMeatPress}
        style={{ borderRadius: 24 }}
        className="w-full bg-[#F59E0B] p-5 sm:p-6 rounded-3xl flex-row items-center justify-between relative overflow-hidden shadow-md"
      >
        {/* Subtle Decorative Dotted Grid Effect */}
        <View className="absolute inset-0 opacity-15 flex-row flex-wrap gap-3 p-3">
          {Array.from({ length: 40 }).map((_, i) => (
            <View key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
          ))}
        </View>

        {/* Left Content Area */}
        <View className="flex-1 pr-2 z-10 justify-center">
          <Text className="font-serif italic text-white text-2xl sm:text-3xl md:text-4xl drop-shadow-xs font-bold">
            {t('freshMeatTitle')}
          </Text>
          <Text className="font-black text-[#DC2626] text-3xl sm:text-4xl md:text-5xl leading-tight mb-3 tracking-tight">
            {t('meatHeadline')}
          </Text>

          <View className="flex-row items-center">
            <View className="bg-[#DC2626] active:bg-red-700 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full flex-row items-center gap-1.5 shadow-md">
              <Text className="text-white text-xs sm:text-sm font-black uppercase tracking-wider">
                {t('shopNow')}
              </Text>
              <Ionicons name="arrow-forward" size={15} color="#FFFFFF" />
            </View>
          </View>
        </View>

        {/* Right Image Container */}
        <View className="w-[125px] h-[125px] sm:w-[160px] sm:h-[160px] md:w-[180px] md:h-[180px] rounded-2xl border-2 border-white/50 overflow-hidden relative shadow-md z-10 bg-slate-900">
          {/* Top-Right Tag Badge */}
          <View className="bg-[#DC2626] px-2.5 py-0.5 rounded-full absolute top-2 right-2 z-20 shadow-sm border border-white/20">
            <Text className="text-white text-[9px] sm:text-[10px] font-black tracking-wider uppercase">
              {t('halalBadge')}
            </Text>
          </View>

          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=600&q=80',
            }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>

      {/* 2. BOTTOM BANNER: FRESH FISH */}
      <TouchableOpacity
        activeOpacity={0.92}
        onPress={onFishPress}
        style={{ borderRadius: 24 }}
        className="w-full bg-[#34D399] p-5 sm:p-6 rounded-3xl flex-row items-center justify-between relative overflow-hidden shadow-md"
      >
        {/* Subtle Decorative Dotted Grid Effect */}
        <View className="absolute inset-0 opacity-15 flex-row flex-wrap gap-3 p-3">
          {Array.from({ length: 40 }).map((_, i) => (
            <View key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
          ))}
        </View>

        {/* Left Image Container */}
        <View className="w-[125px] h-[125px] sm:w-[160px] sm:h-[160px] md:w-[180px] md:h-[180px] rounded-2xl border-2 border-white/50 overflow-hidden relative shadow-md z-10 bg-slate-900">
          {/* Top-Left Tag Badge */}
          <View className="bg-[#064E3B] px-2.5 py-0.5 rounded-full absolute top-2 left-2 z-20 shadow-sm border border-white/20">
            <Text className="text-white text-[9px] sm:text-[10px] font-black tracking-wider uppercase">
              {t('riverFreshBadge')}
            </Text>
          </View>

          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=600&q=80',
            }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        {/* Right Content Area */}
        <View className="flex-1 pl-2 z-10 justify-center items-end">
          <Text className="font-serif italic text-white text-2xl sm:text-3xl md:text-4xl drop-shadow-xs font-bold text-right">
            {t('freshFishTitle')}
          </Text>
          <Text className="font-black text-white text-3xl sm:text-4xl md:text-5xl leading-tight mb-3 tracking-tight text-right">
            {t('fishHeadline')}
          </Text>

          <View className="flex-row items-center">
            <View className="bg-[#047857] active:bg-emerald-800 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full flex-row items-center gap-1.5 shadow-md">
              <Text className="text-white text-xs sm:text-sm font-black uppercase tracking-wider">
                {t('shopNow')}
              </Text>
              <Ionicons name="arrow-forward" size={15} color="#FFFFFF" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
