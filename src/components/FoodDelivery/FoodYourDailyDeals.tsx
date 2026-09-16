import React, { useRef, useState } from 'react';
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
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { AppText as Text } from '../common/AppText';

export interface DailyDealCard {
  id: string;
  gradientColors: readonly [string, string, ...string[]];
  title: string;
  subtitle: string;
  code: string;
  tag?: string;
  brandBadges?: string[];
  imageUrl: string;
  tncText: string;
  imageBgColor?: string;
}

const DAILY_DEALS_ITEMS: DailyDealCard[] = [
  {
    id: 'dd-1',
    gradientColors: ['#DC2626', '#FF6B00'],
    title: 'Flat 50% off',
    subtitle: 'on 1st order',
    code: 'JADU50',
    tag: 'Free delivery',
    imageUrl:
      'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=700&q=80',
    tncText: 'T&Cs apply.',
    imageBgColor: '#FDE6D2',
  },
  {
    id: 'dd-2',
    gradientColors: ['#EA580C', '#F97316'],
    title: 'Flat 30% off',
    subtitle: 'on top restaurants',
    code: 'DEALNAO',
    brandBadges: ['CHILLOX', 'PIZZABURG', 'SULTAN'],
    imageUrl:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    tncText: 'T&Cs apply.',
    imageBgColor: '#FEE2E2',
  },
  {
    id: 'dd-3',
    gradientColors: ['#7C3AED', '#EC4899'],
    title: 'Buy 1 Get 1 Free',
    subtitle: 'on selected pizzas',
    code: 'BOGO2025',
    brandBadges: ['BOGO', 'PIZZA FEST'],
    tag: 'Limited Time',
    imageUrl:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    tncText: 'T&Cs apply.',
    imageBgColor: '#F3E8FF',
  },
  {
    id: 'dd-4',
    gradientColors: ['#059669', '#0D9488'],
    title: 'Flat ৳100 OFF',
    subtitle: 'on orders over ৳500',
    code: 'SAVE100',
    brandBadges: ['EXPRESS', 'KACHCHI'],
    tag: 'Express delivery',
    imageUrl:
      'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    tncText: 'T&Cs apply.',
    imageBgColor: '#CCFBF1',
  },
  {
    id: 'dd-5',
    gradientColors: ['#D97706', '#E11D48'],
    title: 'Midnight 40% OFF',
    subtitle: '10 PM - 3 AM deals',
    code: 'NIGHTOWL',
    brandBadges: ['NIGHT OWL', 'LATE NIGHT'],
    tag: 'Night Special',
    imageUrl:
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    tncText: 'T&Cs apply.',
    imageBgColor: '#FEF3C7',
  },
];

interface FoodYourDailyDealsProps {
  onDealPress?: (deal: DailyDealCard) => void;
}

