import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { HeaderTopBar, HeaderCategoryBar } from '../../components/common/Header/Header';
import { EcommercePage } from '../../components/Ecommerce/EcommercePage';
import { GroceryPage } from '../../components/Grocery/GroceryPage';
import { FoodDeliveryPage } from '../../components/FoodDelivery/FoodDeliveryPage';
import { PharmacyPage } from '../../components/Pharmacy/PharmacyPage';
import { ServicesPage } from '../../components/Services/ServicesPage';
import { ProductDetailView } from '../../components/product/ProductDetailView';
import { ServiceDetailView } from '../../components/Services/ServiceDetailView';
import { useTheme } from '../../context/ThemeContext';
import { useProduct } from '../../context/ProductContext';
import { useService } from '../../context/ServiceContext';
import { useCategory } from '../../context/CategoryContext';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

type CategoryKey = 'ecommerce' | 'grocery' | 'food' | 'pharmacy' | 'services';

const CATEGORY_COLORS: Record<CategoryKey, string> = {
  ecommerce: '#2563EB',
  grocery:   '#16A34A',
  food:      '#EA580C',
  pharmacy:  '#0891B2',
  services:  '#7C3AED',
};

// Heavy pages rendered once and kept alive — never unmounted
const EcommercePageMemo  = React.memo(EcommercePage);
const GroceryPageMemo    = React.memo(GroceryPage);
const FoodPageMemo       = React.memo(FoodDeliveryPage);
const PharmacyPageMemo   = React.memo(PharmacyPage);
const ServicesPageMemo   = React.memo(ServicesPage);

export const HomeScreen: React.FC = () => {
  const { theme } = useTheme();
  const { selectedProduct, closeProductDetails } = useProduct();
  const { selectedService, closeServiceDetails } = useService();
  const { activeCategory, setActiveCategory } = useCategory();

  const scrollViewRef = useRef<ScrollView>(null);

  // Track which categories have been visited (lazy first-mount)
  const visitedRef = useRef<Set<CategoryKey>>(new Set([activeCategory as CategoryKey]));
  const [visited, setVisited] = useState<Set<CategoryKey>>(
    new Set([activeCategory as CategoryKey])
  );

  useEffect(() => {
    const cat = activeCategory as CategoryKey;
    if (!visitedRef.current.has(cat)) {
      visitedRef.current.add(cat);
      setVisited(new Set(visitedRef.current));
    }
    // Scroll to top on switch
    scrollViewRef.current?.scrollTo({ y: 0, animated: false });
  }, [activeCategory]);

  useEffect(() => {
    if (selectedProduct || selectedService) {
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }
  }, [selectedProduct, selectedService]);

  const handleCategoryChange = useCallback(
    (catId: string) => {
      if (catId === activeCategory && !selectedProduct && !selectedService) return;
      if (selectedProduct) closeProductDetails();
      if (selectedService) closeServiceDetails();
      setActiveCategory(catId);
    },
    [activeCategory, selectedProduct, selectedService]
  );

  const showDetailView = !!selectedProduct || !!selectedService;
  const activeCatColor = CATEGORY_COLORS[(activeCategory as CategoryKey)] || '#2563EB';

  const isActive = (cat: CategoryKey) => activeCategory === cat && !showDetailView;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <HeaderTopBar onMenuPress={() => {}} />

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
      >
        <HeaderCategoryBar
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Product / Service Detail */}
        {selectedProduct && <ProductDetailView />}
        {selectedService && <ServiceDetailView />}

        {/* Category pages — lazy-mount, keep alive, instant show/hide */}
        <View style={{ display: showDetailView ? 'none' : 'flex' }}>

          {/* Ecommerce */}
          <View style={{ display: isActive('ecommerce') ? 'flex' : 'none' }}>
            {!visited.has('ecommerce') ? (
              <SpinnerBox color={activeCatColor} bg={theme.background} />
            ) : (
              <EcommercePageMemo onShopCollectionPress={() => {}} onExploreDealsPress={() => {}} />
            )}
          </View>

          {/* Grocery */}
          <View style={{ display: isActive('grocery') ? 'flex' : 'none' }}>
            {!visited.has('grocery') ? (
              <SpinnerBox color={CATEGORY_COLORS.grocery} bg={theme.background} />
            ) : (
              <GroceryPageMemo onShopNowPress={() => {}} onExploreDealsPress={() => {}} />
            )}
          </View>

          {/* Food */}
          <View style={{ display: isActive('food') ? 'flex' : 'none' }}>
            {!visited.has('food') ? (
              <SpinnerBox color={CATEGORY_COLORS.food} bg={theme.background} />
            ) : (
              <FoodPageMemo />
            )}
          </View>

          {/* Pharmacy */}
          <View style={{ display: isActive('pharmacy') ? 'flex' : 'none' }}>
            {!visited.has('pharmacy') ? (
              <SpinnerBox color={CATEGORY_COLORS.pharmacy} bg={theme.background} />
            ) : (
              <PharmacyPageMemo />
            )}
          </View>

          {/* Services */}
          <View style={{ display: isActive('services') ? 'flex' : 'none' }}>
            {!visited.has('services') ? (
              <SpinnerBox color={CATEGORY_COLORS.services} bg={theme.background} />
            ) : (
              <ServicesPageMemo />
            )}
          </View>

        </View>
      </ScrollView>
    </View>
  );
};

// Full-screen spinner between header and bottom nav
const SpinnerBox: React.FC<{ color: string; bg: string }> = ({ color, bg }) => (
  <View style={[styles.spinnerBox, { backgroundColor: bg }]}>
    <ActivityIndicator size="large" color={color} />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  spinnerBox: {
    width: '100%',
    minHeight: SCREEN_HEIGHT - 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
