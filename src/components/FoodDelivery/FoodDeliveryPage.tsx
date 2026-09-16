import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FoodHero } from './FoodHero';
import { FoodDeliveryBanner } from './FoodDeliveryBanner';
import { FoodFavouriteCuisines } from './FoodFavouriteCuisines';
import { FoodBannerCarousel } from './FoodBannerCarousel';
import { FoodYourDailyDeals } from './FoodYourDailyDeals';
import { FoodPopularKitchens } from './FoodPopularKitchens';
import { FoodPopularSpecials } from './FoodPopularSpecials';
import { FoodPreOrderPlatters } from './FoodPreOrderPlatters';
import { FoodAuthenticKacchi } from './FoodAuthenticKacchi';
import { FoodGourmetBurgers } from './FoodGourmetBurgers';
import { FoodDessertsShakes } from './FoodDessertsShakes';
import { FoodTrustFeatures } from './FoodTrustFeatures';

interface FoodDeliveryPageProps {
  onOrderOnlinePress?: () => void;
  onViewMenuPress?: () => void;
  onAddToCart?: (item: any) => void;
}

export const FoodDeliveryPage: React.FC<FoodDeliveryPageProps> = ({
  onOrderOnlinePress,
  onViewMenuPress,
  onAddToCart,
}) => {
  return (
    <View style={styles.container}>
      {/* 1. Hero Section */}
      <FoodHero
        onOrderOnlinePress={onOrderOnlinePress}
        onViewMenuPress={onViewMenuPress}
      />

      {/* 2. Delivery Location & Search Bar */}
      <FoodDeliveryBanner />

      {/* 3. Favourite Cuisines Carousel */}
      <FoodFavouriteCuisines />

      {/* 4. Banner Carousel Slider */}
      <FoodBannerCarousel />

      {/* 5. Your Daily Deals Carousel */}
      <FoodYourDailyDeals />

      {/* 6. JaduBazar Kitchen */}
      <FoodPopularKitchens />

      {/* 7. Popular Dishes & Chef Specials */}
      <FoodPopularSpecials onAddToCart={onAddToCart} />

      {/* 8. Special 24h Advance Pre-Order Platters */}
      <FoodPreOrderPlatters />

      {/* 9. Authentic Kacchi, Biryani & Mughlai Platters */}
      <FoodAuthenticKacchi onAddToCart={onAddToCart} />

      {/* 10. Gourmet Smash Burgers, Pizza & Italian */}
      <FoodGourmetBurgers onAddToCart={onAddToCart} />

      {/* 11. Desserts, Shakes & Sweet Treats */}
      <FoodDessertsShakes onAddToCart={onAddToCart} />

      {/* 12. Trust & Service Features (1 tab 2 cards layout) */}
      <FoodTrustFeatures />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});
