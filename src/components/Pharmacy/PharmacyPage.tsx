import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCategory } from '../../context/CategoryContext';
import { PharmacyHero } from './PharmacyHero';
import { PharmacyShopByCategory } from './PharmacyShopByCategory';
import { PharmacyProductSections } from './PharmacyProductSections';
import { PharmacyHealthcareServices } from './PharmacyHealthcareServices';
import { PharmacyTrustFeatures } from './PharmacyTrustFeatures';

interface PharmacyPageProps {
  onShopMedicinesPress?: () => void;
  onUploadPrescriptionPress?: () => void;
  onCategoryPress?: (categoryId: string) => void;
  onViewAllCategoriesPress?: () => void;
  onServicePress?: (serviceId: string) => void;
}

export const PharmacyPage: React.FC<PharmacyPageProps> = ({
  onShopMedicinesPress,
  onUploadPrescriptionPress,
  onCategoryPress,
  onViewAllCategoriesPress,
  onServicePress,
}) => {
  const navigation = useNavigation<any>();
  const { setActiveCategory, setActiveSubCategory } = useCategory();

  const handlePharmacyCategoryClick = (catId?: string) => {
    setActiveCategory('pharmacy');
    setActiveSubCategory(catId || null);
    try {
      navigation.navigate('CategoriesTab');
    } catch (e) {}
  };

  return (
    <View className="flex-1 w-full">
      {/* 1. Pharmacy Hero Section */}
      <PharmacyHero
        onShopMedicinesPress={onShopMedicinesPress}
        onUploadPrescriptionPress={onUploadPrescriptionPress}
      />

      {/* 2. Pharmacy Shop by Category Section */}
      <PharmacyShopByCategory
        onCategoryPress={(catId) => {
          if (onCategoryPress) onCategoryPress(catId);
          handlePharmacyCategoryClick(catId);
        }}
        onViewAllPress={() => {
          if (onViewAllCategoriesPress) onViewAllCategoriesPress();
          handlePharmacyCategoryClick();
        }}
      />

      {/* 3. 4 Product Carousel Sections (Medicines, Baby Care, Medical Devices, Supplements) */}
      <PharmacyProductSections />

      {/* 4. Healthcare Services Section */}
      <PharmacyHealthcareServices onServicePress={onServicePress} />

      {/* 5. Trust & Guarantee 2x2 Features Grid Section */}
      <PharmacyTrustFeatures />
    </View>
  );
};
