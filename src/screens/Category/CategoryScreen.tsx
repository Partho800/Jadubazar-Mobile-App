import React from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useCategory, CATEGORY_COLORS } from '../../context/CategoryContext';
import { MAIN_CATEGORIES_DATA } from '../../components/Category/CategoryBottomSheetModal';
import { Header } from '../../components/common/Header/Header';
import { AppText as Text } from '../../components/common/AppText';

export const CategoryScreen: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { activeCategory, setActiveCategory, activeCategoryColor, openCategorySheet } = useCategory();

  const currentCategoryData = MAIN_CATEGORIES_DATA[activeCategory] || MAIN_CATEGORIES_DATA.food;

  return (
    <View
      style={[
        styles.safeArea,
        { backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC' },
      ]}
    >
      <Header />
      {/* Top Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
            borderBottomColor: isDarkMode ? '#334155' : '#E2E8F0',
          },
        ]}
      >
        <View>
          <Text
            style={[
              styles.headerTitle,
              { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
            ]}
          >
            All Categories
          </Text>
          <Text
            style={[
              styles.headerSubtitle,
              { color: isDarkMode ? '#94A3B8' : '#64748B' },
            ]}
          >
            Explore & browse products by section
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={openCategorySheet}
          style={[styles.openSheetBtn, { backgroundColor: activeCategoryColor }]}
        >
          <Ionicons name="grid" size={16} color="#FFFFFF" />
          <Text style={styles.openSheetBtnText}>Browse Sheet</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner Card */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={openCategorySheet}
          style={[
            styles.bannerCard,
            { backgroundColor: activeCategoryColor },
          ]}
        >
          <View style={styles.bannerLeft}>
            <View style={styles.bannerBadge}>
              <Text style={styles.bannerBadgeText}>FEATURED</Text>
            </View>
            <Text style={styles.bannerTitle}>{currentCategoryData.title}</Text>
            <Text style={styles.bannerSub}>{currentCategoryData.subtitle}</Text>
            <View style={styles.bannerActionRow}>
              <Text style={styles.bannerActionText}>Open Category Drawer</Text>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            </View>
          </View>
          <Ionicons name="grid" size={64} color="rgba(255, 255, 255, 0.25)" />
        </TouchableOpacity>

        {/* Categories Section Grid */}
        <View style={styles.sectionHeader}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
            ]}
          >
            {currentCategoryData.title} Items ({currentCategoryData.subcategories.length})
          </Text>
          <TouchableOpacity onPress={openCategorySheet}>
            <Text style={[styles.viewAllText, { color: activeCategoryColor }]}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.gridContainer}>
          {currentCategoryData.subcategories.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={openCategorySheet}
              style={[
                styles.gridCard,
                {
                  backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                  borderColor: isDarkMode ? '#334155' : '#F1F5F9',
                },
              ]}
            >
              <View style={styles.imageBox}>
                {item.imageUrl ? (
                  <Image source={{ uri: item.imageUrl }} style={styles.image} />
                ) : (
                  <Ionicons
                    name="grid-outline"
                    size={26}
                    color={activeCategoryColor}
                  />
                )}
              </View>
              <Text
                numberOfLines={2}
                style={[
                  styles.cardTitle,
                  { color: isDarkMode ? '#F1F5F9' : '#1E293B' },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  openSheetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  openSheetBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  bannerCard: {
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  bannerLeft: {
    flex: 1,
    marginRight: 10,
  },
  bannerBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  bannerBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
  },
  bannerSub: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
    marginBottom: 12,
  },
  bannerActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  bannerActionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '800',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridCard: {
    width: '30.5%',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  imageBox: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 14,
  },
});
