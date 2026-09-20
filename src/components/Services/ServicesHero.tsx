import React from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { AppText as Text } from '../common/AppText';

// High-resolution image link of professional service technician in uniform
const TECHNICIAN_IMAGE_URL =
  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80';

interface ServicesHeroProps {
  onExploreServicesPress?: () => void;
}

export const ServicesHero: React.FC<ServicesHeroProps> = ({
  onExploreServicesPress,
}) => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const { width } = useWindowDimensions();

  const isWide = width >= 768;

  return (
    <View className="w-full overflow-hidden relative">
      <ImageBackground
        source={{ uri: TECHNICIAN_IMAGE_URL }}
        style={{ width: '100%', minHeight: 440 }}
        imageStyle={{ width: '100%', height: '100%', resizeMode: 'cover' }}
        resizeMode="cover"
      >
        {/* Top Smooth Transition Fade */}
        <LinearGradient
          colors={
            isDarkMode
              ? ['#0F172A', 'rgba(15,23,42,0.6)', 'transparent']
              : ['#FFFFFF', 'rgba(255,255,255,0.7)', 'transparent']
          }
          locations={[0, 0.45, 1]}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 55,
            zIndex: 5,
          }}
          pointerEvents="none"
        />

        {/* Soft Background Contrast Overlay (Adjusted Opacity for Image Clarity) */}
        <View
          className={`w-full min-h-[440px] px-4 py-8 sm:py-12 justify-center ${
            isDarkMode ? 'bg-slate-950/75' : 'bg-[#EBF3FA]/65'
          }`}
        >
          <View className="w-full max-w-[1100px] self-center flex-row items-center justify-between gap-8">
            {/* Left Column: Text & CTA Button (100% Left Aligned) */}
            <View className="flex-1 items-start">
              {/* 1. Tagline Badge */}
              <View
                className={`flex-row items-center px-4 py-1.5 rounded-full border mb-4 ${
                  isDarkMode
                    ? 'bg-purple-950/80 border-purple-800'
                    : 'bg-purple-100/90 border-purple-200'
                }`}
              >
                <Ionicons
                  name="shield-checkmark"
                  size={16}
                  color={isDarkMode ? '#A78BFA' : '#5B50E6'}
                  style={{ marginRight: 6 }}
                />
                <Text
                  className={`text-xs sm:text-sm font-extrabold uppercase tracking-wider ${
                    isDarkMode ? 'text-purple-300' : 'text-[#4C1D95]'
                  }`}
                >
                  {t('verifiedInsuredBadge') !== 'verifiedInsuredBadge'
                    ? t('verifiedInsuredBadge')
                    : 'VERIFIED & INSURED PROFESSIONALS'}
                </Text>
              </View>

              {/* 2. Main Headline (Left Aligned & Uppercase) */}
              <Text
                className={`text-3xl sm:text-4xl md:text-5xl font-black text-left tracking-tight leading-tight mb-3 max-w-[650px] ${
                  isDarkMode ? 'text-slate-50' : 'text-[#0F172A]'
                }`}
              >
                {t('servicesHeroTitle') !== 'servicesHeroTitle'
                  ? t('servicesHeroTitle')
                  : 'TRUSTED SERVICES, RIGHT AT YOUR DOOR'}
              </Text>

              {/* 3. Subtitle Description (Left Aligned) */}
              <Text
                className={`text-sm sm:text-base font-medium text-left max-w-[580px] leading-relaxed mb-6 ${
                  isDarkMode ? 'text-slate-300' : 'text-[#334155]'
                }`}
              >
                {t('servicesHeroSub') !== 'servicesHeroSub'
                  ? t('servicesHeroSub')
                  : 'Book verified plumbers, electricians, AC repair mechanics, professional cleaners, and personal care salon experts, right to your home in clicks.'}
              </Text>

              {/* 4. Action Button (Left Aligned) */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={onExploreServicesPress}
                className="bg-[#5B50E6] hover:bg-[#432DD7] flex-row items-center justify-center rounded-full px-7 py-3.5 shadow-lg shadow-purple-600/30 gap-2"
              >
                <Text className="text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase">
                  {t('exploreServices') !== 'exploreServices'
                    ? t('exploreServices')
                    : 'EXPLORE SERVICES'}
                </Text>
                <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Right Column: Professional Technician Image Card (Visible on Wide Screen) */}
            {isWide ? (
              <View className="w-[380px] h-[340px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-slate-900 shrink-0">
                <Image
                  source={{ uri: TECHNICIAN_IMAGE_URL }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
            ) : null}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
