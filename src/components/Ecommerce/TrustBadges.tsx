import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { AppText as Text } from '../common/AppText';

export interface TrustItem {
  id: string;
  titleKey: string;
  subKey: string;
  iconType: 'quality' | 'delivery' | 'secure' | 'satisfaction';
}

const TRUST_ITEMS: TrustItem[] = [
  {
    id: 't1',
    titleKey: 'premiumQualityTitle',
    subKey: 'premiumQualitySub',
    iconType: 'quality',
  },
  {
    id: 't2',
    titleKey: 'fastDeliveryTitle',
    subKey: 'fastDeliverySub',
    iconType: 'delivery',
  },
  {
    id: 't3',
    titleKey: 'securePayments',
    subKey: 'securePaymentsSub',
    iconType: 'secure',
  },
  {
    id: 't4',
    titleKey: 'satisfactionTitle',
    subKey: 'satisfactionSub',
    iconType: 'satisfaction',
  },
];

export const TrustBadges: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();

  const renderTrustIcon = (type: TrustItem['iconType']) => {
    switch (type) {
      case 'quality':
        return (
          <Ionicons name="ribbon-outline" size={34} color="#059669" />
        );
      case 'delivery':
        return (
          <Svg width="34" height="34" viewBox="0 0 24 24" fill="none">
            <Path
              d="M1 4H15V16H1V4Z"
              stroke="#0D9488"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M15 8H19L23 12V16H15V8Z"
              stroke="#0D9488"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M5.5 19.5C6.88071 19.5 8 18.3807 8 17C8 15.6193 6.88071 14.5 5.5 14.5C4.11929 14.5 3 15.6193 3 17C3 18.3807 4.11929 19.5 5.5 19.5Z"
              stroke="#0D9488"
              strokeWidth="2"
            />
            <Path
              d="M18.5 19.5C19.8807 19.5 21 18.3807 21 17C21 15.6193 19.8807 14.5 18.5 14.5C17.1193 14.5 16 15.6193 16 17C16 18.3807 17.1193 19.5 18.5 19.5Z"
              stroke="#0D9488"
              strokeWidth="2"
            />
          </Svg>
        );
      case 'secure':
        return (
          <Ionicons name="shield-checkmark-outline" size={34} color="#2563EB" />
        );
      case 'satisfaction':
        return (
          <Ionicons name="heart-outline" size={34} color="#F43F5E" />
        );
      default:
        return null;
    }
  };

  return (
    <View className="mx-4 mb-16 pb-4">
      {/* 2x2 Grid of Feature Guarantee Cards */}
      <View className="flex-row flex-wrap justify-between gap-y-4">
        {TRUST_ITEMS.map((item) => (
          <View
            key={item.id}
            style={{ width: '48%', borderRadius: 20 }}
            className={`p-5 items-center justify-center text-center border shadow-xs ${
              isDarkMode
                ? 'bg-slate-900/90 border-slate-800'
                : 'bg-white border-slate-100'
            }`}
          >
            {/* Icon */}
            <View className="mb-3 items-center justify-center">
              {renderTrustIcon(item.iconType)}
            </View>

            {/* Title */}
            <Text
              className={`text-xs sm:text-sm font-black text-center tracking-tight mb-1.5 ${
                isDarkMode ? 'text-slate-50' : 'text-slate-900'
              }`}
            >
              {t(item.titleKey)}
            </Text>

            {/* Subtitle */}
            <Text
              className={`text-xs font-semibold text-center leading-4 ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              {t(item.subKey)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
