import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { AppText as Text } from '../common/AppText';

export interface TrustBadgeItem {
  id: string;
  titleKey: string;
  subKey: string;
  iconName: keyof typeof Ionicons.glyphMap;
  iconColorLight: string;
  iconColorDark: string;
  bgColorLight: string;
  bgColorDark: string;
}

const BADGES: TrustBadgeItem[] = [
  {
    id: 'b1',
    titleKey: 'expressFastDelivery',
    subKey: 'expressFastDeliverySub',
    iconName: 'bus-outline',
    iconColorLight: '#059669',
    iconColorDark: '#34D399',
    bgColorLight: 'bg-emerald-100',
    bgColorDark: 'bg-emerald-900/60',
  },
  {
    id: 'b2',
    titleKey: 'genuineFresh',
    subKey: 'genuineFreshSub',
    iconName: 'shield-checkmark-outline',
    iconColorLight: '#059669',
    iconColorDark: '#34D399',
    bgColorLight: 'bg-emerald-100',
    bgColorDark: 'bg-emerald-900/60',
  },
  {
    id: 'b3',
    titleKey: 'secureEasyPayment',
    subKey: 'secureEasyPaymentSub',
    iconName: 'card-outline',
    iconColorLight: '#2563EB',
    iconColorDark: '#60A5FA',
    bgColorLight: 'bg-blue-100',
    bgColorDark: 'bg-blue-900/60',
  },
  {
    id: 'b4',
    titleKey: 'support247Dedicated',
    subKey: 'support247DedicatedSub',
    iconName: 'headset-outline',
    iconColorLight: '#9333EA',
    iconColorDark: '#C084FC',
    bgColorLight: 'bg-purple-100',
    bgColorDark: 'bg-purple-900/60',
  },
];

export const GroceryTrustBadges: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();

  return (
    <View className="my-6 px-4 w-full">
      {/* 2-Column Grid Layout: 2 Cards per Line */}
      <View className="flex-row flex-wrap justify-between gap-y-3.5">
        {BADGES.map((item) => (
          <View
            key={item.id}
            style={{ borderRadius: 16 }}
            className={`w-[48.5%] p-3.5 rounded-2xl border shadow-xs justify-between ${
              isDarkMode
                ? 'bg-slate-950 border-slate-800/90'
                : 'bg-white border-slate-200/90'
            }`}
          >
            {/* Rounded Icon Box */}
            <View
              className={`w-10 h-10 rounded-xl items-center justify-center mb-2.5 ${
                isDarkMode ? item.bgColorDark : item.bgColorLight
              }`}
            >
              <Ionicons
                name={item.iconName}
                size={20}
                color={isDarkMode ? item.iconColorDark : item.iconColorLight}
              />
            </View>

            {/* Text Area */}
            <View>
              <Text
                numberOfLines={2}
                className={`text-xs sm:text-sm font-extrabold leading-4 mb-1 ${
                  isDarkMode ? 'text-slate-100' : 'text-slate-900'
                }`}
              >
                {t(item.titleKey)}
              </Text>

              <Text
                numberOfLines={2}
                className={`text-[10px] sm:text-xs font-semibold leading-3.5 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {t(item.subKey)}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
