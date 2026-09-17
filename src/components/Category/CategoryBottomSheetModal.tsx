import React, { useState } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCategory, CATEGORY_COLORS } from '../../context/CategoryContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { AppText as Text } from '../common/AppText';

export interface SubCategoryItem {
  id: string;
  name: string;
  nameBN?: string;
  imageUrl?: string;
  badge?: string;
}

export interface MainCategoryConfig {
  id: string;
  labelKey: string;
  title: string;
  subtitle: string;
  color: string;
  subcategories: SubCategoryItem[];
}

export const MAIN_CATEGORIES_DATA: Record<string, MainCategoryConfig> = {
  food: {
    id: 'food',
    labelKey: 'foodDelivery',
    title: 'Food Delivery',
    subtitle: 'Delicious meals from top rated kitchens',
    color: '#FF6B00',
    subcategories: [
      {
        id: 'f1',
        name: 'Pre-Order Platters',
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'f2',
        name: 'Breakfast',
        imageUrl: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'f3',
        name: 'Evening Specials',
        imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'f4',
        name: 'Biriyani',
        imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'f5',
        name: 'Burger',
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'f6',
        name: 'Pizza',
        imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'f7',
        name: 'Chicken',
        imageUrl: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'f8',
        name: 'Chinese',
        imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'f9',
        name: 'Fast Food',
        imageUrl: 'https://images.unsplash.com/photo-1619881589283-7d7d2427a157?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'f10',
        name: 'Bakery & Sweets',
        imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'f11',
        name: 'Coffee',
        imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'f12',
        name: 'Desserts',
        imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'f13',
        name: 'Drinks',
        imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'f14',
        name: 'Bangladeshi',
        imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=300&q=80',
      },
    ],
  },
  grocery: {
    id: 'grocery',
    labelKey: 'grocery',
    title: 'Grocery',
    subtitle: 'Fresh daily essentials & groceries delivered fast',
    color: '#059669',
    subcategories: [
      {
        id: 'g1',
        name: 'Fresh Vegetables',
        imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'g2',
        name: 'Fresh Fruits',
        imageUrl: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'g3',
        name: 'Milk & Dairy',
        imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'g4',
        name: 'Cooking Oil & Ghee',
        imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'g5',
        name: 'Rice & Flour',
        imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'g6',
        name: 'Snacks & Biscuits',
        imageUrl: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'g7',
        name: 'Beverages & Juices',
        imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'g8',
        name: 'Fish & Meat',
        imageUrl: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'g9',
        name: 'Household & Cleaning',
        imageUrl: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'g10',
        name: 'Personal Care',
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'g11',
        name: 'Baby Care',
        imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'g12',
        name: 'Spices & Masala',
        imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=300&q=80',
      },
    ],
  },
  ecommerce: {
    id: 'ecommerce',
    labelKey: 'ecommerce',
    title: 'E-Commerce',
    subtitle: 'Trending products, fashion & smart gadgets',
    color: '#2563EB',
    subcategories: [
      {
        id: 'e1',
        name: 'Smart Electronics',
        imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'e2',
        name: "Men's Fashion",
        imageUrl: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'e3',
        name: "Women's Fashion",
        imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'e4',
        name: 'Home Appliances',
        imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'e5',
        name: 'Beauty & Care',
        imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'e6',
        name: 'Footwear & Shoes',
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'e7',
        name: 'Watches & Jewelry',
        imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'e8',
        name: 'Sports & Fitness',
        imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'e9',
        name: 'Toys & Gaming',
        imageUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'e10',
        name: 'Laptops & Computers',
        imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'e11',
        name: 'Bags & Luggage',
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'e12',
        name: 'Kitchenware',
        imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=300&q=80',
      },
    ],
  },
  pharmacy: {
    id: 'pharmacy',
    labelKey: 'pharmacy',
    title: 'Pharmacy',
    subtitle: 'Medicines & healthcare products delivered safely',
    color: '#009689',
    subcategories: [
      {
        id: 'p1',
        name: 'Prescription Medicine',
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'p2',
        name: 'OTC & First Aid',
        imageUrl: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'p3',
        name: 'Healthcare Devices',
        imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'p4',
        name: 'Personal Hygiene',
        imageUrl: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'p5',
        name: 'Baby & Mother Care',
        imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'p6',
        name: 'Vitamins & Supplements',
        imageUrl: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'p7',
        name: 'Wellness & Nutrition',
        imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'p8',
        name: 'Skin & Hair Care',
        imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'p9',
        name: 'Sexual Wellness',
        imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'p10',
        name: 'Diabetic Care',
        imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=300&q=80',
      },
    ],
  },
  services: {
    id: 'services',
    labelKey: 'services',
    title: 'Services',
    subtitle: 'Expert home services, repairs & cleaning',
    color: '#432DD7',
    subcategories: [
      {
        id: 's1',
        name: 'Electrical Wiring',
        imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 's2',
        name: 'Plumbing Services',
        imageUrl: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 's3',
        name: 'AC Repair & Servicing',
        imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 's4',
        name: 'Home Cleaning',
        imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 's5',
        name: 'Appliance Repair',
        imageUrl: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 's6',
        name: 'Home Painting',
        imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 's7',
        name: 'Pest Control',
        imageUrl: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 's8',
        name: 'Home Shifting',
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 's9',
        name: 'CCTV & Security',
        imageUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 's10',
        name: 'Car Repair & Wash',
        imageUrl: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=300&q=80',
      },
    ],
  },
};

