import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { HeaderLogo } from './HeaderLogo';
import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';
import { fonts } from '../../../theme/theme';
import { AppText as Text } from '../AppText';

export interface CategoryItem {
  id: string;
  labelKey: string;
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
}

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'ecommerce',
    labelKey: 'ecommerce',
    iconName: 'bag-handle-outline',
    iconColor: '#FFFFFF',
  },
  {
    id: 'grocery',
    labelKey: 'grocery',
    iconName: 'cart-outline',
    iconColor: '#10B981',
  },
  {
    id: 'food',
    labelKey: 'foodDelivery',
    iconName: 'restaurant-outline',
    iconColor: '#F97316',
  },
  {
    id: 'pharmacy',
    labelKey: 'pharmacy',
    iconName: 'medical-outline',
    iconColor: '#EF4444',
  },
  {
    id: 'services',
    labelKey: 'services',
    iconName: 'construct-outline',
    iconColor: '#8B5CF6',
  },
];

interface HeaderTopBarProps {
  onMenuPress?: () => void;
}

export const HeaderTopBar: React.FC<HeaderTopBarProps> = ({ onMenuPress }) => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  return (
    <SafeAreaView
      edges={['top']}
      style={[
        styles.stickySafeArea,
        { backgroundColor: isDarkMode ? theme.card : '#FFFFFF' },
      ]}
    >
      <View style={[styles.topRow, { backgroundColor: isDarkMode ? theme.card : '#FFFFFF' }]}>
        <HeaderLogo />

        <View style={styles.rightActions}>
          <View
            style={[
              styles.langContainer,
              {
                backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9',
                borderColor: isDarkMode ? '#334155' : '#E2E8F0',
              },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setLanguage('EN')}
              style={[
                styles.langOption,
                language === 'EN' && styles.langActivePill,
              ]}
            >
              <Text
                style={[
                  styles.langText,
                  language === 'EN'
                    ? styles.langActiveText
                    : { color: isDarkMode ? '#94A3B8' : '#475569' },
                ]}
              >
                EN
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setLanguage('BN')}
              style={[
                styles.langOption,
                language === 'BN' && styles.langActivePill,
              ]}
            >
              <Text
                style={[
                  styles.langText,
                  { fontFamily: fonts.banglaBold },
                  language === 'BN'
                    ? styles.langActiveText
                    : { color: isDarkMode ? '#94A3B8' : '#475569' },
                ]}
              >
                বাং
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={toggleTheme}
            style={styles.iconButton}
            accessibilityLabel="Toggle Dark Mode"
          >
            <Ionicons
              name={isDarkMode ? 'moon' : 'moon-outline'}
              size={22}
              color={isDarkMode ? '#F8FAFC' : '#1E293B'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onMenuPress}
            style={styles.iconButton}
            accessibilityLabel="Open Menu"
          >
            <Ionicons
              name="menu-outline"
              size={24}
              color={isDarkMode ? '#F8FAFC' : '#1E293B'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[
          styles.divider,
          { backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9' },
        ]}
      />
    </SafeAreaView>
  );
};

interface HeaderCategoryBarProps {
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export const HeaderCategoryBar: React.FC<HeaderCategoryBarProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  const { isDarkMode, theme } = useTheme();
  const { t } = useLanguage();

  return (
    <View style={[styles.categoryBarContainer, { backgroundColor: isDarkMode ? theme.card : '#FFFFFF' }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScrollContainer}
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;

          return (
            <TouchableOpacity
              key={cat.id}
              activeOpacity={0.8}
              onPress={() => onCategoryChange(cat.id)}
              style={[
                styles.categoryPill,
                isActive
                  ? styles.activeCategoryPill
                  : [
                      styles.inactiveCategoryPill,
                      {
                        backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF',
                        borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                      },
                    ],
              ]}
            >
              <Ionicons
                name={cat.iconName}
                size={18}
                color={
                  isActive
                    ? '#FFFFFF'
                    : cat.iconColor || (isDarkMode ? '#F8FAFC' : '#1E293B')
                }
                style={styles.categoryIcon}
              />
              <Text
                style={[
                  styles.categoryText,
                  isActive
                    ? styles.activeCategoryText
                    : { color: isDarkMode ? '#F8FAFC' : '#1E293B' },
                ]}
              >
                {t(cat.labelKey)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View
        style={[
          styles.divider,
          { backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9' },
        ]}
      />
    </View>
  );
};

interface HeaderProps {
  onMenuPress?: () => void;
  onCategoryChange?: (categoryId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuPress, onCategoryChange }) => {
  const [activeCategory, setActiveCategory] = useState<string>('ecommerce');

  const handleCategoryPress = (id: string) => {
    setActiveCategory(id);
    if (onCategoryChange) {
      onCategoryChange(id);
    }
  };

  return (
    <View>
      <HeaderTopBar onMenuPress={onMenuPress} />
      <HeaderCategoryBar
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  stickySafeArea: {
    zIndex: 10,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  langContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    padding: 2,
  },
  langOption: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  langActivePill: {
    backgroundColor: '#2563EB',
  },
  langText: {
    fontSize: 13,
    fontWeight: '700',
  },
  langActiveText: {
    color: '#FFFFFF',
  },
  iconButton: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    width: '100%',
  },
  categoryBarContainer: {
    paddingVertical: 10,
  },
  categoryScrollContainer: {
    paddingHorizontal: 16,
    gap: 10,
    alignItems: 'center',
    paddingBottom: 8,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 22,
  },
  activeCategoryPill: {
    backgroundColor: '#2563EB',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  inactiveCategoryPill: {
    borderWidth: 1,
  },
  categoryIcon: {
    marginRight: 6,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '700',
  },
  activeCategoryText: {
    color: '#FFFFFF',
  },
});
