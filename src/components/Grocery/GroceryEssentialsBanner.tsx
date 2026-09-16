import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../context/LanguageContext';
import { AppText as Text } from '../common/AppText';

interface GroceryEssentialsBannerProps {
  onPress?: () => void;
}

export const GroceryEssentialsBanner: React.FC<GroceryEssentialsBannerProps> = ({ onPress }) => {
  const { t } = useLanguage();

  return (
    <View className="my-6 px-4 w-full">
      <TouchableOpacity
        activeOpacity={0.93}
        onPress={onPress}
        style={{ borderRadius: 24 }}
        className="w-full bg-[#237042] p-5 sm:p-7 rounded-3xl items-center relative overflow-hidden shadow-md"
      >
        {/* Decorative Background Concentric Circles */}
        <View className="absolute -top-12 -left-12 w-64 h-64 rounded-full border border-white/10" />
        <View className="absolute -top-6 -left-6 w-52 h-52 rounded-full border border-white/10" />
        <View className="absolute -bottom-10 -right-10 w-60 h-60 rounded-full border border-white/10" />

        {/* Top Tag Badge */}
        <View className="bg-white/15 border border-white/25 px-3.5 py-1 rounded-full flex-row items-center gap-1.5 mb-3">
          <Text className="text-white text-[10px] sm:text-[11px] font-black tracking-wider uppercase">
            {t('dailyPantryStaples')}
          </Text>
        </View>

        {/* Headline */}
        <Text className="text-2xl sm:text-3xl md:text-4xl font-black text-center text-white tracking-tight uppercase leading-tight max-w-[320px] sm:max-w-[440px]">
          {t('stockUpEssentials')}
        </Text>

        {/* Subtitle */}
        <Text className="text-white/90 text-xs sm:text-sm font-semibold text-center max-w-[300px] sm:max-w-[420px] my-3 leading-4 sm:leading-5">
          {t('essentialsSub')}
        </Text>

        {/* Red Shop Now Button */}
        <View className="bg-[#DC2626] active:bg-red-700 px-6 py-2.5 rounded-full flex-row items-center gap-2 shadow-md my-2">
          <Text className="text-white text-xs sm:text-sm font-black uppercase tracking-wider">
            {t('shopNow')}
          </Text>
          <Ionicons name="arrow-forward" size={15} color="#FFFFFF" />
        </View>

        {/* Hero Image Card Container */}
        <View className="w-full h-[180px] sm:h-[240px] rounded-2xl border-2 border-white/80 overflow-hidden relative shadow-lg mt-3 bg-slate-900">
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
            }}
            className="w-full h-full"
            resizeMode="cover"
          />

          {/* Bottom Overlay Gradient & Content */}
          <View className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex-row items-end justify-between">
            <View>
              <Text className="text-emerald-400 text-[10px] sm:text-xs font-black tracking-wider uppercase mb-0.5">
                {t('pureFreshPackets')}
              </Text>
              <Text className="text-white text-xs sm:text-sm font-extrabold">
                {t('spicesBesanNutsCol')}
              </Text>
            </View>

            <View className="bg-[#059669] px-3 py-1 rounded-full border border-white/20 shadow-xs">
              <Text className="text-white text-[10px] sm:text-xs font-black tracking-wider">
                {t('upTo25Off')}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
