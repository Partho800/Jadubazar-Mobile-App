import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { AppText as Text } from '../common/AppText';

export interface FeatureItem {
  id: string;
  titleKey: string;
  subKey: string;
  iconType: 'truck' | 'shield' | 'return' | 'support';
}

const FEATURES: FeatureItem[] = [
  {
    id: '1',
    titleKey: 'freeShipping',
    subKey: 'freeShippingSub',
    iconType: 'truck',
  },
  {
    id: '2',
    titleKey: 'securePayments',
    subKey: 'securePaymentsSub',
    iconType: 'shield',
  },
  {
    id: '3',
    titleKey: 'easyReturns',
    subKey: 'easyReturnsSub',
    iconType: 'return',
  },
  {
    id: '4',
    titleKey: 'support247',
    subKey: 'support247Sub',
    iconType: 'support',
  },
];

export const FeatureGrid: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();

  const renderIcon = (type: FeatureItem['iconType']) => {
    const iconColor = '#2563EB';

    switch (type) {
      case 'truck':
        return (
          <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <Path
              d="M1 3H15V16H1V3Z"
              stroke={iconColor}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <Path
              d="M15 8H19L23 12V16H15V8Z"
              stroke={iconColor}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <Path
              d="M5.5 19.5C6.88071 19.5 8 18.3807 8 17C8 15.6193 6.88071 14.5 5.5 14.5C4.11929 14.5 3 15.6193 3 17C3 18.3807 4.11929 19.5 5.5 19.5Z"
              stroke={iconColor}
              strokeWidth="2"
            />
            <Path
              d="M18.5 19.5C19.8807 19.5 21 18.3807 21 17C21 15.6193 19.8807 14.5 18.5 14.5C17.1193 14.5 16 15.6193 16 17C16 18.3807 17.1193 19.5 18.5 19.5Z"
              stroke={iconColor}
              strokeWidth="2"
            />
          </Svg>
        );
      case 'shield':
        return <Ionicons name="shield-checkmark-outline" size={22} color={iconColor} />;
      case 'return':
        return <Ionicons name="refresh-outline" size={22} color={iconColor} />;
      case 'support':
        return <Ionicons name="headset-outline" size={22} color={iconColor} />;
      default:
        return null;
    }
  };

  return (
    <View
      className={`py-5 px-4 border-y mb-5 ${
        isDarkMode
          ? 'bg-slate-900 border-slate-800'
          : 'bg-white border-slate-100'
      }`}
    >
      <View className="flex-row flex-wrap justify-between gap-y-6">
        {FEATURES.map((item) => (
          <View key={item.id} className="w-[48%] flex-row items-center gap-3">
            <View className="w-11.5 h-11.5 rounded-full justify-center items-center bg-blue-500/10">
              {renderIcon(item.iconType)}
            </View>

            <View className="flex-1">
              <Text
                className={`text-xs font-extrabold tracking-wider mb-0.5 ${
                  isDarkMode ? 'text-slate-50' : 'text-slate-900'
                }`}
              >
                {t(item.titleKey)}
              </Text>
              <Text
                className={`text-xs font-medium leading-4 ${
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
