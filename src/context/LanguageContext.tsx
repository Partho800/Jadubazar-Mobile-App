import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'EN' | 'BN';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isBangla: boolean;
  t: (key: string) => string;
  getFontFamily: (weight?: 'regular' | 'medium' | 'semibold' | 'bold') => string;
  getFontStyle: (weight?: 'regular' | 'medium' | 'semibold' | 'bold') => { fontFamily: string };
}

const translations: Record<string, { EN: string; BN: string }> = {
  // Navigation & Header
  home: { EN: 'Home', BN: 'হোম' },
  categories: { EN: 'Categories', BN: 'ক্যাটাগরি' },
  offers: { EN: 'Offers', BN: 'অফার' },
  cart: { EN: 'Cart', BN: 'কার্ট' },
  search: { EN: 'Search', BN: 'সার্চ' },
  ecommerce: { EN: 'E-Commerce', BN: 'ই-কমার্স' },
  grocery: { EN: 'Grocery', BN: 'গ্রোসারী' },
  foodDelivery: { EN: 'Food Delivery', BN: 'ফুড ডেলিভারি' },

  // Hero Section
  newCollection: { EN: 'NEW COLLECTION', BN: 'নতুন কালেকশন' },
  heroHeadline1: { EN: 'Elevate Your Everyday', BN: 'আপনার প্রতিদিনের অ্যাক্সেসরিজ' },
  heroHeadline2: { EN: 'Accessories', BN: 'উন্নত করুন' },
  heroSub: {
    EN: 'Premium accessories designed for work, travel and lifestyle. Sourced with care, crafted for durability.',
    BN: 'কাজ, ভ্রমণ এবং লাইফস্টাইলের জন্য ডিজাইন করা প্রিমিয়াম অ্যাক্সেসরিজ। যত্ন সহকারে সংগৃহীত এবং স্থায়িত্বের জন্য তৈরি।',
  },
  shopCollection: { EN: 'SHOP COLLECTION', BN: 'কালেকশন কিনুন' },
  exploreDeals: { EN: 'EXPLORE DEALS', BN: 'অফার দেখুন' },
  happyCustomers: { EN: '25K+ Happy Customers', BN: '২৫ হাজার+ সন্তুষ্ট গ্রাহক' },
  customerReviews: { EN: '4.9/5 (2.5K Reviews)', BN: '৪.৯/৫ (২.৫ হাজার+ রিভিউ)' },

  // Common Section Actions
  viewAll: { EN: 'View All', BN: 'সব দেখুন' },
  quickAdd: { EN: 'QUICK ADD', BN: 'দ্রুত যোগ করুন' },
  buyNow: { EN: 'BUY NOW', BN: 'এখনই কিনুন' },
  addToCart: { EN: 'ADD TO CART', BN: 'কার্টে যোগ করুন' },
  off: { EN: 'OFF', BN: 'ছাড়' },
  items: { EN: 'Items', BN: 'টি প্রডাক্ট' },

  // Section 2: Feature Grid / Trust
  freeShipping: { EN: 'FREE SHIPPING', BN: 'ফ্রি ডেলিভারি' },
  freeShippingSub: { EN: 'On orders over ৳2,000', BN: '৳২,০০০+ এর অর্ডারে' },
  securePayments: { EN: 'SECURE PAYMENTS', BN: 'নিরাপদ পেমেন্ট' },
  securePaymentsSub: { EN: '100% secure checkout', BN: '১০০% নিরাপদ চেকআউট' },
  easyReturns: { EN: 'EASY RETURNS', BN: 'সহজ রিটার্ন' },
  easyReturnsSub: { EN: '30-day return policy', BN: '৩০ দিনের রিটার্ন পলিসি' },
  support247: { EN: '24/7 SUPPORT', BN: '২৪/৭ সাপোর্ট' },
  support247Sub: { EN: 'Always here to help', BN: 'সবসময় আপনার সেবায়' },

  // Section 3: Flash Deal
  flashDealTitle: { EN: 'FLASH DEAL', BN: 'ফ্ল্যাশ ডিল' },
  flashDealSub: { EN: 'Limited time offers on top items', BN: 'সীমিত সময়ের সেরা অফারসমূহ' },

  // Section 4: Shop By Category
  shopByCategoryTitle: { EN: 'SHOP BY CATEGORY', BN: 'ক্যাটাগরি অনুযায়ী কেনাকাটা' },
  shopByCategorySub: { EN: 'Explore top items by department', BN: 'আপনার পছন্দের বিভাগ থেকে কেনাকাটা করুন' },
  catElectronics: { EN: 'Electronics & Gadgets', BN: 'ইলেকট্রনিক্স ও গ্যাজেটস' },
  catFashion: { EN: 'Fashion & Apparel', BN: 'ফ্যাশন ও পোশাক' },
  catBeauty: { EN: 'Beauty & Personal Care', BN: 'বিউটি ও কেয়ার' },
  catHome: { EN: 'Home & Living', BN: 'হোম ও লিভিং' },

  // Section 5: Smart Electronics
  smartElectronicsTitle: { EN: 'Smart Electronics & Gadgets', BN: 'স্মার্ট ইলেকট্রনিক্স ও গ্যাজেটস' },
  smartElectronicsSub: {
    EN: 'Top tier smartphones, laptops, audio gear and daily accessories',
    BN: 'সেরা স্মার্টফোন, ল্যাপটপ, অডিও গিয়ার এবং নিত্যদিনের এক্সেসরিজ',
  },

  // Section 6: Trendy Fashion
  trendyFashionTitle: { EN: 'Trendy Fashion & Apparel', BN: 'ট্রেন্ডি ফ্যাশন ও পোশাক' },
  trendyFashionSub: {
    EN: 'Upgrade your wardrobe with latest clothing, shoes, and luxury fits',
    BN: 'সাম্প্রতিক পোশাক, জুতো এবং লাক্সারি কালেকশনে নিজের ওয়ার্ডরোব সাজান',
  },

  // Section 7: New Arrivals
  newArrivalsTitle: { EN: 'NEW ARRIVALS', BN: 'নতুন প্রডাক্ট' },
  newArrivalsSub: {
    EN: 'Check out our latest premium collections just added to the store.',
    BN: 'দোকানে যুক্ত হওয়া আমাদের সর্বশেষ প্রিমিয়াম কালেকশন দেখুন।',
  },

  // Section 8 & 9: Promo Banners
  flashSaleBadge: { EN: 'FLASH SALE', BN: 'ফ্ল্যাশ সেল' },
  flashSaleHeadline: { EN: 'Up To 70% Off', BN: '৭০% পর্যন্ত ছাড়' },
  hoursLabel: { EN: 'HOURS', BN: 'ঘণ্টা' },
  minsLabel: { EN: 'MINS', BN: 'মিনিট' },
  secsLabel: { EN: 'SECS', BN: 'সেকেন্ড' },
  shopSale: { EN: 'SHOP SALE', BN: 'অফার কিনুন' },
  summerSaleTitle: { EN: 'SUMMER 2025 COLLECTION', BN: 'সামার ২০২৫ কালেকশন' },
  summerSaleSub: { EN: 'Up to 50% OFF on Selected Fits', BN: 'নির্বাচিত পোশাকে ৫০% পর্যন্ত ছাড়' },
  summer2025Title: { EN: 'Summer 2025', BN: 'সামার ২০২৫' },
  summer2025Sub: {
    EN: 'Discover the latest trends and fresh styles designed for comfort and modern aesthetic.',
    BN: 'আরামদায়ক এবং আধুনিক ডিজাইনের সাম্প্রতিক ট্রেন্ড ও নতুন স্টাইলগুলো দেখুন।',
  },

  // Section 10: Beauty Cosmetics
  beautyCosmeticsTitle: { EN: 'Beauty, Skincare & Cosmetics', BN: 'বিউটি, স্কিনকেয়ার ও কসমেটিক্স' },
  beautyCosmeticsSub: {
    EN: 'Glow naturally with top authentic beauty products, serums and care',
    BN: 'সেরা অরিজিনাল বিউটি প্রোডাক্টস, সিরাম ও যত্ন নিয়ে প্রাকৃতিকভাবে উজ্জ্বল থাকুন',
  },

  // Section 11: Best Sellers
  bestSellersTitle: { EN: 'BEST SELLERS', BN: 'সেরা বিক্রেতা' },
  bestSellersSub: {
    EN: "Our top-rated products that customers can't get enough of.",
    BN: 'আমাদের সর্বোচ্চ রেটিংপ্রাপ্ত পণ্য যা কাস্টমাররা সবচেয়ে বেশি পছন্দ করেন।',
  },
  viewAllBestSellers: { EN: 'View All Best Sellers', BN: 'সব সেরা বিক্রেতা দেখুন' },

  // Section 12: Watches & Accessories
  watchesTitle: { EN: 'Watches, Sunglasses & Accessories', BN: 'ঘড়ি, সানগ্লাস ও এক্সেসরিজ' },
  watchesSub: {
    EN: 'Complement your lifestyle with luxury timepieces, wallets and eyewear',
    BN: 'লাক্সারি ঘড়ি, মানি ব্যাগ এবং চোখের চশমা দিয়ে সাজিয়ে তুলুন আপনার লাইফস্টাইল',
  },

  // Section 13: Home Decor
  homeDecorTitle: { EN: 'Home Decor & Cozy Living', BN: 'হোম ডেকোর ও কোজি লিভিং' },
  homeDecorSub: {
    EN: 'Elevate your living space with minimalist lamps, diffusers and comforts',
    BN: 'মিনিমালিস্ট ল্যাম্প, ডিফিউজার এবং আরামদায়ক জিনিসপত্র দিয়ে নিজের ঘর সাজান',
  },

  // Section 14: Trust Badges
  premiumQualityTitle: { EN: 'PREMIUM QUALITY', BN: 'প্রিমিয়াম কোয়ালিটি' },
  premiumQualitySub: { EN: '100% genuine brands', BN: '১০০% অরিজিনাল ব্র্যান্ডস' },
  fastDeliveryTitle: { EN: 'FAST DELIVERY', BN: 'দ্রুত ডেলিভারি' },
  fastDeliverySub: { EN: 'Quick & reliable shipping', BN: 'দ্রুত ও নির্ভরযোগ্য শিপিং' },
  satisfactionTitle: { EN: 'SATISFACTION', BN: '১০০% গ্যারান্টি' },
  satisfactionSub: { EN: '100% satisfaction guarantee', BN: '১০০% সন্তুষ্টির নিশ্চয়তা' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('EN');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'EN' ? 'BN' : 'EN'));
  };

  const isBangla = language === 'BN';

  const applyBanglaFontCss = React.useCallback(() => {
    if (typeof document !== 'undefined') {
      if (language === 'BN') {
        document.documentElement.classList.add('lang-bn');
        document.documentElement.setAttribute('lang', 'bn');
      } else {
        document.documentElement.classList.remove('lang-bn');
        document.documentElement.setAttribute('lang', 'en');
      }
    }
  }, [language]);

  React.useEffect(() => {
    applyBanglaFontCss();
  }, [applyBanglaFontCss]);

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language];
    }
    return key;
  };

  const getFontFamily = (weight: 'regular' | 'medium' | 'semibold' | 'bold' = 'regular'): string => {
    if (isBangla) {
      if (weight === 'bold') return 'LiAdorNoirrit-Bold';
      if (weight === 'semibold') return 'LiAdorNoirrit-SemiBold';
      return 'LiAdorNoirrit-SemiBold';
    }
    if (weight === 'bold') return 'Geist-Bold';
    if (weight === 'semibold') return 'Geist-SemiBold';
    if (weight === 'medium') return 'Geist-Medium';
    return 'Geist-Regular';
  };

  const getFontStyle = (weight: 'regular' | 'medium' | 'semibold' | 'bold' = 'regular') => ({
    fontFamily: getFontFamily(weight),
  });

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isBangla,
        t,
        getFontFamily,
        getFontStyle,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

