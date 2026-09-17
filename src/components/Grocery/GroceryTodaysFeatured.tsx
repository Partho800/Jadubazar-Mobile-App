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
import { AppText as Text } from '../common/AppText';
import { DiscountRibbonBadge } from '../common/DiscountRibbonBadge';

export interface WeightVariant {
  weight: string;
  price: number;
  oldPrice?: number;
}

export interface TodaysFeaturedProduct {
  id: string;
  brand: string;
  title: string;
  imageUrl: string;
  discountText?: string;
  weight: string;
  rating: number;
  reviewsCount: number;
  oldPrice?: number;
  price: number;
  variants?: WeightVariant[];
}

const FEATURED_PRODUCTS: TodaysFeaturedProduct[] = [
  {
    id: 'tf1',
    brand: 'SEYLON',
    title: 'Seylon Family Blend Tea 400gm',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    discountText: '৳85 OFF',
    weight: '1KG',
    rating: 4.8,
    reviewsCount: 120,
    oldPrice: 700,
    price: 615,
    variants: [
      { weight: '1kg', price: 615, oldPrice: 700 },
      { weight: '400g', price: 290, oldPrice: 330 },
    ],
  },
  {
    id: 'tf2',
    brand: 'DANO',
    title: 'Dano Daily Pusti Milk Powder 500gm',
    imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80',
    discountText: '৳110 OFF',
    weight: '1KG',
    rating: 4.8,
    reviewsCount: 120,
    oldPrice: 910,
    price: 800,
    variants: [
      { weight: '1kg', price: 800, oldPrice: 910 },
      { weight: '500g', price: 420, oldPrice: 480 },
    ],
  },
  {
    id: 'tf3',
    brand: 'DABUR',
    title: 'Dabur Honey 500g Glass Jar',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    discountText: '৳90 OFF',
    weight: '500G',
    rating: 4.8,
    reviewsCount: 120,
    oldPrice: 980,
    price: 890,
    variants: [
      { weight: '500g', price: 890, oldPrice: 980 },
      { weight: '250g', price: 470, oldPrice: 520 },
    ],
  },
  {
    id: 'tf4',
    brand: 'PRAN',
    title: 'Pran Premium Mustard Oil 1Ltr Bottle',
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
    discountText: '৳40 OFF',
    weight: '1LTR',
    rating: 4.7,
    reviewsCount: 95,
    oldPrice: 400,
    price: 360,
    variants: [
      { weight: '1ltr', price: 360, oldPrice: 400 },
      { weight: '500ml', price: 190, oldPrice: 210 },
    ],
  },
  {
    id: 'tf5',
    brand: 'HORLICKS',
    title: 'Horlicks Health Drink Classic Malt 500g',
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80',
    discountText: '৳60 OFF',
    weight: '500G',
    rating: 4.9,
    reviewsCount: 160,
    oldPrice: 600,
    price: 540,
    variants: [
      { weight: '500g', price: 540, oldPrice: 600 },
      { weight: '200g', price: 240, oldPrice: 270 },
    ],
  },
];

interface GroceryTodaysFeaturedProps {
  onAddToCart?: (product: TodaysFeaturedProduct) => void;
  onViewAllPress?: () => void;
}

