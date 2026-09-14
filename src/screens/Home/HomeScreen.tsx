import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { HeaderTopBar, HeaderCategoryBar } from '../../components/common/Header/Header';
import { EcommercePage } from '../../components/Ecommerce/EcommercePage';
import { FeatureGrid } from '../../components/Ecommerce/FeatureGrid';
import { FlashDeal } from '../../components/Ecommerce/FlashDeal';
import { ShopByCategory } from '../../components/Ecommerce/ShopByCategory';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export const HomeScreen: React.FC = () => {
  const { theme, isDarkMode } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('ecommerce');

  const getCategoryTitle = () => {
    switch (selectedCategory) {
      case 'grocery':
        return 'Grocery Store';
      case 'food':
        return 'Food Delivery';
      case 'ecommerce':
      default:
        return 'E-Commerce Store';
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
          <>
            <View
              style={[
                styles.heroCard,
                {
                  backgroundColor: isDarkMode ? theme.card : '#F8FAFC',
                  borderColor: theme.cardBorder,
                },
              ]}
            >
              <View
                style={[
                  styles.iconCircle,
                  {
                    backgroundColor: theme.primaryLight,
                    borderColor: theme.primaryBorder,
                  },
                ]}
              >
                <Ionicons
                  name={
                    selectedCategory === 'grocery'
                      ? 'cart-outline'
                      : 'restaurant-outline'
                  }
                  size={36}
                  color={selectedCategory === 'food' ? '#F97316' : '#10B981'}
                />
              </View>

              <Text style={[styles.heroTitle, { color: theme.textPrimary }]}>
                {getCategoryTitle()}
              </Text>

              <Text style={[styles.heroDescription, { color: theme.textSecondary }]}>
                Welcome to Jadubazar {getCategoryTitle()}. Browse thousands of top quality products with instant online ordering.
              </Text>
            </View>
            <FeatureGrid />
            <FlashDeal />
            <ShopByCategory />
          </>
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
    paddingBottom: 32,
  },
  heroCard: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 20,
  },
  iconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroDescription: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    maxWidth: 300,
  },
});
