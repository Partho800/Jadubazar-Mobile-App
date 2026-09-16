import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ImageSourcePropType,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

export interface BannerSlide {
  id: string;
  source: ImageSourcePropType;
  alt: string;
}

const BANNERS: BannerSlide[] = [
  {
    id: 'b1',
    source: require('../../assets/images/kacchi-festival-banner.webp'),
    alt: 'Kacchi Biryani Festival Banner',
  },
  {
    id: 'b2',
    source: require('../../assets/images/best-deals-banner (1).webp'),
    alt: 'Best Deals Food Banner',
  },
];

interface FoodBannerCarouselProps {
  onBannerPress?: (slide: BannerSlide) => void;
}

export const FoodBannerCarousel: React.FC<FoodBannerCarouselProps> = ({ onBannerPress }) => {
  const { isDarkMode } = useTheme();
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const autoScrollTimer = useRef<any>(null);

  // Dynamic image aspect-ratio height calculation
  const containerPadding = 32; // 16px left + 16px right
  const bannerWidth = Math.min(width - containerPadding, 1200);
  // Match image original aspect ratio (~2.35:1) + 40px (20px top + 20px bottom)
  const bannerHeight = Math.min(Math.round(bannerWidth / 2.35), 380) + 40;

  // Handle scroll index calculation
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / bannerWidth);
    if (index >= 0 && index < BANNERS.length && index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const scrollToIndex = (index: number) => {
    if (index >= 0 && index < BANNERS.length) {
      scrollRef.current?.scrollTo({ x: index * bannerWidth, animated: true });
      setActiveIndex(index);
    }
  };

  const handlePrev = () => {
    const prevIndex = activeIndex === 0 ? BANNERS.length - 1 : activeIndex - 1;
    scrollToIndex(prevIndex);
  };

  const handleNext = () => {
    const nextIndex = activeIndex === BANNERS.length - 1 ? 0 : activeIndex + 1;
    scrollToIndex(nextIndex);
  };

  // Auto slide effect every 4 seconds
  useEffect(() => {
    autoScrollTimer.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = prev === BANNERS.length - 1 ? 0 : prev + 1;
        scrollRef.current?.scrollTo({ x: next * bannerWidth, animated: true });
        return next;
      });
    }, 4000);

    return () => {
      if (autoScrollTimer.current) {
        clearInterval(autoScrollTimer.current);
      }
    };
  }, [bannerWidth]);

  // Handle mouse enter / leave for web hover effect
  const hoverHandlers =
    Platform.OS === 'web'
      ? {
          onMouseEnter: () => setIsHovered(true),
          onMouseLeave: () => setIsHovered(false),
        }
      : {};

  return (
    <View className="my-3 px-4 w-full items-center relative">
      <View
        {...(hoverHandlers as any)}
        style={{ width: bannerWidth, height: bannerHeight }}
        className={`rounded-2xl sm:rounded-3xl overflow-hidden relative shadow-lg border transition-all duration-300 ${
          isDarkMode
            ? 'bg-slate-950 border-amber-900/40 shadow-black/40'
            : 'bg-slate-900 border-amber-600/30 shadow-slate-200'
        }`}
      >
        {/* Banner Images ScrollView */}
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={{ width: bannerWidth, height: bannerHeight }}
        >
          {BANNERS.map((banner) => (
            <TouchableOpacity
              key={banner.id}
              activeOpacity={0.95}
              onPress={() => onBannerPress?.(banner)}
              style={{ width: bannerWidth, height: bannerHeight }}
              className="relative overflow-hidden"
            >
              <Image
                source={banner.source}
                style={{ width: bannerWidth, height: bannerHeight }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Left Arrow - Centered vertically on left edge */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handlePrev}
          style={{
            position: 'absolute',
            left: 12,
            top: '50%',
            transform: [{ translateY: -20 }],
            opacity: isHovered ? 1 : 0,
            pointerEvents: isHovered ? 'auto' : 'none',
            zIndex: 40,
          }}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/65 dark:bg-black/80 backdrop-blur-md items-center justify-center border border-white/20 shadow-xl active:scale-95 transition-opacity duration-200"
        >
          <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Right Arrow - Centered vertically on right edge */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleNext}
          style={{
            position: 'absolute',
            right: 12,
            top: '50%',
            transform: [{ translateY: -20 }],
            opacity: isHovered ? 1 : 0,
            pointerEvents: isHovered ? 'auto' : 'none',
            zIndex: 40,
          }}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/65 dark:bg-black/80 backdrop-blur-md items-center justify-center border border-white/20 shadow-xl active:scale-95 transition-opacity duration-200"
        >
          <Ionicons name="chevron-forward" size={22} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Dark Pill Dots Container at Bottom Center */}
        <View
          style={{
            position: 'absolute',
            bottom: 12,
            left: 0,
            right: 0,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 40,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgba(20, 10, 5, 0.85)',
              paddingHorizontal: 14,
              paddingVertical: 7,
              borderRadius: 9999,
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.25)',
              gap: 8,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
            }}
          >
            {BANNERS.map((_, index) => {
              const isActive = activeIndex === index;
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() => scrollToIndex(index)}
                  style={{
                    width: isActive ? 28 : 10,
                    height: 10,
                    borderRadius: 9999,
                    backgroundColor: isActive ? '#FF6B00' : 'rgba(241, 245, 249, 0.85)',
                  }}
                />
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};
