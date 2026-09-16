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
  iconColor: string;
  bgColorLight: string;
  bgColorDark: string;
}

const BADGES: TrustBadgeItem[] = [
  {
    id: 'b1',
    titleKey: 'expressFastDelivery',
    subKey: 'expressFastDeliverySub',
    iconName: 'bus-outline',
    iconColor: '#059669',
    bgColorLight: 'bg-emerald-100/80',
    bgColorDark: 'dark:bg-emerald-950/80',
  },
  {
    id: 'b2',
    titleKey: 'genuineFresh',
    subKey: 'genuineFreshSub',
    iconName: 'shield-checkmark-outline',
    iconColor: '#059669',
    bgColorLight: 'bg-emerald-100/80',
    bgColorDark: 'dark:bg-emerald-950/80',
  },
  {
    id: 'b3',
    titleKey: 'secureEasyPayment',
    subKey: 'secureEasyPaymentSub',
    iconName: 'card-outline',
    iconColor: '#2563EB',
    bgColorLight: 'bg-blue-100/80',
    bgColorDark: 'dark:bg-blue-950/80',
  },
  {
    id: 'b4',
    titleKey: 'support247Dedicated',
    subKey: 'support247DedicatedSub',
    iconName: 'headset-outline',
    iconColor: '#9333EA',
    bgColorLight: 'bg-purple-100/80',
    bgColorDark: 'dark:bg-purple-950/80',
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
              className={`w-10 h-10 rounded-xl items-center justify-center mb-2.5 ${item.bgColorLight} ${item.bgColorDark}`}
            >
              <Ionicons name={item.iconName} size={20} color={item.iconColor} />
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
