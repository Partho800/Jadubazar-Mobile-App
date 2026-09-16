import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

const bestDealsBanner = require('../../assets/images/best-deals-banner.webp');

interface GroceryBestDealsBannerProps {
  onPress?: () => void;
}

export const GroceryBestDealsBanner: React.FC<GroceryBestDealsBannerProps> = ({
  onPress,
}) => {
  return (
    <View className="mx-2 sm:mx-4 my-5">
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={styles.bannerContainer}
        className="w-full overflow-hidden shadow-xs"
      >
        <Image
          source={bestDealsBanner}
          style={styles.bannerImage}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    width: '100%',
  },
  bannerImage: {
    width: '100%',
    height: 165,
    borderRadius: 15,
  },
});

export default GroceryBestDealsBanner;
