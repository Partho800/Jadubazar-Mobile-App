import React, { useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { AppText as Text } from '../common/AppText';

export interface PlumbingServiceItem {
  id: string;
  categoryTag: string;
  titleKey: string;
  defaultTitle: string;
  subKey: string;
  defaultSub: string;
  rating: number;
  duration: string;
  price: number;
  imageUrl: string;
}

const PLUMBING_SERVICES: PlumbingServiceItem[] = [
  {
    id: 'plumb_repair',
    categoryTag: 'PLUMBING',
    titleKey: 'plumbingRepairTitle',
    defaultTitle: 'Emergency Plumbing Repair & Installation',
    subKey: 'plumbingRepairSub',
    defaultSub:
      'Book our certified plumbing technicians to instantly resolve pipe leakages, basin fittings.',
    rating: 4.7,
    duration: '1 Hour Duration',
    price: 350,
    imageUrl:
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'plumb_tank',
    categoryTag: 'PLUMBING',
    titleKey: 'waterTankCleanTitle',
    defaultTitle: 'Overhead Water Tank Deep Cleaning',
    subKey: 'waterTankCleanSub',
    defaultSub:
      'Hygienic deep cleaning of residential overhead & underground water tanks.',
    rating: 4.9,
    duration: '2-3 Hours Duration',
    price: 1400,
    imageUrl:
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'plumb_fitting',
    categoryTag: 'PLUMBING',
    titleKey: 'sanitaryFittingTitle',
    defaultTitle: 'Sanitary & Bathroom Fitting Installation',
    subKey: 'sanitaryFittingSub',
    defaultSub:
      'Professional fitting of taps, showers, commodes, mixers & bath accessories.',
    rating: 4.8,
    duration: '1-2 Hours Duration',
    price: 500,
    imageUrl:
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'plumb_drain',
    categoryTag: 'PLUMBING',
    titleKey: 'drainUnclogTitle',
    defaultTitle: 'Drainage Unclogging & Blockage Clearance',
    subKey: 'drainUnclogSub',
    defaultSub:
      'Heavy-duty pressure unclogging for blocked kitchen sinks & bathroom drains.',
    rating: 4.9,
    duration: '1 Hour Duration',
    price: 650,
    imageUrl:
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'plumb_pump',
    categoryTag: 'PLUMBING',
    titleKey: 'waterPumpTitle',
    defaultTitle: 'Water Pump & Motor Repair',
    subKey: 'waterPumpSub',
    defaultSub:
      'Complete motor rewinding, seal replacement & pump installation service.',
    rating: 4.8,
    duration: '2 Hours Duration',
    price: 800,
    imageUrl:
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
  },
];

interface ServicesPlumbingSanitaryProps {
  onServicePress?: (serviceId: string) => void;
}

export const ServicesPlumbingSanitary: React.FC<ServicesPlumbingSanitaryProps> = ({
  onServicePress,
}) => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const scrollX = useRef<number>(0);

  const cardWidth = width >= 640 ? 276 : 246;

  const handleScrollPrev = () => {
    const targetX = Math.max(0, scrollX.current - cardWidth);
    scrollX.current = targetX;
    scrollRef.current?.scrollTo({ x: targetX, animated: true });
  };

  const handleScrollNext = () => {
    const maxScroll = (PLUMBING_SERVICES.length - 1) * cardWidth;
    const targetX = Math.min(maxScroll, scrollX.current + cardWidth);
    scrollX.current = targetX;
    scrollRef.current?.scrollTo({ x: targetX, animated: true });
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollX.current = event.nativeEvent.contentOffset.x;
  };

  return (
    <View className="my-8 w-full max-w-[1100px] self-center">
      {/* 1. Header Area with Prev (<) & Next (>) Arrows */}
      <View className="flex-row items-center justify-between px-4 mb-5">
        <Text
          className={`flex-1 mr-3 text-lg sm:text-xl font-bold tracking-tight ${
            isDarkMode ? 'text-slate-50' : 'text-[#0F172A]'
          }`}
        >
          {t('plumbingSanitaryTitle') !== 'plumbingSanitaryTitle'
            ? t('plumbingSanitaryTitle')
            : 'Emergency Plumbing & Sanitary Solutions'}
        </Text>

        {/* Scroll Navigation Arrows */}
        <View className="flex-row items-center gap-2">
          {/* Scroll Prev */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleScrollPrev}
            className={`w-9 h-9 rounded-full border items-center justify-center shadow-xs ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-200'
            }`}
          >
            <Ionicons
              name="chevron-back"
              size={18}
              color={isDarkMode ? '#CBD5E1' : '#475569'}
            />
          </TouchableOpacity>

          {/* Scroll Next */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleScrollNext}
            className={`w-9 h-9 rounded-full border items-center justify-center shadow-xs ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-200'
            }`}
          >
            <Ionicons
              name="chevron-forward"
              size={18}
              color={isDarkMode ? '#CBD5E1' : '#475569'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. 5-Card Carousel ScrollView */}
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerClassName="px-4 gap-4"
      >
        {PLUMBING_SERVICES.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.92}
            onPress={() => onServicePress?.(item as any)}
            className={`w-[230px] sm:w-[260px] rounded-3xl overflow-hidden border shadow-md ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 shadow-none'
                : 'bg-white border-slate-100 shadow-slate-200/40'
            }`}
          >
            {/* Top Image Container */}
            <View className="w-full h-[180px] sm:h-[200px] bg-slate-100 dark:bg-slate-950 relative overflow-hidden">
              <Image
                source={{ uri: item.imageUrl }}
                className="w-full h-full"
                resizeMode="cover"
              />

              {/* Top-Left Category Pill Tag */}
              <View className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                <Text className="text-white font-black text-[10px] uppercase tracking-wider">
                  {item.categoryTag}
                </Text>
              </View>
            </View>

            {/* Content Details Area */}
            <View className="p-4 sm:p-5">
              {/* Title */}
              <Text
                numberOfLines={2}
                className={`text-sm sm:text-base font-extrabold leading-snug mb-2 min-h-[40px] ${
                  isDarkMode ? 'text-slate-100' : 'text-[#0F172A]'
                }`}
              >
                {t(item.titleKey) !== item.titleKey
                  ? t(item.titleKey)
                  : item.defaultTitle}
              </Text>

              {/* Subtitle / Description */}
              <Text
                numberOfLines={2}
                className={`text-xs font-medium leading-relaxed mb-3 min-h-[32px] ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {t(item.subKey) !== item.subKey
                  ? t(item.subKey)
                  : item.defaultSub}
              </Text>

              {/* Rating & Duration Row */}
              <View className="flex-row items-center gap-1.5 mb-4">
                <Ionicons name="star" size={14} color="#EAB308" />
                <Text
                  className={`text-xs font-black ${
                    isDarkMode ? 'text-slate-100' : 'text-slate-900'
                  }`}
                >
                  {item.rating}
                </Text>
                <Text className="text-xs font-black text-slate-400">•</Text>
                <Text
                  className={`text-xs font-extrabold ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {item.duration}
                </Text>
              </View>

              {/* Divider Line & Price Row */}
              <View className="pt-3 border-t border-slate-100 dark:border-slate-800 flex-row items-center justify-between">
                <View>
                  <Text className="text-[10px] font-black tracking-wider uppercase text-slate-400">
                    {t('startingAt') !== 'startingAt'
                      ? t('startingAt')
                      : 'STARTING AT'}
                  </Text>
                  <Text
                    className={`text-lg sm:text-xl font-black ${
                      isDarkMode ? 'text-slate-50' : 'text-[#0F172A]'
                    }`}
                  >
                    ৳{item.price}
                  </Text>
                </View>

                {/* Right Arrow Icon */}
                <Ionicons name="arrow-forward" size={18} color="#5B50E6" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
