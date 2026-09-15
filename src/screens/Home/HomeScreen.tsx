import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { HeaderTopBar, HeaderCategoryBar } from '../../components/common/Header/Header';
import { EcommercePage } from '../../components/Ecommerce/EcommercePage';
import { ComingSoonView } from '../../components/ComingSoon/ComingSoonView';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { Ionicons } from '@expo/vector-icons';

export const HomeScreen: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('ecommerce');

  const getCategoryTitle = () => {
    switch (selectedCategory) {
      case 'grocery':
        return t('grocery');
      case 'food':
        return t('foodDelivery');
      case 'pharmacy':
        return t('pharmacy');
      case 'services':
        return t('services');
      case 'ecommerce':
      default:
        return t('ecommerce');
    }
  };

  const getCategoryIcon = (): keyof typeof Ionicons.glyphMap => {
    switch (selectedCategory) {
      case 'grocery':
        return 'cart-outline';
      case 'food':
        return 'restaurant-outline';
      case 'pharmacy':
        return 'medical-outline';
      case 'services':
        return 'construct-outline';
      default:
        return 'bag-handle-outline';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* 1. Sticky Top Bar (Logo, Language Switcher, Dark Mode, Menu) */}
      <HeaderTopBar
        onMenuPress={() => {
          // Action for side drawer / menu
        }}
      />

      {/* 2. Scrollable Page Body */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Category Navigation Bar (Scrolls away under sticky HeaderTopBar) */}
        <HeaderCategoryBar
          activeCategory={selectedCategory}
          onCategoryChange={(catId) => setSelectedCategory(catId)}
        />

        {/* E-Commerce Page View vs Other Categories */}
        {selectedCategory === 'ecommerce' ? (
          <EcommercePage
            onShopCollectionPress={() => {
              // Action for Shop Collection
            }}
            onExploreDealsPress={() => {
              // Action for Explore Deals
            }}
          />
        ) : (
          <ComingSoonView
            screenName={getCategoryTitle()}
            iconName={getCategoryIcon()}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
});
