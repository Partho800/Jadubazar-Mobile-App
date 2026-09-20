import categoryCatalogData from '../../data/categoryCatalog.json';
import React, { useState, useRef, useMemo } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  Modal,
  TouchableWithoutFeedback,
  useWindowDimensions,
  PanResponder,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useCategory } from '../../context/CategoryContext';
import { useLanguage } from '../../context/LanguageContext';
import { MAIN_CATEGORIES_DATA, SubCategoryItem } from '../../components/Category/CategoryBottomSheetModal';
import { Header } from '../../components/common/Header/Header';
import { AppText as Text } from '../../components/common/AppText';
import { cartStore } from '../../store/cartStore';
import { useProduct } from '../../context/ProductContext';
import { useWishlist } from '../../hooks/useWishlist';
import { ProductDetailView } from '../../components/product/ProductDetailView';

export interface CatalogProductItem {
  id: string;
  brand: string;
  title: string;
  categoryKey: string; // 'ecommerce' | 'grocery' | 'food' | 'pharmacy' | 'services'
  subCategoryId?: string;
  subCategoryName?: string;
  discountBadge?: string;
  originalPrice: number;
  price: number;
  rating: number;
  reviewsCount: number;
  specBadge?: string;
  imageUrl: string;
  inStock: boolean;
}

const ALL_CATALOG_PRODUCTS: CatalogProductItem[] = categoryCatalogData as CatalogProductItem[];

type SortOption = 'popularity' | 'price_low' | 'price_high' | 'rating' | 'newest';

