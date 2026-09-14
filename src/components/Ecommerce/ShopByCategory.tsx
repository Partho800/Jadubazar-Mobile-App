import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

export interface CategoryCardItem {
  id: string;
  title: string;
  imageUrl: string;
}

const CATEGORY_CARDS: CategoryCardItem[] = [
  {
    id: '1',
    title: 'Fashion',
    imageUrl:
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '2',
    title: 'Electronics',
    imageUrl:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '3',
    title: 'Beauty',
    imageUrl:
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '4',
    title: 'Fitness',
    imageUrl:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
  },
];

export const ShopByCategory: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { width } = useWindowDimensions();

  const cardWidth = (width - 48) / 2;

  return (
    <View style={styles.outerContainer}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.headerTitleGroup}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
            ]}
          >
            SHOP BY CATEGORY
          </Text>
          <Text
            style={[
              styles.sectionSubtitle,
              { color: isDarkMode ? '#94A3B8' : '#64748B' },
            ]}
          >
            Find the best styles, premium tech, and home decoration items.
          </Text>
        </View>

        <TouchableOpacity activeOpacity={0.7} style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All{'\n'}Categories</Text>
          <Ionicons name="arrow-forward" size={16} color="#2563EB" />
        </TouchableOpacity>
      </View>

      {/* 2x2 Grid Category Cards */}
      <View style={styles.gridContainer}>
        {CATEGORY_CARDS.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            activeOpacity={0.9}
            style={[styles.cardWrapper, { width: cardWidth }]}
          >
            <ImageBackground
              source={{ uri: cat.imageUrl }}
              style={styles.cardImage}
              imageStyle={styles.cardImageStyle}
            >
              {/* Bottom Vignette Box */}
              <View style={styles.bottomVignetteBox}>
                <Text style={styles.categoryTitle}>{cat.title}</Text>
                <View style={styles.shopNowRow}>
                  <Text style={styles.shopNowText}>SHOP NOW</Text>
                  <Ionicons name="arrow-forward" size={14} color="#F97316" />
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    marginHorizontal: 16,
    marginBottom: 28,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitleGroup: {
    flex: 1,
    paddingRight: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingTop: 2,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2563EB',
    textAlign: 'right',
    lineHeight: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
  },
  cardWrapper: {
    height: 220,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  cardImageStyle: {
    borderRadius: 24,
  },
  bottomVignetteBox: {
    padding: 16,
    paddingTop: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.22)',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  categoryTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  shopNowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  shopNowText: {
    color: '#F97316',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
