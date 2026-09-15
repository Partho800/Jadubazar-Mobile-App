import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '../../context/LanguageContext';
import { AppText as Text } from '../common/AppText';

interface FlashSaleBannerProps {
  onShopSalePress?: () => void;
}

export const FlashSaleBanner: React.FC<FlashSaleBannerProps> = ({
  onShopSalePress,
}) => {
  const { width } = useWindowDimensions();
  const { t } = useLanguage();

  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 15,
    seconds: 7,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => (num < 10 ? `0${num}` : `${num}`);

  return (
    <View className="mx-4 mb-11 relative">
      <LinearGradient
        colors={['#1D5BD8', '#2563EB', '#1E40AF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderRadius: 28, padding: width < 380 ? 20 : 24, overflow: 'hidden' }}
        className="relative shadow-xl"
      >
        {/* Left Side Content Column */}
        <View className="max-w-[58%] sm:max-w-[62%] z-10">
          {/* Top Pill Badge */}
          <View className="self-start bg-white/15 border border-white/40 px-3.5 py-1 rounded-full mb-3">
            <Text className="text-white text-[11px] font-black tracking-widest uppercase">
              {t('flashSaleBadge')}
            </Text>
          </View>

          {/* Headline */}
          <Text className="text-white text-2xl sm:text-3xl font-black tracking-tight leading-tight mb-4">
            {t('flashSaleHeadline')}
          </Text>

          {/* Live Countdown Timer Boxes */}
          <View className="flex-row items-center gap-1.5 mb-5">
            {/* Hours Box */}
            <View className="w-12 h-12 sm:w-14 sm:h-14 bg-white/25 rounded-2xl items-center justify-center border border-white/20 shadow-sm">
              <Text className="text-white text-base sm:text-lg font-black leading-tight">
                {formatNumber(timeLeft.hours)}
              </Text>
              <Text className="text-white/90 text-[8px] sm:text-[9px] font-extrabold tracking-wider mt-0.5">
                {t('hoursLabel')}
              </Text>
            </View>

            <Text className="text-white text-base font-black px-0.5 mb-2">:</Text>

            {/* Minutes Box */}
            <View className="w-12 h-12 sm:w-14 sm:h-14 bg-white/25 rounded-2xl items-center justify-center border border-white/20 shadow-sm">
              <Text className="text-white text-base sm:text-lg font-black leading-tight">
                {formatNumber(timeLeft.minutes)}
              </Text>
              <Text className="text-white/90 text-[8px] sm:text-[9px] font-extrabold tracking-wider mt-0.5">
                {t('minsLabel')}
              </Text>
            </View>

            <Text className="text-white text-base font-black px-0.5 mb-2">:</Text>

            {/* Seconds Box */}
            <View className="w-12 h-12 sm:w-14 sm:h-14 bg-white/25 rounded-2xl items-center justify-center border border-white/20 shadow-sm">
              <Text className="text-white text-base sm:text-lg font-black leading-tight">
                {formatNumber(timeLeft.seconds)}
              </Text>
              <Text className="text-white/90 text-[8px] sm:text-[9px] font-extrabold tracking-wider mt-0.5">
                {t('secsLabel')}
              </Text>
            </View>
          </View>

          {/* CTA Shop Sale Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onShopSalePress}
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 4,
            }}
            className="self-start bg-white px-5 py-3 rounded-full flex-row items-center gap-2"
          >
            <Text className="text-[#1D5BD8] text-xs sm:text-sm font-black tracking-wide">
              {t('shopSale')}
            </Text>
            <Ionicons name="arrow-forward" size={16} color="#1D5BD8" />
          </TouchableOpacity>
        </View>

        {/* Right Tilted Featured Product Image */}
        <View
          style={{
            position: 'absolute',
            right: width < 380 ? -10 : 5,
            top: width < 380 ? 15 : 10,
            transform: [{ rotate: '10deg' }],
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.35,
            shadowRadius: 16,
            elevation: 10,
            zIndex: 20,
            borderRadius: 16,
            overflow: 'hidden',
          }}
          className="w-44 h-56 sm:w-52 sm:h-64"
        >
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
            }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        </View>
      </LinearGradient>
    </View>
  );
};

