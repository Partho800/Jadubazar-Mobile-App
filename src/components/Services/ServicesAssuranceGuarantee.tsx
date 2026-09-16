import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { AppText as Text } from '../common/AppText';

export const ServicesAssuranceGuarantee: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();

  const assurances = [
    {
      id: 'damage_cover',
      icon: 'shield-checkmark-outline' as const,
      titleKey: 'damageCoverTitle',
      defaultTitle: '৳10,000 Damage Cover',
      subKey: 'damageCoverSub',
      defaultSub:
        'Your home safety is our priority. In case of any accidental damage during service, we cover up to ৳10,000.',
    },
    {
      id: 'bg_checked',
      icon: 'people-outline' as const,
      titleKey: 'bgCheckedProsTitle',
      defaultTitle: 'Background Checked Pros',
      subKey: 'bgCheckedProsSub',
      defaultSub:
        'Every service professional undergoes police verification, NID checks, and practical skills training.',
    },
    {
      id: 'warranty_7days',
      icon: 'build-outline' as const,
      titleKey: 'warranty7DaysAssuranceTitle',
      defaultTitle: '7-Day Service Warranty',
      subKey: 'warranty7DaysAssuranceSub',
      defaultSub:
        'Not satisfied with the repair or cleaning? We offer a free-of-cost re-service check within 7 days of booking.',
    },
  ];

  return (
    <View className="w-full max-w-[1100px] self-center px-4 my-8">
      <View
        className={`w-full rounded-3xl p-6 sm:p-10 border ${
          isDarkMode
            ? 'bg-slate-900/80 border-slate-800'
            : 'bg-slate-50/70 border-slate-200/80'
        }`}
      >
        <View className="gap-8 sm:gap-10">
          {assurances.map((item) => (
            <View key={item.id} className="flex-row items-start gap-4 sm:gap-5">
              {/* Icon Container */}
              <View
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl items-center justify-center shrink-0 ${
                  isDarkMode ? 'bg-indigo-950/80' : 'bg-indigo-100/80'
                }`}
              >
                <Ionicons
                  name={item.icon}
                  size={24}
                  color={isDarkMode ? '#818CF8' : '#4F46E5'}
                />
              </View>

              {/* Text Details */}
              <View className="flex-1">
                <Text
                  className={`text-base sm:text-lg font-black mb-1.5 leading-tight ${
                    isDarkMode ? 'text-slate-100' : 'text-[#0F172A]'
                  }`}
                >
                  {t(item.titleKey) !== item.titleKey
                    ? t(item.titleKey)
                    : item.defaultTitle}
                </Text>
                <Text
                  className={`text-xs sm:text-sm font-medium leading-relaxed max-w-[850px] ${
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
    </View>
  );
};