export const FoodYourDailyDeals: React.FC<FoodYourDailyDealsProps> = ({ onDealPress }) => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const scrollX = useRef<number>(0);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const cardWidth = width >= 640 ? 360 : 315;
  const cardHeight = width >= 640 ? 142 : 128;
  const cardStep = cardWidth + 16;

  const handleScrollPrev = () => {
    const targetX = Math.max(0, scrollX.current - cardStep);
    scrollRef.current?.scrollTo({ x: targetX, animated: true });
  };

  const handleScrollNext = () => {
    scrollRef.current?.scrollTo({ x: scrollX.current + cardStep, animated: true });
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollX.current = event.nativeEvent.contentOffset.x;
  };

  const handleCopyCode = (code: string) => {
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  return (
    <View className="my-5 w-full relative">
      {/* 1. Header Section Title */}
      <View className="px-4 mb-4">
        <Text
          numberOfLines={1}
          className={`text-2xl sm:text-3xl font-black tracking-tight ${
            isDarkMode ? 'text-slate-50' : 'text-slate-900'
          }`}
        >
          Your daily deals
        </Text>
      </View>

      {/* 2. Carousel Container with Floating Side Arrows */}
      <View className="relative w-full">
        {/* Left Floating Nav Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleScrollPrev}
          style={{
            position: 'absolute',
            left: 6,
            top: '40%',
            transform: [{ translateY: -20 }],
            zIndex: 30,
          }}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-slate-900 items-center justify-center border border-slate-200 dark:border-slate-800 shadow-2xl active:scale-95"
        >
          <Ionicons
            name="arrow-back"
            size={20}
            color={isDarkMode ? '#F8FAFC' : '#0F172A'}
          />
        </TouchableOpacity>

        {/* Right Floating Nav Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleScrollNext}
          style={{
            position: 'absolute',
            right: 6,
            top: '40%',
            transform: [{ translateY: -20 }],
            zIndex: 30,
          }}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-slate-900 items-center justify-center border border-slate-200 dark:border-slate-800 shadow-2xl active:scale-95"
        >
          <Ionicons
            name="arrow-forward"
            size={20}
            color={isDarkMode ? '#F8FAFC' : '#0F172A'}
          />
        </TouchableOpacity>

        {/* Horizontal Cards ScrollView */}
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={{ flexGrow: 0 }}
          contentContainerStyle={{
            paddingHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 16,
          }}
        >
          {DAILY_DEALS_ITEMS.map((deal) => (
            <View
              key={deal.id}
              style={{
                width: cardWidth,
                flexShrink: 0,
              }}
              className="flex-col gap-1.5 shrink-0"
            >
              {/* Card Container */}
              <TouchableOpacity
                activeOpacity={0.92}
                onPress={() => onDealPress?.(deal)}
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  borderRadius: 15,
                }}
                className="overflow-hidden relative shadow-md shrink-0"
              >
                {/* Gradient Background */}
                <LinearGradient
                  colors={deal.gradientColors}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                  }}
                />

                {/* Main Card Content Layout */}
                <View className="w-full h-full flex-row items-center justify-between z-10">
                  {/* Left Column: Title, Subtitle, Code & Tag */}
                  <View className="flex-1 h-full p-3.5 sm:p-4 flex-col justify-between pr-2">
                    {/* Top Row: Brand Badges if available */}
                    {deal.brandBadges && deal.brandBadges.length > 0 ? (
                      <View className="flex-row items-center flex-wrap gap-1">
                        {deal.brandBadges.map((badge, idx) => (
                          <View
                            key={idx}
                            className="bg-white px-1.5 py-0.5 rounded-full shadow-xs"
                          >
                            <Text className="text-[9px] sm:text-[10px] font-black text-[#EA580C] uppercase">
                              {badge}
                            </Text>
                          </View>
                        ))}
                      </View>
                    ) : (
                      <View />
                    )}

                    {/* Middle Row: Main Title & Subtitle */}
                    <View className="my-0.5">
                      <Text
                        numberOfLines={1}
                        className="text-white text-xl sm:text-2xl font-black drop-shadow-sm leading-tight"
                      >
                        {deal.title}
                      </Text>
                      <Text
                        numberOfLines={1}
                        className="text-white/95 text-xs font-bold mt-0.5"
                      >
                        {deal.subtitle}
                      </Text>
                    </View>

                    {/* Bottom Row: White Code Pill & Dark Tag */}
                    <View className="gap-1 flex-row items-center">
                      {/* White Code Pill Container */}
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => handleCopyCode(deal.code)}
                        className="bg-white px-2.5 py-1 rounded-full flex-row items-center gap-1 shadow-sm self-start"
                      >
                        <Text
                          style={{ color: '#94A3B8' }}
                          className="text-[9px] sm:text-[10px] font-extrabold uppercase"
                        >
                          CODE |
                        </Text>
                        <Text
                          style={{ color: '#0F172A' }}
                          className="text-[11px] sm:text-xs font-black tracking-wide"
                        >
                          {copiedCode === deal.code ? 'COPIED!' : deal.code}
                        </Text>
                        <Ionicons
                          name={copiedCode === deal.code ? 'checkmark-circle' : 'copy-outline'}
                          size={12}
                          color={copiedCode === deal.code ? '#16A34A' : '#64748B'}
                        />
                      </TouchableOpacity>

                      {/* Dark Tag Badge (e.g. Free Delivery) */}
                      {deal.tag && (
                        <View className="bg-[#18181B] px-2.5 py-1 rounded-full self-start">
                          <Text className="text-white text-[9px] sm:text-[10px] font-black">
                            {deal.tag}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>

                  {/* Right Column: Full-Height Curved Food Image Container */}
                  <View
                    style={{
                      width: '46%',
                      height: '100%',
                      backgroundColor: deal.imageBgColor || '#FDE6D2',
                      borderTopLeftRadius: 22,
                      borderBottomLeftRadius: 22,
                      borderTopRightRadius: 15,
                      borderBottomRightRadius: 15,
                    }}
                    className="overflow-hidden shadow-inner shrink-0 justify-center items-center"
                  >
                    <Image
                      source={{ uri: deal.imageUrl }}
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                      resizeMode="cover"
                    />
                  </View>
                </View>
              </TouchableOpacity>

              {/* Bottom T&Cs text outside card */}
              <Text className="text-slate-400 dark:text-slate-500 text-[11px] font-medium ml-1">
                {deal.tncText}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
