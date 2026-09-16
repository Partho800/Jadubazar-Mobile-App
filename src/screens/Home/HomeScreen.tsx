import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { HeaderTopBar, HeaderCategoryBar } from '../../components/common/Header/Header';
import { EcommercePage } from '../../components/Ecommerce/EcommercePage';
import { GroceryPage } from '../../components/Grocery/GroceryPage';
import { FoodDeliveryPage } from '../../components/FoodDelivery/FoodDeliveryPage';
import { PharmacyPage } from '../../components/Pharmacy/PharmacyPage';
import { ServicesPage } from '../../components/Services/ServicesPage';
import { ComingSoonView } from '../../components/ComingSoon/ComingSoonView';
import { ProductDetailView } from '../../components/product/ProductDetailView';
import { ServiceDetailView } from '../../components/Services/ServiceDetailView';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useProduct } from '../../context/ProductContext';
import { useService } from '../../context/ServiceContext';
import { useCategory } from '../../context/CategoryContext';
import { Ionicons } from '@expo/vector-icons';

export const HomeScreen: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { selectedProduct, closeProductDetails } = useProduct();
  const { selectedService, closeServiceDetails } = useService();
  const { activeCategory, setActiveCategory } = useCategory();
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if ((selectedProduct || selectedService) && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: false });
    }
  }, [selectedProduct, selectedService]);

  const handleCategoryChange = (catId: string) => {
    closeProductDetails();
    closeServiceDetails();
    setActiveCategory(catId);
  };

  const getCategoryTitle = () => {
    switch (activeCategory) {
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
    switch (activeCategory) {
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
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Category Navigation Bar */}
        <HeaderCategoryBar
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Render Product Detail View or Service Detail View if active, else Category Page */}
        {selectedProduct ? (
          <ProductDetailView />
        ) : selectedService ? (
          <ServiceDetailView />
        ) : activeCategory === 'ecommerce' ? (
          <EcommercePage
            onShopCollectionPress={() => {
              // Action for Shop Collection
            }}
            onExploreDealsPress={() => {
              // Action for Explore Deals
            }}
          />
        ) : activeCategory === 'grocery' ? (
          <GroceryPage
            onShopNowPress={() => {
              // Action for Shop Now
            }}
            onExploreDealsPress={() => {
              // Action for Explore Deals
            }}
          />
        ) : activeCategory === 'food' ? (
          <FoodDeliveryPage />
        ) : activeCategory === 'pharmacy' ? (
          <PharmacyPage />
        ) : activeCategory === 'services' ? (
          <ServicesPage />
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
