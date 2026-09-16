import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { AppText as Text } from '../common/AppText';

export interface BookingServiceItem {
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

const POPULAR_BOOKING_SERVICES: BookingServiceItem[] = [
  {
    id: 'serv_deep_clean',
    categoryTag: 'HOME',
    titleKey: 'popularHomeCleanTitle',
    defaultTitle: 'Professional Home Deep Cleaning Service',
    subKey: 'popularHomeCleanSub',
    defaultSub:
      'Get your entire house scrubbed and polished by our verified cleaning experts.',
    rating: 4.8,
    duration: '3-4 Hours Duration',
    price: 1800,
    imageUrl:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'serv_ac_jet',
    categoryTag: 'REPAIR',
    titleKey: 'popularAcJetTitle',
    defaultTitle: 'AC Jet Cleaning & Gas Refill',
    subKey: 'popularAcJetSub',
    defaultSub:
      'Ensure maximum cooling efficiency of your Air Conditioner with jet wash.',
    rating: 4.9,
    duration: '1-2 Hours Duration',
    price: 1200,
    imageUrl:
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'serv_plumbing',
    categoryTag: 'PLUMBING',
    titleKey: 'popularPlumbingTitle',
    defaultTitle: 'Emergency Plumbing Repair & Installation',
    subKey: 'popularPlumbingSub',
    defaultSub:
      'Book our certified plumbing technicians to instantly resolve pipe leaks and fittings.',
    rating: 4.7,
    duration: '1 Hour Duration',
    price: 350,
    imageUrl:
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'serv_electrical',
    categoryTag: 'ELECTRICAL',
    titleKey: 'popularElectricalTitle',
    defaultTitle: 'Expert Home Electrical Service',
    subKey: 'popularElectricalSub',
    defaultSub:
      'From installing ceiling fans and smart lights to repairing short circuit faults.',
    rating: 4.8,
    duration: '1 Hour Duration',
    price: 300,
    imageUrl:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
  },
];

interface ServicesPopularBookingProps {
  onServiceBookPress?: (serviceId: string) => void;
}

export const ServicesPopularBooking: React.FC<ServicesPopularBookingProps> = ({
  onServiceBookPress,
}) => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();

  return (
    <View className="my-8 w-full max-w-[1100px] self-center px-4">
      {/* 1. Section Header */}
      <View className="mb-6">
        <Text
          className={`text-xl sm:text-2xl font-black tracking-tight ${
            isDarkMode ? 'text-slate-50' : 'text-[#0F172A]'
          }`}
        >
          {t('popularBookingTitle') !== 'popularBookingTitle'
            ? t('popularBookingTitle')
            : 'Popular Booking Services'}
        </Text>
      </View>

      {/* 2. 2 Cards Per Line Grid (2x2 Layout) */}
      <View className="flex-row flex-wrap justify-between gap-y-5">
        {POPULAR_BOOKING_SERVICES.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.9}
            onPress={() => onServiceBookPress?.(item as any)}
            className={`w-[48%] md:w-[48.5%] rounded-3xl overflow-hidden border shadow-md ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 shadow-none'
                : 'bg-white border-slate-100 shadow-slate-200/40'
            }`}
          >
            {/* Top Image Container */}
            <View className="w-full h-[180px] sm:h-[220px] bg-slate-100 dark:bg-slate-950 relative overflow-hidden">
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
      </View>
    </View>
  );
};
