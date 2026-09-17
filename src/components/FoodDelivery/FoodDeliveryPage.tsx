import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCategory } from '../../context/CategoryContext';
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
  const navigation = useNavigation<any>();
  const { setActiveCategory, setActiveSubCategory } = useCategory();

  const handleFoodCategoryClick = (subCatName?: string) => {
    setActiveCategory('food');
    setActiveSubCategory(subCatName || null);
    try {
      navigation.navigate('CategoriesTab');
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      {/* 1. Hero Section */}
      <FoodHero
        onOrderOnlinePress={onOrderOnlinePress || (() => handleFoodCategoryClick())}
        onViewMenuPress={onViewMenuPress || (() => handleFoodCategoryClick())}
      />

      {/* 2. Delivery Location & Search Bar */}
      <FoodDeliveryBanner />

      {/* 3. Favourite Cuisines Carousel */}
      <FoodFavouriteCuisines
        onCuisinePress={(item) => handleFoodCategoryClick(item.title.replace(/[^\w\s]/gi, '').trim())}
        onAllCuisinesPress={() => handleFoodCategoryClick()}
      />

      {/* 4. Banner Carousel Slider */}
      <FoodBannerCarousel />

      {/* 5. Your Daily Deals Carousel */}
      <FoodYourDailyDeals />

      {/* 6. JaduBazar Kitchen */}
      <FoodPopularKitchens />

      {/* 7. Popular Dishes & Chef Specials */}
      <FoodPopularSpecials
        onAddToCart={onAddToCart}
        onViewAllPress={() => handleFoodCategoryClick()}
      />

      {/* 8. Special 24h Advance Pre-Order Platters */}
      <FoodPreOrderPlatters
        onViewAllPress={() => handleFoodCategoryClick('Pre-Order Platters')}
      />

      {/* 9. Authentic Kacchi, Biryani & Mughlai Platters */}
      <FoodAuthenticKacchi
        onAddToCart={onAddToCart}
        onViewAllPress={() => handleFoodCategoryClick('Biriyani')}
      />

      {/* 10. Gourmet Smash Burgers, Pizza & Italian */}
      <FoodGourmetBurgers
        onAddToCart={onAddToCart}
        onViewAllPress={() => handleFoodCategoryClick('Burger')}
      />

      {/* 11. Desserts, Shakes & Sweet Treats */}
      <FoodDessertsShakes
        onAddToCart={onAddToCart}
        onViewAllPress={() => handleFoodCategoryClick('Desserts & Shakes')}
      />

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
