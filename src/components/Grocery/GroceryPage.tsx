import React from 'react';
import { View, StyleSheet } from 'react-native';
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
  onAddToCart?: (
    product:
      | HappyHourProduct
      | SnackProduct
      | UnileverProduct
      | HotTrendingProduct
      | TodaysFeaturedProduct
      | FreshPicksProduct
      | DailyEssentialsProduct
  ) => void;
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
  return (
    <View style={styles.container}>
      {/* 1. Full-Width Grocery Hero Section */}
      <GroceryHero
        onShopNowPress={onShopNowPress}
        onExploreDealsPress={onExploreDealsPress}
      />

      {/* 2. Shop By Category Horizontal Section */}
      <GroceryShopByCategory
        onCategoryPress={onCategoryPress}
      />

      {/* 3. Special Savings Promo Card Section */}
      <GrocerySpecialSavings
        onViewAllPress={onViewAllSavingsPress}
      />

      {/* 4. HAPPY HOUR Flash Deals Section */}
      <GroceryHappyHour
        onAddToCart={onAddToCart}
      />

      {/* 5. SNACKS, NOODLES & MORE Section */}
      <GrocerySnacksNoodles
        onAddToCart={onAddToCart}
      />

      {/* 6. UNILEVER WEEK Section */}
      <GroceryUnileverWeek
        onAddToCart={onAddToCart}
      />

      {/* 7. Best Deals Banner Section (Only Image with 15px radius) */}
      <GroceryBestDealsBanner
        onPress={onBestDealsBannerPress}
      />

      {/* 8. HOT & TRENDING RIGHT NOW Section */}
      <GroceryHotTrending
        onAddToCart={onAddToCart}
      />

      {/* 9. TODAY'S FEATURED FINDS Dark Section */}
      <GroceryTodaysFeatured
        onAddToCart={onAddToCart}
      />

      {/* 10. FRESH MEAT & FRESH FISH Promo Banners Section */}
      <GroceryMeatFishBanners
        onMeatPress={onMeatBannerPress}
        onFishPress={onFishBannerPress}
      />

      {/* 11. STOCK UP ON ESSENTIALS Pantry Staples Banner */}
      <GroceryEssentialsBanner
        onPress={onEssentialsPress}
      />

      {/* 12. FRESH VEGETABLES & FRESH FRUITS Offers Cards */}
      <GroceryVegFruitsOffers
        onShopVegPress={onShopVegPress}
        onExploreFruitsPress={onExploreFruitsPress}
      />

      {/* 13. FRESH PICKS Section */}
      <GroceryFreshPicks
        onAddToCart={onAddToCart}
      />

      {/* 14. DAILY ESSENTIALS Section */}
      <GroceryDailyEssentials
        onAddToCart={onAddToCart}
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
