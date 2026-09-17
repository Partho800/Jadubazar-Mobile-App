import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useCategory, CATEGORY_COLORS } from '../../context/CategoryContext';
import { Header } from '../../components/common/Header/Header';
import { cartStore } from '../../store/cartStore';
import { useProduct } from '../../context/ProductContext';
import { useService } from '../../context/ServiceContext';
import { ProductDetailView } from '../../components/product/ProductDetailView';
import { ServiceDetailView } from '../../components/Services/ServiceDetailView';
import { AppText as Text } from '../../components/common/AppText';

export interface SearchProductItem {
  id: string;
  name: string;
  categoryKey: 'food' | 'grocery' | 'ecommerce' | 'pharmacy' | 'services';
  categoryLabel: string;
  price: number;
  priceFormatted: string;
  oldPriceFormatted?: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  brand?: string;
  description: string;
}

const SEARCH_DATABASE: SearchProductItem[] = [
  // FOOD
  {
    id: 'search-f1',
    name: 'Kacchi Biryani Platter',
    categoryKey: 'food',
    categoryLabel: 'FOOD',
    price: 350,
    priceFormatted: '৳350',
    oldPriceFormatted: '৳420',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80',
    rating: 4.9,
    reviews: 240,
    brand: 'Sultans Dine',
    description: 'Authentic Basmati Mutton Kacchi Biryani with Aloo and Salad.',
  },
  {
    id: 'search-f2',
    name: 'Gourmet Cheese Burger',
    categoryKey: 'food',
    categoryLabel: 'FOOD',
    price: 220,
    priceFormatted: '৳220',
    oldPriceFormatted: '৳260',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
    rating: 4.8,
    reviews: 180,
    brand: 'Takeout',
    description: 'Juicy double beef patty with melted cheddar cheese and special sauce.',
  },
  {
    id: 'search-f3',
    name: 'Italian Pepperoni Pizza 12"',
    categoryKey: 'food',
    categoryLabel: 'FOOD',
    price: 650,
    priceFormatted: '৳650',
    oldPriceFormatted: '৳750',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
    rating: 4.7,
    reviews: 310,
    brand: 'Pizza Guy',
    description: 'Freshly baked thin crust pizza topped with beef pepperoni and mozzarella.',
  },
  {
    id: 'search-f4',
    name: 'Crispy Fried Chicken Combo',
    categoryKey: 'food',
    categoryLabel: 'FOOD',
    price: 290,
    priceFormatted: '৳290',
    oldPriceFormatted: '৳340',
    imageUrl: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=400&q=80',
    rating: 4.8,
    reviews: 145,
    brand: 'KFC',
    description: '2 pcs crispy fried chicken with french fries and soft drink.',
  },

  // GROCERY
  {
    id: 'search-g1',
    name: 'Fresh Organic Vegetables Pack (1kg)',
    categoryKey: 'grocery',
    categoryLabel: 'GROCERY',
    price: 120,
    priceFormatted: '৳120',
    oldPriceFormatted: '৳150',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80',
    rating: 4.9,
    reviews: 520,
    brand: 'Jadubazar Farm',
    description: 'Farm fresh broccoli, carrots, tomatoes and green spinach.',
  },
  {
    id: 'search-g2',
    name: 'Fresh Red Apples (1kg)',
    categoryKey: 'grocery',
    categoryLabel: 'GROCERY',
    price: 240,
    priceFormatted: '৳240',
    oldPriceFormatted: '৳280',
    imageUrl: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=400&q=80',
    rating: 4.8,
    reviews: 380,
    brand: 'Fresh Imports',
    description: 'Sweet, crisp and juicy red Fuji apples imported fresh daily.',
  },
  {
    id: 'search-g3',
    name: 'Pure Cow Milk (1 Liter)',
    categoryKey: 'grocery',
    categoryLabel: 'GROCERY',
    price: 90,
    priceFormatted: '৳90',
    oldPriceFormatted: '৳100',
    imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80',
    rating: 4.9,
    reviews: 890,
    brand: 'Aarong Dairy',
    description: 'Pasteurized 100% pure liquid cow milk rich in calcium.',
  },
  {
    id: 'search-g4',
    name: 'Fortune Sunflower Oil (5L)',
    categoryKey: 'grocery',
    categoryLabel: 'GROCERY',
    price: 780,
    priceFormatted: '৳780',
    oldPriceFormatted: '৳850',
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80',
    rating: 4.9,
    reviews: 410,
    brand: 'Fortune',
    description: 'Healthy refined sunflower cooking oil for daily family meals.',
  },

  // E-COMMERCE
  {
    id: 'search-e1',
    name: 'iPhone 14 Pro Max 256GB',
    categoryKey: 'ecommerce',
    categoryLabel: 'ECOMMERCE',
    price: 145000,
    priceFormatted: '৳1,45,000',
    oldPriceFormatted: '৳1,55,000',
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=400&q=80',
    rating: 4.9,
    reviews: 620,
    brand: 'Apple',
    description: 'Dynamic Island, Always-On Super Retina display, 48MP Camera system.',
  },
  {
    id: 'search-e2',
    name: 'Wireless Noise Cancelling Headphones',
    categoryKey: 'ecommerce',
    categoryLabel: 'ECOMMERCE',
    price: 4500,
    priceFormatted: '৳4,500',
    oldPriceFormatted: '৳5,200',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
    rating: 4.8,
    reviews: 290,
    brand: 'Sony',
    description: 'Deep bass, active noise cancellation with 30-hour battery life.',
  },
  {
    id: 'search-e3',
    name: 'Men Casual Cotton Slim Shirt',
    categoryKey: 'ecommerce',
    categoryLabel: 'ECOMMERCE',
    price: 1290,
    priceFormatted: '৳1,290',
    oldPriceFormatted: '৳1,690',
    imageUrl: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=400&q=80',
    rating: 4.7,
    reviews: 175,
    brand: 'Ecstasy',
    description: '100% breathable premium cotton shirt for work and casual wear.',
  },

  // PHARMACY
  {
    id: 'search-p1',
    name: 'Paracetamol 500mg (100 Tablets)',
    categoryKey: 'pharmacy',
    categoryLabel: 'PHARMACY',
    price: 120,
    priceFormatted: '৳120',
    oldPriceFormatted: '৳140',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
    rating: 4.9,
    reviews: 740,
    brand: 'Square Pharma',
    description: 'Fast acting fever and pain relief tablets.',
  },
  {
    id: 'search-p2',
    name: 'Digital Blood Pressure Monitor',
    categoryKey: 'pharmacy',
    categoryLabel: 'PHARMACY',
    price: 2450,
    priceFormatted: '৳2,450',
    oldPriceFormatted: '৳2,800',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=400&q=80',
    rating: 4.8,
    reviews: 210,
    brand: 'Omron',
    description: 'Accurate automatic arm blood pressure & pulse monitor.',
  },

  // SERVICES
  {
    id: 'search-s1',
    name: 'Electrical Wiring Repair Service',
    categoryKey: 'services',
    categoryLabel: 'SERVICES',
    price: 850,
    priceFormatted: '৳850',
    oldPriceFormatted: '৳1,000',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80',
    rating: 4.9,
    reviews: 320,
    brand: 'Expert Technician',
    description: 'Certified electrician for short circuit fixing, wiring, and DB box repair.',
  },
  {
    id: 'search-s2',
    name: 'Split AC Cleaning & Servicing',
    categoryKey: 'services',
    categoryLabel: 'SERVICES',
    price: 1200,
    priceFormatted: '৳1,200',
    oldPriceFormatted: '৳1,500',
    imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=400&q=80',
    rating: 4.9,
    reviews: 450,
    brand: 'Cool Care',
    description: 'Jet wash cleaning, gas checkup, and cooling efficiency optimization.',
  },
];

