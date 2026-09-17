import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { AppText as Text } from '../common/AppText';

export interface ServiceAreaItem {
  id: string;
  titleKey: string;
  defaultTitle: string;
  iconName: keyof typeof Ionicons.glyphMap;
  iconColorLight: string;
  iconColorDark: string;
  bgColorLight: string;
  bgColorDark: string;
}

const SERVICE_AREAS: ServiceAreaItem[] = [
  {
    id: 'home_cleaning',
    titleKey: 'areaHomeCleaning',
    defaultTitle: 'Home Cleaning',
    iconName: 'sparkles-outline',
    iconColorLight: '#9333EA',
    iconColorDark: '#C084FC',
    bgColorLight: 'bg-purple-100',
    bgColorDark: 'bg-purple-900/60',
  },
  {
    id: 'appliance_repair',
    titleKey: 'areaApplianceRepair',
    defaultTitle: 'Appliance Repair',
    iconName: 'construct-outline',
    iconColorLight: '#D97706',
    iconColorDark: '#FBBF24',
    bgColorLight: 'bg-amber-100',
    bgColorDark: 'bg-amber-900/60',
  },
  {
    id: 'electrical',
    titleKey: 'areaElectrical',
    defaultTitle: 'Electrical Services',
    iconName: 'flash-outline',
    iconColorLight: '#CA8A04',
    iconColorDark: '#FACC15',
    bgColorLight: 'bg-yellow-100',
    bgColorDark: 'bg-yellow-900/60',
  },
  {
    id: 'plumbing',
    titleKey: 'areaPlumbing',
    defaultTitle: 'Plumbing Services',
    iconName: 'water-outline',
    iconColorLight: '#0284C7',
    iconColorDark: '#38BDF8',
    bgColorLight: 'bg-sky-100',
    bgColorDark: 'bg-sky-900/60',
  },
  {
    id: 'home_improvement',
    titleKey: 'areaHomeImprovement',
    defaultTitle: 'Home Improvement',
    iconName: 'hammer-outline',
    iconColorLight: '#4F46E5',
    iconColorDark: '#818CF8',
    bgColorLight: 'bg-indigo-100',
    bgColorDark: 'bg-indigo-900/60',
  },
  {
    id: 'personal_care',
    titleKey: 'areaPersonalCare',
    defaultTitle: 'Personal Care',
    iconName: 'cut-outline',
    iconColorLight: '#DB2777',
    iconColorDark: '#F472B6',
    bgColorLight: 'bg-pink-100',
    bgColorDark: 'bg-pink-900/60',
  },
  {
    id: 'other_services',
    titleKey: 'areaOtherServices',
    defaultTitle: 'Other Services',
    iconName: 'grid-outline',
    iconColorLight: '#0D9488',
    iconColorDark: '#2DD4BF',
    bgColorLight: 'bg-teal-100',
    bgColorDark: 'bg-teal-900/60',
  },
];

interface ServicesBrowseByAreasProps {
  onAreaPress?: (areaId: string) => void;
}

export const ServicesBrowseByAreas: React.FC<ServicesBrowseByAreasProps> = ({
  onAreaPress,
}) => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();

  return (
    <View className="my-8 w-full max-w-[1100px] self-center px-4">
      {/* 1. Header Area */}
      <View className="mb-6">
        <Text
          className={`text-xl sm:text-2xl font-black tracking-tight mb-1 ${
            isDarkMode ? 'text-slate-50' : 'text-[#0F172A]'
          }`}
        >
          {t('browseServiceAreasTitle') !== 'browseServiceAreasTitle'
            ? t('browseServiceAreasTitle')
            : 'Browse by Service Areas'}
        </Text>
        <Text
          className={`text-xs sm:text-sm font-medium ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          {t('browseServiceAreasSub') !== 'browseServiceAreasSub'
            ? t('browseServiceAreasSub')
            : 'Verified, skilled handymen for all household and personal tasks.'}
        </Text>
      </View>

      {/* 2. Grid Layout of Cards (2 Columns on mobile, 4 Columns on Desktop) */}
      <View className="flex-row flex-wrap justify-between gap-y-4">
        {SERVICE_AREAS.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.85}
            onPress={() => onAreaPress?.(item.id)}
            className={`w-[48%] md:w-[23.5%] rounded-2xl p-5 items-center justify-center border shadow-xs ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-100 shadow-slate-200/40'
            }`}
          >
            {/* Centered Icon Badge */}
            <View
              className={`w-14 h-14 rounded-2xl items-center justify-center mb-3 ${
                isDarkMode ? item.bgColorDark : item.bgColorLight
              }`}
            >
              <Ionicons
                name={item.iconName}
                size={28}
                color={isDarkMode ? item.iconColorDark : item.iconColorLight}
              />
            </View>

            {/* Title Text */}
            <Text
              numberOfLines={2}
              className={`text-xs sm:text-sm font-extrabold text-center tracking-tight leading-snug ${
                isDarkMode ? 'text-slate-100' : 'text-[#0F172A]'
              }`}
            >
              {t(item.titleKey) !== item.titleKey
                ? t(item.titleKey)
                : item.defaultTitle}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