export const GroceryTodaysFeatured: React.FC<GroceryTodaysFeaturedProps> = ({
  onAddToCart,
  onViewAllPress,
}) => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const scrollX = useRef<number>(0);
  const { openProductDetails } = useProduct();
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, WeightVariant>>({});

  const cardStep = width >= 640 ? 246 : 168;

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

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <View className="my-6 py-5 w-full bg-[#0B132A] rounded-2xl relative overflow-hidden shadow-lg">
      {/* Backdrop Overlay to Close Dropdown on Outside Tap */}
      {openDropdownId ? (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setOpenDropdownId(null)}
          style={{
            position: 'absolute',
            top: -1000,
            left: -1000,
            right: -1000,
            bottom: -1000,
            zIndex: 20,
            backgroundColor: 'transparent',
          }}
        />
      ) : null}

      {/* 1. Dark Header Row - Strictly 1 Line Layout */}
      <View className="flex-row items-center justify-between px-4 mb-4 gap-1.5 w-full">
        {/* Left Side: Title + Count Badge */}
        <View className="flex-1 flex-row items-center gap-1.5 min-w-0 shrink">
          <Text
            numberOfLines={1}
            className="text-xs sm:text-base md:text-xl font-black tracking-tight text-white shrink min-w-0 uppercase"
          >
            {t('todaysFeaturedTitle')}
          </Text>
          <View className="bg-[#1E293B] border border-slate-700/60 px-2 py-0.5 rounded-full shrink-0">
            <Text className="text-emerald-400 text-[10px] sm:text-[11px] font-extrabold">
              {t('itemsCountTag')}
            </Text>
          </View>
        </View>

        {/* Right Side: Prev / Next Arrows Pill & View All Button */}
        <View className="flex-row items-center gap-1 sm:gap-1.5 shrink-0">
          <View className="flex-row items-center bg-[#1E293B] border border-slate-700/60 p-0.5 rounded-full shadow-xs">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleScrollPrev}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full items-center justify-center"
            >
              <Ionicons
                name="chevron-back"
                size={14}
                color="#94A3B8"
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleScrollNext}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#334155] items-center justify-center shadow-xs"
            >
              <Ionicons
                name="chevron-forward"
                size={14}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onViewAllPress}
            className="flex-row items-center bg-[#1E293B] border border-slate-700/60 px-2.5 sm:px-3.5 py-1.5 rounded-full shadow-xs gap-1"
          >
            <Text
              numberOfLines={1}
              className="text-[11px] sm:text-xs font-bold text-white"
            >
              {t('viewAllBtn')}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={12}
              color="#94A3B8"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. Product Cards Carousel */}
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 10 }}
      >
        {FEATURED_PRODUCTS.map((item) => {
          const currentVariant = selectedVariants[item.id] || {
            weight: item.weight,
            price: item.price,
            oldPrice: item.oldPrice,
          };
          const isOpen = openDropdownId === item.id;

          const activeDiscountText =
            currentVariant.oldPrice && currentVariant.oldPrice > currentVariant.price
              ? `৳${currentVariant.oldPrice - currentVariant.price} OFF`
              : item.discountText;

          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.9}
              onPress={() =>
                openProductDetails({
                  id: item.id,
                  title: item.title,
                  brand: item.brand,
                  category: 'GROCERY',
                  price: `৳${currentVariant.price}`,
                  oldPrice: currentVariant.oldPrice ? `৳${currentVariant.oldPrice}` : undefined,
                  imageUrl: item.imageUrl,
                  rating: item.rating,
                  reviewsCount: item.reviewsCount,
                  discountBadge: activeDiscountText,
                  weight: currentVariant.weight,
                })
              }
              style={{ borderRadius: 12 }}
              className="w-[158px] sm:w-[210px] md:w-[230px] rounded-xl border border-slate-200/90 bg-white overflow-hidden shadow-xs relative"
            >
              {/* Product Image Box */}
              <View className="w-full h-[165px] sm:h-[185px] bg-slate-50 relative items-center justify-center overflow-hidden">
                {/* Discount Ribbon Badge */}
                {activeDiscountText ? (
                  <View className="absolute top-0 left-3 z-10">
                    <DiscountRibbonBadge discountText={activeDiscountText} />
                  </View>
                ) : null}

                {/* Wishlist Heart Button */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => toggleWishlist(item.id)}
                  className={`absolute top-2.5 right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full items-center justify-center z-10 shadow-sm border ${
                    isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'
                  }`}
                >
                  <Ionicons
                    name={wishlist[item.id] ? 'heart' : 'heart-outline'}
                    size={15}
                    color={wishlist[item.id] ? '#EF4444' : isDarkMode ? '#F8FAFC' : '#334155'}
                  />
                </TouchableOpacity>

                {/* Full Bleed Image */}
                <Image
                  source={{ uri: item.imageUrl }}
                  className="w-full h-full"
                  resizeMode="cover"
                />

                {/* Interactive Weight Options Dropdown Popup */}
                {isOpen && item.variants && (
                  <View className="absolute top-2 left-2 right-2 rounded-xl shadow-2xl border border-slate-200 bg-white overflow-hidden py-0.5 z-30">
                    {item.variants.map((v) => {
                      const isSelected =
                        v.weight.toLowerCase() === currentVariant.weight.toLowerCase();
                      return (
                        <TouchableOpacity
                          key={v.weight}
                          activeOpacity={0.8}
                          onPress={() => {
                            setSelectedVariants((prev) => ({ ...prev, [item.id]: v }));
                            setOpenDropdownId(null);
                          }}
                          className={`flex-row items-center justify-between px-3 py-1.5 rounded-none ${
                            isSelected
                              ? 'bg-[#6F4E37]'
                              : 'bg-transparent'
                          }`}
                        >
                          <Text
                            className={`text-[11px] ${
                              isSelected
                                ? 'font-black text-amber-300'
                                : 'font-semibold text-slate-700'
                            }`}
                          >
                            {v.weight}
                          </Text>
                          <Text
                            className={`text-[11px] ${
                              isSelected
                                ? 'font-black text-amber-300'
                                : 'font-bold text-slate-500'
                            }`}
                          >
                            ৳{v.price}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}

                {/* Weight Tag Badge Button */}
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => setOpenDropdownId(isOpen ? null : item.id)}
                  className="bg-slate-800/90 px-2 py-0.5 rounded-lg flex-row items-center gap-0.5 absolute bottom-2 right-2 z-10 shadow-xs"
                >
                  <Text className="text-white text-[9px] sm:text-[10px] font-black uppercase">
                    {currentVariant.weight}
                  </Text>
                  <Ionicons
                    name={isOpen ? 'chevron-up' : 'chevron-down'}
                    size={11}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
              </View>

              {/* Product Info Content Area */}
              <View className="p-3 pt-2.5 pb-3 justify-between flex-1">
                <View>
                  <Text className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase mb-0.5">
                    {item.brand}
                  </Text>
                  <Text
                    numberOfLines={2}
                    className="text-xs sm:text-sm font-extrabold leading-4 mb-1.5 text-slate-900"
                  >
                    {item.title}
                  </Text>

                  <View className="flex-row items-center gap-1 mb-2">
                    <Ionicons name="star" size={13} color="#F59E0B" />
                    <Text className="text-xs font-black text-slate-700">
                      {item.rating}
                    </Text>
                    <Text className="text-[11px] font-semibold text-slate-400">
                      ({item.reviewsCount})
                    </Text>
                  </View>
                </View>

                {/* Price & + Add Button Row */}
                <View className="flex-row items-center justify-between pt-1">
                  <View>
                    {currentVariant.oldPrice ? (
                      <Text className="text-[10px] sm:text-xs font-semibold text-slate-400 line-through">
                        ৳{currentVariant.oldPrice}
                      </Text>
                    ) : null}
                    <Text className="text-sm sm:text-base font-black text-slate-900">
                      ৳{currentVariant.price}
                    </Text>
                  </View>

                  {/* + Add Button */}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      cartStore.addItem({
                        id: item.id,
                        name: item.title,
                        price: currentVariant.price,
                        image: item.imageUrl,
                      });
                      onAddToCart?.(item);
                    }}
                    className="bg-[#059669] active:bg-emerald-700 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl flex-row items-center justify-center shadow-xs"
                  >
                    <Text className="text-white text-[11px] sm:text-xs font-black">
                      {t('addBtnText')}
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
