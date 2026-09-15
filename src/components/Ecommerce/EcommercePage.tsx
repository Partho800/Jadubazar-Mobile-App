import React from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { AppText as Text } from '../common/AppText';

// Import sub-components from same Ecommerce folder
import { FeatureGrid } from './FeatureGrid';
import { FlashDeal } from './FlashDeal';
import { ShopByCategory } from './ShopByCategory';
import { SmartElectronics } from './SmartElectronics';
import { TrendyFashion } from './TrendyFashion';
import { NewArrivals } from './NewArrivals';
import { FlashSaleBanner } from './FlashSaleBanner';
import { SummerCollectionBanner } from './SummerCollectionBanner';
import { BeautyCosmetics } from './BeautyCosmetics';
import { BestSellers } from './BestSellers';
import { WatchesAccessories } from './WatchesAccessories';
import { HomeDecor } from './HomeDecor';
import { TrustBadges } from './TrustBadges';

interface EcommercePageProps {
  onShopCollectionPress?: () => void;
  onExploreDealsPress?: () => void;
}

export const EcommercePage: React.FC<EcommercePageProps> = ({
  onShopCollectionPress,
  onExploreDealsPress,
}) => {
  const { isDarkMode } = useTheme();
  const { t, isBangla } = useLanguage();

  return (
    <View className="flex-1">
      {/* 1. Ecommerce Hero Banner */}
      <View className="overflow-hidden mb-5">
        <ImageBackground
          source={require('../../assets/images/hero-bg.jpg')}
          style={{ width: '100%', minHeight: 460 }}
          imageStyle={{ resizeMode: 'cover' }}
          resizeMode="cover"
        >
          {/* Soft Contrast Overlay for Readability */}
          <View
            className={`px-4 py-8 items-center justify-center flex-1 ${
              isDarkMode ? 'bg-slate-950/45' : 'bg-white/20'
            }`}
            style={{ minHeight: 460 }}
          >
            {/* New Collection Badge */}
            <View className="bg-white/95 border border-blue-100 px-4 py-1.5 rounded-full mb-4 shadow-sm">
              <Text className="text-blue-600 text-xs sm:text-sm font-black tracking-wide">
                {t('newCollection')}
              </Text>
            </View>

            {/* Main Headline (2-Line Structure) */}
            {isBangla ? (
              <Text
                className={`text-3xl sm:text-4xl font-black text-center tracking-tight leading-tight mb-3 px-2 ${
                  isDarkMode ? 'text-slate-50' : 'text-slate-900'
                }`}
              >
                আপনার প্রতিদিনের{' '}
                <Text className="text-blue-600 font-black">অ্যাক্সেসরিজ</Text>
                {'\n'}
                উন্নত করুন
              </Text>
            ) : (
              <>
                <Text
                  className={`text-3xl sm:text-4xl font-black text-center tracking-tight leading-tight ${
                    isDarkMode ? 'text-slate-50' : 'text-slate-900'
                  }`}
                >
                  {t('heroHeadline1')}
                </Text>
                <Text className="text-3xl sm:text-4xl font-black text-blue-600 text-center tracking-tight mb-3">
                  {t('heroHeadline2')}
                </Text>
              </>
            )}

            {/* Subtitle / Description */}
            <Text
              className={`text-sm sm:text-base leading-6 text-center max-w-[360px] mb-6 font-bold ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              {t('heroSub')}
            </Text>

            {/* Action Buttons */}
            <View className="flex-row items-center justify-center w-full gap-2.5 mb-8 px-2">
              {/* Primary Button */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={onShopCollectionPress}
                className="flex-1 h-12 bg-blue-600 flex-row items-center justify-center rounded-full px-2 shadow-lg shadow-blue-600/40 gap-1.5"
              >
                <Text className="text-white text-xs sm:text-sm font-black tracking-wide">
                  {t('shopCollection')}
                </Text>
                <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
              </TouchableOpacity>

              {/* Secondary Button */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={onExploreDealsPress}
                className={`flex-1 h-12 flex-row items-center justify-center rounded-full border px-2 shadow-sm ${
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700'
                    : 'bg-white border-slate-200'
                }`}
              >
                <Text
                  className={`text-xs sm:text-sm font-black tracking-wide ${
                    isDarkMode ? 'text-slate-50' : 'text-slate-900'
                  }`}
                >
                  {t('exploreDeals')}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Customer Review & Social Proof Section */}
            <View className="flex-row items-center justify-center gap-3">
              <View className="w-[100px] h-8 rounded-full overflow-hidden border border-white/80">
                <Image
                  source={require('../../assets/images/customer-avatars.jpg')}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>

              <View className="justify-center">
                <Text
                  className={`text-xs font-extrabold mb-0.5 ${
                    isDarkMode ? 'text-slate-50' : 'text-slate-900'
                  }`}
                >
                  {t('happyCustomers')}
                </Text>
                <View className="flex-row items-center">
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
                    className={`text-[11px] font-semibold ml-1 ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    {t('customerReviews')}
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

      {/* 5. Smart Electronics & Gadgets Section */}
      <SmartElectronics />

      {/* 6. Trendy Fashion & Apparel Section */}
      <TrendyFashion />

      {/* 7. New Arrivals Section */}
      <NewArrivals />

      {/* 8. Flash Sale Banner Section */}
      <FlashSaleBanner />

      {/* 9. Summer 2025 Promo Collection Banner Section */}
      <SummerCollectionBanner onShopCollectionPress={onShopCollectionPress} />

      {/* 10. Beauty, Skincare & Cosmetics Section */}
      <BeautyCosmetics />

      {/* 11. Best Sellers Vertical Stacked Section */}
      <BestSellers />

      {/* 12. Watches, Sunglasses & Accessories Section */}
      <WatchesAccessories />

      {/* 13. Home Decor & Cozy Living Section */}
      <HomeDecor />

      {/* 14. Trust & Guarantee 2x2 Grid Badges */}
      <TrustBadges />
    </View>
  );
};
