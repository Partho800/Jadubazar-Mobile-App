import React from 'react';
import {
  View,
  TouchableOpacity,
  useWindowDimensions,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useCategory } from '../../context/CategoryContext';
import { AppText as Text } from '../common/AppText';

interface PharmacyHeroProps {
  onShopMedicinesPress?: () => void;
  onUploadPrescriptionPress?: () => void;
}

export const PharmacyHero: React.FC<PharmacyHeroProps> = ({
  onShopMedicinesPress,
  onUploadPrescriptionPress,
}) => {
  const navigation = useNavigation<any>();
  const { setActiveCategory, setActiveSubCategory } = useCategory();
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const { width } = useWindowDimensions();

  const handleShopMedicinesClick = () => {
    if (onShopMedicinesPress) {
      onShopMedicinesPress();
    }
    setActiveCategory('pharmacy');
    setActiveSubCategory(null);
    try {
      navigation.navigate('CategoriesTab');
    } catch (e) {}
  };

  const isWide = width >= 768;

  const topFeatures = [
    {
      id: 'genuine',
      icon: 'shield-checkmark-outline' as keyof typeof Ionicons.glyphMap,
      iconColor: '#009688',
      textKey: 'pharmacyGenuine',
    },
    {
      id: 'fast_del',
      icon: 'car-outline' as keyof typeof Ionicons.glyphMap,
      iconColor: '#d97706',
      textKey: 'pharmacyFastDel',
    },
    {
      id: 'secure_pay',
      icon: 'lock-closed-outline' as keyof typeof Ionicons.glyphMap,
      iconColor: '#b45309',
      textKey: 'pharmacySecurePay',
    },
    {
      id: 'expert_sup',
      icon: 'person-outline' as keyof typeof Ionicons.glyphMap,
      iconColor: '#009688',
      textKey: 'pharmacyExpertSup',
    },
  ];

  const bottomTrustCards = [
    {
      id: 'express',
      icon: 'car-outline' as keyof typeof Ionicons.glyphMap,
      titleKey: 'expressDeliveryTitle',
      descKey: 'expressDeliverySub',
      iconColorLight: '#059669',
      iconColorDark: '#34D399',
      bgColorLight: 'bg-emerald-100',
      bgColorDark: 'bg-emerald-900/60',
    },
    {
      id: 'secure',
      icon: 'shield-checkmark-outline' as keyof typeof Ionicons.glyphMap,
      titleKey: 'securePaymentsTitle',
      descKey: 'securePaymentsSub',
      iconColorLight: '#0D9488',
      iconColorDark: '#2DD4BF',
      bgColorLight: 'bg-teal-100',
      bgColorDark: 'bg-teal-900/60',
    },
    {
      id: 'returns',
      icon: 'refresh-outline' as keyof typeof Ionicons.glyphMap,
      titleKey: 'easyReturnsTitleText',
      descKey: 'easyReturnsSubText',
      iconColorLight: '#2563EB',
      iconColorDark: '#60A5FA',
      bgColorLight: 'bg-blue-100',
      bgColorDark: 'bg-blue-900/60',
    },
    {
      id: 'support',
      icon: 'headset-outline' as keyof typeof Ionicons.glyphMap,
      titleKey: 'support247Title',
      descKey: 'support247Sub',
      iconColorLight: '#9333EA',
      iconColorDark: '#C084FC',
      bgColorLight: 'bg-purple-100',
      bgColorDark: 'bg-purple-900/60',
    },
  ];

  return (
    <View
      className={`w-full overflow-hidden px-4 pt-6 pb-8 items-center ${
        isDarkMode ? 'bg-slate-950' : 'bg-[#F4FAF8]'
      }`}
    >
      <View className="w-full max-w-[1100px] items-center">
        {/* 1. Tagline Badge */}
        <View
          className={`flex-row items-center justify-center px-4 py-1.5 rounded-full border mb-3 ${
            isDarkMode
              ? 'bg-teal-950/80 border-teal-800'
              : 'bg-teal-100/90 border-teal-200'
          }`}
        >
          <Ionicons
            name="heart-outline"
            size={16}
            color={isDarkMode ? '#2DD4BF' : '#0D9488'}
            style={{ marginRight: 6 }}
          />
          <Text
            className={`text-xs sm:text-sm font-extrabold uppercase tracking-widest ${
              isDarkMode ? 'text-teal-300' : 'text-teal-800'
            }`}
          >
            {t('pharmacyBadge')}
          </Text>
        </View>

        {/* 2. Main Headline */}
        <Text
          className={`text-3xl sm:text-4xl md:text-5xl font-black text-center tracking-tight leading-tight mb-3 ${
            isDarkMode ? 'text-slate-50' : 'text-slate-900'
          }`}
        >
          <Text className="text-[#009688] dark:text-teal-400 font-black">
            {t('pharmacyHeadline1')}
          </Text>
          {t('pharmacyHeadline2')}
        </Text>

        {/* 3. Subtitle */}
        <Text
          className={`text-sm sm:text-base font-medium text-center max-w-[580px] leading-relaxed mb-5 ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          {t('pharmacySub')}
        </Text>

        {/* 4. Top 4 Bullet Features (2x2 Grid) */}
        <View className="flex-row flex-wrap justify-center items-center gap-x-6 gap-y-2.5 mb-6 max-w-[650px]">
          {topFeatures.map((feat) => (
            <View key={feat.id} className="flex-row items-center gap-2 px-1">
              <Ionicons name={feat.icon} size={18} color={feat.iconColor} />
              <Text
                className={`text-xs sm:text-sm font-bold ${
                  isDarkMode ? 'text-slate-200' : 'text-slate-800'
                }`}
              >
                {t(feat.textKey)}
              </Text>
            </View>
          ))}
        </View>

        {/* 5. CTA Action Buttons */}
        <View className="flex-row items-center justify-center gap-3.5 mb-6 w-full max-w-[480px]">
          {/* Primary Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleShopMedicinesClick}
            className="flex-1 h-13 bg-[#009688] flex-row items-center justify-center rounded-full px-5 py-3 shadow-lg shadow-teal-700/30 gap-2 cursor-pointer"
          >
            <Text className="text-white text-xs sm:text-sm font-extrabold tracking-wide">
              {t('shopMedicines')}
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Secondary Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onUploadPrescriptionPress}
            className={`flex-1 h-13 flex-row items-center justify-center rounded-full px-5 py-3 border shadow-sm gap-2 ${
              isDarkMode
                ? 'bg-slate-900 border-slate-700'
                : 'bg-white border-slate-200'
            }`}
          >
            <Text
              className={`text-xs sm:text-sm font-extrabold tracking-wide ${
                isDarkMode ? 'text-slate-100' : 'text-slate-800'
              }`}
            >
              {t('uploadPrescription')}
            </Text>
            <Ionicons
              name="cloud-upload-outline"
              size={18}
              color={isDarkMode ? '#F1F5F9' : '#334155'}
            />
          </TouchableOpacity>
        </View>

        {/* 6. Social Proof / Customer Rating */}
        <View className="flex-row items-center justify-center gap-3 mb-8">
          {/* Overlapping Avatars */}
          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-300 overflow-hidden">
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
                }}
                className="w-full h-full"
              />
            </View>
            <View className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-400 overflow-hidden -ml-2.5">
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
                }}
                className="w-full h-full"
              />
            </View>
            <View className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-500 overflow-hidden -ml-2.5">
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
                }}
                className="w-full h-full"
              />
            </View>
          </View>

          {/* Rating Info */}
          <View>
            <Text
              className={`text-xs sm:text-sm font-bold ${
                isDarkMode ? 'text-slate-100' : 'text-slate-900'
              }`}
            >
              {t('trustedByCustomers')}
            </Text>
            <View className="flex-row items-center gap-1 mt-0.5">
              <Text
                className={`text-xs font-black ${
                  isDarkMode ? 'text-slate-50' : 'text-slate-900'
                }`}
              >
                4.8
              </Text>
              <View className="flex-row items-center">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Ionicons key={s} name="star" size={13} color="#009688" />
                ))}
              </View>
              <Text
                className={`text-[11px] font-medium ml-1 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {t('reviewsCount')}
              </Text>
            </View>
          </View>
        </View>

        {/* 7. Visual Showcase Mockup Container */}
        <View className="w-full max-w-[600px] relative items-center justify-center py-2 mb-4">
          <Image
            source={require('../../assets/images/image (10).webp')}
            className="w-full h-80"
            resizeMode="contain"
          />
        </View>

        {/* 8. Bottom Trust Cards Container */}
        <View
          className={`w-full max-w-[1000px] rounded-2xl p-4 sm:p-6 border shadow-md mt-4 ${
            isDarkMode
              ? 'bg-slate-900 border-slate-800 shadow-none'
              : 'bg-white border-slate-100 shadow-slate-200/40'
          }`}
        >
          <View className="flex-row flex-wrap justify-between items-center gap-y-4">
            {bottomTrustCards.map((card) => (
              <View
                key={card.id}
                className="w-[48%] md:w-[23%] flex-row items-center gap-3 px-1"
              >
                <View
                  className={`w-11 h-11 rounded-xl items-center justify-center ${
                    isDarkMode ? card.bgColorDark : card.bgColorLight
                  }`}
                >
                  <Ionicons
                    name={card.icon}
                    size={22}
                    color={isDarkMode ? card.iconColorDark : card.iconColorLight}
                  />
                </View>
                <View className="flex-1">
                  <Text
                    className={`text-xs sm:text-sm font-black ${
                      isDarkMode ? 'text-slate-100' : 'text-slate-900'
                    }`}
                  >
                    {t(card.titleKey)}
                  </Text>
                  <Text
                    className={`text-[11px] font-medium leading-4 ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {t(card.descKey)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};
