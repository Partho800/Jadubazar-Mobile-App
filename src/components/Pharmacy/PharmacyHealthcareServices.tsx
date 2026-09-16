import React from 'react';
import { View, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { AppText as Text } from '../common/AppText';

export interface HealthcareServiceItem {
  id: string;
  titleKey: string;
  defaultTitle: string;
  subKey: string;
  defaultSub: string;
  actionKey: string;
  defaultAction: string;
  iconName: keyof typeof Ionicons.glyphMap;
}

const HEALTHCARE_SERVICES: HealthcareServiceItem[] = [
  {
    id: 'doc_consult',
    titleKey: 'docConsultTitle',
    defaultTitle: 'Doctor Consultation',
    subKey: 'docConsultSub',
    defaultSub: 'Talk to a doctor online',
    actionKey: 'bookNow',
    defaultAction: 'Book Now',
    iconName: 'person-outline',
  },
  {
    id: 'lab_tests',
    titleKey: 'labTestsTitle',
    defaultTitle: 'Lab Tests at Home',
    subKey: 'labTestsSub',
    defaultSub: 'Book tests & get reports online',
    actionKey: 'bookNow',
    defaultAction: 'Book Now',
    iconName: 'flask-outline',
  },
  {
    id: 'med_reminder',
    titleKey: 'medReminderTitle',
    defaultTitle: 'Medicine Reminder',
    subKey: 'medReminderSub',
    defaultSub: 'Never miss your meds again',
    actionKey: 'setReminder',
    defaultAction: 'Set Reminder',
    iconName: 'notifications-outline',
  },
  {
    id: 'full_checkup',
    titleKey: 'fullCheckupTitle',
    defaultTitle: 'Full Body Checkup',
    subKey: 'fullCheckupSub',
    defaultSub: 'Complete health checkup packages',
    actionKey: 'exploreNow',
    defaultAction: 'Explore Now',
    iconName: 'clipboard-outline',
  },
];

interface PharmacyHealthcareServicesProps {
  onServicePress?: (serviceId: string) => void;
  onViewAllPress?: () => void;
}

export const PharmacyHealthcareServices: React.FC<PharmacyHealthcareServicesProps> = ({
  onServicePress,
  onViewAllPress,
}) => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const { width } = useWindowDimensions();

  const isWide = width >= 768;

  return (
    <View className="my-8 w-full max-w-[1100px] self-center px-4">
      {/* 1. Header Row */}
      <View className="flex-row items-center justify-between mb-5">
        <Text
          className={`text-xl sm:text-2xl font-black tracking-tight ${
            isDarkMode ? 'text-slate-50' : 'text-[#0F172A]'
          }`}
        >
          {t('healthcareServices') !== 'healthcareServices'
            ? t('healthcareServices')
            : 'Healthcare Services'}
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onViewAllPress}
          className="flex-row items-center gap-1 px-1 py-1"
        >
          <Text
            className={`text-xs sm:text-sm font-extrabold ${
              isDarkMode ? 'text-teal-400' : 'text-[#0F172A]'
            }`}
          >
            {t('viewAll')}
          </Text>
          <Ionicons
            name="chevron-forward"
            size={14}
            color={isDarkMode ? '#2DD4BF' : '#0F172A'}
          />
        </TouchableOpacity>
      </View>

      {/* 2. Services List / Grid Layout */}
      <View className="flex-col gap-4">
        {HEALTHCARE_SERVICES.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.88}
            onPress={() => onServicePress?.(item.id)}
            className={`w-full rounded-2xl p-5 sm:p-6 border flex-row items-center gap-4 sm:gap-6 shadow-sm ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 shadow-none'
                : 'bg-white border-slate-100 shadow-slate-200/40'
            }`}
          >
            {/* Left Icon Area */}
            <View className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-teal-50/70 dark:bg-teal-950/50 items-center justify-center border border-teal-100/60 dark:border-teal-900/40 shrink-0">
              <Ionicons name={item.iconName} size={36} color="#009688" />
            </View>

            {/* Right Details Area */}
            <View className="flex-1 justify-center">
              <Text
                className={`text-base sm:text-lg font-black tracking-tight mb-1 ${
                  isDarkMode ? 'text-slate-100' : 'text-[#0F172A]'
                }`}
              >
                {t(item.titleKey) !== item.titleKey ? t(item.titleKey) : item.defaultTitle}
              </Text>

              <Text
                className={`text-xs sm:text-sm font-medium leading-relaxed mb-2.5 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {t(item.subKey) !== item.subKey ? t(item.subKey) : item.defaultSub}
              </Text>

              {/* Action Link Row */}
              <View className="flex-row items-center gap-1.5">
                <Text
                  className={`text-xs sm:text-sm font-black tracking-wide ${
                    isDarkMode ? 'text-teal-400' : 'text-[#0F172A]'
                  }`}
                >
                  {t(item.actionKey) !== item.actionKey
                    ? t(item.actionKey)
                    : item.defaultAction}
                </Text>
                <Ionicons
                  name="arrow-forward"
                  size={14}
                  color={isDarkMode ? '#2DD4BF' : '#0F172A'}
                />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
