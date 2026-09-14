import React from 'react';
import { StyleSheet, View, Text, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../context/ThemeContext';

export interface FeatureItem {
  id: string;
  title: string;
  subtitle: string;
  iconType: 'truck' | 'shield' | 'return' | 'support';
}

const FEATURES: FeatureItem[] = [
  {
    id: '1',
    title: 'FREE SHIPPING',
    subtitle: 'On orders over ৳2,000',
    iconType: 'truck',
  },
  {
    id: '2',
    title: 'SECURE PAYMENTS',
    subtitle: '100% secure checkout',
    iconType: 'shield',
  },
  {
    id: '3',
    title: 'EASY RETURNS',
    subtitle: '30-day return policy',
    iconType: 'return',
  },
  {
    id: '4',
    title: '24/7 SUPPORT',
    subtitle: 'Always here to help',
    iconType: 'support',
  },
];

export const FeatureGrid: React.FC = () => {
  const { isDarkMode, theme } = useTheme();
  const { width } = useWindowDimensions();

  const itemWidth = '48%';

  const renderIcon = (type: FeatureItem['iconType']) => {
    const iconColor = '#2563EB';

    switch (type) {
      case 'truck':
        return (
          <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <Path
              d="M1 3H15V16H1V3Z"
              stroke={iconColor}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <Path
              d="M15 8H19L23 12V16H15V8Z"
              stroke={iconColor}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <Path
              d="M5.5 19.5C6.88071 19.5 8 18.3807 8 17C8 15.6193 6.88071 14.5 5.5 14.5C4.11929 14.5 3 15.6193 3 17C3 18.3807 4.11929 19.5 5.5 19.5Z"
              stroke={iconColor}
              strokeWidth="2"
            />
            <Path
              d="M18.5 19.5C19.8807 19.5 21 18.3807 21 17C21 15.6193 19.8807 14.5 18.5 14.5C17.1193 14.5 16 15.6193 16 17C16 18.3807 17.1193 19.5 18.5 19.5Z"
              stroke={iconColor}
              strokeWidth="2"
            />
          </Svg>
        );
      case 'shield':
        return <Ionicons name="shield-checkmark-outline" size={22} color={iconColor} />;
      case 'return':
        return <Ionicons name="refresh-outline" size={22} color={iconColor} />;
      case 'support':
        return <Ionicons name="headset-outline" size={22} color={iconColor} />;
      default:
        return null;
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode ? theme.card : '#FFFFFF',
          borderColor: isDarkMode ? '#1E293B' : '#F1F5F9',
        },
      ]}
    >
      <View style={styles.gridRow}>
        {FEATURES.map((item) => (
          <View key={item.id} style={[styles.featureCard, { width: itemWidth }]}>
            <View
              style={[
                styles.iconCircle,
                {
                  backgroundColor: isDarkMode
                    ? 'rgba(37, 99, 235, 0.18)'
                    : '#EFF6FF',
                },
              ]}
            >
              {renderIcon(item.iconType)}
            </View>

            <View style={styles.textContainer}>
              <Text
                style={[
                  styles.titleText,
                  { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                ]}
              >
                {item.title}
              </Text>
              <Text
                style={[
                  styles.subtitleText,
                  { color: isDarkMode ? '#94A3B8' : '#64748B' },
                ]}
              >
                {item.subtitle}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 24,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  subtitleText: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
});
