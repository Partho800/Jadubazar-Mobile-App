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
  pharmacy: { EN: 'Pharmacy', BN: 'ফার্মেসী' },
  services: { EN: 'Services', BN: 'সার্ভিসেস' },

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

  // Pharmacy Hero Section
  pharmacyBadge: { EN: 'YOUR HEALTH, OUR PRIORITY', BN: 'আপনার স্বাস্থ্য, আমাদের অগ্রাধিকার' },
  pharmacyHeadline1: { EN: 'Better Health, ', BN: 'উন্নত স্বাস্থ্য, ' },
  pharmacyHeadline2: { EN: 'Delivered Daily.', BN: 'প্রতিদিন থাকবে আপনার পাশে।' },
  pharmacySub: {
    EN: 'Genuine medicines, trusted brands & expert care delivered to your doorstep.',
    BN: 'জেনুইন মেডিসিন, বিশ্বস্ত ব্র্যান্ড ও অভিজ্ঞ কেয়ার পৌছে যাবে আপনার দরজায়।',
  },
  pharmacyGenuine: { EN: '100% Genuine Products', BN: '১০০% আসল প্রোডাক্ট' },
  pharmacyFastDel: { EN: 'Fast & Reliable Delivery', BN: 'দ্রুত ও নির্ভরযোগ্য ডেলিভারি' },
  pharmacySecurePay: { EN: 'Secure Payments', BN: 'নিরাপদ পেমেন্ট' },
  pharmacyExpertSup: { EN: 'Expert Support', BN: 'অভিজ্ঞ সাপোর্ট' },
  shopMedicines: { EN: 'Shop Medicines', BN: 'ঔষধ কিনুন' },
  uploadPrescription: { EN: 'Upload Prescription', BN: 'প্রেসক্রিপশন আপলোড করুন' },
  trustedByCustomers: { EN: 'Trusted by 3M+ Customers', BN: '৩০ লাখ+ গ্রাহকের বিশ্বস্ত' },
  reviewsCount: { EN: '(25K+ reviews)', BN: '(২৫ হাজার+ রিভিউ)' },
  expressDeliveryTitle: { EN: 'Express Delivery', BN: 'এক্সপ্রেস ডেলিভারি' },
  expressDeliverySub: { EN: 'On time, every time', BN: 'প্রতিবার সঠিক সময়ে' },
  securePaymentsTitle: { EN: 'Secure Payments', BN: 'নিরাপদ পেমেন্ট' },
  securePaymentsSub: { EN: '100% safe & secure', BN: '১০০% নিরাপদ ও সুরক্ষিত' },
  easyReturnsTitleText: { EN: 'Easy Returns', BN: 'সহজ রিটার্ন' },
  easyReturnsSubText: { EN: 'Hassle-free returns', BN: 'ঝামেলামুক্ত রিটার্ন' },
  support247Title: { EN: '24/7 Support', BN: '২৪/৭ সাপোর্ট' },
  // Pharmacy Shop by Category
  shopByCategory: { EN: 'Shop by Category', BN: 'ক্যাটাগরি ভিত্তিক কেনাকাটা' },
  viewAll: { EN: 'View all', BN: 'সবগুলো দেখুন' },
  catMedicines: { EN: 'Medicines', BN: 'ঔষধ' },
  catHealthProducts: { EN: 'Health Products', BN: 'হেলথ প্রডাক্টস' },
  catPersonalCare: { EN: 'Personal Care', BN: 'পার্সোনাল কেয়ার' },
  catMotherBaby: { EN: 'Mother & Baby', BN: 'মা ও শিশু' },
  catDevices: { EN: 'Healthcare Devices', BN: 'স্বাস্থ্য ডিভাইস' },
  catSupplements: { EN: 'Supplements', BN: 'সাপ্লিমেন্ট' },
  catDiabetesCare: { EN: 'Diabetes Care', BN: 'ডায়াবেটিস কেয়ার' },
  catAyurvedic: { EN: 'Ayurvedic & Herbal', BN: 'আয়ুর্বেদিক ও ভেষজ' },

  // Pharmacy Product Sections
  secEverydayMedicinesTitle: { EN: 'Everyday Medicines & Pain Relief', BN: 'দৈনন্দিন ঔষধ ও ব্যাথানাশক' },
  secEverydayMedicinesSub: { EN: 'Fast relief from fever, headache, indigestion, acidity & seasonal cold', BN: 'জ্বর, মাথা ব্যথা, অ্যাসিডিটি ও ঠান্ডার দ্রুত উপশম' },
  secMotherBabyTitle: { EN: 'Mother & Baby Care', BN: 'মা ও শিশুর যত্ন' },
  secMotherBabySub: { EN: 'Diapers, wipes, tear-free gentle baby washes & moisturizing lotions', BN: 'ডায়াপার, ওয়াইপস, চাইল্ড ওয়াশ ও ময়েশ্চারাইজিং লোশন' },
  secDevicesTitle: { EN: 'Medical Devices & Health Monitors', BN: 'মেডিকেল ডিভাইস ও হেলথ মনিটর' },
  secDevicesSub: { EN: 'Accurate digital BP monitors, glucometers, pulse oximeters & nebulizers', BN: 'ডিজিটাল বিপি মনিটর, গ্লুকোমিটার, পোলস অক্সিমিটার ও নেবুলাইজার' },
  // Healthcare Services
  healthcareServices: { EN: 'Healthcare Services', BN: 'স্বাস্থ্য সেবা সামগ্রী' },
  docConsultTitle: { EN: 'Doctor Consultation', BN: 'ডাক্তার পরামর্শ' },
  docConsultSub: { EN: 'Talk to a doctor online', BN: 'অনলাইনে বিশেষজ্ঞ ডাক্তারের পরামর্শ নিন' },
  bookNow: { EN: 'Book Now', BN: 'বুক করুন' },
  labTestsTitle: { EN: 'Lab Tests at Home', BN: 'ঘরে বসেই ল্যাব টেস্ট' },
  labTestsSub: { EN: 'Book tests & get reports online', BN: 'টেস্ট বুক করুন এবং অনলাইনে রিপোর্ট পান' },
  medReminderTitle: { EN: 'Medicine Reminder', BN: 'মেডিসিন রিমাইন্ডার' },
  medReminderSub: { EN: 'Never miss your meds again', BN: 'ঔষধ খাওয়ার সময় কখনো ভুলবেন না' },
  setReminder: { EN: 'Set Reminder', BN: 'রিমাইন্ডার সেট করুন' },
  fullCheckupTitle: { EN: 'Full Body Checkup', BN: 'ফুল বডি চেকআপ' },
  fullCheckupSub: { EN: 'Complete health checkup packages', BN: 'সম্পূর্ণ হেলথ চেকআপ প্যাকেজ সমূহ' },
  exploreNow: { EN: 'Explore Now', BN: 'বিস্তারিত দেখুন' },

  // Pharmacy Trust Features
  licensedPharmacyTitle: { EN: 'Licensed Pharmacy', BN: 'লাইসেন্সপ্রাপ্ত ফার্মেসী' },
  licensedPharmacySub: { EN: '100% certified & reliable', BN: '১০০% সার্টিফাইড ও বিশ্বস্ত' },
  fastDeliveryTitle: { EN: 'Fast Delivery', BN: 'দ্রুত ডেলিভারি' },
  fastDeliverySub: { EN: 'Delivering to 19,000+ pin codes', BN: '১৯,০০০+ পিন কোডে ডেলিভারি সুযোগ' },
  genuineProductsTitle: { EN: 'Genuine Products', BN: 'জেনুইন প্রোডাক্ট' },
  genuineProductsSub: { EN: 'Sourced from trusted brands', BN: 'সরাসরি অফিশিয়াল ব্র্যান্ড থেকে সংগৃহীত' },
  securePaymentsTrustTitle: { EN: 'Secure Payments', BN: 'নিরাপদ পেমেন্ট' },
  securePaymentsTrustSub: { EN: 'Multiple payment options', BN: 'একাধিক পেমেন্ট অপশন' },

  // Services Hero Section
  verifiedInsuredBadge: { EN: 'VERIFIED & INSURED PROFESSIONALS', BN: 'ভেরিফাইড ও বীমাকৃত প্রফেশনালস' },
  servicesHeroTitle: { EN: 'TRUSTED SERVICES, RIGHT AT YOUR DOOR', BN: 'বিশ্বস্ত সার্ভিস, সরাসরি আপনার দোরগোড়ায়' },
  servicesHeroSub: {
    EN: 'Book verified plumbers, electricians, AC repair mechanics, professional cleaners, and personal care salon experts, right to your home in clicks.',
    BN: 'বিশ্বস্ত প্লাম্বার, ইলেকট্রিশিয়ান, এসি মেকানিক, ক্লিনার ও পার্সোনাল কেয়ার এক্সপার্ট বুক করুন মাত্র এক ক্লিকে।',
  },
  exploreServices: { EN: 'EXPLORE SERVICES', BN: 'সার্ভিসসমূহ দেখুন' },

  // Services Browse by Areas
  browseServiceAreasTitle: { EN: 'Browse by Service Areas', BN: 'সার্ভিস ক্যাটাগরি ব্রাউজ করুন' },
  browseServiceAreasSub: { EN: 'Verified, skilled handymen for all household and personal tasks.', BN: 'সমস্ত গৃহস্থালী ও ব্যক্তিগত কাজের জন্য অভিজ্ঞ প্রফেশনালস।' },
  areaHomeCleaning: { EN: 'Home Cleaning', BN: 'হোম ক্লিনিং' },
  areaApplianceRepair: { EN: 'Appliance Repair', BN: 'অ্যাপ্লায়েন্স মেরামত' },
  areaElectrical: { EN: 'Electrical Services', BN: 'ইলেকট্রিক্যাল সার্ভিস' },
  areaPlumbing: { EN: 'Plumbing Services', BN: 'প্লাম্বিং সার্ভিস' },
  areaHomeImprovement: { EN: 'Home Improvement', BN: 'হোম ইমপ্রুভমেন্ট' },
  areaPersonalCare: { EN: 'Personal Care', BN: 'পার্সোনাল কেয়ার' },
  areaOtherServices: { EN: 'Other Services', BN: 'অন্যান্য সার্ভিস' },

  // Services Deep Cleaning Promo Banner
  verifiedServicesTag: { EN: 'VERIFIED SERVICES', BN: 'ভেরিফাইড সার্ভিসেস' },
  deepCleaningTitle: { EN: 'Deep Home Cleaning by Verified Professionals', BN: 'অভিজ্ঞ প্রফেশনালস দ্বারা ডিপ হোম ক্লিনিং' },
  deepCleaningSub: { EN: 'Make your home sparkle. Save 20% on booking home sanitization & cleaning services.', BN: 'আপনার ঘরকে করে তুলুন ঝকঝকে। হোম স্যানিটাইজেশন ও ক্লিনিং সার্ভিসে পাচ্ছেন ২০% ছাড়।' },
  bookServiceNow: { EN: 'Book Service Now', BN: 'এখনই সার্ভিস বুক করুন' },

  // Services Popular Booking
  popularBookingTitle: { EN: 'Popular Booking Services', BN: 'জনপ্রিয় সার্ভিসসমূহ' },
  startingAt: { EN: 'STARTING AT', BN: 'শুরু মাত্র' },
  popularHomeCleanTitle: { EN: 'Professional Home Deep Cleaning Service', BN: 'প্রফেশনাল হোম ডিপ ক্লিনিং সার্ভিস' },
  popularHomeCleanSub: { EN: 'Get your entire house scrubbed and polished by our verified cleaning experts.', BN: 'অভিজ্ঞ ক্লিনারের মাধ্যমে আপনার ঘরকে করুন পরিষ্কার ও ঝকঝকে।' },
  popularAcJetTitle: { EN: 'AC Jet Cleaning & Gas Refill', BN: 'এসি জেট ওয়াশ ও গ্যাস রিফিল' },
  popularAcJetSub: { EN: 'Ensure maximum cooling efficiency of your Air Conditioner with jet wash.', BN: 'জেট ওয়াশ সার্ভিস দিয়ে এসির সেরা কুলিং কার্যক্ষমতা পান।' },
  popularPlumbingTitle: { EN: 'Emergency Plumbing Repair & Installation', BN: 'জরুরি প্লাম্বিং রিপেয়ার ও ফিটিং' },
  popularPlumbingSub: { EN: 'Book our certified plumbing technicians to instantly resolve pipe leaks and fittings.', BN: 'পাইপ লিক ও পানির ফিটিংস সমাধান করতে অভিজ্ঞ প্লাম্বার বুক করুন।' },
  popularElectricalTitle: { EN: 'Expert Home Electrical Service', BN: 'এক্সপার্ট হোম ইলেকট্রিক্যাল সার্ভিস' },
  popularElectricalSub: { EN: 'From installing ceiling fans and smart lights to repairing short circuit faults.', BN: 'ফ্যান ও লাইট ফিটিং থেকে শর্ট সার্কিট মেরামতের সম্পূর্ণ সমাধান।' },

  // Services AC & Appliance Care Carousel
  acApplianceCareTitle: { EN: 'AC Repair & Home Appliance Care', BN: 'এসি ও হোম অ্যাপ্লায়েন্স মেরামত' },
  acInstallationTitle: { EN: 'Split AC Installation & Shifting', BN: 'স্প্লিট এসি ইনস্টলেশন ও শিফটিং' },
  acInstallationSub: { EN: 'Professional installation and relocation of split ACs of all tonnages.', BN: 'সকল টনের এসি স্প্লিট ইনস্টলেশন ও নিরাপদ শিফটিং সার্ভিস।' },
  fridgeRepairTitle: { EN: 'Refrigerator Gas & Compressor Repair', BN: 'ফ্রিজ গ্যাস ও কম্প্রেসার মেরামত' },
  fridgeRepairSub: { EN: 'Expert refrigerator diagnostics for low cooling, excessive ice buildup.', BN: 'ফ্রিজের কুলিং সমস্যা ও গ্যাস রিফিলের জন্য এক্সপার্ট টেকনিশিয়ান।' },
  washingMachineTitle: { EN: 'Washing Machine Servicing & Motor Repair', BN: 'ওয়াশিং মেশিন সার্ভিসিং ও মোটর রিপেয়ার' },
  washingMachineSub: { EN: 'Fix washing machine water leakage, drum noise & spin cycle issues.', BN: 'ওয়াশিং মেশিনের ড্রাম ও স্পিন সাইকেল মেকানিকাল ফিক্সিং।' },
  microwaveRepairTitle: { EN: 'Microwave Oven Repair & Heating Fix', BN: 'মাইক্রোওয়েভ ওভেন রিপেয়ার ও হিটিং ফিক্স' },
  microwaveRepairSub: { EN: 'Complete repair for microwave touch panel, magnetron & heating coils.', BN: 'ওভেনের হিটিং ও টাচ প্যানেল সমস্যার সম্পূর্ণ মেরামতি।' },
  geyserRepairTitle: { EN: 'Water Heater & Geyser Servicing', BN: 'ওয়াটার হিটার ও গিজার সার্ভিসিং' },
  geyserRepairSub: { EN: 'Safe electric geyser installation, element replacement & coil descaling.', BN: 'গিজার ইনস্টলেশন, কয়েল ও এলিমেন্ট রিপ্লেসমেন্ট সার্ভিস।' },

  // Services Plumbing & Sanitary Solutions Carousel
  plumbingSanitaryTitle: { EN: 'Emergency Plumbing & Sanitary Solutions', BN: 'জরুরি প্লাম্বিং ও সেনিটারি সলিউশন' },
  plumbingRepairTitle: { EN: 'Emergency Plumbing Repair & Installation', BN: 'জরুরি প্লাম্বিং রিপেয়ার ও ফিটিং' },
  plumbingRepairSub: { EN: 'Book our certified plumbing technicians to instantly resolve pipe leakages, basin fittings.', BN: 'পাইপ লিক ও পানির ফিটিংস সমাধান করতে অভিজ্ঞ প্লাম্বার বুক করুন।' },
  waterTankCleanTitle: { EN: 'Overhead Water Tank Deep Cleaning', BN: 'পানির ট্যাংক ডিপ ক্লিনিং' },
  waterTankCleanSub: { EN: 'Hygienic deep cleaning of residential overhead & underground water tanks.', BN: 'বাসাবাড়ির ওভারহেড ও আন্ডারগ্রাউন্ড পানির ট্যাংক জীবাণুমুক্ত ওয়াশ।' },
  sanitaryFittingTitle: { EN: 'Sanitary & Bathroom Fitting Installation', BN: 'সেনিটারি ও বাথরুম ফিটিংস ফিটিং' },
  sanitaryFittingSub: { EN: 'Professional fitting of taps, showers, commodes, mixers & bath accessories.', BN: 'কল, শাওয়ার, কমোড ও বাথরুম সামগ্রী নিখুঁত ফিটিং সার্ভিস।' },
  drainUnclogTitle: { EN: 'Drainage Unclogging & Blockage Clearance', BN: 'ড্রেন ও বেসিন জ্যাম ব্লকেজ ক্লিয়ার' },
  drainUnclogSub: { EN: 'Heavy-duty pressure unclogging for blocked kitchen sinks & bathroom drains.', BN: 'বাথরুম ড্রেন ও কিচেন সিঙ্কের ব্লকেজ প্রেশার ক্লিনিং সলিউশন।' },
  waterPumpTitle: { EN: 'Water Pump & Motor Repair', BN: 'ওয়াটার পাম্প ও মোটর সার্ভিসিং' },
  waterPumpSub: { EN: 'Complete motor rewinding, seal replacement & pump installation service.', BN: 'পানির মোটরের কয়েল রিওয়াইন্ডিং ও পাম্প ইনস্টলেশন।' },

  // Services Emergency Express Banner
  emergencyBadge: { EN: '30-MIN EMERGENCY EXPRESS', BN: '৩০ মিনিটে জরুরি সেবা' },
  available247Badge: { EN: '24/7 Available', BN: '২৪/৭ উপলব্ধ' },
  emergencyHeadline: { EN: 'Sudden Power Outage or Water Pipe Burst? Expert Tech at Your Door in 30 Mins', BN: 'বিদ্যুৎ বিভ্রাট বা পানির পাইপ ফেটেছে? ৩০ মিনিটে দক্ষ টেকনিশিয়ান হাজির' },
  emergencySub: { EN: 'Certified, background-verified plumbers, electricians, and AC technicians ready for immediate dispatch across Dhaka and Chittagong. 100% upfront pricing.', BN: 'ঢাকা ও চট্টগ্রামে যেকোনো জরুরি সেবায় ভেরিফাইড প্লাম্বার, ইলেকট্রিশিয়ান ও এসি মেকানিক প্রস্তুত।' },
  warranty7Days: { EN: '7-Day Service Warranty', BN: '৭ দিনের সার্ভিস ওয়ারেন্টি' },
  verifiedNID: { EN: 'Police & NID Verified', BN: 'পুলিশ ও এনআইডি ভেরিফাইড' },
  noHiddenCharges: { EN: 'No Hidden Charges', BN: 'কোনো গোপন খরচ নেই' },
  bookElectricianNow: { EN: 'Book Electrician Now', BN: 'ইলেকট্রিশিয়ান বুক করুন' },
  bookEmergencyPlumber: { EN: 'Book Emergency Plumber', BN: 'জরুরি প্লাম্বার বুক করুন' },

  // 1. Services Electrical & House Wiring Carousel
  electricalWiringTitle: { EN: 'Expert Electrical & House Wiring', BN: 'ইলেকট্রিক্যাল ও হাউস ওয়ারিং সার্ভিস' },
  homeElectricalTitle: { EN: 'Expert Home Electrical Service', BN: 'এক্সপার্ট হোম ইলেকট্রিক্যাল সার্ভিস' },
  homeElectricalSub: { EN: 'From installing ceiling fans and smart lights to repairing short circuits or...', BN: 'ফ্যান ও লাইট ফিটিং থেকে শর্ট সার্কিট মেরামতের সম্পূর্ণ সমাধান।' },
  fanFittingTitle: { EN: 'Ceiling Fan, Chandelier & Light Fitting', BN: 'সিলিং ফ্যান, ঝাড়বাতি ও লাইট ফিটিং' },
  fanFittingSub: { EN: 'Safe installation and replacement of ceiling fans, chandeliers, spotlights...', BN: 'সিলিং ফ্যান, ঝাড়বাতি ও স্পটলাইট ইনস্টলেশন সার্ভিস।' },
  circuitBreakerTitle: { EN: 'Circuit Breaker & DB Box Upgrade', BN: 'সার্কিট ব্রেকার ও ডিবি বক্স আপগ্রেড' },
  circuitBreakerSub: { EN: 'Fix main power tripping issues, MCB replacement & electrical safety audit.', BN: 'মেইন পাওয়ার ট্রিপিং সমাধান ও এমসিবি রিপ্লেসমেন্ট।' },
  upsWiringTitle: { EN: 'UPS, Inverter & Generator Wiring', BN: 'ইউপিএস, ইনভার্টার ও জেনারেটর ওয়ারিং' },
  upsWiringSub: { EN: 'Backup power wiring for IPS/UPS and home generator auto switch.', BN: 'আইপিএস, ইউপিএস ও হোম জেনারেটর অটো সুইচের সার্ভিস।' },
  smartSwitchTitle: { EN: 'Smart Switch & Home Automation', BN: 'স্মার্ট সুইচ ও হোম অটোমেশন' },
  smartSwitchSub: { EN: 'Convert existing switches to smart WiFi touch panels & mobile app controls.', BN: 'সাধারণ সুইচকে স্মার্ট ওয়াইফাই টাচ প্যানেলে রূপান্তর।' },

  // 2. Services Home Deep Cleaning & Pest Eradication
  cleaningPestTitle: { EN: 'Home Deep Cleaning & Pest Eradication', BN: 'হোম ডিপ ক্লিনিং ও পেস্ট কন্ট্রোল' },
  sofaWashTitle: { EN: 'Sofa, Mattress & Carpet Shampoo Wash', BN: 'সোফা, ম্যাট্রেস ও কার্পেট শ্যাম্পু ওয়াশ' },
  sofaWashSub: { EN: 'Deep fabric & leather extraction wash for sofas, dining chairs, luxury carpets, and...', BN: 'সোফা, ডাইনিং চেয়ার ও দামি কার্পেটের শ্যাম্পু ওয়াশ।' },
  kitchenDegreaseTitle: { EN: 'Kitchen Deep Degreasing & Exhaust Cleaning', BN: 'কিচেন ডিপ ডিগ্রিজিং ও এক্সজস্ট ক্লিনিং' },
  kitchenDegreaseSub: { EN: 'Intense chemical scrub to dissolve stubborn kitchen oil grease from...', BN: 'কিচেনের কঠিন তেলের দাগ ও এক্সজস্ট ফ্যান ওয়াশ সার্ভিস।' },
  bathroomScrubTitle: { EN: 'Bathroom Deep Scrub & Mold Removal', BN: 'বাথরুম ডিপ স্ক্রাব ও মেঝের দাগ পরিষ্কার' },
  bathroomScrubSub: { EN: 'Acid-free tile scrubbing, glass partition descaling & germ disinfection.', BN: 'টাইলস ওয়াশ, গ্লাস ওয়াশ ও জীবাণুমুক্তকরণ সার্ভিস।' },
  pestControlTitle: { EN: 'Cockroach & Termite Pest Control', BN: 'তেলাপোকা ও উইপোকা পেস্ট কন্ট্রোল' },
  pestControlSub: { EN: 'Odorless herbal gel pest control treatment with 6 months warranty.', BN: 'গন্ধহীন হার্বাল জেল পেস্ট কন্ট্রোল ৬ মাসের ওয়ারেন্টি সহ।' },
  fullHomeCleanTitle: { EN: 'Full Home Sanitization & Deep Clean', BN: 'সম্পূর্ণ ঘর স্যানিটাইজেশন ও ডিপ ক্লিন' },
  fullHomeCleanSub: { EN: 'Complete floor buffing, window cleaning & room sanitization.', BN: 'পুরো ঘর ফ্লোর বাফিং, গ্লাস ও ঘর স্যানিটাইজেশন।' },

  // 3. Services Carpentry, Wall Painting & Fitting
  carpentryPaintingTitle: { EN: 'Carpentry, Wall Painting & Fitting', BN: 'কার্পেন্ট্রি, ওয়াল পেইন্টিং ও ফিটিং' },
  doorRepairTitle: { EN: 'Door Lock, Hinge & Wooden Furniture Repair', BN: 'ডোর লক, কবজা ও কাঠের ফার্নিচার মেরামত' },
  doorRepairSub: { EN: 'Experienced carpenter for jammed wooden doors, cylinder lock...', BN: 'কাঠের দরজা জ্যাম, লক পরিবর্তন ও ফার্নিচার মেরামত সার্ভিস।' },
  wallPaintingTitle: { EN: 'Interior & Exterior Wall Painting Service', BN: 'ইনটেরিয়র ও এক্সটেরিয়র ওয়াল পেইন্টিং' },
  wallPaintingSub: { EN: 'Premium home painting with Berger or Asian Paints. Includes putty plaster...', BN: 'বার্জার বা এশিয়ান পেইন্টস দিয়ে প্রিমিয়াম হোম পেইন্টিং।' },
  kitchenCabinetTitle: { EN: 'Modular Kitchen Cabinet Fitting', BN: 'মডুলার কিচেন কেবিনেট ফিটিং' },
  kitchenCabinetSub: { EN: 'Custom wooden cabinet alignment, drawer channels & hydraulic hinge fix.', BN: 'কাঠের কেবিনেট ফিটিং, ড্রয়ার চ্যানেল ও হিঞ্জ ফিক্সিং।' },
  tvMountTitle: { EN: 'TV Mount, Wall Shelf & Curtain Fitting', BN: 'টিভি মাউন্ট, ওয়াল শেলফ ও পর্দা ফিটিং' },
  tvMountSub: { EN: 'Heavy-duty wall drilling for LED TVs, wall art, shelves & curtain rods.', BN: 'এলইডি টিভি, ওয়াল আর্ট, শেলফ ও পর্দা ফিটিং সার্ভিস।' },
  wallpaperDampTitle: { EN: 'Wallpaper Installation & Damp Proofing', BN: 'ওয়ালপেপার ইনস্টলেশন ও ড্যাম ওয়াশ' },
  wallpaperDampSub: { EN: 'Decorative 3D wallpaper fixing and anti-damp wall chemical treatment.', BN: '৩ডি ওয়ালপেপার ফিটিং এবং দেয়ালের ড্যামেজ প্রতিরোধ।' },

  // 4. Services Personal Care & Home Salon
  personalSalonTitle: { EN: 'Personal Care & Home Salon', BN: 'পার্সোনাল কেয়ার ও হোম স্যালন' },
  mensHaircutTitle: { EN: "Men's Haircut, Beard Grooming & Face Tan Clear", BN: 'পুরুষদের হেয়ারকাট, বিয়ার্ড গ্রুমিং ও ফেস কেয়ার' },
  mensHaircutSub: { EN: 'Professional salon experience at the comfort of your home. Hygienic...', BN: 'ঘরে বসেই পেশাদার সেলুন অভিজ্ঞতা ও হাইজেনিক গ্রুমিং।' },
  womensFacialTitle: { EN: "Women's Facial Glow & Spa Treatment", BN: 'নারীদের ফেসিয়াল গ্লো ও স্পা ট্রিটমেন্ট' },
  womensFacialSub: { EN: 'Relaxing herbal facial with deep steam, blackhead extraction, gold...', BN: 'হার্বাল ফেসিয়াল, স্টিম, ব্ল্যাকহেড রিমুভাল ও গোল্ড স্পা।' },
  maniPediTitle: { EN: 'Mani-Pedi Spa & Gel Nail Polish', BN: 'ম্যানিকিউর-পেডিকিউর স্পা ও নেল পোলিশ' },
  maniPediSub: { EN: 'Exfoliating foot scrub, nail shaping, cuticles cleanup & premium polish.', BN: 'স্ক্রাব, নেল শেপিং, কিউটিকেল ক্লিনআপ ও পোলিশ।' },
  bodyMassageTitle: { EN: 'Full Body Oil Massage & Relaxation', BN: 'ফুল বডি অয়েল ম্যাসেজ ও রিল্যাক্সেশন' },
  bodyMassageSub: { EN: 'Therapeutic Ayurvedic body massage by certified male/female therapists.', BN: 'সার্টিফাইড থেরাপিস্ট দ্বারা আয়ুর্বেদিক ফুল বডি ম্যাসেজ।' },
  hairColorTitle: { EN: 'Hair Color, Spa & Rebonding Treatment', BN: 'হেয়ার কালার, স্পা ও রিবন্ডিং ট্রিটমেন্ট' },
  hairColorSub: { EN: "L'Oreal ammonia-free hair coloring, deep keratin spa & hair repair.", BN: 'অ্যামোনিয়া-মুক্ত হেয়ার কালার, ক্যারাটিন স্পা ও হেয়ার কেয়ার।' },

  // 5. Services Laundry & Doorstep Services
  laundryDoorstepTitle: { EN: 'Laundry & Doorstep Services', BN: 'লন্ড্রি ও ডোরস্টেপ সার্ভিসেস' },
  laundryWashTitle: { EN: 'Premium Laundry (Wash, Fold & Iron)', BN: 'প্রিমিয়াম লন্ড্রি (ওয়াশ, ফোল্ড ও আইরন)' },
  laundryWashSub: { EN: 'Save your weekends! We collect your dirty clothes, wash them with premium...', BN: 'আমরা কাপড় সংগ্রহ করে প্রিমিয়াম ডিটারজেন্ট দিয়ে ধুয়ে আয়রন করে দিই।' },
  carWashTitle: { EN: 'Doorstep Car Foam Wash & Interior Vacuum Polish', BN: 'গাড়ির ফোম ওয়াশ ও ইন্টেরিয়র ভ্যাকুয়াম পলিশ' },
  carWashSub: { EN: 'High-pressure snow foam wash, dashboard UV conditioning, floor...', BN: 'হাই-প্রেসার ফোম ওয়াশ, ড্যাশবোর্ড কন্ডিশনিং ও ফ্লোর পলিশ।' },
  dryCleanTitle: { EN: 'Dry Cleaning for Sarees, Suits & Blazers', BN: 'শাড়ি, স্যুট ও ব্লেজারের ড্রাই ক্লিনিং' },
  dryCleanSub: { EN: 'Gentle chemical dry clean for delicate designer sarees, suits & heavy coats.', BN: 'ডিজাইনার শাড়ি, স্যুট ও ব্লেজারের কেমিক্যাল ড্রাই ক্লিন।' },
  shoeLaundryTitle: { EN: 'Shoe Laundry & Leather Care Polish', BN: 'জুতো লন্ড্রি ও লেদার কেয়ার পলিশ' },
  shoeLaundrySub: { EN: 'Deep sneaker cleaning, sole stain removal & leather boot waxing.', BN: 'স্নিঙ্কার ক্লিন, সোলের দাগ দূরীকরণ ও লেদার ওয়াক্স পলিশ।' },
  bikeWashTitle: { EN: 'Bike Pressure Wash & Chain Lube Service', BN: 'বাইক প্রেসার ওয়াশ ও চেইন লুব সার্ভিস' },
  bikeWashSub: { EN: 'Doorstep motorcycle foam wash, chain cleaning & ceramic wax shine.', BN: 'মোটরসাইকেল ফোম ওয়াশ, চেইন ক্লিনিং ও সেরামিক ওয়াক্স।' },

  // Services Subscription Packages
  subBadgeTag: { EN: 'SERVICE SUBSCRIPTION PACKAGES', BN: 'সার্ভিস সাবস্ক্রিপশন প্যাকেজ' },
  subHeadline: { EN: 'Build Your Own Service Plan', BN: 'আপনার নিজের সার্ভিস প্ল্যান তৈরি করুন' },
  subSubhead: { EN: 'Flexible subscription plans designed for absolute peace of mind. Choose which services you receive each month with absolute pricing transparency.', BN: 'ফ্লেক্সিবল সাবস্ক্রিপশন প্ল্যান কাস্টমাইজ করুন পূর্ণ স্বচ্ছতার সাথে। প্রতি মাসে প্রয়োজনীয় সার্ভিসগুলো বুক করুন সহজেই।' },
  monthlyBilling: { EN: 'MONTHLY BILLING', BN: 'মাসিক বিলিং' },
  monthlySubTitle: { EN: 'Monthly Subscription', BN: 'মান্থলি সাবস্ক্রিপশন' },
  monthlySubDetail: { EN: 'Flexible model • Cancel anytime', BN: 'ফ্লেক্সিবল মডেল • যেকোনো সময় বাতিল সুবিধা' },
  flexVisitHeader: { EN: 'FLEXIBLE VISIT MODEL', BN: 'ফ্লেক্সিবল ভিজিট মডেল' },
  flexVisitText: { EN: 'Base inspection visit starts at ৳400 per visit (e.g. standard AC checkup or servicing). Any additional components, spare parts, or deep repairs on-site can be added dynamically to your service bill by our technician.', BN: 'বেসিক ইনস্পেকশন সার্ভিস ফি ৳৪০০/ভিজিট। অতিরিক্ত কোনো পার্টস বা বিশেষ কাজ দরকার হলে টেকনিশিয়ান পেজেই বিল যোগ করতে পারবেন।' },
  mFeature1: { EN: '4 customized service visits per month', BN: 'প্রতি মাসে ৪টি কাস্টমাইজড সার্ভিস ভিজিট' },
  mFeature2: { EN: 'Base visit price around ৳400/visit included', BN: 'বেসিক ভিজিট চার্জ অন্তর্ভুক্ত' },
  mFeature3: { EN: 'Technicians can add parts & extra tasks dynamically', BN: 'পার্টস ও অতিরিক্ত কাজ সরাসরি বিলে যুক্ত করার সুবিধা' },
  mFeature4: { EN: '7-day service warranty for every visit', BN: 'প্রতিটি ভিজিটে ৭ দিনের সার্ভিস ওয়ারেন্টি' },
  mFeature5: { EN: 'Verified & background-checked professionals', BN: 'ভেরিফাইড ও প্রফেশনালস টেকনিশিয়ান' },
  mFeature6: { EN: 'Free rescheduling & priority bookings', BN: 'ফ্রি শিডিউলিং ও অগ্রাধিকার বুকিং' },
  buyMonthlyPlan: { EN: 'BUY MONTHLY PLAN', BN: 'মান্থলি প্ল্যান নিন' },
  yearlyBilling: { EN: 'ANNUAL BILLING', BN: 'বার্ষিক বিলিং' },
  save17Percent: { EN: 'SAVE 17%', BN: '১৭% ছাড়' },
  yearlySubTitle: { EN: 'Yearly Subscription', BN: 'ইয়ারলি সাবস্ক্রিপশন' },
  yearlySubDetail: { EN: 'Billed annually • Saves ৳2,989', BN: 'বার্ষিক বিলিং • ৳২,৯৮৯ সাশ্রয়' },
  annualCoverageHeader: { EN: 'PREMIUM ANNUAL COVERAGE', BN: 'প্রিমিয়াম অ্যানুয়াল কাভারেজ' },
  yFeature1: { EN: '48 total visits (4 per month for 12 months)', BN: 'মোট ৪৮টি সার্ভিস ভিজিট (প্রতি মাসে ৪টি)' },
  yFeature2: { EN: '10 customizable visits + 38 standard bookings', BN: '১০টি কাস্টমাইজড ভিজিট + ৩৮টি স্ট্যান্ডার্ড বুকিং' },
  yFeature3: { EN: 'Base visit price around ৳400/visit included', BN: 'বেসিক ভিজিট চার্জ অন্তর্ভুক্ত' },
  yFeature4: { EN: 'Technicians can add parts & extra tasks dynamically', BN: 'পার্টস ও অতিরিক্ত কাজ সরাসরি বিলে যুক্ত করার সুবিধা' },
  yFeature5: { EN: 'Free full-home safety & appliance checkup once a year', BN: 'বছরে ১ বার পুরো ঘরের ফ্রি সেফটি ও অ্যাপ্লায়েন্স চেকআপ' },
  yFeature6: { EN: 'Dedicated customer account manager & instant support', BN: 'ডেডিকেটেড একাউন্ট ম্যানেজার ও ইনস্ট্যান্ট সাপোর্ট' },
  buyYearlyPlan: { EN: 'BUY YEARLY PLAN', BN: 'ইয়ারলি প্ল্যান নিন' },

  // Services Assurance & Guarantee
  damageCoverTitle: { EN: '৳10,000 Damage Cover', BN: '৳১০,০০০ টাকার ড্যামেজ কাভারেজ' },
  damageCoverSub: { EN: 'Your home safety is our priority. In case of any accidental damage during service, we cover up to ৳10,000.', BN: 'আপনার হোম সেফটি আমাদের অগ্রাধিকার। সার্ভিসিংকালীন দুর্ঘটনাবশত ক্ষতিতে আমরা ৳১০,০০০ পর্যন্ত কাভারেজ দিয়ে থাকি।' },
  bgCheckedProsTitle: { EN: 'Background Checked Pros', BN: 'ব্যাকগ্রাউন্ড ভেরিফাইড প্রফেশনালস' },
  bgCheckedProsSub: { EN: 'Every service professional undergoes police verification, NID checks, and practical skills training.', BN: 'প্রতিটি সার্ভিস প্রফেশনালের পুলিশ ভেরিফিকেশন, জাতীয় পরিচয়পত্র যাচাই ও প্র্যাকটিক্যাল ট্রেনিং সম্পন্ন করা হয়।' },
  warranty7DaysAssuranceTitle: { EN: '7-Day Service Warranty', BN: '৭ দিনের সার্ভিস ওয়ারেন্টি' },
  warranty7DaysAssuranceSub: { EN: 'Not satisfied with the repair or cleaning? We offer a free-of-cost re-service check within 7 days of booking.', BN: 'সার্ভিসিং বা ক্লিনিং নিয়ে অসন্তুষ্ট? বুকিংয়ের ৭ দিনের মধ্যে ফ্রি রি-সার্ভিসিং চেক সুবিধা।' },

  // Grocery Hero Section
  eatFreshLiveHealthy: { EN: 'EAT FRESH, LIVE HEALTHY', BN: 'টাটকা খান, সুস্থ থাকুন' },
  groceryHeroHeadline1: { EN: 'Fresh Groceries Delivered to', BN: 'সতেজ মুদি সামগ্রী পৌছে যাবে' },
  groceryHeroHeadline2: { EN: 'Your Doorstep', BN: 'আপনার দোরগোড়ায়' },
  groceryHeroSub: {
    EN: 'Your one-stop shop for daily essentials, fruits, vegetables, and more.',
    BN: 'নিত্যপ্রয়োজনীয় জিনিসপত্র, সতেজ ফলমূল, শাকসবজি ও মুদি সামগ্রীর নির্ভরযোগ্য দোকান।',
  },
  shopNow: { EN: 'SHOP NOW', BN: 'এখনই কেনাকাটা করুন' },
  fresh100Title: { EN: '100% FRESH', BN: '১০০% টাটকা' },
  fresh100Sub: { EN: 'Quality You Can Trust', BN: 'বিশ্বস্ত সেরা মান' },
  freeDeliveryTitle: { EN: 'FREE DELIVERY', BN: 'ফ্রি ডেলিভারি' },
  freeDeliverySub: { EN: 'On Orders Over ৳499', BN: '৳৪৯৯+ এর অর্ডারে' },
  securePaymentTitle: { EN: 'SECURE PAYMENT', BN: 'নিরাপদ পেমেন্ট' },
  securePaymentSub: { EN: '100% Safe & Secure', BN: '১০০% নিরাপদ ও সুরক্ষিত' },
  easyReturnsTitle: { EN: 'EASY RETURNS', BN: 'সহজ রিটার্ন' },
  easyReturnsSubTitle: { EN: 'Hassle-Free Returns', BN: 'ঝামেলামুক্ত রিটার্ন' },
  unileverWeekTitle: { EN: 'UNILEVER WEEK', BN: 'ইউনিলিভার উইক' },
  hotTrendingTitle: { EN: 'HOT & TRENDING RIGHT NOW', BN: 'হট ও ট্রেন্ডিং প্রডাক্ট' },
  todaysFeaturedTitle: { EN: "TODAY'S FEATURED FINDS", BN: 'আজকের সেরা নির্বাচন' },
  freshMeatTitle: { EN: 'Fresh', BN: 'তাজা' },
  meatHeadline: { EN: 'Meat', BN: 'মাংস' },
  freshFishTitle: { EN: 'Fresh', BN: 'তাজা' },
  fishHeadline: { EN: 'Fish', BN: 'মাছ' },
  halalBadge: { EN: '100% HALAL', BN: '১০০% হালাল' },
  riverFreshBadge: { EN: 'RIVER FRESH', BN: 'নদীর টাটকা' },
  dailyPantryStaples: { EN: '⚡ DAILY PANTRY STAPLES', BN: '⚡ প্রতিদিনের প্রয়োজনীয় মসলা' },
  stockUpEssentials: { EN: 'STOCK UP ON\nESSENTIALS', BN: 'প্রয়োজনীয় মুদি সামগ্রী\nসংগ্রহ করুন' },
  essentialsSub: {
    EN: 'Authentic spices, lentils, pure chickpea besan, and premium nuts for everyday cooking.',
    BN: 'দৈনন্দিন রান্নার জন্য খাঁটি মসলা, ডাল, ছোলার বেসন এবং প্রিমিয়াম বাদামের কালেকশন।',
  },
  pureFreshPackets: { EN: 'PURE & FRESH PACKETS', BN: 'খাঁটি ও ফ্রেশ প্যাকেট' },
  spicesBesanNutsCol: { EN: 'Spices, Besan & Nuts Collection', BN: 'মসলা, বেসন ও বাদামের কালেকশন' },
  upTo25Off: { EN: 'UP TO 25% OFF', BN: '২৫% পর্যন্ত ছাড়' },
  dailyOfferTag: { EN: 'DAILY OFFER', BN: 'দৈনিক অফার' },
  freshVegHeadline: { EN: 'Fresh Organic Vegetables Up to 30% Off', BN: 'সতেজ অর্গানিক শাকসবজিতে ৩০% পর্যন্ত ছাড়' },
  freshVegSub: { EN: 'Harvested daily, delivered in 1 hour. Get the finest freshness on your plate.', BN: 'প্রতিদিন টাটকা সংগৃহীত, ১ ঘণ্টায় ডেলিভারি। খাবারের থালায় নিন সেরা সতেজতা।' },
  shopVegBtn: { EN: 'Shop Vegetables', BN: 'সবজি কিনুন' },
  seasonalSpecialTag: { EN: 'SEASONAL SPECIAL', BN: 'সিজনাল স্পেশাল' },
  freshFruitsFest: { EN: 'Fresh Fruits Festival', BN: 'তাজা ফলমূলের ফেস্টিভ্যাল' },
  freshFruitsSub: { EN: 'Healthy choices for your family. Buy 1 Get 1 Free on selected fresh fruits.', BN: 'পরিবারের সুস্থতায় টাটকা ফল। নির্বাচিত ফলে একটি কিনলে একটি ফ্রি।' },
  exploreFruitsBtn: { EN: 'Explore Fruits', BN: 'ফলমূল দেখুন' },
  freshPicksTitle: { EN: 'Fresh Picks', BN: 'ফার্মের সতেজ প্রডাক্ট' },
  freshPicksSub: { EN: 'Harvested and sourced fresh daily from farms.', BN: 'প্রতিদিন সরাসরি ফার্ম থেকে সতেজভাবে সংগৃহীত।' },
  freshPicksCount: { EN: '14 Items', BN: '১৪টি প্রডাক্ট' },
  dailyEssentialsTitle: { EN: 'Daily Essentials', BN: 'নিত্যদিনের প্রয়োজনীয়' },
  dailyEssentialsSub: { EN: 'Pantry staples, dairy products, and oils.', BN: 'প্যান্ট্রি সামগ্রী, দুগ্ধজাত পণ্য ও রান্নার তেল।' },
  dailyEssentialsCount: { EN: '16 Items', BN: '১৬টি প্রডাক্ট' },
  expressFastDelivery: { EN: 'Express Fast Delivery', BN: 'এক্সপ্রেস ফাস্ট ডেলিভারি' },
  expressFastDeliverySub: { EN: 'Swift delivery directly to your doorstep', BN: 'সরাসরি আপনার দোরগোড়ায় দ্রুত ডেলিভারি' },
  genuineFresh: { EN: '100% Genuine & Fresh', BN: '১০০% অরিজিনাল ও টাটকা' },
  genuineFreshSub: { EN: 'Directly sourced from verified merchants', BN: 'সরাসরি বিশ্বস্ত মার্চেন্ট থেকে সংগৃহীত' },
  secureEasyPayment: { EN: 'Secure & Easy Payment', BN: 'নিরাপদ ও সহজ পেমেন্ট' },
  secureEasyPaymentSub: { EN: 'bKash, Nagad, Cards & Cash on Delivery', BN: 'বিকাশ, নগদ, কার্ড ও ক্যাশ অন ডেলিভারি' },
  support247Dedicated: { EN: '24/7 Dedicated Support', BN: '২৪/৭ ডেডিকেটেড সাপোর্ট' },
  support247DedicatedSub: { EN: 'Instant support assistance anytime', BN: 'যেকোনো সময় ইনস্ট্যান্ট সাপোর্ট সুবিধা' },
  bigFlavorFastDelivery: { EN: '// Big Flavor. Fast Delivery. //', BN: '// সেরা স্বাদ। দ্রুত ডেলিভারি। //' },
  fastFoodTitle: { EN: 'FAST FOOD ', BN: 'ফাস্ট ফুড ' },
  madeFreshForYou: { EN: 'MADE FRESH, MADE FOR YOU!', BN: 'তাজা ও সতেজ, আপনার জন্য তৈরি!' },
  foodHeroSub: {
    EN: 'Delicious meals made with quality ingredients and delivered fast to your door.',
    BN: 'উন্নত উপাদান দিয়ে তৈরি সুস্বাদু খাবার দ্রুত পৌছে যাবে আপনার দোরগোড়ায়।',
  },
  orderOnline: { EN: 'ORDER ONLINE', BN: 'অনলাইনে অর্ডার করুন' },
  viewMenu: { EN: 'VIEW MENU', BN: 'মেনু দেখুন' },
  joinHappyCustomers: { EN: 'Join 25,000+ Happy Customers', BN: '২৫,০০০+ সন্তুষ্ট গ্রাহকের সাথে যুক্ত হোন' },
  foodFastDelivery: { EN: 'FAST DELIVERY', BN: 'দ্রুত ডেলিভারি' },
  foodFastDeliverySub: { EN: 'Lightning fast delivery at your doorstep.', BN: 'আপনার দোরগোড়ায় দ্রুততম ডেলিভারি।' },
  foodFreshIngredients: { EN: 'FRESH INGREDIENTS', BN: 'সতেজ উপাদান' },
  foodFreshIngredientsSub: { EN: 'We use only the freshest and highest quality ingredients.', BN: 'আমরা কেবল তাজা ও সেরা উপাদান ব্যবহার করি।' },
  foodHotTasty: { EN: 'HOT & TASTY', BN: 'গরম ও সুস্বাদু' },
  foodHotTastySub: { EN: 'Prepared hot and packed with bold, delicious flavors.', BN: 'গরম ও সুস্বাদু স্বাদে পরিবেশন করা হয়।' },
  foodBestPrices: { EN: 'BEST PRICES', BN: 'সেরা মূল্য' },
  foodBestPricesSub: { EN: 'Great food, pocket friendly prices for everyone.', BN: 'সবার জন্য বাজেট ফ্রেন্ডলি সেরা সুস্বাদু খাবার।' },
  cravingDeliciousHeadline: { EN: 'Craving delicious food right now? Order now & get 20% OFF on your first food delivery order!', BN: 'সুস্বাদু খাবার খেতে ইচ্ছে করছে? এখনই অর্ডার করে ১ম অর্ডারে পান ২০% ছাড়!' },
  seeExclusiveOffers: { EN: 'SEE ALL EXCLUSIVE OFFERS', BN: 'সব অফারসমূহ দেখুন' },
  popularCategoriesTitle: { EN: 'POPULAR CATEGORIES', BN: 'জনপ্রিয় ক্যাটাগরি' },
  royalIftarFestTitle: { EN: 'ROYAL IFTAR FESTIVAL', BN: 'রয়্যাল ইফতার ফেস্টিভ্যাল' },
  royalIftarFestSub: { EN: 'Break your fast with authentic biryani, haleem, kebabs & fresh drinks.', BN: 'খাঁটি বিরিয়ানি, হালিম, কাবাব ও সতেজ ড্রিংকস দিয়ে ইফতার করুন।' },
  exploreFestivalOffers: { EN: 'EXPLORE FESTIVAL OFFERS', BN: 'ফেস্টিভ্যাল অফার দেখুন' },
  buy1Get1Free: { EN: 'BUY 1 GET 1 FREE', BN: '১টি কিনলে ১টি ফ্রি' },
  onSelectedPizzasBurgers: { EN: 'On Selected Pizza & Burgers', BN: 'নির্বাচিত পিৎজা ও বার্গারে' },
  orderNowBtn: { EN: 'ORDER NOW', BN: 'অর্ডার করুন' },
  flat30Off: { EN: 'FLAT 30% OFF', BN: 'ফ্ল্যাট ৩০% ছাড়' },
  onBiryaniKacchi: { EN: 'On Biryani & Kacchi Items', BN: 'বিরিয়ানি ও কাচ্চি আইটেমে' },
  claimDealBtn: { EN: 'CLAIM DEAL', BN: 'অফার নিন' },
  popularKitchensTitle: { EN: 'Popular Kitchens', BN: 'জনপ্রিয় রেস্তোরাঁ ও কিচেন' },
  popularBiryaniTitle: { EN: 'Popular Biryani & Rice Dishes', BN: 'জনপ্রিয় বিরিয়ানি ও রাইস ডিস' },
  nightOwlDealsTitle: { EN: 'NIGHT OWL FLASH DEALS', BN: 'নাইট আউল ফ্ল্যাশ ডিল' },
  fastFoodBurgersTitle: { EN: 'Authentic Fast Food & Burgers', BN: 'অরিজিনাল ফাস্ট ফুড ও বার্গার' },
  heavyDiscountCombosTitle: { EN: 'Heavy Discount Meals & Value Combos', BN: 'বিশেষ ছাড় ও ভ্যালু কম্বো মিল' },
  dessertsShakesTitle: { EN: 'Desserts, Shakes & Sweet Treats', BN: 'ডেজার্ট, শেক ও মিষ্টি আইটেম' },
  favouriteCuisinesTitle: { EN: 'Favourite Cuisines', BN: 'পছন্দের খাবার' },
  allCuisines: { EN: 'All Cuisines', BN: 'সব খাবার' },
  exploreAction: { EN: 'EXPLORE', BN: 'এক্সপলোর' },
  deliveryLocation: { EN: 'Delivery Location', BN: 'ডেলিভারি লোকেশন' },
  autoDetectLocation: { EN: 'Auto Detect Location', BN: 'অটো লোকেশন খুঁজুন' },
  defaultAddressText: {
    EN: 'Parashmoni laboratory school., 16, Road 27, Sector 7, Uttara, Dhaka, 1230, Bangladesh',
    BN: 'প্যারাসমনি ল্যাবরেটরি স্কুল, ১৬, রোড ২৭, সেক্টর ৭, উত্তরা, ঢাকা, ১২৩০, বাংলাদেশ',
  },

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
  groceryCategorySub: { EN: 'Fresh groceries & daily essentials delivered fast', BN: 'সতেজ মুদি সামগ্রী ও প্রয়োজনীয় পণ্য দ্রুত ডেলিভারি' },
  allCategories: { EN: 'All Categories', BN: 'সব ক্যাটাগরি' },
  catFreshFruits: { EN: 'Fresh Fruits', BN: 'তাজা ফলমূল' },
  catVegetables: { EN: 'Vegetables', BN: 'শাকসবজি' },
  catMeat: { EN: 'Meat & Fish', BN: 'মাংস ও মাছ' },
  catDairy: { EN: 'Dairy & Eggs', BN: 'দুধ ও ডিম' },
  catBakery: { EN: 'Bakery & Bread', BN: 'বেকারি ও রুটি' },
  catBeverages: { EN: 'Beverages', BN: 'পানীয়' },
  catElectronics: { EN: 'Electronics & Gadgets', BN: 'ইলেকট্রনিক্স ও গ্যাজেটস' },
  catFashion: { EN: 'Fashion & Apparel', BN: 'ফ্যাশন ও পোশাক' },
  catBeauty: { EN: 'Beauty & Personal Care', BN: 'বিউটি ও কেয়ার' },
  // Special Savings Promo Section
  specialSavingsTitle: { EN: 'Special Savings!', BN: 'বিশেষ ছাড় ও অফার!' },
  viewAllSpecialSavings: { EN: 'VIEW ALL SPECIAL SAVINGS', BN: 'সব বিশেষ ছাড় দেখুন' },
  bigSaleText: { EN: 'BIG SALE', BN: 'বিগ সেল' },

  // Happy Hour Flash Deals Section
  happyHourTitle: { EN: 'HAPPY HOUR!!!', BN: 'হ্যাপি আওয়ার!!!' },
  leftText: { EN: 'Left', BN: 'বাকি' },
  allDeals: { EN: 'All Deals', BN: 'সব অফার' },
  attaMaidaSuji: { EN: 'Atta Maida & Suji', BN: 'আটা, ময়দা ও সুজি' },
  dryVegetables: { EN: 'Dry Vegetables', BN: 'শুকনো শাকসবজি' },
  packedRice: { EN: 'Packed Rice', BN: 'প্যাকেট চাল' },
  oilGhee: { EN: 'Oil & Ghee', BN: 'তেল ও ঘি' },
  addBtnText: { EN: '+ Add', BN: '+ যোগ করুন' },
  happyHourSub: { EN: '10 Happy Hour grocery items on special discount', BN: 'বিশেষ ছাড়ে ১০টি হ্যাপি আওয়ার মুদি প্রডাক্ট' },

  // Snacks, Noodles & More Section
  snacksNoodlesTitle: { EN: 'SNACKS, NOODLES & MORE', BN: 'স্ন্যাকস, নুডুলস ও অন্যান্য' },
  itemsCountTag: { EN: '5 Items', BN: '৫টি পণ্য' },
  viewAllBtn: { EN: 'View All', BN: 'সব দেখুন' },

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

