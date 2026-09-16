import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { AppText as Text } from '../common/AppText';

export interface TrustFeatureItem {
  id: string;
  titleKey: string;
  defaultTitle: string;
  subKey: string;
  defaultSub: string;
  iconName: keyof typeof Ionicons.glyphMap;
}

const TRUST_FEATURES: TrustFeatureItem[] = [
  {
    id: 'licensed_pharmacy',
    titleKey: 'licensedPharmacyTitle',
    defaultTitle: 'Licensed Pharmacy',
    subKey: 'licensedPharmacySub',
    defaultSub: '100% certified & reliable',
    iconName: 'person-outline',
  },
  {
    id: 'fast_delivery',
    titleKey: 'fastDeliveryTitle',
    defaultTitle: 'Fast Delivery',
    subKey: 'fastDeliverySub',
    defaultSub: 'Delivering to 19,000+ pin codes',
    iconName: 'car-outline',
  },
  {
    id: 'genuine_products',
    titleKey: 'genuineProductsTitle',
    defaultTitle: 'Genuine Products',
    subKey: 'genuineProductsSub',
    defaultSub: 'Sourced from trusted brands',
    iconName: 'shield-checkmark-outline',
  },
  {
    id: 'secure_payments',
    titleKey: 'securePaymentsTrustTitle',
    defaultTitle: 'Secure Payments',
    subKey: 'securePaymentsTrustSub',
    defaultSub: 'Multiple payment options',
    iconName: 'lock-closed-outline',
  },
];

export const PharmacyTrustFeatures: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();

  return (
    <View className="my-8 w-full max-w-[1100px] self-center px-4">
      {/* 2x2 Grid Layout */}
      <View className="flex-row flex-wrap justify-between gap-y-4">
        {TRUST_FEATURES.map((item) => (
          <View
            key={item.id}
            className={`w-[48%] md:w-[48.5%] rounded-2xl p-4 sm:p-6 border flex-row items-center gap-3.5 sm:gap-5 shadow-xs ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-100 shadow-slate-200/40'
            }`}
          >
            {/* Left Icon Area */}
            <View className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl items-center justify-center bg-teal-50/60 dark:bg-teal-950/40 shrink-0">
              <Ionicons name={item.iconName} size={34} color="#009688" />
            </View>

            {/* Right Text Details */}
            <View className="flex-1 justify-center">
              <Text
                className={`text-sm sm:text-lg font-black tracking-tight leading-snug ${
                  isDarkMode ? 'text-slate-100' : 'text-[#0F172A]'
                }`}
              >
                {t(item.titleKey) !== item.titleKey
                  ? t(item.titleKey)
                  : item.defaultTitle}
              </Text>

              <Text
                className={`text-[11px] sm:text-xs font-medium leading-relaxed mt-0.5 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {t(item.subKey) !== item.subKey
                  ? t(item.subKey)
                  : item.defaultSub}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
