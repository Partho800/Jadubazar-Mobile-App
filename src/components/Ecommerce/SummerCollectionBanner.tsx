import React from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '../../context/LanguageContext';
import { AppText as Text } from '../common/AppText';

interface SummerCollectionBannerProps {
  onShopCollectionPress?: () => void;
}

export const SummerCollectionBanner: React.FC<SummerCollectionBannerProps> = ({
  onShopCollectionPress,
}) => {
  const { width } = useWindowDimensions();
  const { t } = useLanguage();

  return (
    <View className="mx-4 mb-11">
      <View
        style={{
          borderRadius: 28,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.15,
          shadowRadius: 16,
          elevation: 6,
        }}
      >
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
          }}
          style={{ width: '100%', minHeight: 340 }}
          imageStyle={{ resizeMode: 'cover' }}
          resizeMode="cover"
        >
          {/* Dark Overlay Gradient for maximum text legibility */}
          <LinearGradient
            colors={[
              'rgba(15, 23, 42, 0.85)',
              'rgba(15, 23, 42, 0.65)',
              'rgba(15, 23, 42, 0.35)',
            ]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{
              width: '100%',
              minHeight: 340,
              padding: width < 380 ? 20 : 28,
              justifyContent: 'center',
            }}
          >
            {/* Content Column */}
            <View className="max-w-[85%] sm:max-w-[70%]">
              {/* Top Pill Badge */}
              <View className="self-start bg-white/20 border border-white/25 px-4 py-1.5 rounded-full mb-4 backdrop-blur-md">
                <Text className="text-white text-[11px] sm:text-xs font-black tracking-widest uppercase">
                  {t('newCollection')}
                </Text>
              </View>

              {/* Main Headline */}
              <Text className="text-white text-3xl sm:text-4xl font-black tracking-tight leading-tight mb-3">
                {t('summer2025Title')}
              </Text>

              {/* Description */}
              <Text className="text-white/90 text-xs sm:text-sm font-semibold leading-relaxed mb-6 max-w-[280px]">
                {t('summer2025Sub')}
              </Text>

              {/* Action Button */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={onShopCollectionPress}
                style={{
                  shadowColor: '#2563EB',
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.35,
                  shadowRadius: 10,
                  elevation: 5,
                }}
                className="self-start bg-blue-600 px-6 py-3.5 rounded-full flex-row items-center gap-2.5"
              >
                <Text className="text-white text-xs sm:text-sm font-black tracking-wide">
                  {t('shopCollection')}
                </Text>
                <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    </View>
  );
};
