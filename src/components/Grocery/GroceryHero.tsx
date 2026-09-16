import React from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { AppText as Text } from '../common/AppText';

interface GroceryHeroProps {
  onShopNowPress?: () => void;
  onExploreDealsPress?: () => void;
}

export const GroceryHero: React.FC<GroceryHeroProps> = ({
  onShopNowPress,
  onExploreDealsPress,
}) => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const { width } = useWindowDimensions();

  const isWide = width >= 768;

  const features = [
    {
      id: 'fresh',
      icon: 'shield-checkmark-outline' as keyof typeof Ionicons.glyphMap,
      titleKey: 'fresh100Title',
      subKey: 'fresh100Sub',
    },
    {
      id: 'delivery',
      icon: 'car-outline' as keyof typeof Ionicons.glyphMap,
      titleKey: 'freeDeliveryTitle',
      subKey: 'freeDeliverySub',
    },
    {
      id: 'payment',
      icon: 'card-outline' as keyof typeof Ionicons.glyphMap,
      titleKey: 'securePaymentTitle',
      subKey: 'securePaymentSub',
    },
    {
      id: 'returns',
      icon: 'refresh-outline' as keyof typeof Ionicons.glyphMap,
      titleKey: 'easyReturnsTitle',
      subKey: 'easyReturnsSubTitle',
    },
  ];

  return (
    <View className="w-full overflow-hidden">
      <ImageBackground
        source={require('../../assets/images/grocery-hero-bg.jpg')}
        style={{ width: '100%', minHeight: 440 }}
        imageStyle={{ width: '100%', height: '100%', resizeMode: 'cover' }}
        resizeMode="cover"
      >
        {/* Soft Contrast Overlay for Readability */}
        <View
          className={`w-full min-h-[440px] px-4 pt-3 pb-6 justify-center ${
            isDarkMode ? 'bg-slate-950/85' : 'bg-[#F7FAF7]/55'
          }`}
        >
          <View className="w-full max-w-[1200px] self-center md:px-3">
            {/* Left Content Area */}
            <View className="max-w-[580px]">
              {/* Tagline Badge */}
              <View className="flex-row items-center mb-2">
                <Ionicons
                  name="leaf"
                  size={18}
                  color="#059669"
                  style={{ marginRight: 6 }}
                />
                <Text
                  className={`text-xs sm:text-sm font-extrabold uppercase tracking-widest ${
                    isDarkMode ? 'text-emerald-400' : 'text-emerald-700'
                  }`}
                >
                  {t('eatFreshLiveHealthy')}
                </Text>
              </View>

              {/* Main Headline (Strictly 2 lines on mobile) */}
              <Text
                className={`text-2xl sm:text-4xl font-black tracking-tight leading-tight mb-3 ${
                  isDarkMode ? 'text-slate-50' : 'text-slate-900'
                }`}
              >
                {t('groceryHeroHeadline1')}
                {'\n'}
                <Text className="text-emerald-600 font-black">
                  {t('groceryHeroHeadline2')}
                </Text>
              </Text>

              {/* Subtitle Description */}
              <Text
                className={`text-sm sm:text-base font-medium leading-6 mb-6 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                {t('groceryHeroSub')}
              </Text>

              {/* Action Buttons (Stay on 1 line on mobile) */}
              <View className="flex-row items-center gap-2.5 mb-7 w-full max-w-[480px]">
                {/* Primary Button */}
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={onShopNowPress}
                  className="flex-1 h-12 bg-emerald-600 flex-row items-center justify-center rounded-full px-3 shadow-lg shadow-emerald-600/35 gap-1.5"
                >
                  <Text
                    numberOfLines={1}
                    className="text-white text-xs sm:text-sm font-black tracking-wide"
                  >
                    {t('shopNow')}
                  </Text>
                  <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
                </TouchableOpacity>

                {/* Secondary Button */}
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={onExploreDealsPress}
                  className={`flex-1 h-12 flex-row items-center justify-center rounded-full border px-3 shadow-sm ${
                    isDarkMode
                      ? 'bg-slate-800/90 border-slate-700'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <Text
                    numberOfLines={1}
                    className={`text-xs sm:text-sm font-black tracking-wide ${
                      isDarkMode ? 'text-slate-50' : 'text-slate-900'
                    }`}
                  >
                    {t('exploreDeals')}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Divider Line */}
              <View
                className={`h-[1px] w-full mb-5 ${
                  isDarkMode ? 'bg-slate-800/60' : 'bg-slate-300/60'
                }`}
              />

              {/* 4 Feature Badges Grid */}
              <View className="flex-row flex-wrap justify-between gap-y-3">
                {features.map((item) => (
                  <View key={item.id} className="w-[48%] flex-row items-center gap-2">
                    <View
                      className={`w-11 h-11 rounded-full items-center justify-center ${
                        isDarkMode ? 'bg-emerald-950' : 'bg-emerald-100'
                      }`}
                    >
                      <Ionicons
                        name={item.icon}
                        size={20}
                        color={isDarkMode ? '#34D399' : '#059669'}
                      />
                    </View>
                    <View className="flex-1">
                      <Text
                        className={`text-xs font-black tracking-tight ${
                          isDarkMode ? 'text-slate-50' : 'text-slate-900'
                        }`}
                      >
                        {t(item.titleKey)}
                      </Text>
                      <Text
                        className={`text-[11px] font-medium leading-4 ${
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
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