const TOP_CATEGORIES_ORDER = ['food', 'grocery', 'ecommerce', 'pharmacy', 'services'];

interface CategoryBottomSheetModalProps {
  onSelectSubCategory?: (subCat: SubCategoryItem, mainCatId: string) => void;
}

export const CategoryBottomSheetModal: React.FC<CategoryBottomSheetModalProps> = ({
  onSelectSubCategory,
}) => {
  const navigation = useNavigation<any>();
  const {
    isCategorySheetOpen,
    closeCategorySheet,
    activeCategory,
    setActiveCategory,
    setActiveSubCategory,
  } = useCategory();
  const { isDarkMode } = useTheme();
  const { t, isBangla } = useLanguage();

  const [selectedCatKey, setSelectedCatKey] = useState<string>(activeCategory || 'food');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sync state when modal opens or active category changes
  React.useEffect(() => {
    if (isCategorySheetOpen) {
      setSelectedCatKey(activeCategory || 'food');
      setSearchQuery('');
    }
  }, [isCategorySheetOpen, activeCategory]);

  const currentCategoryData = MAIN_CATEGORIES_DATA[selectedCatKey] || MAIN_CATEGORIES_DATA.food;

  const handleCategoryTabPress = (catId: string) => {
    setSelectedCatKey(catId);
    setActiveCategory(catId);
    setSearchQuery('');
  };

  const handleBrowseAllCategoryProducts = () => {
    setActiveCategory(selectedCatKey);
    setActiveSubCategory(null);
    closeCategorySheet();
    try {
      navigation.navigate('CategoriesTab');
    } catch (e) {
      console.log('Navigation error:', e);
    }
  };

  const filteredSubcategories = currentCategoryData.subcategories.filter((sub) => {
    const nameToMatch = isBangla && sub.nameBN ? `${sub.name} ${sub.nameBN}` : sub.name;
    return nameToMatch.toLowerCase().includes(searchQuery.trim().toLowerCase());
  });

  const handleSubCatItemPress = (item: SubCategoryItem) => {
    setActiveCategory(selectedCatKey);
    setActiveSubCategory(item.name);
    if (onSelectSubCategory) {
      onSelectSubCategory(item, selectedCatKey);
    }
    closeCategorySheet();
    try {
      navigation.navigate('CategoriesTab');
    } catch (e) {
      console.log('Navigation error:', e);
    }
  };

  if (!isCategorySheetOpen) return null;

  return (
    <Modal
      visible={isCategorySheetOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={closeCategorySheet}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={closeCategorySheet}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View
              style={[
                styles.sheetContainer,
                { backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF', flex: 1 },
              ]}
            >
              {/* Top Handle / Drag Bar */}
              <View className="items-center py-1.5">
                <View
                  className={`w-11 h-1.5 rounded-full ${
                    isDarkMode ? 'bg-slate-700' : 'bg-slate-300'
                  }`}
                />
              </View>

              {/* Header: Title, Count Badge, Subtitle & Close Button */}
              <View className="flex-row items-start justify-between px-5 mt-1 mb-2">
                <View className="flex-1 mr-3">
                  <View className="flex-row items-center gap-2">
                    <Text
                      numberOfLines={1}
                      className={`text-lg font-black ${
                        isDarkMode ? 'text-slate-50' : 'text-slate-900'
                      }`}
                    >
                      {t(currentCategoryData.labelKey)} {isBangla ? 'ক্যাটাগরিসমূহ' : 'Categories'}
                    </Text>
                    <View
                      className={`px-2 py-0.5 rounded-full ${
                        isDarkMode ? 'bg-slate-800' : 'bg-slate-100'
                      }`}
                    >
                      <Text
                        className={`text-xs font-bold ${
                          isDarkMode ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        {currentCategoryData.subcategories.length}
                      </Text>
                    </View>
                  </View>
                  <Text
                    numberOfLines={1}
                    className={`text-xs font-medium mt-0.5 ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {isBangla ? 'আপনার পছন্দের বিভাগ থেকে কেনাকাটা করুন' : currentCategoryData.subtitle}
                  </Text>
                </View>

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={closeCategorySheet}
                  className={`w-8 h-8 rounded-full items-center justify-center ${
                    isDarkMode ? 'bg-slate-800' : 'bg-slate-100'
                  }`}
                >
                  <Ionicons
                    name="close"
                    size={20}
                    color={isDarkMode ? '#94A3B8' : '#475569'}
                  />
                </TouchableOpacity>
              </View>

              {/* Top 5 Category Horizontal Selector Pills (No Icons) */}
              <View className="mb-2">
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
                >
                  {TOP_CATEGORIES_ORDER.map((key) => {
                    const cat = MAIN_CATEGORIES_DATA[key];
                    if (!cat) return null;
                    const isSelected = selectedCatKey === key;
                    const activeColor = CATEGORY_COLORS[key] || cat.color;

                    return (
                      <TouchableOpacity
                        key={key}
                        activeOpacity={0.8}
                        onPress={() => handleCategoryTabPress(key)}
                        style={
                          isSelected
                            ? { backgroundColor: activeColor, borderColor: activeColor }
                            : undefined
                        }
                        className={`px-4 py-2 rounded-full border ${
                          isSelected
                            ? ''
                            : isDarkMode
                            ? 'bg-slate-800 border-slate-700'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        <Text
                          className={`text-xs font-extrabold ${
                            isSelected
                              ? 'text-white'
                              : isDarkMode
                              ? 'text-slate-200'
                              : 'text-slate-700'
                          }`}
                        >
                          {t(cat.labelKey)}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>

              {/* Search Bar Input */}
              <View className="px-5 mb-3">
                <View
                  className={`flex-row items-center px-3.5 h-11 rounded-2xl border ${
                    isDarkMode
                      ? 'bg-slate-800 border-slate-700'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <Ionicons
                    name="search-outline"
                    size={18}
                    color={isDarkMode ? '#64748B' : '#94A3B8'}
                    className="mr-2"
                  />
                  <TextInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder={isBangla ? `${t(currentCategoryData.labelKey)} ক্যাটাগরি খুঁজুন...` : `Search ${currentCategoryData.title} categories...`}
                    placeholderTextColor={isDarkMode ? '#64748B' : '#94A3B8'}
                    className={`flex-1 text-xs font-semibold ${
                      isDarkMode ? 'text-slate-100' : 'text-slate-900'
                    }`}
                  />
                  {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery('')}>
                      <Ionicons
                        name="close-circle"
                        size={18}
                        color={isDarkMode ? '#64748B' : '#94A3B8'}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              {/* Browse All Products Banner */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleBrowseAllCategoryProducts}
                style={{
                  backgroundColor: CATEGORY_COLORS[selectedCatKey] || '#2563EB',
                }}
                className="mx-5 mb-3 p-3.5 rounded-2xl flex-row items-center justify-between shadow-md"
              >
                <View className="flex-1 mr-2">
                  <Text className="text-white text-xs sm:text-sm font-black">
                    {isBangla ? `সমস্ত ${t(currentCategoryData.labelKey)} পণ্য দেখুন` : `Browse All ${currentCategoryData.title} Products`}
                  </Text>
                  <Text className="text-white/80 text-[11px] font-medium mt-0.5">
                    {isBangla ? 'ক্যাটালগ শপে সব প্রোডাক্ট দেখুন' : 'Explore full catalog with filters & deals'}
                  </Text>
                </View>
                <View className="w-8 h-8 rounded-full bg-white/20 items-center justify-center">
                  <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
                </View>
              </TouchableOpacity>

              {/* Sub-categories 3-Column Grid */}
              <ScrollView
                className="flex-1 px-5"
                contentContainerStyle={{ paddingBottom: 24 }}
                showsVerticalScrollIndicator={true}
              >
                {filteredSubcategories.length === 0 ? (
                  <View className="items-center justify-center py-10">
                    <Ionicons
                      name="search-outline"
                      size={36}
                      color={isDarkMode ? '#475569' : '#94A3B8'}
                    />
                    <Text
                      className={`text-xs font-semibold text-center mt-2 ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {isBangla ? `"${searchQuery}" মিলযুক্ত কোনো ক্যাটাগরি পাওয়া যায়নি` : `No categories found matching "${searchQuery}"`}
                    </Text>
                  </View>
                ) : (
                  <View className="flex-row flex-wrap gap-2.5 justify-between">
                    {filteredSubcategories.map((sub) => (
                      <TouchableOpacity
                        key={sub.id}
                        activeOpacity={0.8}
                        onPress={() => handleSubCatItemPress(sub)}
                        style={{ width: '31%' }}
                        className={`p-2 rounded-2xl border items-center shadow-xs ${
                          isDarkMode
                            ? 'bg-slate-800 border-slate-700'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        <View
                          className={`w-full aspect-square rounded-xl overflow-hidden mb-1.5 items-center justify-center ${
                            isDarkMode ? 'bg-slate-900' : 'bg-slate-50'
                          }`}
                        >
                          {sub.imageUrl ? (
                            <Image
                              source={{ uri: sub.imageUrl }}
                              className="w-full h-full"
                              resizeMode="cover"
                            />
                          ) : null}
                        </View>

                        <View className="w-full items-center justify-center px-0.5">
                          <Text
                            numberOfLines={2}
                            className={`text-[11px] font-bold text-center leading-tight ${
                              isDarkMode ? 'text-slate-200' : 'text-slate-800'
                            }`}
                          >
                            {isBangla && sub.nameBN ? sub.nameBN : sub.name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    maxHeight: screenHeight * 0.90,
    minHeight: screenHeight * 0.65,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 20,
    overflow: 'hidden',
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  handleBar: {
    width: 44,
    height: 5,
    borderRadius: 3,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 4,
    marginBottom: 12,
  },
  headerTextGroup: {
    flex: 1,
    marginRight: 12,
  },
  titleWithBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  countBadge: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  countBadgeText: {
    fontSize: 12,
    fontWeight: '800',
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  pillsScrollWrapper: {
    marginBottom: 12,
  },
  pillsScrollContainer: {
    paddingHorizontal: 16,
    gap: 10,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryPillText: {
    fontSize: 13,
    fontWeight: '700',
  },
  categoryPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
  searchSection: {
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 14,
    height: 44,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    paddingVertical: 0,
  },
  gridScrollView: {
    paddingHorizontal: 16,
  },
  gridContentContainer: {
    paddingBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 12,
  },
  subCatCard: {
    width: '30.5%',
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    padding: 0,
  },
  imageWrapper: {
    width: '100%',
    aspectRatio: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    overflow: 'hidden',
  },
  subCatImage: {
    width: '100%',
    height: '100%',
  },
  cardTextContainer: {
    width: '100%',
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 10,
    alignItems: 'flex-start',
  },
  subCatTitle: {
    fontSize: 11,
    fontWeight: '800',
    textAlign: 'left',
    lineHeight: 14,
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  emptyStateText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  browseAllBanner: {
    marginHorizontal: 16,
    marginBottom: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  browseAllTextGroup: {
    flex: 1,
    paddingRight: 10,
  },
  browseAllTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  browseAllSubtitle: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },
  browseAllArrowIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
