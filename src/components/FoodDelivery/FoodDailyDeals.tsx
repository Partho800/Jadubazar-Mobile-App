import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../context/LanguageContext';
import { AppText as Text } from '../common/AppText';

interface FoodDailyDealsProps {
  onBogoPress?: () => void;
  onFlat30Press?: () => void;
}

export const FoodDailyDeals: React.FC<FoodDailyDealsProps> = ({
  onBogoPress,
  onFlat30Press,
}) => {
  const { t } = useLanguage();

  return (
    <View className="my-5 px-4 w-full flex-row items-center justify-between gap-3">
      {/* 1. CARD 1: BUY 1 GET 1 FREE */}
      <TouchableOpacity
        activeOpacity={0.92}
        onPress={onBogoPress}
        style={{ borderRadius: 20 }}
        className="flex-1 bg-gradient-to-br from-[#FF6B00] to-[#EA580C] bg-[#EA580C] p-4 rounded-2xl relative overflow-hidden shadow-md"
      >
        <Text className="text-white font-black text-sm sm:text-base uppercase tracking-tight mb-0.5">
          {t('buy1Get1Free')}
        </Text>
        <Text className="text-orange-100 text-[11px] sm:text-xs font-semibold mb-3">
          {t('onSelectedPizzasBurgers')}
        </Text>

        <View className="bg-white px-3 py-1.5 rounded-full flex-row items-center gap-1 self-start shadow-xs">
          <Text className="text-[#EA580C] text-[10px] sm:text-xs font-black uppercase">
            {t('orderNowBtn')}
          </Text>
          <Ionicons name="arrow-forward" size={12} color="#EA580C" />
        </View>

        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80',
          }}
          className="w-16 h-16 rounded-full absolute -bottom-2 -right-2 opacity-80"
          resizeMode="cover"
        />
      </TouchableOpacity>

      {/* 2. CARD 2: FLAT 30% OFF */}
      <TouchableOpacity
        activeOpacity={0.92}
        onPress={onFlat30Press}
        style={{ borderRadius: 20 }}
        className="flex-1 bg-[#C2410C] p-4 rounded-2xl relative overflow-hidden shadow-md"
      >
        <Text className="text-white font-black text-sm sm:text-base uppercase tracking-tight mb-0.5">
          {t('flat30Off')}
        </Text>
        <Text className="text-orange-100 text-[11px] sm:text-xs font-semibold mb-3">
          {t('onBiryaniKacchi')}
        </Text>

        <View className="bg-white px-3 py-1.5 rounded-full flex-row items-center gap-1 self-start shadow-xs">
          <Text className="text-[#C2410C] text-[10px] sm:text-xs font-black uppercase">
            {t('claimDealBtn')}
          </Text>
          <Ionicons name="arrow-forward" size={12} color="#C2410C" />
        </View>

        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80',
          }}
          className="w-16 h-16 rounded-full absolute -bottom-2 -right-2 opacity-80"
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
};
