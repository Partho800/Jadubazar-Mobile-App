import React from 'react';
import { View } from 'react-native';
import { ServicesHero } from './ServicesHero';
import { ServicesBrowseByAreas } from './ServicesBrowseByAreas';
import { ServicesDeepCleaningBanner } from './ServicesDeepCleaningBanner';
import { ServicesPopularBooking } from './ServicesPopularBooking';
import { ServicesApplianceCare } from './ServicesApplianceCare';
import { ServicesPlumbingSanitary } from './ServicesPlumbingSanitary';
import { ServicesEmergencyExpress } from './ServicesEmergencyExpress';
import { ServicesElectricalWiring } from './ServicesElectricalWiring';
import { ServicesDeepCleaningPest } from './ServicesDeepCleaningPest';
import { ServicesCarpentryPainting } from './ServicesCarpentryPainting';
import { ServicesPersonalCareSalon } from './ServicesPersonalCareSalon';
import { ServicesLaundryDoorstep } from './ServicesLaundryDoorstep';
import { ServicesSubscriptionPackages } from './ServicesSubscriptionPackages';
import { ServicesAssuranceGuarantee } from './ServicesAssuranceGuarantee';
import { useService } from '../../context/ServiceContext';

interface ServicesPageProps {
  onExploreServicesPress?: () => void;
  onAreaPress?: (areaId: string) => void;
  onBookServicePress?: () => void;
  onServiceBookPress?: (serviceId: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onExploreServicesPress,
  onAreaPress,
  onBookServicePress,
  onServiceBookPress,
}) => {
  const { openServiceDetails } = useService();

  const handleServiceCardClick = (serviceOrId?: any) => {
    if (serviceOrId && typeof serviceOrId === 'object') {
      openServiceDetails({
        id: serviceOrId.id,
        categoryTag: serviceOrId.categoryTag,
        title: serviceOrId.defaultTitle || serviceOrId.title,
        description: serviceOrId.defaultSub || serviceOrId.description || serviceOrId.sub,
        rating: serviceOrId.rating,
        duration: serviceOrId.duration,
        price: serviceOrId.price,
        imageUrl: serviceOrId.imageUrl,
      });
    } else {
      openServiceDetails();
    }
    if (onServiceBookPress && typeof serviceOrId === 'string') {
      onServiceBookPress(serviceOrId);
    }
  };

  return (
    <View className="flex-1 w-full">
      {/* 1. Services Hero Section */}
      <ServicesHero onExploreServicesPress={onExploreServicesPress} />

      {/* 2. Browse by Service Areas Grid Section */}
      <ServicesBrowseByAreas onAreaPress={onAreaPress} />

      {/* 3. Deep Home Cleaning Promo Banner Section */}
      <ServicesDeepCleaningBanner onBookServicePress={() => handleServiceCardClick()} />

      {/* 4. Popular Booking Services (2 Cards Per Line Grid) Section */}
      <ServicesPopularBooking onServiceBookPress={handleServiceCardClick} />

      {/* 5. AC Repair & Home Appliance Care Carousel Section */}
      <ServicesApplianceCare onServicePress={handleServiceCardClick} />

      {/* 6. Emergency Plumbing & Sanitary Solutions Carousel Section */}
      <ServicesPlumbingSanitary onServicePress={handleServiceCardClick} />

      {/* 7. Emergency 30-Min Express Tech Dispatch Banner Section */}
      <ServicesEmergencyExpress
        onBookElectricianPress={() => handleServiceCardClick()}
        onBookPlumberPress={() => handleServiceCardClick()}
      />

      {/* 8. Expert Electrical & House Wiring Carousel Section */}
      <ServicesElectricalWiring onServicePress={handleServiceCardClick} />

      {/* 9. Home Deep Cleaning & Pest Eradication Carousel Section */}
      <ServicesDeepCleaningPest onServicePress={handleServiceCardClick} />

      {/* 10. Carpentry, Wall Painting & Fitting Carousel Section */}
      <ServicesCarpentryPainting onServicePress={handleServiceCardClick} />

      {/* 11. Personal Care & Home Salon Carousel Section */}
      <ServicesPersonalCareSalon onServicePress={handleServiceCardClick} />

      {/* 12. Laundry & Doorstep Services Carousel Section */}
      <ServicesLaundryDoorstep onServicePress={handleServiceCardClick} />

      {/* 13. Service Subscription Packages (Build Your Own Service Plan) Section */}
      <ServicesSubscriptionPackages
        onSelectMonthlyPlan={() => handleServiceCardClick()}
        onSelectYearlyPlan={() => handleServiceCardClick()}
      />

      {/* 14. Service Assurance Guarantee & Damage Cover Section */}
      <ServicesAssuranceGuarantee />
    </View>
  );
};







