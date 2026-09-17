import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCategory } from '../../context/CategoryContext';
import { GroceryHero } from './GroceryHero';
import { GroceryShopByCategory } from './GroceryShopByCategory';
import { GrocerySpecialSavings } from './GrocerySpecialSavings';
import { GroceryHappyHour, HappyHourProduct } from './GroceryHappyHour';
import { GrocerySnacksNoodles, SnackProduct } from './GrocerySnacksNoodles';
import { GroceryUnileverWeek, UnileverProduct } from './GroceryUnileverWeek';
import { GroceryBestDealsBanner } from './GroceryBestDealsBanner';
import { GroceryHotTrending, HotTrendingProduct } from './GroceryHotTrending';
import { GroceryTodaysFeatured, TodaysFeaturedProduct } from './GroceryTodaysFeatured';
import { GroceryMeatFishBanners } from './GroceryMeatFishBanners';
import { GroceryEssentialsBanner } from './GroceryEssentialsBanner';
import { GroceryVegFruitsOffers } from './GroceryVegFruitsOffers';
import { GroceryFreshPicks, FreshPicksProduct } from './GroceryFreshPicks';
import { GroceryDailyEssentials, DailyEssentialsProduct } from './GroceryDailyEssentials';
import { GroceryTrustBadges } from './GroceryTrustBadges';

interface GroceryPageProps {
  onShopNowPress?: () => void;
  onExploreDealsPress?: () => void;
  onCategoryPress?: (categoryId: string) => void;
  onViewAllSavingsPress?: () => void;
  onAddToCart?: (product: any) => void;
  onBestDealsBannerPress?: () => void;
  onMeatBannerPress?: () => void;
  onFishBannerPress?: () => void;
  onEssentialsPress?: () => void;
  onShopVegPress?: () => void;
  onExploreFruitsPress?: () => void;
}

export const GroceryPage: React.FC<GroceryPageProps> = ({
  onShopNowPress,
  onExploreDealsPress,
  onCategoryPress,
  onViewAllSavingsPress,
  onAddToCart,
  onBestDealsBannerPress,
  onMeatBannerPress,
  onFishBannerPress,
  onEssentialsPress,
  onShopVegPress,
  onExploreFruitsPress,
}) => {
  const navigation = useNavigation<any>();
  const { setActiveCategory, setActiveSubCategory } = useCategory();

  const handleCategoryClick = (catId?: string) => {
    setActiveCategory('grocery');
    setActiveSubCategory(catId || null);
    try {
      navigation.navigate('CategoriesTab');
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      {/* 1. Full-Width Grocery Hero Section */}
      <GroceryHero
        onShopNowPress={onShopNowPress || (() => handleCategoryClick())}
        onExploreDealsPress={onExploreDealsPress || (() => handleCategoryClick())}
      />

      {/* 2. Shop By Category Horizontal Section */}
      <GroceryShopByCategory
        onCategoryPress={(catId) => {
          if (onCategoryPress) onCategoryPress(catId);
          handleCategoryClick(catId);
        }}
        onAllCategoriesPress={() => handleCategoryClick()}
      />

      {/* 3. Special Savings Promo Card Section */}
      <GrocerySpecialSavings
        onViewAllPress={onViewAllSavingsPress || (() => handleCategoryClick())}
      />

      {/* 4. HAPPY HOUR Flash Deals Section */}
      <GroceryHappyHour
        onAddToCart={onAddToCart}
        onViewAllPress={() => handleCategoryClick()}
      />

      {/* 5. SNACKS, NOODLES & MORE Section */}
      <GrocerySnacksNoodles
        onAddToCart={onAddToCart}
        onViewAllPress={() => handleCategoryClick('Snacks & Biscuits')}
      />

      {/* 6. UNILEVER WEEK Section */}
      <GroceryUnileverWeek
        onAddToCart={onAddToCart}
        onViewAllPress={() => handleCategoryClick('Household & Cleaning')}
      />

      {/* 7. Best Deals Banner Section (Only Image with 15px radius) */}
      <GroceryBestDealsBanner
        onPress={onBestDealsBannerPress || (() => handleCategoryClick())}
      />

      {/* 8. HOT & TRENDING RIGHT NOW Section */}
      <GroceryHotTrending
        onAddToCart={onAddToCart}
        onViewAllPress={() => handleCategoryClick()}
      />

      {/* 9. TODAY'S FEATURED FINDS Dark Section */}
      <GroceryTodaysFeatured
        onAddToCart={onAddToCart}
        onViewAllPress={() => handleCategoryClick()}
      />

      {/* 10. FRESH MEAT & FRESH FISH Promo Banners Section */}
      <GroceryMeatFishBanners
        onMeatPress={onMeatBannerPress || (() => handleCategoryClick('Fish & Meat'))}
        onFishPress={onFishBannerPress || (() => handleCategoryClick('Fish & Meat'))}
      />

      {/* 11. STOCK UP ON ESSENTIALS Pantry Staples Banner */}
      <GroceryEssentialsBanner
        onPress={onEssentialsPress || (() => handleCategoryClick())}
      />

      {/* 12. FRESH VEGETABLES & FRESH FRUITS Offers Cards */}
      <GroceryVegFruitsOffers
        onShopVegPress={onShopVegPress || (() => handleCategoryClick('Fresh Vegetables'))}
        onExploreFruitsPress={onExploreFruitsPress || (() => handleCategoryClick('Fresh Fruits'))}
      />

      {/* 13. FRESH PICKS Section */}
      <GroceryFreshPicks
        onAddToCart={onAddToCart}
        onViewAllPress={() => handleCategoryClick('Fresh Vegetables')}
      />

      {/* 14. DAILY ESSENTIALS Section */}
      <GroceryDailyEssentials
        onAddToCart={onAddToCart}
        onViewAllPress={() => handleCategoryClick('Atta, Maida & Suji')}
      />

      {/* 15. TRUST BADGES Section (2 Cards Per Line Grid) */}
      <GroceryTrustBadges />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});
