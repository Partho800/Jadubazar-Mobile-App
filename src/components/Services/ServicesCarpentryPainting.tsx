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

export interface CarpentryServiceItem {
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

const CARPENTRY_SERVICES: CarpentryServiceItem[] = [
  {
    id: 'carp_door',
    categoryTag: 'HOME IMPROVEMENT',
    titleKey: 'doorRepairTitle',
    defaultTitle: 'Door Lock, Hinge & Wooden Furniture Repair',
    subKey: 'doorRepairSub',
    defaultSub:
      'Experienced carpenter for jammed wooden doors, cylinder lock...',
    rating: 4.8,
    duration: '1-2 Hours Duration',
    price: 400,
    imageUrl:
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'carp_paint',
    categoryTag: 'HOME IMPROVEMENT',
    titleKey: 'wallPaintingTitle',
    defaultTitle: 'Interior & Exterior Wall Painting Service',
    subKey: 'wallPaintingSub',
    defaultSub:
      'Premium home painting with Berger or Asian Paints. Includes putty plaster...',
    rating: 4.9,
    duration: '1-2 Days Duration',
    price: 3500,
    imageUrl:
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'carp_cabinet',
    categoryTag: 'HOME IMPROVEMENT',
    titleKey: 'kitchenCabinetTitle',
    defaultTitle: 'Modular Kitchen Cabinet Fitting',
    subKey: 'kitchenCabinetSub',
    defaultSub:
      'Custom wooden cabinet alignment, drawer channels & hydraulic hinge fix.',
    rating: 4.8,
    duration: '2-3 Hours Duration',
    price: 1500,
    imageUrl:
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'carp_tv',
    categoryTag: 'HOME IMPROVEMENT',
    titleKey: 'tvMountTitle',
    defaultTitle: 'TV Mount, Wall Shelf & Curtain Fitting',
    subKey: 'tvMountSub',
    defaultSub:
      'Heavy-duty wall drilling for LED TVs, wall art, shelves & curtain rods.',
    rating: 4.9,
    duration: '1 Hour Duration',
    price: 300,
    imageUrl:
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'carp_wallpaper',
    categoryTag: 'HOME IMPROVEMENT',
    titleKey: 'wallpaperDampTitle',
    defaultTitle: 'Wallpaper Installation & Damp Proofing',
    subKey: 'wallpaperDampSub',
    defaultSub:
      'Decorative 3D wallpaper fixing and anti-damp wall chemical treatment.',
    rating: 4.7,
    duration: '2 Hours Duration',
    price: 1200,
    imageUrl:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
  },
];

interface ServicesCarpentryPaintingProps {
  onServicePress?: (serviceId: string) => void;
}

export const ServicesCarpentryPainting: React.FC<ServicesCarpentryPaintingProps> = ({
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
    const maxScroll = (CARPENTRY_SERVICES.length - 1) * cardWidth;
    const targetX = Math.min(maxScroll, scrollX.current + cardWidth);
    scrollX.current = targetX;
    scrollRef.current?.scrollTo({ x: targetX, animated: true });
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollX.current = event.nativeEvent.contentOffset.x;
  };

  return (
    <View className="my-8 w-full max-w-[1100px] self-center">
      {/* Header Area */}
      <View className="flex-row items-center justify-between px-4 mb-5">
        <Text
          className={`flex-1 mr-3 text-lg sm:text-xl font-bold tracking-tight ${
            isDarkMode ? 'text-slate-50' : 'text-[#0F172A]'
          }`}
        >
          {t('carpentryPaintingTitle') !== 'carpentryPaintingTitle'
            ? t('carpentryPaintingTitle')
            : 'Carpentry, Wall Painting & Fitting'}
        </Text>

        <View className="flex-row items-center gap-2">
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

      {/* Carousel */}
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerClassName="px-4 gap-4"
      >
        {CARPENTRY_SERVICES.map((item) => (
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
            <View className="w-full h-[180px] sm:h-[200px] bg-slate-100 dark:bg-slate-950 relative overflow-hidden">
              <Image
                source={{ uri: item.imageUrl }}
                className="w-full h-full"
                resizeMode="cover"
              />
              <View className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                <Text className="text-white font-black text-[10px] uppercase tracking-wider">
                  {item.categoryTag}
                </Text>
              </View>
            </View>

            <View className="p-4 sm:p-5">
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
                <Ionicons name="arrow-forward" size={18} color="#5B50E6" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
