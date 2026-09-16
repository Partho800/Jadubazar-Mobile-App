import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../context/LanguageContext';
import { AppText as Text } from '../common/AppText';

interface FoodIftarFestBannerProps {
  onPress?: () => void;
}

export const FoodIftarFestBanner: React.FC<FoodIftarFestBannerProps> = ({ onPress }) => {
  const { t } = useLanguage();

  return (
    <View className="my-5 px-4 w-full">
      <TouchableOpacity
        activeOpacity={0.93}
        onPress={onPress}
        style={{ borderRadius: 24 }}
        className="w-full bg-[#18181B] border-2 border-[#F59E0B] p-5 sm:p-6 rounded-3xl relative overflow-hidden shadow-xl"
      >
        {/* Glow accent in background */}
        <View className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-amber-500/20 blur-xl" />

        {/* Content & Image Row */}
        <View className="flex-row items-center justify-between gap-3 z-10">
          <View className="flex-1 pr-1">
            <Text className="text-[#FBBF24] text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight mb-1 drop-shadow-sm">
              {t('royalIftarFestTitle')}
            </Text>

            <Text className="text-slate-300 text-xs sm:text-sm font-semibold mb-4 leading-4 sm:leading-5">
              {t('royalIftarFestSub')}
            </Text>

            <View className="bg-[#F59E0B] active:bg-amber-600 px-4 sm:px-5 py-2.5 rounded-full flex-row items-center gap-1.5 shadow-md self-start">
              <Text className="text-slate-950 text-xs sm:text-sm font-black uppercase tracking-wider">
                {t('exploreFestivalOffers')}
              </Text>
              <Ionicons name="arrow-forward" size={15} color="#0F172A" />
            </View>
          </View>

          <View className="w-[110px] h-[120px] sm:w-[150px] sm:h-[150px] rounded-2xl border border-amber-400/40 overflow-hidden relative shadow-md bg-slate-900 shrink-0">
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80',
              }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
