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
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useProduct } from '../../context/ProductContext';
import { cartStore } from '../../store/cartStore';
import { wishlistStore } from '../../store/wishlistStore';
import { AppText as Text } from '../common/AppText';

export interface PharmacyProductItem {
  id: string;
  brand: string;
  titleKey: string;
  defaultTitle: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  specBadge: string;
  discountBadge?: string;
  categoryName: string;
}

export interface PharmacySectionData {
  id: string;
  titleKey: string;
  defaultTitle: string;
  subKey: string;
  defaultSub: string;
  iconName: keyof typeof Ionicons.glyphMap;
  itemsCount: string;
  products: PharmacyProductItem[];
}

const PHARMACY_SECTIONS: PharmacySectionData[] = [
  /* Section 1: Everyday Medicines & Pain Relief */
  {
    id: 'sec_medicines',
    titleKey: 'secEverydayMedicinesTitle',
    defaultTitle: 'Everyday Medicines & Pain Relief',
    subKey: 'secEverydayMedicinesSub',
    defaultSub: 'Fast relief from fever, headache, indigestion, acidity & seasonal cold',
    iconName: 'medical-outline',
    itemsCount: '8 Items',
    products: [
      {
        id: 'med_napa',
        brand: 'BEXIMCO PHARMA',
        titleKey: 'prodNapaTitle',
        defaultTitle: 'Napa Extend 665 mg (Paracetamol)',
        price: 50,
        rating: 4.8,
        reviewsCount: 920,
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
        specBadge: '20 TABLETS',
        categoryName: 'Pharmacy',
      },
      {
        id: 'med_sergel',
        brand: 'HEALTHCARE PHARMA',
        titleKey: 'prodSergelTitle',
        defaultTitle: 'Sergel 20 mg (Esomeprazole)',
        price: 195,
        rating: 4.9,
        reviewsCount: 654,
        imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=600&q=80',
        specBadge: '28 CAPSULES',
        categoryName: 'Pharmacy',
      },
      {
        id: 'med_alatrol',
        brand: 'SQUARE PHARMA',
        titleKey: 'prodAlatrolTitle',
        defaultTitle: 'Alatrol 10 mg (Cetirizine Hydrochloride)',
        price: 60,
        rating: 4.7,
        reviewsCount: 430,
        imageUrl: 'https://images.unsplash.com/photo-1550572017-edf7928d10b8?auto=format&fit=crop&w=600&q=80',
        specBadge: '10 TABLETS',
        categoryName: 'Pharmacy',
      },
      {
        id: 'med_seclo',
        brand: 'SQUARE PHARMA',
        titleKey: 'prodSecloTitle',
        defaultTitle: 'Seclo 20 mg Capsule (Omeprazole)',
        price: 160,
        rating: 4.8,
        reviewsCount: 512,
        imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80',
        specBadge: '30 CAPSULES',
        categoryName: 'Pharmacy',
      },
    ],
  },

  /* Section 2: Mother & Baby Care */
  {
    id: 'sec_mother_baby',
    titleKey: 'secMotherBabyTitle',
    defaultTitle: 'Mother & Baby Care',
    subKey: 'secMotherBabySub',
    defaultSub: 'Diapers, wipes, tear-free gentle baby washes & moisturizing lotions',
    iconName: 'happy-outline',
    itemsCount: '8 Items',
    products: [
      {
        id: 'baby_pampers',
        brand: 'PAMPERS',
        titleKey: 'prodPampersTitle',
        defaultTitle: 'Pampers Premium Care Pants Diapers',
        price: 1850,
        oldPrice: 2100,
        rating: 4.9,
        reviewsCount: 380,
        imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80',
        specBadge: 'LARGE (46 PCS)',
        discountBadge: '12% OFF',
        categoryName: 'Mother & Baby',
      },
      {
        id: 'baby_huggies',
        brand: 'HUGGIES',
        titleKey: 'prodHuggiesTitle',
        defaultTitle: 'Huggies Wonder Pants Diapers',
        price: 1620,
        oldPrice: 1850,
        rating: 4.8,
        reviewsCount: 290,
        imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
        specBadge: 'MEDIUM (54 PCS)',
        discountBadge: '12% OFF',
        categoryName: 'Mother & Baby',
      },
      {
        id: 'baby_sebamed',
        brand: 'SEBAMED',
        titleKey: 'prodSebamedTitle',
        defaultTitle: 'Sebamed Baby Gentle Wash Lotion',
        price: 2250,
        oldPrice: 2620,
        rating: 4.9,
        reviewsCount: 195,
        imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
        specBadge: '400 ML',
        discountBadge: '15% OFF',
        categoryName: 'Mother & Baby',
      },
    ],
  },

  /* Section 3: Medical Devices & Health Monitors */
  {
    id: 'sec_devices',
    titleKey: 'secDevicesTitle',
    defaultTitle: 'Medical Devices & Health Monitors',
    subKey: 'secDevicesSub',
    defaultSub: 'Accurate digital BP monitors, glucometers, pulse oximeters & nebulizers',
    iconName: 'pulse-outline',
    itemsCount: '8 Items',
    products: [
      {
        id: 'dev_omron',
        brand: 'OMRON',
        titleKey: 'prodOmronTitle',
        defaultTitle: 'Omron Automatic Blood Pressure Monitor',
        price: 3600,
        oldPrice: 4200,
        rating: 4.9,
        reviewsCount: 154,
        imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
        specBadge: '1 UNIT',
        discountBadge: '14% OFF',
        categoryName: 'Healthcare Devices',
      },
      {
        id: 'dev_accuchek',
        brand: 'ROCHE',
        titleKey: 'prodAccuchekTitle',
        defaultTitle: 'Accu-Chek Active Blood Glucose Meter',
        price: 1274,
        oldPrice: 1499,
        rating: 4.9,
        reviewsCount: 88,
        imageUrl: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=600&q=80',
        specBadge: '1 UNIT',
        discountBadge: '15% OFF',
        categoryName: 'Healthcare Devices',
      },
      {
        id: 'dev_beurer',
        brand: 'BEURER',
        titleKey: 'prodBeurerTitle',
        defaultTitle: 'Beurer Pulse Oximeter Finger Monitor',
        price: 1950,
        oldPrice: 2400,
        rating: 4.8,
        reviewsCount: 112,
        imageUrl: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80',
        specBadge: '1 UNIT',
        discountBadge: '19% OFF',
        categoryName: 'Healthcare Devices',
      },
    ],
  },

  /* Section 4: Health, Nutrition & Supplements */
  {
    id: 'sec_supplements',
    titleKey: 'secSupplementsTitle',
    defaultTitle: 'Health, Nutrition & Supplements',
    subKey: 'secSupplementsSub',
    defaultSub: 'Complete balanced nutrition, multivitamins, calcium & immunity boosters',
    iconName: 'fitness-outline',
    itemsCount: '7 Items',
    products: [
      {
        id: 'supp_advasco',
        brand: 'INCEPTA PHARMA',
        titleKey: 'prodAdvascoTitle',
        defaultTitle: 'Advasco 100 Multivitamins',
        price: 360,
        oldPrice: 400,
        rating: 4.6,
        reviewsCount: 92,
        imageUrl: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&w=600&q=80',
        specBadge: '60 TABLETS',
        discountBadge: '10% OFF',
        categoryName: 'Supplements',
      },
      {
        id: 'supp_ensure',
        brand: 'ENSURE',
        titleKey: 'prodEnsureTitle',
        defaultTitle: 'Ensure Nutrition Powder',
        price: 1690,
        oldPrice: 2250,
        rating: 4.8,
        reviewsCount: 215,
        imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80',
        specBadge: '1KG',
        discountBadge: '25% OFF',
        categoryName: 'Supplements',
      },
      {
        id: 'supp_sevensills',
        brand: 'SEVEN SEAS',
        titleKey: 'prodSevenSeasTitle',
        defaultTitle: 'Seven Seas Cod Liver Oil Capsules',
        price: 1350,
        oldPrice: 1580,
        rating: 4.9,
        reviewsCount: 178,
        imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80',
        specBadge: '100 CAPSULES',
        discountBadge: '14% OFF',
        categoryName: 'Supplements',
      },
    ],
  },
];