export const CategoryScreen: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { selectedProduct, openProductDetails } = useProduct();
  const {
    activeCategory,
    setActiveCategory,
    activeSubCategory,
    setActiveSubCategory,
    activeCategoryColor,
    openCategorySheet,
  } = useCategory();
  const { t } = useLanguage();
  const { width } = useWindowDimensions();

  // Dynamic Minimum & Maximum Prices for Active Category Products
  const catalogMinPrice = useMemo(() => {
    const catProds = ALL_CATALOG_PRODUCTS.filter((p) => p.categoryKey === activeCategory);
    if (catProds.length === 0) return 0;
    return Math.min(...catProds.map((p) => p.price));
  }, [activeCategory]);

  const catalogMaxPrice = useMemo(() => {
    const catProds = ALL_CATALOG_PRODUCTS.filter((p) => p.categoryKey === activeCategory);
    if (catProds.length === 0) return 20000;
    return Math.max(...catProds.map((p) => p.price));
  }, [activeCategory]);

  // State management
  const [selectedSubCat, setSelectedSubCatState] = useState<string | null>(activeSubCategory);
  const [sortOption, setSortOption] = useState<SortOption>('popularity');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [visibleCount, setVisibleCount] = useState(6);

  // Price Range Slider Bar State
  const [minPrice, setMinPrice] = useState<number>(catalogMinPrice);
  const [maxPrice, setMaxPrice] = useState<number>(catalogMaxPrice);

  // Item Status State
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [onSaleOnly, setOnSaleOnly] = useState<boolean>(false);

  React.useEffect(() => {
    setSelectedSubCatState(activeSubCategory);
    if (activeSubCategory && subCatScrollRef.current) {
      setTimeout(() => {
        subCatScrollRef.current?.scrollTo({ x: 120, animated: true });
      }, 100);
    }
  }, [activeSubCategory, activeCategory]);

  React.useEffect(() => {
    setMinPrice(catalogMinPrice);
    setMaxPrice(catalogMaxPrice);
  }, [catalogMinPrice, catalogMaxPrice]);

  const setSelectedSubCat = (sub: string | null) => {
    setSelectedSubCatState(sub);
    setActiveSubCategory(sub);
  };

  const subCatScrollRef = useRef<ScrollView>(null);

  // PanResponders for Left and Right Circle Handles
  const minPriceRef = useRef(minPrice);
  const maxPriceRef = useRef(maxPrice);
  minPriceRef.current = minPrice;
  maxPriceRef.current = maxPrice;

  const leftPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const range = catalogMaxPrice - catalogMinPrice || 1;
        const delta = (gestureState.dx / 250) * range;
        const updated = Math.round(
          Math.max(
            catalogMinPrice,
            Math.min(maxPriceRef.current - 50, minPriceRef.current + delta)
          )
        );
        setMinPrice(updated);
      },
    })
  ).current;

  const rightPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const range = catalogMaxPrice - catalogMinPrice || 1;
        const delta = (gestureState.dx / 250) * range;
        const updated = Math.round(
          Math.min(
            catalogMaxPrice,
            Math.max(minPriceRef.current + 50, maxPriceRef.current + delta)
          )
        );
        setMaxPrice(updated);
      },
    })
  ).current;

  // Active Filter Count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedSubCat && selectedSubCat !== 'all') count += 1;
    if (minPrice > catalogMinPrice || maxPrice < catalogMaxPrice) count += 1;
    if (inStockOnly) count += 1;
    if (onSaleOnly) count += 1;
    return count;
  }, [selectedSubCat, minPrice, maxPrice, catalogMinPrice, catalogMaxPrice, inStockOnly, onSaleOnly]);

  const handleResetFilters = () => {
    setSelectedSubCat(null);
    setMinPrice(catalogMinPrice);
    setMaxPrice(catalogMaxPrice);
    setInStockOnly(false);
    setOnSaleOnly(false);
  };

  // Active Main Category Data
  const currentCategoryConfig = useMemo(() => {
    return (
      MAIN_CATEGORIES_DATA[activeCategory] || {
        id: activeCategory,
        labelKey: activeCategory,
        title: activeCategory.toUpperCase(),
        subtitle: 'Browse quality items',
        color: activeCategoryColor,
        subcategories: [],
      }
    );
  }, [activeCategory, activeCategoryColor]);

  // Breadcrumb Title Formatting
  const formattedCategoryName = useMemo(() => {
    return activeCategory.toUpperCase();
  }, [activeCategory]);

  // Filtered and Sorted Product List
  const filteredProducts = useMemo(() => {
    let list = ALL_CATALOG_PRODUCTS.filter((item) => item.categoryKey === activeCategory);

    // 1. Subcategory Filter
    if (selectedSubCat && selectedSubCat !== 'all') {
      const subLower = selectedSubCat.toLowerCase();
      const matched = list.filter((item) => {
        if (!item.subCategoryName) return false;
        const itemSubLower = item.subCategoryName.toLowerCase();
        return (
          itemSubLower === subLower ||
          itemSubLower.includes(subLower) ||
          subLower.includes(itemSubLower)
        );
      });
      if (matched.length > 0) {
        list = matched;
      }
    }

    // 2. Price Range Bar Filter
    list = list.filter((item) => item.price >= minPrice && item.price <= maxPrice);

    // 3. Item Status Filters
    if (inStockOnly) {
      list = list.filter((item) => item.inStock);
    }
    if (onSaleOnly) {
      list = list.filter((item) => !!item.discountBadge);
    }

    // Apply Sorting
    switch (sortOption) {
      case 'price_low':
        return [...list].sort((a, b) => a.price - b.price);
      case 'price_high':
        return [...list].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...list].sort((a, b) => b.rating - a.rating);
      case 'newest':
        return [...list].reverse();
      case 'popularity':
      default:
        return list;
    }
  }, [
    activeCategory,
    selectedSubCat,
    minPrice,
    maxPrice,
    inStockOnly,
    onSaleOnly,
    sortOption,
  ]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  if (selectedProduct) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
        }}
      >
        <Header />
        <View style={{ flex: 1 }}>
          <ProductDetailView />
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
      }}
    >
      {/* Top Main Navigation Header */}
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        {/* 1. Header Catalog Title & Breadcrumbs Section */}
        <View className="px-4 pt-5 pb-3">
          {/* Breadcrumb Navigation Bar */}
          <View className="flex-row items-center flex-wrap gap-1.5 mb-2">
            <TouchableOpacity onPress={() => setActiveCategory('ecommerce')}>
              <Text className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                HOME
              </Text>
            </TouchableOpacity>
            <Text className="text-xs font-bold text-slate-300 dark:text-slate-600">/</Text>
            <TouchableOpacity onPress={() => setSelectedSubCat(null)}>
              <Text className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                CATALOG
              </Text>
            </TouchableOpacity>
            <Text className="text-xs font-bold text-slate-300 dark:text-slate-600">/</Text>
            <Text
              className="text-xs font-extrabold uppercase tracking-widest"
              style={{ color: activeCategoryColor }}
            >
              {formattedCategoryName}
            </Text>
          </View>

          {/* Heading */}
          <Text
            className={`text-2xl sm:text-3xl font-black tracking-tight leading-tight ${
              isDarkMode ? 'text-slate-50' : 'text-slate-900'
            }`}
          >
            Browse {currentCategoryConfig.title} Products
          </Text>
        </View>

        {/* 2. Control Pill Bar: Filters & Sorting Options */}
        <View className="px-4 py-2 flex-row items-center justify-between gap-3 border-b border-slate-200/60 dark:border-slate-800/80 mb-4">
          {/* Left Pill: Filters Modal Opener */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsFilterModalOpen(true)}
            style={
              activeFilterCount > 0
                ? { borderColor: activeCategoryColor }
                : undefined
            }
            className={`flex-1 py-2.5 px-4 rounded-full border flex-row items-center justify-center gap-2 shadow-xs ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-200/90'
            }`}
          >
            <Ionicons
              name="options-outline"
              size={18}
              color={activeFilterCount > 0 ? activeCategoryColor : isDarkMode ? '#F8FAFC' : '#0F172A'}
            />
            <Text
              className={`text-xs sm:text-sm font-extrabold ${
                isDarkMode ? 'text-slate-100' : 'text-slate-900'
              }`}
            >
              Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}
            </Text>
          </TouchableOpacity>

          {/* Right Pill: Sorting Options Sheet */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsSortModalOpen(true)}
            className={`flex-1 py-2.5 px-4 rounded-full border flex-row items-center justify-between shadow-xs ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-200/90'
            }`}
          >
            <Text
              className={`text-xs sm:text-sm font-extrabold capitalize ${
                isDarkMode ? 'text-slate-100' : 'text-slate-900'
              }`}
            >
              {sortOption === 'popularity'
                ? 'Popularity'
                : sortOption === 'price_low'
                ? 'Price: Low to High'
                : sortOption === 'price_high'
                ? 'Price: High to Low'
                : sortOption === 'rating'
                ? 'Highest Rating'
                : 'Newest Arrivals'}
            </Text>
            <Ionicons
              name="swap-vertical-outline"
              size={16}
              color={isDarkMode ? '#94A3B8' : '#64748B'}
            />
          </TouchableOpacity>
        </View>

        {/* 3. Subcategories Horizontal Scrollable Filter Carousel */}
        <View className="mb-5 relative">
          <ScrollView
            ref={subCatScrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 16,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}
          >
            {/* Pill 1: All Products */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setSelectedSubCat(null)}
              style={{
                backgroundColor: !selectedSubCat ? activeCategoryColor : isDarkMode ? '#1E293B' : '#FFFFFF',
                borderColor: !selectedSubCat ? activeCategoryColor : isDarkMode ? '#334155' : '#E2E8F0',
              }}
              className="px-4 py-2.5 rounded-full border flex-row items-center gap-2 shadow-xs"
            >
              <Ionicons
                name="grid-outline"
                size={16}
                color={!selectedSubCat ? '#FFFFFF' : activeCategoryColor}
              />
              <Text
                style={{
                  color: !selectedSubCat ? '#FFFFFF' : isDarkMode ? '#F8FAFC' : '#0F172A',
                }}
                className="text-xs sm:text-sm font-extrabold"
              >
                All Products
              </Text>
            </TouchableOpacity>

            {/* Subcategory Pills */}
            {currentCategoryConfig.subcategories.map((subCat) => {
              const isSelected = selectedSubCat?.toLowerCase() === subCat.name.toLowerCase();

              return (
                <TouchableOpacity
                  key={subCat.id}
                  activeOpacity={0.85}
                  onPress={() => setSelectedSubCat(subCat.name)}
                  style={{
                    backgroundColor: isSelected ? activeCategoryColor : isDarkMode ? '#1E293B' : '#FFFFFF',
                    borderColor: isSelected ? activeCategoryColor : isDarkMode ? '#334155' : '#E2E8F0',
                  }}
                  className="px-3.5 py-2 rounded-full border flex-row items-center gap-2 shadow-xs"
                >
                  {subCat.imageUrl ? (
                    <Image
                      source={{ uri: subCat.imageUrl }}
                      className="w-5 h-5 rounded-full"
                      resizeMode="cover"
                    />
                  ) : null}
                  <Text
                    style={{
                      color: isSelected ? '#FFFFFF' : isDarkMode ? '#F8FAFC' : '#0F172A',
                    }}
                    className="text-xs sm:text-sm font-extrabold"
                  >
                    {subCat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Right Floating Scroll Arrow Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() =>
              subCatScrollRef.current?.scrollTo({ x: 250, animated: true })
            }
            style={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: [{ translateY: -16 }],
              backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
              borderColor: isDarkMode ? '#334155' : '#E2E8F0',
            }}
            className="w-8 h-8 rounded-full items-center justify-center border shadow-md z-10"
          >
            <Ionicons
              name="chevron-forward"
              size={18}
              color={isDarkMode ? '#F8FAFC' : '#0F172A'}
            />
          </TouchableOpacity>
        </View>

        {/* 4. 2-Column Product Cards Grid */}
        <View className="px-4">
          <View className="flex-row flex-wrap justify-between gap-y-4">
            {displayedProducts.map((prod) => {
              const isFaved = isWishlisted(prod.id);

              return (
                <View
                  key={prod.id}
                  className={`w-[48.5%] rounded-2xl border overflow-hidden shadow-sm justify-between ${
                    isDarkMode
                      ? 'bg-slate-900 border-slate-800'
                      : 'bg-white border-slate-100 shadow-slate-200/40'
                  }`}
                >
                  <TouchableOpacity
                    activeOpacity={0.88}
                    onPress={() => {
                      openProductDetails({
                        id: prod.id,
                        title: prod.title,
                        brand: prod.brand,
                        category: prod.categoryKey,
                        price: `৳${prod.price}`,
                        oldPrice: prod.originalPrice > prod.price ? `৳${prod.originalPrice}` : undefined,
                        rating: prod.rating,
                        reviewsCount: prod.reviewsCount,
                        imageUrl: prod.imageUrl,
                        description: `${prod.brand} - ${prod.title}. High quality item available for instant delivery.`,
                      });
                    }}
                  >
                    {/* Product Image Area */}
                    <View className="w-full h-44 sm:h-52 bg-slate-100 dark:bg-slate-950 relative items-center justify-center overflow-hidden">
                      {/* Top-Left Discount Ribbon Badge */}
                      {prod.discountBadge ? (
                        <View className="absolute top-0 left-2.5 z-10 bg-red-600 px-2 py-1 rounded-b-lg shadow-sm">
                          <Text className="text-white text-[10px] font-black uppercase tracking-wide">
                            {prod.discountBadge}
                          </Text>
                        </View>
                      ) : null}

                      {/* Top-Right Wishlist Heart Button */}
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() =>
                          toggleWishlist({
                            id: prod.id,
                            title: prod.title,
                            price: prod.price,
                            image: prod.imageUrl,
                          })
                        }
                        className={`absolute top-2.5 right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full items-center justify-center z-10 shadow-sm border ${
                          isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'
                        }`}
                      >
                        <Ionicons
                          name={isFaved ? 'heart' : 'heart-outline'}
                          size={16}
                          color={isFaved ? '#EF4444' : isDarkMode ? '#F8FAFC' : '#334155'}
                        />
                      </TouchableOpacity>

                      {/* Full Bleed Image */}
                      <Image
                        source={{ uri: prod.imageUrl }}
                        className="w-full h-full"
                        resizeMode="cover"
                      />

                      {/* Bottom-Right Spec Badge */}
                      {prod.specBadge ? (
                        <View className="absolute bottom-2 right-2 bg-slate-900/85 dark:bg-slate-800/90 px-2.5 py-0.5 rounded-full flex-row items-center gap-1 z-10">
                          <Text className="text-white text-[9px] font-black tracking-wider uppercase">
                            {prod.specBadge}
                          </Text>
                          <Ionicons name="chevron-down" size={9} color="#FFFFFF" />
                        </View>
                      ) : null}
                    </View>

                    {/* Product Details Area */}
                    <View className="p-3.5 pb-0">
                      {/* Brand Name */}
                      <Text className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-0.5">
                        {prod.brand}
                      </Text>

                      {/* Title */}
                      <Text
                        numberOfLines={2}
                        className={`text-xs sm:text-sm font-extrabold leading-snug mb-1.5 min-h-[32px] ${
                          isDarkMode ? 'text-slate-100' : 'text-slate-900'
                        }`}
                      >
                        {prod.title}
                      </Text>

                      {/* Rating Row */}
                      <View className="flex-row items-center gap-1 mb-2">
                        <Ionicons name="star" size={13} color="#EAB308" />
                        <Text
                          className={`text-xs font-black ${
                            isDarkMode ? 'text-slate-100' : 'text-slate-900'
                          }`}
                        >
                          {prod.rating}
                        </Text>
                        <Text className="text-[10px] font-medium text-slate-400">
                          ({prod.reviewsCount})
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  {/* Price & Add Button Row */}
                  <View className="p-3.5 pt-0 flex-row items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800/80">
                    <View>
                      {prod.originalPrice > prod.price ? (
                        <Text className="text-[10px] font-bold text-slate-400 line-through">
                          ৳{prod.originalPrice}
                        </Text>
                      ) : null}
                      <Text
                        className={`text-sm sm:text-base font-black ${
                          isDarkMode ? 'text-slate-50' : 'text-slate-900'
                        }`}
                      >
                        ৳{prod.price}
                      </Text>
                    </View>

                    {/* Add Button */}
                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={() => {
                        cartStore.addItem({
                          id: prod.id,
                          name: prod.title,
                          price: prod.price,
                          originalPrice: prod.originalPrice,
                          image: prod.imageUrl,
                        });
                      }}
                      style={{ backgroundColor: activeCategoryColor }}
                      className="px-3 py-1.5 rounded-xl flex-row items-center gap-1 shadow-xs"
                    >
                      <Ionicons name="add" size={14} color="#FFFFFF" />
                      <Text className="text-white text-xs font-extrabold">Add</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* 5. Load More Products Pagination Button */}
        {displayedProducts.length < filteredProducts.length ? (
          <View className="mt-8 px-4 items-center">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setVisibleCount((prev) => prev + 6)}
              className={`py-3 px-8 rounded-full border shadow-xs ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-white border-slate-200/90'
              }`}
            >
              <Text
                className={`text-xs sm:text-sm font-extrabold ${
                  isDarkMode ? 'text-slate-100' : 'text-slate-900'
                }`}
              >
                Load More Products
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </ScrollView>

      {/* FILTER MODAL SHEET */}
      <Modal
        visible={isFilterModalOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsFilterModalOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsFilterModalOpen(false)}>
          <View className="flex-1 bg-black/60 justify-end">
            <TouchableWithoutFeedback>
              <View
                className={`w-full max-h-[85%] rounded-t-3xl border-t ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                {/* Modal Header */}
                <View
                  className={`flex-row items-center justify-between p-4 px-5 border-b ${
                    isDarkMode ? 'border-slate-800' : 'border-slate-100'
                  }`}
                >
                  <View className="flex-row items-center gap-2">
                    <Ionicons name="options" size={20} color={activeCategoryColor} />
                    <Text
                      className={`text-lg font-black ${
                        isDarkMode ? 'text-slate-50' : 'text-slate-900'
                      }`}
                    >
                      Filter Products
                    </Text>
                    {activeFilterCount > 0 && (
                      <View
                        style={{ backgroundColor: activeCategoryColor }}
                        className="px-2 py-0.5 rounded-full"
                      >
                        <Text className="text-white text-[10px] font-black">
                          {activeFilterCount}
                        </Text>
                      </View>
                    )}
                  </View>

                  <View className="flex-row items-center gap-3">
                    {activeFilterCount > 0 && (
                      <TouchableOpacity onPress={handleResetFilters}>
                        <Text className="text-xs font-bold text-red-500">Reset All</Text>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      onPress={() => setIsFilterModalOpen(false)}
                      className={`p-1.5 rounded-full ${
                        isDarkMode ? 'bg-slate-800' : 'bg-slate-100'
                      }`}
                    >
                      <Ionicons
                        name="close"
                        size={18}
                        color={isDarkMode ? '#F8FAFC' : '#475569'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Filter Options Scroll Area */}
                <ScrollView showsVerticalScrollIndicator={false} className="p-5 gap-6">
                  {/* 1. Categories / Subcategories */}
                  <View>
                    <Text className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2.5">
                      Categories
                    </Text>
                    <View className="flex-row flex-wrap gap-2">
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setSelectedSubCat(null)}
                        style={
                          !selectedSubCat || selectedSubCat === 'all'
                            ? { backgroundColor: activeCategoryColor, borderColor: activeCategoryColor }
                            : undefined
                        }
                        className={`px-3.5 py-1.5 rounded-full border ${
                          !selectedSubCat || selectedSubCat === 'all'
                            ? ''
                            : isDarkMode
                            ? 'bg-slate-800 border-slate-700'
                            : 'bg-slate-100 border-slate-200/80'
                        }`}
                      >
                        <Text
                          className={`text-xs font-extrabold ${
                            !selectedSubCat || selectedSubCat === 'all'
                              ? 'text-white'
                              : isDarkMode
                              ? 'text-slate-300'
                              : 'text-slate-700'
                          }`}
                        >
                          All Categories
                        </Text>
                      </TouchableOpacity>

                      {currentCategoryConfig.subcategories.map((sub) => {
                        const isSelected =
                          selectedSubCat?.toLowerCase() === sub.name.toLowerCase();
                        return (
                          <TouchableOpacity
                            key={sub.id}
                            activeOpacity={0.8}
                            onPress={() => setSelectedSubCat(isSelected ? null : sub.name)}
                            style={
                              isSelected
                                ? { backgroundColor: activeCategoryColor, borderColor: activeCategoryColor }
                                : undefined
                            }
                            className={`px-3.5 py-1.5 rounded-full border ${
                              isSelected
                                ? ''
                                : isDarkMode
                                ? 'bg-slate-800 border-slate-700'
                                : 'bg-slate-100 border-slate-200/80'
                            }`}
                          >
                            <Text
                              className={`text-xs font-extrabold ${
                                isSelected
                                  ? 'text-white'
                                  : isDarkMode
                                  ? 'text-slate-300'
                                  : 'text-slate-700'
                              }`}
                            >
                              {sub.name}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>

                  {/* 2. Interactive Dual-Circle Price Range Slider */}
                  <View
                    className={`pt-4 border-t ${
                      isDarkMode ? 'border-slate-800' : 'border-slate-100'
                    }`}
                  >
                    {/* Header Title & Current Selected Range */}
                    <View className="flex-row items-center justify-between mb-2">
                      <Text className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                        Price Range
                      </Text>
                      <View
                        className={`px-3 py-1 rounded-full border ${
                          isDarkMode
                            ? 'bg-slate-800 border-slate-700'
                            : 'bg-slate-100 border-slate-200'
                        }`}
                      >
                        <Text
                          className={`text-xs font-black ${
                            isDarkMode ? 'text-slate-100' : 'text-slate-800'
                          }`}
                        >
                          ৳{minPrice.toLocaleString()} — ৳{maxPrice.toLocaleString()}
                        </Text>
                      </View>
                    </View>

                    {/* Dual Handle Interactive Range Track */}
                    {(() => {
                      const totalRange = catalogMaxPrice - catalogMinPrice || 1;
                      const leftPct = Math.max(
                        0,
                        Math.min(92, ((minPrice - catalogMinPrice) / totalRange) * 100)
                      );
                      const rightPct = Math.max(
                        leftPct + 4,
                        Math.min(94, ((maxPrice - catalogMinPrice) / totalRange) * 100)
                      );

                      return (
                        <View className="my-4 px-2 py-2 relative justify-center">
                          {/* Background Range Track Line */}
                          <View
                            className={`h-3 w-full rounded-full ${
                              isDarkMode ? 'bg-slate-800' : 'bg-slate-200'
                            }`}
                          />

                          {/* Highlighted Selected Range Color Bar */}
                          <View
                            style={{
                              position: 'absolute',
                              left: `${leftPct}%`,
                              width: `${Math.max(4, rightPct - leftPct)}%`,
                              height: 12,
                              backgroundColor: activeCategoryColor,
                              borderRadius: 999,
                            }}
                          />

                          {/* Left Circle Handle (Min Price Circle) */}
                          <View
                            {...leftPanResponder.panHandlers}
                            style={{
                              position: 'absolute',
                              left: `${Math.max(0, leftPct - 3)}%`,
                              width: 26,
                              height: 26,
                              borderRadius: 13,
                              backgroundColor: '#FFFFFF',
                              borderColor: activeCategoryColor,
                              borderWidth: 3.5,
                              elevation: 5,
                              shadowColor: '#000',
                              shadowOffset: { width: 0, height: 2 },
                              shadowOpacity: 0.25,
                              shadowRadius: 4,
                              alignItems: 'center',
                              justifyContent: 'center',
                              zIndex: 30,
                            }}
                          />

                          {/* Right Circle Handle (Max Price Circle) */}
                          <View
                            {...rightPanResponder.panHandlers}
                            style={{
                              position: 'absolute',
                              left: `${Math.min(92, rightPct - 2)}%`,
                              width: 26,
                              height: 26,
                              borderRadius: 13,
                              backgroundColor: '#FFFFFF',
                              borderColor: activeCategoryColor,
                              borderWidth: 3.5,
                              elevation: 5,
                              shadowColor: '#000',
                              shadowOffset: { width: 0, height: 2 },
                              shadowOpacity: 0.25,
                              shadowRadius: 4,
                              alignItems: 'center',
                              justifyContent: 'center',
                              zIndex: 30,
                            }}
                          />
                        </View>
                      );
                    })()}

                    {/* Low Price to High Price Range Line Markers */}
                    <View className="flex-row justify-between items-center px-1">
                      <Text className="text-[10px] font-extrabold text-slate-400">
                        Low: ৳{catalogMinPrice.toLocaleString()}
                      </Text>
                      <Text className="text-[10px] font-extrabold text-slate-400">
                        High: ৳{catalogMaxPrice.toLocaleString()}
                      </Text>
                    </View>
                  </View>

                  {/* 3. Item Status Toggles */}
                  <View
                    className={`pt-4 pb-4 border-t gap-3 ${
                      isDarkMode ? 'border-slate-800' : 'border-slate-100'
                    }`}
                  >
                    <Text className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                      Item Status
                    </Text>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => setInStockOnly((prev) => !prev)}
                      className={`flex-row items-center justify-between py-2.5 px-3.5 rounded-2xl border ${
                        isDarkMode
                          ? 'bg-slate-800/60 border-slate-700'
                          : 'bg-slate-50 border-slate-200/90'
                      }`}
                    >
                      <View className="flex-row items-center gap-2.5">
                        <Ionicons
                          name="cube-outline"
                          size={18}
                          color={isDarkMode ? '#CBD5E1' : '#475569'}
                        />
                        <Text
                          className={`text-xs sm:text-sm font-bold ${
                            isDarkMode ? 'text-slate-200' : 'text-slate-800'
                          }`}
                        >
                          In Stock Products Only
                        </Text>
                      </View>
                      <Ionicons
                        name={inStockOnly ? 'checkbox' : 'square-outline'}
                        size={22}
                        color={inStockOnly ? activeCategoryColor : isDarkMode ? '#64748B' : '#94A3B8'}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => setOnSaleOnly((prev) => !prev)}
                      className={`flex-row items-center justify-between py-2.5 px-3.5 rounded-2xl border ${
                        isDarkMode
                          ? 'bg-slate-800/60 border-slate-700'
                          : 'bg-slate-50 border-slate-200/90'
                      }`}
                    >
                      <View className="flex-row items-center gap-2.5">
                        <Ionicons
                          name="pricetag-outline"
                          size={18}
                          color={isDarkMode ? '#CBD5E1' : '#475569'}
                        />
                        <Text
                          className={`text-xs sm:text-sm font-bold ${
                            isDarkMode ? 'text-slate-200' : 'text-slate-800'
                          }`}
                        >
                          On Sale / Discounted Items Only
                        </Text>
                      </View>
                      <Ionicons
                        name={onSaleOnly ? 'checkbox' : 'square-outline'}
                        size={22}
                        color={onSaleOnly ? activeCategoryColor : isDarkMode ? '#64748B' : '#94A3B8'}
                      />
                    </TouchableOpacity>
                  </View>
                </ScrollView>

                {/* Modal Footer */}
                <View
                  className={`p-4 px-5 border-t flex-row items-center gap-3 ${
                    isDarkMode ? 'border-slate-800' : 'border-slate-100'
                  }`}
                >
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleResetFilters}
                    className={`py-3 px-5 rounded-full border ${
                      isDarkMode
                        ? 'border-slate-700 bg-slate-800'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <Text
                      className={`text-xs font-bold ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      Reset
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => setIsFilterModalOpen(false)}
                    style={{ backgroundColor: activeCategoryColor }}
                    className="flex-1 py-3.5 rounded-full items-center justify-center shadow-md flex-row gap-2"
                  >
                    <Ionicons name="checkmark-sharp" size={18} color="#FFFFFF" />
                    <Text className="text-white text-xs sm:text-sm font-black">
                      Apply Filters ({filteredProducts.length})
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* SORT MODAL SHEET */}
      <Modal
        visible={isSortModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsSortModalOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsSortModalOpen(false)}>
          <View className="flex-1 bg-black/50 justify-end">
            <TouchableWithoutFeedback>
              <View
                className={`w-full p-5 rounded-t-3xl border-t ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <View
                  className={`flex-row items-center justify-between pb-3 border-b mb-3 ${
                    isDarkMode ? 'border-slate-800' : 'border-slate-100'
                  }`}
                >
                  <Text
                    className={`text-lg font-black ${
                      isDarkMode ? 'text-slate-50' : 'text-slate-900'
                    }`}
                  >
                    Sort By
                  </Text>
                  <TouchableOpacity
                    onPress={() => setIsSortModalOpen(false)}
                    className={`p-1.5 rounded-full ${
                      isDarkMode ? 'bg-slate-800' : 'bg-slate-100'
                    }`}
                  >
                    <Ionicons
                      name="close"
                      size={18}
                      color={isDarkMode ? '#F8FAFC' : '#475569'}
                    />
                  </TouchableOpacity>
                </View>

                {(
                  [
                    { id: 'popularity', label: 'Popularity' },
                    { id: 'price_low', label: 'Price: Low to High' },
                    { id: 'price_high', label: 'Price: High to Low' },
                    { id: 'rating', label: 'Highest Rating' },
                    { id: 'newest', label: 'Newest Arrivals' },
                  ] as const
                ).map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    onPress={() => {
                      setSortOption(option.id);
                      setIsSortModalOpen(false);
                    }}
                    className={`flex-row items-center justify-between py-3 border-b ${
                      isDarkMode ? 'border-slate-800/60' : 'border-slate-100'
                    }`}
                  >
                    <Text
                      style={{
                        color:
                          sortOption === option.id
                            ? activeCategoryColor
                            : isDarkMode
                            ? '#E2E8F0'
                            : '#1E293B',
                      }}
                      className="text-sm font-extrabold"
                    >
                      {option.label}
                    </Text>
                    {sortOption === option.id ? (
                      <Ionicons name="checkmark" size={18} color={activeCategoryColor} />
                    ) : null}
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};
