import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../context/LanguageContext';
import { AppText as Text } from '../common/AppText';

interface GroceryVegFruitsOffersProps {
  onShopVegPress?: () => void;
  onExploreFruitsPress?: () => void;
}

export const GroceryVegFruitsOffers: React.FC<GroceryVegFruitsOffersProps> = ({
  onShopVegPress,
  onExploreFruitsPress,
}) => {
  const { t } = useLanguage();

  return (
    <View className="my-6 px-4 w-full gap-4">
      {/* 1. FRESH ORGANIC VEGETABLES CARD */}
      <TouchableOpacity
        activeOpacity={0.92}
        onPress={onShopVegPress}
        style={{ borderRadius: 24 }}
        className="w-full bg-[#ECFDF5] border border-emerald-100 p-5 sm:p-6 rounded-3xl flex-row items-center justify-between relative overflow-hidden shadow-xs"
      >
        {/* Left Content Area */}
        <View className="flex-1 pr-2 z-10">
          <View className="bg-[#D1FAE5] px-2.5 py-0.5 rounded-full self-start mb-2 border border-emerald-200/60">
            <Text className="text-[#047857] text-[10px] font-black tracking-wider uppercase">
              {t('dailyOfferTag')}
            </Text>
          </View>

          <Text className="text-slate-900 font-extrabold text-base sm:text-xl leading-tight mb-1.5 max-w-[210px] sm:max-w-[300px]">
            {t('freshVegHeadline')}
          </Text>

          <Text className="text-slate-600 text-xs sm:text-sm font-semibold mb-3 max-w-[210px] sm:max-w-[300px] leading-4">
            {t('freshVegSub')}
          </Text>

          <View className="bg-[#059669] active:bg-emerald-700 px-4 py-2 rounded-full flex-row items-center gap-1.5 shadow-xs self-start">
            <Text className="text-white text-xs font-black">
              {t('shopVegBtn')}
            </Text>
            <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
          </View>
        </View>

        {/* Right Faded Image Container */}
        <View className="w-[120px] h-[130px] sm:w-[160px] sm:h-[160px] rounded-2xl overflow-hidden relative opacity-90">
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
            }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>

      {/* 2. FRESH FRUITS FESTIVAL CARD */}
      <TouchableOpacity
        activeOpacity={0.92}
        onPress={onExploreFruitsPress}
        style={{ borderRadius: 24 }}
        className="w-full bg-[#ECFDF5] border border-emerald-100 p-5 sm:p-6 rounded-3xl flex-row items-center justify-between relative overflow-hidden shadow-xs"
      >
        {/* Left Content Area */}
        <View className="flex-1 pr-2 z-10">
          <View className="bg-[#D1FAE5] px-2.5 py-0.5 rounded-full self-start mb-2 border border-emerald-200/60">
            <Text className="text-[#047857] text-[10px] font-black tracking-wider uppercase">
              {t('seasonalSpecialTag')}
            </Text>
          </View>

          <Text className="text-slate-900 font-extrabold text-base sm:text-xl leading-tight mb-1.5 max-w-[210px] sm:max-w-[300px]">
            {t('freshFruitsFest')}
          </Text>

          <Text className="text-slate-600 text-xs sm:text-sm font-semibold mb-3 max-w-[210px] sm:max-w-[300px] leading-4">
            {t('freshFruitsSub')}
          </Text>

          <View className="bg-[#059669] active:bg-emerald-700 px-4 py-2 rounded-full flex-row items-center gap-1.5 shadow-xs self-start">
            <Text className="text-white text-xs font-black">
              {t('exploreFruitsBtn')}
            </Text>
            <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
          </View>
        </View>

        {/* Right Faded Image Container */}
        <View className="w-[120px] h-[130px] sm:w-[160px] sm:h-[160px] rounded-2xl overflow-hidden relative opacity-90">
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80',
            }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
