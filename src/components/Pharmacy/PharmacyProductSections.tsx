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
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useProduct } from '../../context/ProductContext';
import { useCategory } from '../../context/CategoryContext';
import { cartStore } from '../../store/cartStore';
import { wishlistStore } from '../../store/wishlistStore';
import { AppText as Text } from '../common/AppText';

import { pharmacyData } from '../../data/productsData';

export interface PharmacyProductItem {
  id: string;
  brand: string;
  titleKey?: string;
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

const PHARMACY_SECTIONS: PharmacySectionData[] = pharmacyData.sections as PharmacySectionData[];

interface PharmacyProductSectionProps {
  section: PharmacySectionData;
}

const SingleSectionCarousel: React.FC<PharmacyProductSectionProps> = ({ section }) => {
  const navigation = useNavigation<any>();
  const { setActiveCategory, setActiveSubCategory } = useCategory();
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const { openProductDetails } = useProduct();
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const scrollX = useRef<number>(0);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const [wishlistState, setWishlistState] = useState<Record<string, boolean>>({});

  const handleViewAll = (secId: string) => {
    setActiveCategory('pharmacy');
    let subCat: string | null = null;
    if (secId === 'sec_medicines') subCat = 'Prescription Medicine';
    else if (secId === 'sec_babycare') subCat = 'Baby & Mother Care';
    else if (secId === 'sec_devices') subCat = 'Healthcare Devices';
    else if (secId === 'sec_supplements') subCat = 'Vitamins & Supplements';
    setActiveSubCategory(subCat);
    try {
      navigation.navigate('CategoriesTab');
    } catch (e) {}
  };

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
          <View
            className={`w-8 h-8 rounded-full items-center justify-center border ${
              isDarkMode
                ? 'bg-teal-950 border-teal-800'
                : 'bg-teal-50 border-teal-100'
            }`}
          >
            <Ionicons
              name={section.iconName}
              size={18}
              color={isDarkMode ? '#2DD4BF' : '#0D9488'}
            />
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
          <View
            className={`px-2.5 py-0.5 rounded-full border ${
              isDarkMode
                ? 'bg-teal-950 border-teal-800'
                : 'bg-teal-50 border-teal-200/60'
            }`}
          >
            <Text
              className={`text-xs font-bold ${
                isDarkMode ? 'text-teal-400' : 'text-[#0D9488]'
              }`}
            >
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
          {/* Scroll Buttons */}
          <View
            className={`flex-row items-center rounded-full border p-1 shadow-xs ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100/90 border-slate-200'
            }`}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleScrollPrev}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full items-center justify-center shadow-xs ${
                isDarkMode ? 'bg-slate-800' : 'bg-white'
              }`}
            >
              <Ionicons
                name="chevron-back"
                size={16}
                color={isDarkMode ? '#CBD5E1' : '#334155'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleScrollNext}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full items-center justify-center shadow-xs ml-1 ${
                isDarkMode ? 'bg-slate-800' : 'bg-white'
              }`}
            >
              <Ionicons
                name="chevron-forward"
                size={16}
                color={isDarkMode ? '#CBD5E1' : '#334155'}
              />
            </TouchableOpacity>
          </View>

          {/* View All Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleViewAll(section.id)}
            className={`flex-row items-center px-3 py-1.5 rounded-full border shadow-xs gap-1 ${
              isDarkMode
                ? 'bg-teal-950 border-teal-800'
                : 'bg-teal-50 border-teal-200/80'
            }`}
          >
            <Text
              className={`text-xs sm:text-sm font-extrabold ${
                isDarkMode ? 'text-teal-300' : 'text-[#0D9488]'
              }`}
            >
              {t('viewAll')}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={14}
              color={isDarkMode ? '#5EEAD4' : '#0D9488'}
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
                  <View className="absolute top-0 left-3 z-10 bg-red-600 px-2 py-1 rounded-b-lg shadow-sm">
                    <Text className="text-white text-[10px] font-black uppercase tracking-wide">
                      {prod.discountBadge}
                    </Text>
                  </View>
                ) : null}

                {/* Top-Right Wishlist Heart Button */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleToggleWishlist(prod)}
                  className={`absolute top-3 right-3 w-8 h-8 rounded-full items-center justify-center z-10 shadow-sm border ${
                    isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'
                  }`}
                >
                  <Ionicons
                    name={isLiked ? 'heart' : 'heart-outline'}
                    size={18}
                    color={isLiked ? '#EF4444' : isDarkMode ? '#F8FAFC' : '#334155'}
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
