import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ServiceData {
  id: string;
  categoryTag: string;
  title: string;
  description: string;
  rating: number;
  reviewsCount?: number;
  duration: string;
  price: number;
  imageUrl: string;
  breadcrumb?: string[];
}

interface ServiceContextType {
  selectedService: ServiceData | null;
  openServiceDetails: (service?: Partial<ServiceData>) => void;
  closeServiceDetails: () => void;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const DEFAULT_LAUNDRY_SERVICE: ServiceData = {
  id: 'laund_wash',
  categoryTag: 'OTHER',
  title: 'Premium Laundry (Wash, Fold & Iron)',
  description:
    'Save your weekends! We collect your dirty clothes, wash them with premium detergents, steam iron, and return them neatly folded within 48 hours.',
  rating: 4.6,
  reviewsCount: 95,
  duration: 'Pickup (15 min)',
  price: 499,
  imageUrl:
    'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=1200&q=80',
  breadcrumb: ['HOME', 'SERVICES', 'OTHER', 'LAUNDRY'],
};

export const ServiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);

  const openServiceDetails = (service?: Partial<ServiceData>) => {
    if (!service) {
      setSelectedService(DEFAULT_LAUNDRY_SERVICE);
      return;
    }

    const categoryTag = (service.categoryTag || 'OTHER').toUpperCase();
    const firstWord = (service.title || 'SERVICE').split(' ')[0].toUpperCase();

    const fullService: ServiceData = {
      id: service.id || DEFAULT_LAUNDRY_SERVICE.id,
      categoryTag,
      title: service.title || DEFAULT_LAUNDRY_SERVICE.title,
      description: service.description || DEFAULT_LAUNDRY_SERVICE.description,
      rating: service.rating ?? DEFAULT_LAUNDRY_SERVICE.rating,
      reviewsCount: service.reviewsCount ?? 95,
      duration: service.duration || DEFAULT_LAUNDRY_SERVICE.duration,
      price: service.price ?? DEFAULT_LAUNDRY_SERVICE.price,
      imageUrl: service.imageUrl || DEFAULT_LAUNDRY_SERVICE.imageUrl,
      breadcrumb: service.breadcrumb || ['HOME', 'SERVICES', categoryTag, firstWord],
    };
    setSelectedService(fullService);
  };

  const closeServiceDetails = () => {
    setSelectedService(null);
  };

  return (
    <ServiceContext.Provider
      value={{
        selectedService,
        openServiceDetails,
        closeServiceDetails,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = (): ServiceContextType => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useService must be used within a ServiceProvider');
  }
  return context;
};
