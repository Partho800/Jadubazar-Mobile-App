import React from 'react';
import { View } from 'react-native';
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
  return (
    <View className="flex-1 w-full">
      {/* 1. Pharmacy Hero Section */}
      <PharmacyHero
        onShopMedicinesPress={onShopMedicinesPress}
        onUploadPrescriptionPress={onUploadPrescriptionPress}
      />

      {/* 2. Pharmacy Shop by Category Section */}
      <PharmacyShopByCategory
        onCategoryPress={onCategoryPress}
        onViewAllPress={onViewAllCategoriesPress}
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
