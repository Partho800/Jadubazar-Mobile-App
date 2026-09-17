import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Animated,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
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
import { useCategory, CATEGORY_COLORS } from '../../context/CategoryContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type CategoryKey = 'ecommerce' | 'grocery' | 'food' | 'pharmacy' | 'services';

// Heavy pages rendered once and kept alive in memory
const EcommercePageMemo  = React.memo(EcommercePage);
const GroceryPageMemo    = React.memo(GroceryPage);
const FoodPageMemo       = React.memo(FoodDeliveryPage);
const PharmacyPageMemo   = React.memo(PharmacyPage);
const ServicesPageMemo   = React.memo(ServicesPage);

export const HomeScreen: React.FC = () => {
  const { theme, isDarkMode } = useTheme();
  const { selectedProduct, closeProductDetails } = useProduct();
  const { selectedService, closeServiceDetails } = useService();
  const { activeCategory, setActiveCategory } = useCategory();

  const scrollViewRef = useRef<ScrollView>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Scroll direction detection for hiding/showing category bar
  const categoryBarAnim = useRef(new Animated.Value(1)).current;
  const lastScrollY = useRef(0);
  const isBarVisible = useRef(true);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentY = event.nativeEvent.contentOffset.y;
      const diff = currentY - lastScrollY.current;

      // Always show at top of page
      if (currentY <= 15) {
        if (!isBarVisible.current) {
          isBarVisible.current = true;
          Animated.timing(categoryBarAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
          }).start();
        }
      } else if (diff > 10 && currentY > 50) {
        // Scrolling DOWN -> Hide bar
        if (isBarVisible.current) {
          isBarVisible.current = false;
          Animated.timing(categoryBarAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }).start();
        }
      } else if (diff < -10) {
        // Scrolling UP -> Show bar
        if (!isBarVisible.current) {
          isBarVisible.current = true;
          Animated.timing(categoryBarAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
          }).start();
        }
      }

      lastScrollY.current = currentY;
    },
    [categoryBarAnim]
  );

  const handleCategoryChange = useCallback(
    (catId: string) => {
      if (catId === activeCategory && !selectedProduct && !selectedService) return;

      if (selectedProduct) closeProductDetails();
      if (selectedService) closeServiceDetails();

      // Instantly ensure bar is visible on category switch
      isBarVisible.current = true;
      categoryBarAnim.setValue(1);
      lastScrollY.current = 0;

      // 1. Instantly activate category tab pill (0ms response)
      setActiveCategory(catId);

      // 2. Show fast loading skeleton transition
      setIsTransitioning(true);
      fadeAnim.setValue(0.3);

      scrollViewRef.current?.scrollTo({ y: 0, animated: false });

      // 3. Ultra-fast 140ms loader transition
      setTimeout(() => {
        setIsTransitioning(false);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start();
      }, 140);
    },
    [activeCategory, selectedProduct, selectedService, fadeAnim, closeProductDetails, closeServiceDetails, setActiveCategory, categoryBarAnim]
  );

  useEffect(() => {
    if (selectedProduct || selectedService) {
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }
  }, [selectedProduct, selectedService]);

  const showDetailView = !!selectedProduct || !!selectedService;
  const isActive = (cat: CategoryKey) => activeCategory === cat && !showDetailView;
  const catColor = CATEGORY_COLORS[activeCategory] || '#2563EB';

  const categoryBarHeight = categoryBarAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 52],
  });

  const categoryBarOpacity = categoryBarAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.2, 1],
  });

  const categoryBarTranslateY = categoryBarAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-52, 0],
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <HeaderTopBar onMenuPress={() => {}} />

      <Animated.View
        style={{
          maxHeight: categoryBarHeight,
          opacity: categoryBarOpacity,
          transform: [{ translateY: categoryBarTranslateY }],
          overflow: 'hidden',
          zIndex: 9,
        }}
      >
        <HeaderCategoryBar
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      </Animated.View>

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >

        {/* Product / Service Detail View */}
        {selectedProduct && <ProductDetailView />}
        {selectedService && <ServiceDetailView />}

        {/* Category Page Container */}
        {!showDetailView && (
          <View style={{ flex: 1 }}>
            {/* Ultra Fast Sleek Loading Animation Skeleton */}
            {isTransitioning ? (
              <FastCategorySkeleton color={catColor} isDarkMode={isDarkMode} theme={theme} />
            ) : (
              <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
                {activeCategory === 'ecommerce' && (
                  <EcommercePageMemo onShopCollectionPress={() => {}} onExploreDealsPress={() => {}} />
                )}
                {activeCategory === 'grocery' && (
                  <GroceryPageMemo onShopNowPress={() => {}} onExploreDealsPress={() => {}} />
                )}
                {activeCategory === 'food' && <FoodPageMemo />}
                {activeCategory === 'pharmacy' && <PharmacyPageMemo />}
                {activeCategory === 'services' && <ServicesPageMemo />}
              </Animated.View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

// Premium, super fast Skeleton & Spinner component
const FastCategorySkeleton: React.FC<{ color: string; isDarkMode: boolean; theme: any }> = ({
  color,
  isDarkMode,
}) => {
  const cardBg = isDarkMode ? '#1E293B' : '#F1F5F9';

  return (
    <View style={styles.skeletonContainer}>
      {/* Top Banner Skeleton with Spinner */}
      <View style={[styles.skeletonBanner, { backgroundColor: cardBg }]}>
        <ActivityIndicator size="large" color={color} />
      </View>

      {/* Grid Items Skeleton */}
      <View style={styles.skeletonGrid}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <View
            key={i}
            style={[
              styles.skeletonCard,
              { backgroundColor: cardBg, borderColor: isDarkMode ? '#334155' : '#E2E8F0' },
            ]}
          >
            <View style={[styles.skeletonCircle, { backgroundColor: color + '22' }]} />
            <View style={[styles.skeletonLine, { backgroundColor: isDarkMode ? '#334155' : '#CBD5E1' }]} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  skeletonContainer: {
    padding: 16,
    gap: 16,
    flex: 1,
  },
  skeletonBanner: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skeletonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
    marginTop: 8,
  },
  skeletonCard: {
    width: (SCREEN_WIDTH - 44) / 3,
    height: 100,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    gap: 8,
  },
  skeletonCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  skeletonLine: {
    width: '70%',
    height: 10,
    borderRadius: 5,
  },
});
