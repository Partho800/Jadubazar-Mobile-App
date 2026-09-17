import React, { useRef, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
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

type CategoryKey = 'ecommerce' | 'grocery' | 'food' | 'pharmacy' | 'services';

// Heavy pages rendered once and kept alive — instant display toggle (0ms)
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

  useEffect(() => {
    // Scroll to top on category switch
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

        {/* Category pages — pre-mounted, kept alive, 100% instant display toggle */}
        <View style={{ display: showDetailView ? 'none' : 'flex' }}>

          {/* Ecommerce */}
          <View style={{ display: isActive('ecommerce') ? 'flex' : 'none' }}>
            <EcommercePageMemo onShopCollectionPress={() => {}} onExploreDealsPress={() => {}} />
          </View>

          {/* Grocery */}
          <View style={{ display: isActive('grocery') ? 'flex' : 'none' }}>
            <GroceryPageMemo onShopNowPress={() => {}} onExploreDealsPress={() => {}} />
          </View>

          {/* Food */}
          <View style={{ display: isActive('food') ? 'flex' : 'none' }}>
            <FoodPageMemo />
          </View>

          {/* Pharmacy */}
          <View style={{ display: isActive('pharmacy') ? 'flex' : 'none' }}>
            <PharmacyPageMemo />
          </View>

          {/* Services */}
          <View style={{ display: isActive('services') ? 'flex' : 'none' }}>
            <ServicesPageMemo />
          </View>

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120,
  },
});
