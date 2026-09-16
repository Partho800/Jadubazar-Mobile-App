import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform, Animated } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useCategory } from '../context/CategoryContext';
import { AppText as Text } from '../components/common/AppText';
import { cartStore } from '../store/cartStore';

export const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const { activeCategoryColor, isCategorySheetOpen, openCategorySheet } = useCategory();
  const [cartCount, setCartCount] = useState(cartStore.getTotalCount());

  // Animation values for Pop / Hop bounce when adding items
  const badgeScale = useRef(new Animated.Value(1)).current;
  const badgeY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    return cartStore.subscribe(() => {
      const newCount = cartStore.getTotalCount();
      setCartCount(newCount);

      // Trigger Hop / Bounce Pop Animation
      badgeScale.setValue(0.5);
      badgeY.setValue(-10);

      Animated.parallel([
        Animated.spring(badgeScale, {
          toValue: 1,
          friction: 3,
          tension: 140,
          useNativeDriver: true,
        }),
        Animated.spring(badgeY, {
          toValue: 0,
          friction: 4,
          tension: 140,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, [badgeScale, badgeY]);

  const getTranslatedLabel = (routeName: string, rawLabel: any) => {
    switch (routeName) {
      case 'HomeTab':
        return t('home');
      case 'CategoriesTab':
        return t('categories');
      case 'OffersTab':
        return t('offers');
      case 'CartTab':
        return t('cart');
      case 'SearchTab':
        return t('search');
      default:
        return typeof rawLabel === 'string' ? rawLabel : routeName;
    }
  };

  return (
    <View style={styles.containerPointerEvents} pointerEvents="box-none">
      <View
        style={[
          styles.tabBarContainer,
          isDarkMode ? styles.darkTabBar : styles.lightTabBar,
        ]}
      >
        {state.routes
          .filter((route) =>
            ['HomeTab', 'CategoriesTab', 'OffersTab', 'CartTab', 'SearchTab'].includes(route.name)
          )
          .map((route) => {
            const { options } = descriptors[route.key];
            const currentActiveRoute = state.routes[state.index];
            const isCurrentRouteFocused = currentActiveRoute?.key === route.key;
            const isFocused = isCategorySheetOpen
              ? route.name === 'CategoriesTab'
              : isCurrentRouteFocused;
            const isCartTab = route.name === 'CartTab';

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const onPress = () => {
            if (route.name === 'CategoriesTab') {
              openCategorySheet();
              return;
            }

            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const getIconName = (focused: boolean): keyof typeof Ionicons.glyphMap => {
            switch (route.name) {
              case 'HomeTab':
                return focused ? 'home' : 'home-outline';
              case 'CategoriesTab':
              case 'ShopTab':
                return focused ? 'grid' : 'grid-outline';
              case 'OffersTab':
              case 'WishlistTab':
                return focused ? 'gift' : 'gift-outline';
              case 'CartTab':
                return focused ? 'bag-handle' : 'bag-handle-outline';
              case 'SearchTab':
              case 'ProfileTab':
                return focused ? 'search' : 'search-outline';
              default:
                return 'square-outline';
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={(options as any).tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              activeOpacity={0.8}
              style={styles.tabItem}
            >
              {isFocused ? (
                /* Active Tab: Pop-up Elevated Category-Colored Circular Button */
                <View style={styles.activeTabWrapper}>
                  <View
                    style={[
                      styles.activeCircle,
                      {
                        backgroundColor: activeCategoryColor,
                        shadowColor: activeCategoryColor,
                      },
                    ]}
                  >
                    <Ionicons
                      name={getIconName(true)}
                      size={20}
                      color="#FFFFFF"
                    />
                    {isCartTab && cartCount > 0 && (
                      <Animated.View
                        style={[
                          styles.activeCartBadge,
                          {
                            transform: [
                              { scale: badgeScale },
                              { translateY: badgeY },
                            ],
                          },
                        ]}
                      >
                        <Text style={styles.badgeText}>{cartCount}</Text>
                      </Animated.View>
                    )}
                  </View>
                  <Text style={[styles.activeLabel, { color: activeCategoryColor }]}>
                    {getTranslatedLabel(route.name, label)}
                  </Text>
                </View>
              ) : (
                /* Inactive Tab: Normal Icon & Text */
                <View style={styles.inactiveTabWrapper}>
                  <View className="relative items-center justify-center">
                    <Ionicons
                      name={getIconName(false)}
                      size={20}
                      color={isDarkMode ? '#64748B' : '#64748B'}
                    />
                    {isCartTab && cartCount > 0 && (
                      <Animated.View
                        style={[
                          styles.inactiveCartBadge,
                          {
                            transform: [
                              { scale: badgeScale },
                              { translateY: badgeY },
                            ],
                          },
                        ]}
                      >
                        <Text style={styles.badgeText}>{cartCount}</Text>
                      </Animated.View>
                    )}
                  </View>
                  <Text
                    style={[
                      styles.inactiveLabel,
                      { color: isDarkMode ? '#94A3B8' : '#64748B' },
                    ]}
                  >
                    {getTranslatedLabel(route.name, label)}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerPointerEvents: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 24 : 16,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  tabBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '92%',
    maxWidth: 420,
    height: 64,
    borderRadius: 36,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 10,
  },
  lightTabBar: {
    backgroundColor: '#FFFFFF',
    borderColor: '#F1F5F9',
    borderWidth: 1,
  },
  darkTabBar: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
    borderWidth: 1,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  activeTabWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -12,
  },
  activeCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 6,
    position: 'relative',
  },
  activeLabel: {
    fontSize: 11,
    fontWeight: '900',
    color: '#3B82F6',
    marginTop: 2,
  },
  inactiveTabWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4,
  },
  inactiveLabel: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 3,
  },
  activeCartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  inactiveCartBadge: {
    position: 'absolute',
    top: -6,
    right: -10,
    backgroundColor: '#EF4444',
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 12,
  },
});