const POPULAR_SEARCH_TAGS = [
  'Biryani',
  'Fresh Vegetables',
  'iPhone 14',
  'Paracetamol',
  'AC Servicing',
  'Burger',
  'Milk',
  'Headphones',
  'Pizza',
  'Electrical Wiring',
];

export const SearchScreen: React.FC = () => {
  const { theme, isDarkMode } = useTheme();
  const { t, isBangla } = useLanguage();
  const { activeCategory } = useCategory();
  const { selectedProduct, openProductDetails, closeProductDetails } = useProduct();
  const { selectedService, openServiceDetails, closeServiceDetails } = useService();

  const [query, setQuery] = useState<string>('');
  const [addedItemId, setAddedItemId] = useState<string | null>(null);

  const handleSelectTag = (tag: string) => {
    setQuery(tag);
  };

  const handleAddToCart = (item: SearchProductItem) => {
    cartStore.addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.imageUrl,
    });
    setAddedItemId(item.id);
    Alert.alert(
      isBangla ? 'কার্টে যোগ করা হয়েছে' : 'Added to Cart',
      isBangla ? `"${item.name}" আপনার কার্টে যোগ করা হয়েছে।` : `"${item.name}" added to your cart.`
    );
    setTimeout(() => {
      setAddedItemId(null);
    }, 2000);
  };

  const handleOpenItem = (item: SearchProductItem) => {
    if (item.categoryKey === 'services') {
      openServiceDetails({
        id: item.id,
        title: item.name,
        price: item.price,
        rating: item.rating,
        reviewsCount: item.reviews,
        imageUrl: item.imageUrl,
        description: item.description,
      });
    } else {
      openProductDetails({
        id: item.id,
        title: item.name,
        brand: item.brand,
        category: item.categoryLabel,
        price: item.priceFormatted,
        oldPrice: item.oldPriceFormatted,
        rating: item.rating,
        reviewsCount: item.reviews,
        imageUrl: item.imageUrl,
        description: item.description,
      });
    }
  };

  const filteredItems = SEARCH_DATABASE.filter((item) => {
    if (!query.trim()) return false;
    const q = query.trim().toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.categoryLabel.toLowerCase().includes(q) ||
      (item.brand && item.brand.toLowerCase().includes(q)) ||
      item.description.toLowerCase().includes(q)
    );
  });

  if (selectedProduct) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Header />
        <View style={{ flex: 1 }}>
          <ProductDetailView />
        </View>
      </View>
    );
  }

  if (selectedService) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Header />
        <View style={{ flex: 1 }}>
          <ServiceDetailView />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* 1. Global Header Bar */}
      <Header />

      {/* 2. Main Body Container */}
      <View style={styles.bodyContainer}>
        {/* Search Input Box */}
        <View
          style={[
            styles.searchBar,
            {
              backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
              borderColor: isDarkMode ? '#334155' : '#E2E8F0',
            },
          ]}
        >
          <Ionicons
            name="search-outline"
            size={20}
            color={isDarkMode ? '#64748B' : '#94A3B8'}
            style={{ marginRight: 10 }}
          />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={t('searchPlaceholder')}
            placeholderTextColor={isDarkMode ? '#64748B' : '#94A3B8'}
            style={[
              styles.searchInput,
              { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
            ]}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons
                name="close-circle"
                size={20}
                color={isDarkMode ? '#64748B' : '#94A3B8'}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Dynamic Content Area */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* EMPTY QUERY STATE: Show Popular Searches */}
          {!query.trim() && (
            <View style={styles.emptyQuerySection}>
              <View style={styles.popularHeader}>
                <Ionicons
                  name="flame"
                  size={18}
                  color="#FF6B00"
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={[
                    styles.popularTitle,
                    { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                  ]}
                >
                  {t('popularSearchesTitle')}
                </Text>
              </View>

              <View style={styles.tagsContainer}>
                {POPULAR_SEARCH_TAGS.map((tag, idx) => (
                  <TouchableOpacity
                    key={idx}
                    activeOpacity={0.8}
                    onPress={() => handleSelectTag(tag)}
                    style={[
                      styles.tagPill,
                      {
                        backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9',
                        borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                      },
                    ]}
                  >
                    <Ionicons
                      name="search-outline"
                      size={13}
                      color={isDarkMode ? '#94A3B8' : '#64748B'}
                      style={{ marginRight: 4 }}
                    />
                    <Text
                      style={[
                        styles.tagText,
                        { color: isDarkMode ? '#E2E8F0' : '#334155' },
                      ]}
                    >
                      {tag}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.promptState}>
                <Ionicons
                  name="search-outline"
                  size={54}
                  color={isDarkMode ? '#334155' : '#CBD5E1'}
                />
                <Text
                  style={[
                    styles.promptText,
                    { color: isDarkMode ? '#94A3B8' : '#64748B' },
                  ]}
                >
                  {t('searchPromptText')}
                </Text>
              </View>
            </View>
          )}

          {/* NO MATCHES STATE */}
          {query.trim().length > 0 && filteredItems.length === 0 && (
            <View style={styles.noResultsState}>
              <Ionicons
                name="alert-circle-outline"
                size={48}
                color={isDarkMode ? '#475569' : '#94A3B8'}
              />
              <Text
                style={[
                  styles.noResultsTitle,
                  { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                ]}
              >
                {t('noProductsFound')}
              </Text>
              <Text
                style={[
                  styles.noResultsSub,
                  { color: isDarkMode ? '#94A3B8' : '#64748B' },
                ]}
              >
                {t('noProductsSub')}
              </Text>
            </View>
          )}

          {/* SEARCH RESULTS LIST FEED */}
          {query.trim().length > 0 && filteredItems.length > 0 && (
            <View style={styles.resultsFeed}>
              <Text
                style={[
                  styles.resultsHeaderCount,
                  { color: isDarkMode ? '#94A3B8' : '#64748B' },
                ]}
              >
                {isBangla ? (
                  <>
                    "{query}" এর জন্য মোট{' '}
                    <Text style={{ fontWeight: '900', color: isDarkMode ? '#F8FAFC' : '#0F172A' }}>
                      {filteredItems.length}
                    </Text>{' '}
                    টি ফলাফল পাওয়া গেছে
                  </>
                ) : (
                  <>
                    Found{' '}
                    <Text style={{ fontWeight: '900', color: isDarkMode ? '#F8FAFC' : '#0F172A' }}>
                      {filteredItems.length}
                    </Text>{' '}
                    results for "{query}"
                  </>
                )}
              </Text>

              {filteredItems.map((item) => {
                const catColor = CATEGORY_COLORS[item.categoryKey] || '#2563EB';

                return (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.88}
                    onPress={() => handleOpenItem(item)}
                    style={[
                      styles.resultCard,
                      {
                        backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                        borderColor: isDarkMode ? '#334155' : '#F1F5F9',
                      },
                    ]}
                  >
                    {/* Thumbnail Image */}
                    <View style={styles.cardImageWrapper}>
                      <Image
                        source={{ uri: item.imageUrl }}
                        style={styles.cardImage}
                        resizeMode="cover"
                      />
                    </View>

                    {/* Card Content Details */}
                    <View style={styles.cardContent}>
                      <View style={styles.cardMetaRow}>
                        <View
                          style={[
                            styles.categoryBadge,
                            { backgroundColor: `${catColor}15`, borderColor: `${catColor}30` },
                          ]}
                        >
                          <Text style={[styles.categoryBadgeText, { color: catColor }]}>
                            {item.categoryLabel}
                          </Text>
                        </View>

                        <View style={styles.ratingRow}>
                          <Ionicons name="star" size={13} color="#F59E0B" />
                          <Text
                            style={[
                              styles.ratingText,
                              { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                            ]}
                          >
                            {item.rating} ({item.reviews})
                          </Text>
                        </View>
                      </View>

                      <Text
                        numberOfLines={1}
                        style={[
                          styles.cardTitle,
                          { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                        ]}
                      >
                        {item.name}
                      </Text>

                      <Text
                        numberOfLines={1}
                        style={[
                          styles.cardDesc,
                          { color: isDarkMode ? '#94A3B8' : '#64748B' },
                        ]}
                      >
                        {item.description}
                      </Text>

                      <View style={styles.cardPriceRow}>
                        <View style={styles.priceGroup}>
                          <Text style={[styles.priceText, { color: catColor }]}>
                            {item.priceFormatted}
                          </Text>
                          {item.oldPriceFormatted && (
                            <Text style={styles.oldPriceText}>
                              {item.oldPriceFormatted}
                            </Text>
                          )}
                        </View>

                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => handleAddToCart(item)}
                          style={[
                            styles.addBtn,
                            { backgroundColor: addedItemId === item.id ? '#10B981' : catColor },
                          ]}
                        >
                          <Ionicons
                            name={addedItemId === item.id ? 'checkmark' : 'cart-outline'}
                            size={14}
                            color="#FFFFFF"
                          />
                          <Text style={styles.addBtnText}>
                            {addedItemId === item.id ? 'ADDED' : 'ADD'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
    paddingTop: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    paddingVertical: 0,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  emptyQuerySection: {
    paddingTop: 10,
  },
  popularHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  popularTitle: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 36,
  },
  tagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 16,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '700',
  },
  promptState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 12,
  },
  promptText: {
    fontSize: 14,
    fontWeight: '600',
  },
  noResultsState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    gap: 10,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: '900',
  },
  noResultsSub: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 18,
  },
  resultsFeed: {
    paddingTop: 4,
  },
  resultsHeaderCount: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 14,
  },
  resultCard: {
    flexDirection: 'row',
    borderRadius: 18,
    borderWidth: 1,
    padding: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  cardImageWrapper: {
    width: 90,
    height: 90,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#F1F5F9',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardContent: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  cardMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
  },
  categoryBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '700',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: -0.2,
  },
  cardDesc: {
    fontSize: 11,
    fontWeight: '500',
  },
  cardPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  priceGroup: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  priceText: {
    fontSize: 15,
    fontWeight: '900',
  },
  oldPriceText: {
    fontSize: 11,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
    fontWeight: '600',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  addBtnText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
  },
});
