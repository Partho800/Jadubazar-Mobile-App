import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { AppText as Text } from '../common/AppText';

interface GrocerySpecialSavingsProps {
  onViewAllPress?: () => void;
}

export const GrocerySpecialSavings: React.FC<GrocerySpecialSavingsProps> = ({
  onViewAllPress,
}) => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();

  return (
    <View className="mx-4 my-6">
      {/* Outer Card Wrapper */}
      <View
        className={`rounded-3xl border shadow-md overflow-hidden ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-[#F8FAFC] border-slate-200/80'
        }`}
      >
        {/* 1. Top Red Header Banner (Full width top) */}
        <View className="bg-[#E11D48] pt-4 pb-7 px-4 items-center justify-center relative">
          <Text className="text-white text-xl sm:text-2xl font-black italic tracking-wide text-center">
            {t('specialSavingsTitle')}
          </Text>
        </View>

        {/* 2. White/Content Area with Top Rounded Arch (Overlapping the red header bottom) */}
        <View
          className={`-mt-4 rounded-t-3xl p-4 sm:p-5 ${
            isDarkMode ? 'bg-slate-900' : 'bg-[#F8FAFC]'
          }`}
        >
          {/* Center Product Image Box with Floating BIG SALE Badge */}
          <View className="w-full max-w-[460px] h-[280px] sm:h-[350px] rounded-2xl overflow-hidden self-center relative mb-5 items-center justify-center bg-white shadow-sm border border-slate-100 dark:border-slate-800">
            {/* Direct High Quality Grocery Bag / Produce Image Link */}
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
              }}
              className="w-full h-full"
              resizeMode="cover"
            />

            {/* Floating BIG SALE Round Red Badge at Bottom Right */}
            <View className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E11D48] absolute bottom-3 right-3 items-center justify-center shadow-lg border-2 border-white transform rotate-[-8deg] z-10">
              <Text className="text-white font-black text-xs sm:text-sm tracking-wider text-center leading-4">
                BIG{'\n'}SALE
              </Text>
            </View>
          </View>

          {/* 3. Bottom Action Button: VIEW ALL SPECIAL SAVINGS ➔ */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onViewAllPress}
            className="w-full h-12 sm:h-14 bg-[#E11D48] flex-row items-center justify-center rounded-2xl shadow-lg shadow-rose-600/35 gap-2 px-4"
          >
            <Text
              numberOfLines={1}
              className="text-white font-black text-xs sm:text-sm tracking-wider uppercase"
            >
              {t('viewAllSpecialSavings')}
            </Text>
            <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
