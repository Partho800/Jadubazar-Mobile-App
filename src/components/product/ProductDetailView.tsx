import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useProduct, DEFAULT_IPHONE_PRODUCT } from '../../context/ProductContext';
import { cartStore } from '../../store/cartStore';
import { AppText as Text } from '../common/AppText';
import { DiscountRibbonBadge } from '../common/DiscountRibbonBadge';

export const ProductDetailView: React.FC = () => {
  const navigation = useNavigation<any>();
  const { isDarkMode, theme } = useTheme();
  const { isBangla, t } = useLanguage();
  const { selectedProduct, closeProductDetails } = useProduct();

  const product = selectedProduct || DEFAULT_IPHONE_PRODUCT;

  const sizes = product.sizes || DEFAULT_IPHONE_PRODUCT.sizes || [];
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');

  const activeSize = sizes[selectedSizeIndex] || {
    label: '1kg',
    price: product.price,
    oldPrice: product.oldPrice,
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const getCategoryName = () => {
    if (!product.category) return 'Ecommerce';
    const cat = product.category.toLowerCase();
    if (cat.includes('grocery')) return 'Grocery';
    if (cat.includes('food')) return 'Food delivery';
    if (cat.includes('pharmacy')) return 'Pharmacy';
    if (cat.includes('service')) return 'Services';
    if (cat.includes('ecommerce') || cat.includes('e-commerce')) return 'Ecommerce';
    return product.category;
  };

  const parsePrice = (priceVal: any): number => {
    if (typeof priceVal === 'number') return priceVal;
    if (!priceVal) return 100;
    const cleaned = String(priceVal).replace(/[^0-9.]/g, '');
    return parseFloat(cleaned) || 100;
  };

  const handleAddToCart = () => {
    const itemPrice = parsePrice(activeSize.price || product.price);
    const itemOldPrice = activeSize.oldPrice ? parsePrice(activeSize.oldPrice) : undefined;
    const itemImg = typeof product.image === 'string'
      ? product.image
      : product.imageUrl || 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80';

    const itemData = {
      id: `${product.id || 'prod'}-${selectedSizeIndex}`,
      name: `${product.title} ${activeSize.label ? `(${activeSize.label})` : ''}`.trim(),
      price: itemPrice,
      originalPrice: itemOldPrice,
      image: itemImg,
    };

    cartStore.addItem(itemData);
    if (quantity > 1) {
      const existing = cartStore.getItems().find((i) => i.id === itemData.id);
      if (existing) {
        cartStore.updateQuantity(itemData.id, existing.quantity + (quantity - 1));
      }
    }

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    const itemPrice = parsePrice(activeSize.price || product.price);
    const itemOldPrice = activeSize.oldPrice ? parsePrice(activeSize.oldPrice) : undefined;
    const itemImg = typeof product.image === 'string'
      ? product.image
      : product.imageUrl || 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80';

    const itemData = {
      id: `${product.id || 'prod'}-${selectedSizeIndex}`,
      name: `${product.title} ${activeSize.label ? `(${activeSize.label})` : ''}`.trim(),
      price: itemPrice,
      originalPrice: itemOldPrice,
      image: itemImg,
    };

    cartStore.addItem(itemData);
    if (quantity > 1) {
      const existing = cartStore.getItems().find((i) => i.id === itemData.id);
      if (existing) {
        cartStore.updateQuantity(itemData.id, existing.quantity + (quantity - 1));
      }
    }

    closeProductDetails();
    navigation.navigate('CheckoutTab');
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* 1. Top Breadcrumbs Bar (Home / Products / Category / ProductTitle) */}
      <View
        className={`px-4 py-3 border-b flex-row items-center justify-between ${
          isDarkMode
            ? 'bg-slate-900 border-slate-800'
            : 'bg-slate-50/80 border-slate-200/80'
        }`}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={closeProductDetails}
          className="flex-row items-center gap-1.5 flex-1 pr-2"
        >
          <Ionicons name="arrow-back" size={18} color={isDarkMode ? '#F8FAFC' : '#0F172A'} />
          <Text
            className={`text-xs font-bold ${
              isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`}
            numberOfLines={1}
          >
            Back / {getCategoryName()} /{' '}
            <Text
              className={`font-black text-xs ${
                isDarkMode ? 'text-slate-100' : 'text-slate-900'
              }`}
            >
              {product.title}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 160 }}
      >
        {/* 1. Top Product Card (First element is the Product Image) */}
        <View
          className={`rounded-3xl border p-4 mb-4 shadow-sm ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          {/* Large Product Image Box (First at the Top) */}
          <View
            className={`w-full h-[360px] rounded-2xl overflow-hidden relative items-center justify-center mb-4 ${
              isDarkMode ? 'bg-slate-950' : 'bg-slate-100'
            }`}
          >
            {/* Red Discount Badge on Top Left */}
            <View className="absolute top-0 left-3 z-10">
              <DiscountRibbonBadge
                discountText={product.discountBadge || '20% OFF'}
                width={46}
                height={54}
              />
            </View>

            <Image
              source={
                typeof product.image === 'number'
                  ? product.image
                  : { uri: product.imageUrl || 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80' }
              }
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </View>

          {/* Category Badge & Brand */}
          <View className="flex-row items-center mb-2">
            <View
              className={`px-2.5 py-1 rounded-md ${
                (product.category || '').toUpperCase().includes('GROCERY')
                  ? 'bg-emerald-600'
                  : 'bg-teal-600'
              }`}
            >
              <Text className="text-white text-[11px] font-black tracking-wider uppercase">
                {(product.category || '').toUpperCase().includes('GROCERY')
                  ? 'GROCERY'
                  : product.category || 'ECOMMERCE'}
              </Text>
            </View>
            <Text className="text-slate-500 font-bold text-xs ml-2.5">
              Brand: <Text className="text-slate-700 font-extrabold">{product.brand || 'Jadubazar'}</Text>
            </Text>
          </View>

          {/* Product Title */}
          <Text
            className={`text-2xl font-black leading-tight mb-2 ${
              isDarkMode ? 'text-slate-50' : 'text-slate-900'
            }`}
          >
            {product.title}
          </Text>

          {/* Rating Row */}
          <View className="flex-row items-center mb-3">
            {[1, 2, 3, 4].map((star) => (
              <Ionicons
                key={star}
                name="star"
                size={16}
                color="#F59E0B"
                style={{ marginRight: 2 }}
              />
            ))}
            <Ionicons
              name="star-half"
              size={16}
              color="#F59E0B"
              style={{ marginRight: 4 }}
            />
            <Text className="text-amber-500 font-black text-sm ml-1">
              {product.rating || 4.9}
            </Text>
            <Text className="text-slate-400 font-semibold text-xs ml-1.5">
              ({product.reviewsCount || 412} verified reviews)
            </Text>
          </View>

          {/* Divider */}
          <View className="border-t border-slate-100 my-2" />

          {/* Weight & Status Row */}
          <View className="flex-row items-center gap-3 pt-1">
            <Text className="text-slate-700 font-bold text-sm">
              Selected Weight: <Text className="font-black text-slate-900">{activeSize.label}</Text>
            </Text>
            <Text className="text-slate-300 font-light">|</Text>
            <Text className="text-slate-700 font-bold text-sm">
              Status: <Text className="text-emerald-500 font-black">{product.status || 'In Stock'}</Text>
            </Text>
          </View>
        </View>

        {/* 3. Size / Pack Selection & Price Action Card */}
        <View
          className={`rounded-3xl border p-4 mb-4 shadow-sm ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          {/* Size / Pack Title */}
          <Text
            className={`text-sm font-extrabold mb-3 ${
              isDarkMode ? 'text-slate-200' : 'text-slate-800'
            }`}
          >
            Select Size / Pack:
          </Text>

          {/* Horizontal / Wrap Size Pills */}
          <View className="flex-row flex-wrap gap-2.5 mb-4">
            {sizes.map((sz, idx) => {
              const isSelected = idx === selectedSizeIndex;
              return (
                <TouchableOpacity
                  key={idx}
                  activeOpacity={0.8}
                  onPress={() => setSelectedSizeIndex(idx)}
                  className={`px-3.5 py-2 rounded-xl border flex-row items-center gap-1.5 ${
                    isSelected
                      ? 'bg-amber-50 border-amber-400'
                      : isDarkMode
                      ? 'bg-slate-800 border-slate-700'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <Text
                    className={`text-xs font-black ${
                      isSelected
                        ? 'text-amber-900'
                        : isDarkMode
                        ? 'text-slate-200'
                        : 'text-slate-800'
                    }`}
                  >
                    {sz.label}
                  </Text>
                  <Text
                    className={`text-xs font-bold ${
                      isSelected
                        ? 'text-amber-800'
                        : isDarkMode
                        ? 'text-slate-400'
                        : 'text-slate-500'
                    }`}
                  >
                    {sz.price}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Selling Price Card Container */}
          <View
            className={`p-4 rounded-2xl mb-4 border ${
              isDarkMode
                ? 'bg-slate-800/80 border-slate-700'
                : 'bg-slate-50/90 border-slate-100'
            }`}
          >
            <Text className="text-slate-400 text-[10px] font-black tracking-widest uppercase mb-1">
              SELLING PRICE
            </Text>
            <View className="flex-row items-baseline">
              <Text
                className={`text-3xl font-black tracking-tight ${
                  isDarkMode ? 'text-slate-50' : 'text-slate-900'
                }`}
              >
                {activeSize.price}
              </Text>
              {activeSize.oldPrice && (
                <Text className="text-slate-400 font-semibold text-sm line-through ml-3">
                  {activeSize.oldPrice}
                </Text>
              )}
            </View>
          </View>

          {/* Quantity Counter & Favorite Row */}
          <View className="flex-row items-center gap-3 mb-4">
            {/* Quantity Selector Box */}
            <View
              className={`flex-row items-center justify-between border rounded-2xl px-4 py-2.5 w-36 h-12 ${
                isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'
              }`}
            >
              <TouchableOpacity activeOpacity={0.7} onPress={decreaseQuantity}>
                <Ionicons
                  name="remove"
                  size={18}
                  color={isDarkMode ? '#94A3B8' : '#334155'}
                />
              </TouchableOpacity>
              <Text
                className={`text-base font-black ${
                  isDarkMode ? 'text-slate-50' : 'text-slate-900'
                }`}
              >
                {quantity}
              </Text>
              <TouchableOpacity activeOpacity={0.7} onPress={increaseQuantity}>
                <Ionicons
                  name="add"
                  size={18}
                  color={isDarkMode ? '#94A3B8' : '#334155'}
                />
              </TouchableOpacity>
            </View>

            {/* Favorite Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setIsFavorite(!isFavorite)}
              className={`w-12 h-12 rounded-2xl border justify-center items-center shadow-sm ${
                isDarkMode
                  ? 'border-slate-700 bg-slate-800'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={22}
                color={isFavorite ? '#EF4444' : '#64748B'}
              />
            </TouchableOpacity>
          </View>

          {/* Action Buttons Row */}
          <View className="flex-row items-center gap-3">
            {/* Add To Cart */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleAddToCart}
              className={`flex-1 h-13 py-3.5 rounded-2xl border items-center justify-center shadow-sm ${
                isAdded
                  ? 'bg-emerald-600 border-emerald-600'
                  : isDarkMode
                  ? 'bg-slate-800 border-slate-700'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <Text
                className={`font-black text-xs sm:text-sm tracking-wide ${
                  isAdded ? 'text-white' : isDarkMode ? 'text-slate-50' : 'text-slate-900'
                }`}
              >
                {isAdded
                  ? isBangla
                    ? 'যোগ করা হয়েছে'
                    : 'ADDED TO CART'
                  : isBangla
                  ? 'কার্টে যোগ করুন'
                  : 'ADD TO CART'}
              </Text>
            </TouchableOpacity>

            {/* Buy Now */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleBuyNow}
              className="flex-1 h-13 py-3.5 rounded-2xl bg-blue-600 items-center justify-center shadow-md shadow-blue-500/30"
            >
              <Text className="text-white font-black text-xs sm:text-sm tracking-wide">
                {isBangla ? 'এখনই কিনুন' : 'BUY NOW'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 4. Tabbed Details Card (Description, Specifications, Reviews) */}
        <View
          className={`rounded-3xl border p-4 mb-4 shadow-sm ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          {/* Tab Header Buttons */}
          <View className="flex-row items-center border-b border-slate-100 mb-4 gap-6">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setActiveTab('description')}
              className={`pb-3 ${
                activeTab === 'description'
                  ? 'border-b-2 border-blue-600'
                  : ''
              }`}
            >
              <Text
                className={`font-extrabold text-xs sm:text-sm uppercase tracking-wide ${
                  activeTab === 'description'
                    ? 'text-blue-600'
                    : 'text-slate-400'
                }`}
              >
                DESCRIPTION
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setActiveTab('specifications')}
              className={`pb-3 ${
                activeTab === 'specifications'
                  ? 'border-b-2 border-blue-600'
                  : ''
              }`}
            >
              <Text
                className={`font-extrabold text-xs sm:text-sm uppercase tracking-wide ${
                  activeTab === 'specifications'
                    ? 'text-blue-600'
                    : 'text-slate-400'
                }`}
              >
                SPECIFICATIONS
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setActiveTab('reviews')}
              className={`pb-3 ${
                activeTab === 'reviews'
                  ? 'border-b-2 border-blue-600'
                  : ''
              }`}
            >
              <Text
                className={`font-extrabold text-xs sm:text-sm uppercase tracking-wide ${
                  activeTab === 'reviews'
                    ? 'text-blue-600'
                    : 'text-slate-400'
                }`}
              >
                REVIEWS ({product.reviewsCount || 412})
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tab Contents */}
          {activeTab === 'description' && (
            <View className="gap-3">
              <Text
                className={`text-sm leading-6 font-medium ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                {product.description ||
                  'Dynamic Island, Always-On 120Hz ProMotion Super Retina XDR display, A16 Bionic chip, and a pro 48MP quad-pixel camera system with Action mode.'}
              </Text>

              {/* Bullet Features */}
              <View className="flex-row items-center gap-2.5 mt-1">
                <View className="w-5 h-5 rounded-full bg-blue-50 justify-center items-center">
                  <Ionicons name="checkmark-circle-outline" size={16} color="#2563EB" />
                </View>
                <Text
                  className={`text-xs font-bold flex-1 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-800'
                  }`}
                >
                  Original DGDA approved or handpicked raw items.
                </Text>
              </View>

              <View className="flex-row items-center gap-2.5">
                <View className="w-5 h-5 rounded-full bg-blue-50 justify-center items-center">
                  <Ionicons name="refresh-circle-outline" size={16} color="#2563EB" />
                </View>
                <Text
                  className={`text-xs font-bold flex-1 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-800'
                  }`}
                >
                  Hassle-free 24 Hours doorstep refund policy.
                </Text>
              </View>
            </View>
          )}

          {activeTab === 'specifications' && (
            <View className="gap-2 py-1">
              <View className="flex-row justify-between py-1.5 border-b border-slate-100">
                <Text className="text-xs font-semibold text-slate-400">Display</Text>
                <Text className="text-xs font-bold text-slate-800">6.7" Super Retina XDR OLED</Text>
              </View>
              <View className="flex-row justify-between py-1.5 border-b border-slate-100">
                <Text className="text-xs font-semibold text-slate-400">Chipset</Text>
                <Text className="text-xs font-bold text-slate-800">Apple A16 Bionic (4 nm)</Text>
              </View>
              <View className="flex-row justify-between py-1.5 border-b border-slate-100">
                <Text className="text-xs font-semibold text-slate-400">Main Camera</Text>
                <Text className="text-xs font-bold text-slate-800">48 MP + 12 MP + 12 MP</Text>
              </View>
              <View className="flex-row justify-between py-1.5 border-b border-slate-100">
                <Text className="text-xs font-semibold text-slate-400">Battery</Text>
                <Text className="text-xs font-bold text-slate-800">4323 mAh, 29W Fast Charging</Text>
              </View>
            </View>
          )}

          {activeTab === 'reviews' && (
            <View className="gap-3 py-1">
              <View className="flex-row items-center gap-2">
                <Text className="text-2xl font-black text-slate-900">4.9</Text>
                <View className="flex-row">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons key={star} name="star" size={14} color="#F59E0B" />
                  ))}
                </View>
                <Text className="text-xs font-bold text-slate-500">Based on 412 reviews</Text>
              </View>
              <Text className="text-xs font-semibold text-slate-600">
                "Outstanding build quality, unbelievable camera performance, and ultra smooth display!"
              </Text>
            </View>
          )}
        </View>

        {/* 5. 4 Trust / Service Feature Badges (2 items per line 2x2 Grid) */}
        <View className="flex-row flex-wrap justify-between gap-y-3 mb-2">
          {/* Badge 1: Express Fast Delivery */}
          <View
            style={{ width: '48.5%' }}
            className={`rounded-2xl border p-3.5 justify-between shadow-sm ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-200'
            }`}
          >
            <View className="w-10 h-10 rounded-xl bg-emerald-100/70 justify-center items-center mb-2.5">
              <Ionicons name="bus-outline" size={20} color="#059669" />
            </View>
            <View>
              <Text
                className={`text-xs font-black mb-1 ${
                  isDarkMode ? 'text-slate-50' : 'text-slate-900'
                }`}
              >
                Express Fast Delivery
              </Text>
              <Text className="text-[11px] font-semibold text-slate-500 leading-4">
                Swift delivery directly to your doorstep
              </Text>
            </View>
          </View>

          {/* Badge 2: 100% Genuine & Fresh */}
          <View
            style={{ width: '48.5%' }}
            className={`rounded-2xl border p-3.5 justify-between shadow-sm ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-200'
            }`}
          >
            <View className="w-10 h-10 rounded-xl bg-teal-100/70 justify-center items-center mb-2.5">
              <Ionicons name="shield-checkmark-outline" size={20} color="#0D9488" />
            </View>
            <View>
              <Text
                className={`text-xs font-black mb-1 ${
                  isDarkMode ? 'text-slate-50' : 'text-slate-900'
                }`}
              >
                100% Genuine & Fresh
              </Text>
              <Text className="text-[11px] font-semibold text-slate-500 leading-4">
                Directly sourced from verified merchants
              </Text>
            </View>
          </View>

          {/* Badge 3: Secure & Easy Payment */}
          <View
            style={{ width: '48.5%' }}
            className={`rounded-2xl border border-teal-200/80 p-3.5 justify-between shadow-sm ${
              isDarkMode ? 'bg-slate-900' : 'bg-white'
            }`}
          >
            <View className="w-10 h-10 rounded-xl bg-blue-100/70 justify-center items-center mb-2.5">
              <Ionicons name="card-outline" size={20} color="#2563EB" />
            </View>
            <View>
              <Text className="text-xs font-black text-blue-600 mb-1">
                Secure & Easy Payment
              </Text>
              <Text className="text-[11px] font-semibold text-slate-500 leading-4">
                bKash, Nagad, Cards & Cash on Delivery
              </Text>
            </View>
          </View>

          {/* Badge 4: 24/7 Dedicated Support */}
          <View
            style={{ width: '48.5%' }}
            className={`rounded-2xl border p-3.5 justify-between shadow-sm ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-200'
            }`}
          >
            <View className="w-10 h-10 rounded-xl bg-purple-100/70 justify-center items-center mb-2.5">
              <Ionicons name="headset-outline" size={20} color="#7C3AED" />
            </View>
            <View>
              <Text
                className={`text-xs font-black mb-1 ${
                  isDarkMode ? 'text-slate-50' : 'text-slate-900'
                }`}
              >
                24/7 Dedicated Support
              </Text>
              <Text className="text-[11px] font-semibold text-slate-500 leading-4">
                Instant support assistance anytime
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
