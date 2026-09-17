import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useCategory, CATEGORY_COLORS } from '../../context/CategoryContext';
import { AppText as Text } from './AppText';

export const EmptyBagCard: React.FC = () => {
  const navigation = useNavigation<any>();
  const { isDarkMode } = useTheme();
  const { isBangla } = useLanguage();
  const { setActiveCategory } = useCategory();

  const categories = [
    {
      id: 'food',
      label: isBangla ? 'ফুড অর্ডার' : 'Order Food',
      color: CATEGORY_COLORS.food || '#FF6B00',
      iconName: 'fast-food' as const,
    },
    {
      id: 'grocery',
      label: isBangla ? 'গ্রোসারী' : 'Grocery',
      color: CATEGORY_COLORS.grocery || '#059669',
      iconName: 'cart' as const,
    },
    {
      id: 'pharmacy',
      label: isBangla ? 'ফার্মেসি' : 'Pharmacy',
      color: CATEGORY_COLORS.pharmacy || '#009689',
      iconName: 'medkit' as const,
    },
    {
      id: 'ecommerce',
      label: isBangla ? 'শপ (ই-কমার্স)' : 'Shop',
      color: CATEGORY_COLORS.ecommerce || '#2563EB',
      iconName: 'bag-handle' as const,
    },
    {
      id: 'services',
      label: isBangla ? 'সার্ভিসেস' : 'Services',
      color: CATEGORY_COLORS.services || '#432DD7',
      iconName: 'construct' as const,
    },
  ];

  const handleSelectCategory = (catId: string) => {
    setActiveCategory(catId);
    try {
      navigation.navigate('HomeTab');
    } catch (e) {
      try {
        navigation.navigate('Home');
      } catch (err) {
        console.log('Navigation error:', err);
      }
    }
  };

  return (
    <View
      className={`w-full p-4 sm:p-6 rounded-2xl sm:rounded-[32px] border items-center shadow-lg my-3 ${
        isDarkMode
          ? 'bg-slate-900 border-slate-800 shadow-slate-950/50'
          : 'bg-white border-slate-100 shadow-slate-200/60'
      }`}
    >
      {/* Centered Large Circular Bag Icon */}
      <View
        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full items-center justify-center mb-3 sm:mb-4 ${
          isDarkMode ? 'bg-slate-800/80' : 'bg-slate-100/80'
        }`}
      >
        <Ionicons
          name="bag-handle-outline"
          size={32}
          color={isDarkMode ? '#94A3B8' : '#64748B'}
        />
      </View>

      {/* Main Empty Title */}
      <Text
        className={`text-lg sm:text-2xl font-black text-center mb-1.5 tracking-tight ${
          isDarkMode ? 'text-slate-50' : 'text-slate-900'
        }`}
      >
        {isBangla ? 'আপনার ব্যাগ ফাঁকা' : 'Your bag is empty'}
      </Text>

      {/* Description Subtitle */}
      <Text
        className={`text-xs sm:text-sm font-medium text-center leading-relaxed max-w-md mb-4 sm:mb-6 ${
          isDarkMode ? 'text-slate-400' : 'text-slate-500'
        }`}
      >
        {isBangla
          ? 'কেনাকাটা শুরু করতে আমাদের দোকান থেকে গ্রোসারী, খাবার, ওষুধ অথবা সার্ভিস নির্বাচন করুন।'
          : 'Add groceries, restaurant meals, or medicines from our store to checkout.'}
      </Text>

      {/* Grid of 5 Category Buttons (2 per line on mobile, 5th centered) */}
      <View className="w-full flex-row flex-wrap justify-center gap-2 sm:gap-3 max-w-lg">
        {categories.map((cat, index) => {
          const isLastItem = index === categories.length - 1;
          return (
            <TouchableOpacity
              key={cat.id}
              activeOpacity={0.85}
              onPress={() => handleSelectCategory(cat.id)}
              style={{ backgroundColor: cat.color }}
              className={`flex-row items-center justify-center px-2.5 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl shadow-xs active:scale-95 transition-transform ${
                isLastItem ? 'w-[65%] sm:w-[48%]' : 'w-[47.5%] sm:w-[48%]'
              }`}
            >
              <Ionicons name={cat.iconName} size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
              <Text numberOfLines={1} className="text-white text-xs sm:text-sm font-extrabold tracking-wide">
                {cat.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
