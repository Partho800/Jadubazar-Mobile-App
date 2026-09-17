import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../context/LanguageContext';
import { AppText as Text } from '../common/AppText';

interface FoodDailyDealsProps {
  onBogoPress?: () => void;
  onFlat30Press?: () => void;
}

import { foodData } from '../../data/productsData';

export interface DailyDealCardItem {
  id: string;
  titleKey: string;
  subKey: string;
  btnKey: string;
  bgGradient?: string;
  bgColor: string;
  imageUrl: string;
}

export const FoodDailyDeals: React.FC<FoodDailyDealsProps> = ({
  onBogoPress,
  onFlat30Press,
}) => {
  const { t } = useLanguage();
  const deals: DailyDealCardItem[] = ((foodData as any).dailyDealsCards || []) as DailyDealCardItem[];

  return (
    <View className="my-5 px-4 w-full flex-row items-center justify-between gap-3">
      {deals.map((item, index) => {
        const onPress = index === 0 ? onBogoPress : onFlat30Press;
        return (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.92}
            onPress={onPress}
            style={{ borderRadius: 20, backgroundColor: item.bgColor }}
            className="flex-1 p-4 rounded-2xl relative overflow-hidden shadow-md"
          >
            <Text className="text-white font-black text-sm sm:text-base uppercase tracking-tight mb-0.5">
              {t(item.titleKey)}
            </Text>
            <Text className="text-orange-100 text-[11px] sm:text-xs font-semibold mb-3">
              {t(item.subKey)}
            </Text>

            <View className="bg-white px-3 py-1.5 rounded-full flex-row items-center gap-1 self-start shadow-xs">
              <Text style={{ color: item.bgColor }} className="text-[10px] sm:text-xs font-black uppercase">
                {t(item.btnKey)}
              </Text>
              <Ionicons name="arrow-forward" size={12} color={item.bgColor} />
            </View>

            <Image
              source={{ uri: item.imageUrl }}
              className="w-16 h-16 rounded-full absolute -bottom-2 -right-2 opacity-80"
              resizeMode="cover"
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