interface PharmacyProductSectionProps {
  section: PharmacySectionData;
}

const SingleSectionCarousel: React.FC<PharmacyProductSectionProps> = ({ section }) => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const { openProductDetails } = useProduct();
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const scrollX = useRef<number>(0);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const [wishlistState, setWishlistState] = useState<Record<string, boolean>>({});

  const cardWidth = width >= 640 ? 276 : 246; // card (260/230) + gap (16)

  const handleScrollPrev = () => {
    const targetX = Math.max(0, scrollX.current - cardWidth);
    scrollX.current = targetX;
    scrollRef.current?.scrollTo({ x: targetX, animated: true });
  };

  const handleScrollNext = () => {
    const maxScroll = (section.products.length - 1) * cardWidth;
    const targetX = Math.min(maxScroll, scrollX.current + cardWidth);
    scrollX.current = targetX;
    scrollRef.current?.scrollTo({ x: targetX, animated: true });
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollX.current = event.nativeEvent.contentOffset.x;
  };

  const handleAddToCart = (prod: PharmacyProductItem) => {
    cartStore.addItem({
      id: prod.id,
      name: prod.defaultTitle,
      price: prod.price,
      originalPrice: prod.oldPrice,
      image: prod.imageUrl,
    });

    setAddedIds((prev) => ({ ...prev, [prod.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [prod.id]: false }));
    }, 1200);
  };

  const handleToggleWishlist = (prod: PharmacyProductItem) => {
    wishlistStore.toggleWishlist({
      id: prod.id,
      name: prod.defaultTitle,
      price: prod.price,
      image: prod.imageUrl,
      inStock: true,
    });
    setWishlistState((prev) => ({ ...prev, [prod.id]: !prev[prod.id] }));
  };

  return (
    <View className="mb-10 w-full max-w-[1100px] self-center">
      {/* 1. Header Area */}
      <View className="px-4 mb-4">
        {/* Title & Badge Row */}
        <View className="flex-row items-center flex-wrap gap-2 mb-1">
          {/* Icon Pill */}
          <View className="w-8 h-8 rounded-full bg-teal-50 dark:bg-teal-950/70 items-center justify-center border border-teal-100 dark:border-teal-900/50">
            <Ionicons name={section.iconName} size={18} color="#009688" />
          </View>

          {/* Section Title */}
          <Text
            className={`text-lg sm:text-2xl font-black tracking-tight ${
              isDarkMode ? 'text-slate-50' : 'text-[#0F172A]'
            }`}
          >
            {t(section.titleKey) !== section.titleKey ? t(section.titleKey) : section.defaultTitle}
          </Text>

          {/* Items Count Badge */}
          <View className="bg-teal-50 dark:bg-teal-950/60 px-2.5 py-0.5 rounded-full border border-teal-200/50 dark:border-teal-800/60">
            <Text className="text-xs font-bold text-[#009688] dark:text-teal-400">
              {section.itemsCount}
            </Text>
          </View>
        </View>

        {/* Subtitle Description */}
        <Text
          className={`text-xs sm:text-sm font-medium leading-relaxed ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          {t(section.subKey) !== section.subKey ? t(section.subKey) : section.defaultSub}
        </Text>

        {/* Navigation Arrows & View All Button Row */}
        <View className="flex-row items-center justify-end gap-2 mt-2 sm:-mt-6">
          {/* Scroll Prev */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleScrollPrev}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border items-center justify-center shadow-xs ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <Ionicons
              name="chevron-back"
              size={16}
              color={isDarkMode ? '#CBD5E1' : '#475569'}
            />
          </TouchableOpacity>

          {/* Scroll Next */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleScrollNext}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border items-center justify-center shadow-xs ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <Ionicons
              name="chevron-forward"
              size={16}
              color={isDarkMode ? '#CBD5E1' : '#475569'}
            />
          </TouchableOpacity>

          {/* View All Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            className={`flex-row items-center px-3.5 py-1.5 sm:py-2 rounded-full border shadow-xs gap-1 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <Text
              className={`text-xs sm:text-sm font-extrabold ${
                isDarkMode ? 'text-slate-100' : 'text-[#0F172A]'
              }`}
            >
              {t('viewAll')}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={14}
              color={isDarkMode ? '#CBD5E1' : '#0F172A'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. Cards Horizontal ScrollView */}
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerClassName="px-4 gap-4"
      >
        {section.products.map((prod) => {
          const isAdded = addedIds[prod.id];
          const isLiked = wishlistState[prod.id] || wishlistStore.isInWishlist(prod.id);

          return (
            <TouchableOpacity
              key={prod.id}
              activeOpacity={0.92}
              onPress={() =>
                openProductDetails({
                  id: prod.id,
                  title: prod.defaultTitle,
                  price: `৳${prod.price}`,
                  oldPrice: prod.oldPrice ? `৳${prod.oldPrice}` : undefined,
                  imageUrl: prod.imageUrl,
                  category: prod.categoryName,
                  rating: prod.rating,
                  reviewsCount: prod.reviewsCount,
                })
              }
              className={`w-[230px] sm:w-[260px] rounded-xl border overflow-hidden shadow-md ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-800 shadow-none'
                  : 'bg-white border-slate-100 shadow-slate-200/50'
              }`}
            >
              {/* Product Top Image Area */}
              <View className="w-full h-[200px] sm:h-[220px] bg-slate-50 dark:bg-slate-950 relative justify-center items-center">
                <Image
                  source={{ uri: prod.imageUrl }}
                  className="w-full h-full"
                  resizeMode="cover"
                />

                {/* Top-Left Discount Ribbon Badge */}
                {prod.discountBadge ? (
                  <View className="absolute top-0 left-3 bg-red-600 px-2 py-1 rounded-b-lg shadow-sm">
                    <Text className="text-white text-[10px] font-black uppercase tracking-wide">
                      {prod.discountBadge}
                    </Text>
                  </View>
                ) : null}

                {/* Top-Right Wishlist Heart Button */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleToggleWishlist(prod)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-800/90 items-center justify-center shadow-xs"
                >
                  <Ionicons
                    name={isLiked ? 'heart' : 'heart-outline'}
                    size={18}
                    color={isLiked ? '#EF4444' : '#64748B'}
                  />
                </TouchableOpacity>

                {/* Bottom Spec Badge (e.g. 20 TABLETS v) */}
                <View className="absolute bottom-2.5 right-2.5 bg-slate-900/85 dark:bg-slate-800/90 px-3 py-1 rounded-full flex-row items-center gap-1">
                  <Text className="text-white text-[10px] font-black tracking-wider uppercase">
                    {prod.specBadge}
                  </Text>
                  <Ionicons name="chevron-down" size={10} color="#FFFFFF" />
                </View>
              </View>

              {/* Product Info Area */}
              <View className="p-4">
                {/* Brand Name */}
                <Text className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1">
                  {prod.brand}
                </Text>

                {/* Product Title (2 lines max) */}
                <Text
                  numberOfLines={2}
                  className={`text-xs sm:text-sm font-extrabold leading-snug mb-2 min-h-[36px] ${
                    isDarkMode ? 'text-slate-100' : 'text-[#0F172A]'
                  }`}
                >
                  {prod.defaultTitle}
                </Text>

                {/* Rating Row */}
                <View className="flex-row items-center gap-1 mb-3">
                  <Ionicons name="star" size={13} color="#EAB308" />
                  <Text
                    className={`text-xs font-black ${
                      isDarkMode ? 'text-slate-100' : 'text-slate-900'
                    }`}
                  >
                    {prod.rating}
                  </Text>
                  <Text className="text-[11px] font-medium text-slate-400">
                    ({prod.reviewsCount})
                  </Text>
                </View>

                {/* Price & Add to Cart Button Row */}
                <View className="flex-row items-center justify-between pt-1">
                  {/* Price Column */}
                  <View>
                    {prod.oldPrice ? (
                      <Text className="text-xs text-slate-400 line-through">
                        ৳{prod.oldPrice}
                      </Text>
                    ) : null}
                    <Text
                      className={`text-base sm:text-lg font-black ${
                        isDarkMode ? 'text-slate-50' : 'text-[#0F172A]'
                      }`}
                    >
                      ৳{prod.price}
                    </Text>
                  </View>

                  {/* Add to Cart Button */}
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => handleAddToCart(prod)}
                    className={`flex-row items-center justify-center px-4 py-2.5 rounded-xl shadow-sm gap-1 ${
                      isAdded ? 'bg-emerald-600' : 'bg-[#009688]'
                    }`}
                  >
                    <Ionicons
                      name={isAdded ? 'checkmark' : 'add'}
                      size={16}
                      color="#FFFFFF"
                    />
                    <Text className="text-white font-black text-xs sm:text-sm">
                      {isAdded ? 'Added' : 'Add'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export const PharmacyProductSections: React.FC = () => {
  return (
    <View className="w-full mt-4">
      {PHARMACY_SECTIONS.map((sec) => (
        <SingleSectionCarousel key={sec.id} section={sec} />
      ))}
    </View>
  );
};
