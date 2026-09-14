import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

export interface DealProduct {
  id: string;
  brand: string;
  name: string;
  discountBadge: string;
  originalPrice: string;
  salePrice: string;
  rating: number;
  image: any;
}

const PRODUCTS: DealProduct[] = [
  {
    id: 'p1',
    brand: 'APPLE',
    name: 'iPhone 15 Pro Max 256GB',
    discountBadge: '81% OFF',
    originalPrice: '৳155,000',
    salePrice: '৳125,000',
    rating: 5,
    image: require('../../assets/images/hero-bg.jpg'),
  },
  {
    id: 'p2',
    brand: 'SAMSUNG',
    name: 'Galaxy Watch 6 Classic',
    discountBadge: '45% OFF',
    originalPrice: '৳45,000',
    salePrice: '৳28,500',
    rating: 5,
    image: require('../../assets/images/hero-bg.jpg'),
  },
  {
    id: 'p3',
    brand: 'SONY',
    name: 'WH-1000XM5 Wireless Headphone',
    discountBadge: '30% OFF',
    originalPrice: '৳38,000',
    salePrice: '৳29,900',
    rating: 5,
    image: require('../../assets/images/hero-bg.jpg'),
  },
  {
    id: 'p4',
    brand: 'NATIVE',
    name: 'Leather Everyday Wallet',
    discountBadge: '25% OFF',
    originalPrice: '৳6,500',
    salePrice: '৳4,800',
    rating: 5,
    image: require('../../assets/images/hero-bg.jpg'),
  },
];

export const FlashDeal: React.FC = () => {
  const { isDarkMode } = useTheme();

  const [timeLeft, setTimeLeft] = useState({
    days: 48,
    hours: 5,
    minutes: 27,
    seconds: 13,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0)
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => (num < 10 ? `0${num}` : `${num}`);

  return (
    <View
      style={[
        styles.outerContainer,
        {
          backgroundColor: isDarkMode ? '#0F172A' : '#EFF6FF',
          borderColor: isDarkMode ? '#1E293B' : '#DBEAFE',
        },
      ]}
    >
      {/* Sleek Single-Row Header */}
      <View style={styles.headerRow}>
        <View style={styles.titleTimerGroup}>
          <View style={styles.flashIconCircle}>
            <Ionicons name="flash" size={16} color="#F59E0B" />
          </View>

          <Text style={styles.sectionTitle}>FLASH DEAL</Text>

          <View style={styles.timerCapsuleRow}>
            <View style={styles.timerBadge}>
              <Text style={styles.timerValue}>{timeLeft.days}</Text>
              <Text style={styles.timerUnit}>d</Text>
            </View>
            <Text style={styles.timerColon}>:</Text>

            <View style={styles.timerBadge}>
              <Text style={styles.timerValue}>
                {formatNumber(timeLeft.hours)}
              </Text>
              <Text style={styles.timerUnit}>h</Text>
            </View>
            <Text style={styles.timerColon}>:</Text>

            <View style={styles.timerBadge}>
              <Text style={styles.timerValue}>
                {formatNumber(timeLeft.minutes)}
              </Text>
              <Text style={styles.timerUnit}>m</Text>
            </View>
            <Text style={styles.timerColon}>:</Text>

            <View style={styles.timerBadge}>
              <Text style={styles.timerValue}>
                {formatNumber(timeLeft.seconds)}
              </Text>
              <Text style={styles.timerUnit}>s</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity activeOpacity={0.7} style={styles.viewAllPill}>
          <Text style={styles.viewAllText}>View All</Text>
          <Ionicons name="chevron-forward" size={14} color="#2563EB" />
        </TouchableOpacity>
      </View>

      {/* Horizontal Product Cards Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {PRODUCTS.map((prod) => (
          <TouchableOpacity
            key={prod.id}
            activeOpacity={0.9}
            style={[
              styles.productCard,
              {
                backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                borderColor: isDarkMode ? '#334155' : '#E2E8F0',
              },
            ]}
          >
            <View style={styles.discountBadge}>
              <Text style={styles.discountBadgeText}>{prod.discountBadge}</Text>
            </View>

            <View style={styles.imageContainer}>
              <Image
                source={prod.image}
                style={styles.productImage}
                resizeMode="cover"
              />
            </View>

            <View style={styles.productInfo}>
              <Text style={styles.brandText}>{prod.brand}</Text>
              <Text
                numberOfLines={2}
                style={[
                  styles.productName,
                  { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                ]}
              >
                {prod.name}
              </Text>

              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons
                    key={star}
                    name="star"
                    size={12}
                    color="#F59E0B"
                    style={{ marginRight: 1 }}
                  />
                ))}
              </View>

              <Text style={styles.originalPrice}>{prod.originalPrice}</Text>
              <Text
                style={[
                  styles.salePrice,
                  { color: isDarkMode ? '#38BDF8' : '#1D4ED8' },
                ]}
              >
                {prod.salePrice}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 8,
    flexWrap: 'wrap',
  },
  titleTimerGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
    flex: 1,
  },
  flashIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1D4ED8',
    letterSpacing: -0.3,
  },
  timerCapsuleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginLeft: 4,
  },
  timerBadge: {
    backgroundColor: '#2563EB',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 1,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  timerValue: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  timerUnit: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
  timerColon: {
    color: '#2563EB',
    fontSize: 12,
    fontWeight: '900',
    marginHorizontal: 1,
  },
  viewAllPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(37, 99, 235, 0.08)',
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#2563EB',
    marginRight: 2,
  },
  scrollContainer: {
    gap: 14,
    paddingRight: 4,
  },
  productCard: {
    width: 190,
    height: 270,
    borderRadius: 20,
    borderWidth: 1,
    padding: 12,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  discountBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#DC2626',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderBottomLeftRadius: 12,
    zIndex: 5,
  },
  discountBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  imageContainer: {
    width: '100%',
    height: 120,
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: 12,
    marginBottom: 8,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  brandText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
  productName: {
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 17,
    marginTop: 2,
  },
  starsRow: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  originalPrice: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  salePrice: {
    fontSize: 16,
    fontWeight: '900',
  },
});
