import React from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useCategory } from '../../context/CategoryContext';
import { AppText as Text } from '../common/AppText';

export interface CategoryCardItem {
  id: string;
  titleKey: string;
  titleEn: string;
  subCategoryName: string;
  imageUrl: string;
}

const CATEGORY_CARDS: CategoryCardItem[] = [
  {
    id: '1',
    titleKey: 'catFashion',
    titleEn: 'Fashion',
    subCategoryName: 'Fashion',
    imageUrl:
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '2',
    titleKey: 'catElectronics',
    titleEn: 'Electronics',
    subCategoryName: 'Electronics',
    imageUrl:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '3',
    titleKey: 'catBeauty',
    titleEn: 'Beauty',
    subCategoryName: 'Beauty',
    imageUrl:
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '4',
    titleKey: 'catHome',
    titleEn: 'Home Decor',
    subCategoryName: 'Home Decor',
    imageUrl:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
  },
];

export const ShopByCategory: React.FC = () => {
  const navigation = useNavigation<any>();
  const { isDarkMode } = useTheme();
  const { width } = useWindowDimensions();
  const { t, isBangla } = useLanguage();
  const { setActiveCategory, setActiveSubCategory } = useCategory();

  const cardWidth = (width - 48) / 2;

  const handleCategoryPress = (subCategoryName?: string) => {
    setActiveCategory('ecommerce');
    setActiveSubCategory(subCategoryName || null);
    try {
      navigation.navigate('CategoriesTab');
    } catch (e) {
      console.log('Navigation error:', e);
    }
  };

  return (
    <View className="mx-4 mb-11">
      {/* Header Row */}
      <View className="flex-row items-start justify-between mb-5">
        <View className="flex-1 pr-3">
          <Text
            className={`text-2xl font-black tracking-tighter mb-1 ${
              isDarkMode ? 'text-slate-50' : 'text-slate-900'
            }`}
          >
            {t('shopByCategoryTitle')}
          </Text>
          <Text
            className={`text-xs font-medium leading-5 ${
              isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            {t('shopByCategorySub')}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handleCategoryPress()}
          className="flex-row items-center gap-1 pt-0.5 cursor-pointer"
        >
          <Text className="text-xs font-bold text-blue-600 text-right leading-4">
            {t('viewAll')}
          </Text>
          <Ionicons name="arrow-forward" size={16} color="#2563EB" />
        </TouchableOpacity>
      </View>

      {/* 2x2 Grid Category Cards */}
      <View className="flex-row flex-wrap justify-between gap-y-4">
        {CATEGORY_CARDS.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            activeOpacity={0.9}
            onPress={() => handleCategoryPress(cat.subCategoryName)}
            style={{ width: cardWidth, height: 220, borderRadius: 14 }}
            className="overflow-hidden shadow-md cursor-pointer"
          >
            <ImageBackground
              source={{ uri: cat.imageUrl }}
              style={{ width: '100%', height: '100%' }}
              imageStyle={{ borderRadius: 14, resizeMode: 'cover' }}
              className="w-full h-full justify-end"
            >
              {/* Bottom Vignette Linear Gradient Shadow */}
              <LinearGradient
                colors={['transparent', 'rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.85)']}
                locations={[0, 0.35, 1]}
                style={{
                  paddingLeft: 20,
                  paddingRight: 16,
                  paddingBottom: 20,
                  paddingTop: 48,
                  borderBottomLeftRadius: 12,
                  borderBottomRightRadius: 12,
                }}
              >
                <Text className="text-white text-xl font-black mb-1">
                  {isBangla ? t(cat.titleKey) : cat.titleEn}
                </Text>
                <View className="flex-row items-center gap-1">
                  <Text className="text-orange-500 text-xs font-extrabold tracking-wide">
                    {t('shopCollection')}
                  </Text>
                  <Ionicons name="arrow-forward" size={14} color="#F97316" />
                </View>
              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
