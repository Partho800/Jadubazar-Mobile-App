import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useProduct } from '../../context/ProductContext';
import { useCategory } from '../../context/CategoryContext';
import { cartStore } from '../../store/cartStore';
import { AppText as Text } from '../common/AppText';
import { DiscountRibbonBadge } from '../common/DiscountRibbonBadge';

import { ecommerceData } from '../../data/productsData';

import { useWishlist } from '../../hooks/useWishlist';

export interface BestSellerProductItem {
  id: string;
  brand: string;
  title: string;
  imageUrl: string;
  oldPrice: string;
  price: string;
  rating: number;
  reviewsCount: number;
  discount: string;
  description: string;
}

const BEST_SELLER_PRODUCTS: BestSellerProductItem[] = ecommerceData.bestSellers as BestSellerProductItem[];

interface BestSellersProps {
  onViewAllPress?: () => void;
  onQuickAddPress?: (item: BestSellerProductItem) => void;
}

export const BestSellers: React.FC<BestSellersProps> = ({
  onViewAllPress,
  onQuickAddPress,
}) => {
  const navigation = useNavigation<any>();
  const { setActiveCategory, setActiveSubCategory } = useCategory();
  const { isDarkMode } = useTheme();
  const { width } = useWindowDimensions();
  const { t, isBangla } = useLanguage();
  const { openProductDetails } = useProduct();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const handleViewAll = () => {
    if (onViewAllPress) {
      onViewAllPress();
    }
    setActiveCategory('ecommerce');
    setActiveSubCategory(null);
    try {
      navigation.navigate('CategoriesTab');
    } catch (e) {}
  };

  return (
    <View className="mx-4 mb-11">
      {/* Section Header */}
      <View className="flex-row items-start justify-between mb-5 gap-2">
        <View className="flex-1 pr-2">
          <Text
            className={`text-2xl font-black tracking-tight mb-1 ${
              isDarkMode ? 'text-slate-50' : 'text-slate-900'
            }`}
          >
            {t('bestSellersTitle')}
          </Text>
          <Text
            className={`text-xs font-semibold leading-5 ${
              isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            {t('bestSellersSub')}
          </Text>
        </View>

        {/* View All Action Link */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleViewAll}
          className="flex-row items-center gap-1.5 mt-1 self-start cursor-pointer"
        >
          <Text className="text-xs font-black text-blue-600 max-w-[120px] text-right">
            {t('viewAllBestSellers')}
          </Text>
          <Ionicons name="arrow-forward" size={14} color="#2563EB" />
        </TouchableOpacity>
      </View>

      {/* 3 Vertically Stacked Product Cards */}
      <View className="gap-5">
        {BEST_SELLER_PRODUCTS.map((item) => {
          const isFav = isWishlisted(item.id);
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.9}
              onPress={() =>
                openProductDetails({
                  id: item.id,
                  title: item.title,
                  brand: item.brand,
                  price: item.price,
                  oldPrice: item.oldPrice,
                  imageUrl: item.imageUrl,
                  rating: item.rating,
                  reviewsCount: item.reviewsCount,
                  discountBadge: `${item.discount} OFF`,
                  description: item.description,
                })
              }
              style={{ borderRadius: 24 }}
              className={`border overflow-hidden shadow-sm ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-white border-slate-200/80'
              }`}
            >
              {/* Product Image Area - Flush 0 space on top/left/right, top 2 corners radius only */}
              <View
                style={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
                className="w-full h-[280px] sm:h-[340px] bg-slate-100 overflow-hidden relative items-center justify-center"
              >
                {/* Red Discount Ribbon Tag */}
                {item.discount ? (
                  <View className="absolute top-0 left-4 z-10">
                    <DiscountRibbonBadge discountText={`${item.discount} OFF`} />
                  </View>
                ) : null}

                {/* Floating Wishlist Heart Button */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    toggleWishlist({
                      id: item.id,
                      title: item.title,
                      price: item.price,
                      image: item.imageUrl,
                    })
                  }
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 items-center justify-center z-10 shadow-sm"
                >
                  <Ionicons
                    name={isFav ? 'heart' : 'heart-outline'}
                    size={18}
                    color={isFav ? '#EF4444' : '#64748B'}
                  />
                </TouchableOpacity>

                {/* Product Image */}
                <Image
                  source={{ uri: item.imageUrl }}
                  style={{ width: '100%', height: '100%' }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>

              {/* Product Details Section */}
              <View className="p-4 pt-3.5 pb-4">
                {/* Brand Badge */}
                <View className="self-start bg-blue-50 border border-blue-100 px-3 py-1 rounded-full mb-2">
                  <Text className="text-blue-600 text-[11px] font-black uppercase tracking-wider">
                    {item.brand}
                  </Text>
                </View>

                {/* Product Title */}
                <Text
                  className={`text-lg sm:text-xl font-black mb-1.5 ${
                    isDarkMode ? 'text-slate-50' : 'text-slate-900'
                  }`}
                >
                  {item.title}
                </Text>

                {/* Rating Stars & Review Count */}
                <View className="flex-row items-center mb-2 gap-1">
                  <View className="flex-row items-center">
                    {[1, 2, 3, 4].map((star) => (
                      <Ionicons
                        key={star}
                        name="star"
                        size={13}
                        color="#F59E0B"
                        style={{ marginRight: 1 }}
                      />
                    ))}
                    <Ionicons name="star-outline" size={13} color="#CBD5E1" />
                  </View>
                  <Text className="text-xs font-bold text-slate-400">
                    ({item.reviewsCount})
                  </Text>
                </View>

                {/* Summary Description */}
                <Text
                  className={`text-xs font-medium leading-5 mb-4 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}
                  numberOfLines={2}
                >
                  {item.description}
                </Text>

                {/* Price & Quick Add Button Row */}
                <View className="flex-row items-end justify-between pt-1">
                  <View>
                    <Text className="text-xs font-bold text-slate-400 line-through mb-0.5">
                      {item.oldPrice}
                    </Text>
                    <Text
                      className={`text-xl font-black tracking-tight ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {item.price}
                    </Text>
                  </View>

                  {/* Quick Add CTA Button */}
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => {
                      cartStore.addItem({
                        id: item.id,
                        name: item.title,
                        price: parseFloat(item.price.replace(/[^0-9.]/g, '')) || 100,
                        image: item.imageUrl,
                      });
                      onQuickAddPress?.(item);
                    }}
                    style={{
                      shadowColor: '#0F172A',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.2,
                      shadowRadius: 6,
                      elevation: 4,
                    }}
                    className="bg-slate-900 px-4 py-2.5 rounded-full flex-row items-center gap-2"
                  >
                    <Ionicons name="cart-outline" size={16} color="#FFFFFF" />
                    <Text className="text-white text-xs font-black tracking-wider">
                      {t('quickAdd')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
