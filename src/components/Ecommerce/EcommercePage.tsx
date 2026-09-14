import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

// Import sub-components from same Ecommerce folder
import { FeatureGrid } from './FeatureGrid';
import { FlashDeal } from './FlashDeal';
import { ShopByCategory } from './ShopByCategory';

interface EcommercePageProps {
  onShopCollectionPress?: () => void;
  onExploreDealsPress?: () => void;
}

export const EcommercePage: React.FC<EcommercePageProps> = ({
  onShopCollectionPress,
  onExploreDealsPress,
}) => {
  const { isDarkMode } = useTheme();

  return (
    <View style={styles.container}>
      {/* 1. Ecommerce Hero Banner */}
      <View style={styles.outerContainer}>
        <ImageBackground
          source={require('../../assets/images/hero-bg.jpg')}
          style={styles.backgroundImage}
          imageStyle={styles.backgroundImageStyle}
        >
          {/* Soft Contrast Overlay for Readability */}
          <View
            style={[
              styles.overlay,
              {
                backgroundColor: isDarkMode
                  ? 'rgba(9, 13, 22, 0.45)'
                  : 'rgba(255, 255, 255, 0.18)',
              },
            ]}
          >
            {/* New Collection Badge */}
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>NEW COLLECTION</Text>
            </View>

            {/* Main Headline */}
            <Text
              style={[
                styles.headlineText,
                { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
              ]}
            >
              Elevate Your Everyday
            </Text>
            <Text style={styles.headlineHighlight}>Accessories</Text>

            {/* Subtitle / Description */}
            <Text
              style={[
                styles.descriptionText,
                { color: isDarkMode ? '#FFFFFF' : '#000000' },
              ]}
            >
              Premium accessories designed for work, travel and lifestyle. Sourced
              with care, crafted for durability.
            </Text>

            {/* Action Buttons */}
            <View style={styles.buttonRow}>
              {/* Primary Button */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={onShopCollectionPress}
                style={styles.primaryButton}
              >
                <Text style={styles.primaryButtonText}>SHOP COLLECTION</Text>
                <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
              </TouchableOpacity>

              {/* Secondary Button */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={onExploreDealsPress}
                style={[
                  styles.secondaryButton,
                  {
                    backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                    borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.secondaryButtonText,
                    { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                  ]}
                >
                  EXPLORE DEALS
                </Text>
              </TouchableOpacity>
            </View>

            {/* Customer Review & Social Proof Section */}
            <View style={styles.socialProofRow}>
              <View style={styles.avatarWrapper}>
                <Image
                  source={require('../../assets/images/customer-avatars.jpg')}
                  style={styles.avatarImage}
                  resizeMode="cover"
                />
              </View>

              <View style={styles.ratingInfoContainer}>
                <Text
                  style={[
                    styles.customerCountText,
                    { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                  ]}
                >
                  25K+ Happy Customers
                </Text>
                <View style={styles.starsRow}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                      key={star}
                      name="star"
                      size={14}
                      color="#F59E0B"
                      style={{ marginRight: 2 }}
                    />
                  ))}
                  <Text
                    style={[
                      styles.reviewScoreText,
                      { color: isDarkMode ? '#CBD5E1' : '#334155' },
                    ]}
                  >
                    4.9/5 (2.5K Reviews)
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>

      {/* 2. Trust Badges & Feature Grid */}
      <FeatureGrid />

      {/* 3. Flash Deal Live Section */}
      <FlashDeal />

      {/* 4. Shop By Category 2x2 Grid Section */}
      <ShopByCategory />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  outerContainer: {
    borderRadius: 0,
    overflow: 'hidden',
    marginHorizontal: 0,
    marginTop: 0,
    marginBottom: 20,
  },
  backgroundImage: {
    width: '100%',
    minHeight: 460,
  },
  backgroundImageStyle: {
    borderRadius: 0,
  },
  overlay: {
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  badgeContainer: {
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    borderColor: 'rgba(37, 99, 235, 0.25)',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  badgeText: {
    color: '#2563EB',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  headlineText: {
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: -0.5,
    lineHeight: 34,
  },
  headlineHighlight: {
    fontSize: 32,
    fontWeight: '900',
    color: '#2563EB',
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    maxWidth: 340,
    marginBottom: 24,
    fontWeight: '700',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 10,
    marginBottom: 32,
  },
  primaryButton: {
    flex: 1,
    height: 48,
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    paddingHorizontal: 8,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
    gap: 6,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  secondaryButton: {
    flex: 1,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  secondaryButtonText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  socialProofRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  avatarWrapper: {
    width: 100,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  ratingInfoContainer: {
    justifyContent: 'center',
  },
  customerCountText: {
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 2,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewScoreText: {
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 4,
  },
});
