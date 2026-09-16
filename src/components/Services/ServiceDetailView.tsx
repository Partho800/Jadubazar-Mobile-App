import React, { useState } from 'react';
import { View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useService } from '../../context/ServiceContext';
import { AppText as Text } from '../common/AppText';

export const ServiceDetailView: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const { selectedService, closeServiceDetails } = useService();

  // Booking Interactive State
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<number>(0);
  const [faqExpanded, setFaqExpanded] = useState<boolean>(false);

  if (!selectedService) return null;

  const breadcrumbs = selectedService.breadcrumb || [
    'HOME',
    'SERVICES',
    selectedService.categoryTag || 'OTHER',
    selectedService.title.split(' ')[0].toUpperCase(),
  ];

  const dateOptions = [
    { label: 'Today', date: 'Aug 15' },
    { label: 'Tomorrow', date: 'Aug 16' },
    { label: 'Monday', date: 'Aug 17' },
    { label: 'Tuesday', date: 'Aug 18' },
  ];

  const timeSlots = [
    '09:00 AM - 12:00 PM',
    '12:00 PM - 03:00 PM',
    '03:00 PM - 06:00 PM',
    '06:00 PM - 09:00 PM',
  ];

  const whatsIncluded = [
    'Home collection & doorstep delivery within 48 Hours',
    'Hygienic wash & softeners treatment',
    'Wrinkle-free steam iron',
    'Up to 10 pieces of clothes per bundle',
  ];

  return (
    <View className="w-full min-h-screen py-6">
      {/* 1. Breadcrumb Path Row */}
      <View className="w-full max-w-[1100px] self-center px-4 mb-2 flex-row items-center flex-wrap gap-1">
        {breadcrumbs.map((crumb, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && (
              <Text className="text-xs font-black text-slate-300 dark:text-slate-700 mx-1">
                /
              </Text>
            )}
            <Text className="text-xs font-black tracking-wider text-[#0F172A] dark:text-indigo-400 uppercase">
              {crumb}
            </Text>
          </React.Fragment>
        ))}
      </View>

      {/* Horizontal Divider Line */}
      <View className="w-full max-w-[1100px] self-center px-4 mb-6">
        <View className="w-full h-[2px] bg-[#0F172A] dark:bg-slate-700" />
      </View>

      {/* 2. Main Service Hero Image */}
      <View className="w-full max-w-[1100px] self-center px-4 mb-6">
        <View
          style={{ width: '100%', height: 360, minHeight: 260 }}
          className="rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 relative"
        >
          <Image
            source={{
              uri:
                selectedService.imageUrl ||
                'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=1200&q=80',
            }}
            style={{ width: '100%', height: '100%', minHeight: 260 }}
            resizeMode="cover"
          />
        </View>
      </View>

      {/* 3. Badges Row */}
      <View className="w-full max-w-[1100px] self-center px-4 mb-4 flex-row items-center flex-wrap gap-2.5">
        {/* Category Badge */}
        <View
          className={`px-4 py-1.5 rounded-full border ${
            isDarkMode
              ? 'bg-indigo-950/80 border-indigo-800'
              : 'bg-indigo-50 border-indigo-100/60'
          }`}
        >
          <Text className="text-indigo-600 dark:text-indigo-300 font-extrabold text-xs uppercase tracking-wider">
            {selectedService.categoryTag}
          </Text>
        </View>

        {/* Rating Badge */}
        <View
          className={`px-4 py-1.5 rounded-full border flex-row items-center gap-1.5 ${
            isDarkMode
              ? 'bg-slate-900 border-slate-800'
              : 'bg-slate-50 border-slate-200/60'
          }`}
        >
          <Ionicons name="star" size={15} color="#EAB308" />
          <Text
            className={`text-xs font-black ${
              isDarkMode ? 'text-slate-100' : 'text-[#0F172A]'
            }`}
          >
            {selectedService.rating}{' '}
            <Text className="font-bold text-slate-500 dark:text-slate-400">
              ({selectedService.reviewsCount || 95} reviews)
            </Text>
          </Text>
        </View>

        {/* Duration Badge */}
        <View
          className={`px-4 py-1.5 rounded-full border flex-row items-center gap-1.5 ${
            isDarkMode
              ? 'bg-slate-900 border-slate-800'
              : 'bg-slate-50 border-slate-200/60'
          }`}
        >
          <Ionicons
            name="time-outline"
            size={15}
            color={isDarkMode ? '#CBD5E1' : '#64748B'}
          />
          <Text
            className={`text-xs font-bold ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            Duration: {selectedService.duration}
          </Text>
        </View>
      </View>

      {/* 4. Service Title */}
      <View className="w-full max-w-[1100px] self-center px-4 mb-3">
        <Text
          className={`text-2xl sm:text-3xl lg:text-[34px] font-black leading-tight tracking-tight ${
            isDarkMode ? 'text-slate-50' : 'text-[#0F172A]'
          }`}
        >
          {selectedService.title}
        </Text>
      </View>

      {/* 5. Service Description */}
      <View className="w-full max-w-[1100px] self-center px-4 mb-8">
        <Text
          className={`text-sm sm:text-base font-medium leading-relaxed max-w-[850px] ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          {selectedService.description}
        </Text>
      </View>

      {/* ================= 6. WHAT'S INCLUDED IN THE SERVICE? ================= */}
      <View className="w-full max-w-[1100px] self-center px-4 mb-8">
        <View
          className={`w-full rounded-3xl p-6 sm:p-8 border ${
            isDarkMode
              ? 'bg-slate-900 border-slate-800'
              : 'bg-slate-50/80 border-slate-100'
          }`}
        >
          <Text
            className={`text-lg sm:text-xl font-black mb-5 ${
              isDarkMode ? 'text-slate-50' : 'text-[#0F172A]'
            }`}
          >
            What's Included in the Service?
          </Text>

          <View className="gap-3.5">
            {whatsIncluded.map((item, idx) => (
              <View key={idx} className="flex-row items-center gap-3">
                <View className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/80 items-center justify-center shrink-0">
                  <Ionicons name="checkmark" size={14} color="#059669" />
                </View>
                <Text
                  className={`text-xs sm:text-sm font-extrabold flex-1 ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-800'
                  }`}
                >
                  {item}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* ================= 7. ASSIGNED PROFESSIONAL DETAILS ================= */}
      <View className="w-full max-w-[1100px] self-center px-4 mb-8">
        <View
          className={`w-full rounded-3xl p-6 sm:p-8 border items-center text-center ${
            isDarkMode
              ? 'bg-slate-900 border-slate-800'
              : 'bg-slate-50/80 border-slate-100'
          }`}
        >
          <Text
            className={`text-lg sm:text-xl font-black mb-5 text-center ${
              isDarkMode ? 'text-slate-50' : 'text-[#0F172A]'
            }`}
          >
            Assigned Professional Details
          </Text>

          {/* Pro Avatar Image */}
          <View className="w-20 h-20 rounded-full overflow-hidden border-2 border-white dark:border-slate-700 shadow-md mb-3 bg-slate-200">
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
              }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          {/* Pro Name & Verified Badge */}
          <View className="flex-row items-center gap-2 mb-1.5">
            <Text
              className={`text-base sm:text-lg font-black ${
                isDarkMode ? 'text-slate-50' : 'text-[#0F172A]'
              }`}
            >
              Rana Laundry Store
            </Text>
            <View className="bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 flex-row items-center gap-1">
              <Ionicons name="person" size={11} color="#059669" />
              <Text className="text-emerald-700 dark:text-emerald-300 font-black text-[10px] uppercase">
                VERIFIED
              </Text>
            </View>
          </View>

          {/* Experience & Bookings Stats */}
          <View className="flex-row items-center gap-2 mb-3">
            <Text className="text-xs font-bold text-slate-400">
              Experience: 8 Years
            </Text>
            <Text className="text-xs font-black text-slate-300">•</Text>
            <Text className="text-xs font-bold text-slate-400">
              Bookings completed: 890+
            </Text>
          </View>

          {/* Pro Description */}
          <Text
            className={`text-xs font-medium text-center max-w-[500px] leading-relaxed ${
              isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Jadubazar vendor partner specializing in quick-turnaround clean clothing services.
          </Text>
        </View>
      </View>

      {/* ================= 8. CUSTOMER REVIEWS & FAQ ================= */}
      <View className="w-full max-w-[1100px] self-center px-4 mb-8">
        {/* Customer Reviews Section */}
        <Text
          className={`text-lg sm:text-xl font-black mb-4 ${
            isDarkMode ? 'text-slate-50' : 'text-[#0F172A]'
          }`}
        >
          Customer Reviews (1)
        </Text>

        <View
          className={`w-full rounded-3xl p-6 border mb-8 ${
            isDarkMode
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-100 shadow-sm'
          }`}
        >
          <View className="flex-row items-center justify-between mb-2">
            <Text
              className={`text-sm sm:text-base font-black ${
                isDarkMode ? 'text-slate-100' : 'text-slate-900'
              }`}
            >
              Arafat Sunny
            </Text>
            <Text className="text-xs font-semibold text-slate-400">
              15 Aug 2026
            </Text>
          </View>

          {/* 5 Stars */}
          <View className="flex-row items-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons key={star} name="star" size={14} color="#EAB308" />
            ))}
          </View>

          <Text
            className={`italic text-xs sm:text-sm font-medium ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            “Nicely packed in plastic and hangers. Smells amazing and ironed perfectly.”
          </Text>
        </View>

        {/* Frequently Asked Questions Section */}
        <Text
          className={`text-lg sm:text-xl font-black mb-4 ${
            isDarkMode ? 'text-slate-50' : 'text-[#0F172A]'
          }`}
        >
          Frequently Asked Questions
        </Text>

        <TouchableOpacity
          activeOpacity={0.88}
          onPress={() => setFaqExpanded(!faqExpanded)}
          className={`w-full rounded-2xl p-4 sm:p-5 border flex-row items-center justify-between ${
            isDarkMode
              ? 'bg-slate-900 border-slate-800'
              : 'bg-slate-50/80 border-slate-100'
          }`}
        >
          <Text
            className={`text-sm sm:text-base font-black flex-1 mr-2 ${
              isDarkMode ? 'text-slate-100' : 'text-slate-900'
            }`}
          >
            What happens to delicate silk or wool?
          </Text>
          <Ionicons
            name={faqExpanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={isDarkMode ? '#94A3B8' : '#334155'}
          />
        </TouchableOpacity>

        {faqExpanded && (
          <View
            className={`w-full p-4 rounded-b-2xl border-x border-b ${
              isDarkMode
                ? 'bg-slate-950 border-slate-800'
                : 'bg-white border-slate-100'
            }`}
          >
            <Text className="text-xs sm:text-sm font-medium text-slate-500 leading-relaxed">
              Delicate silk, wool, and designer fabrics are handled with special eco-friendly gentle washing cycles or dry cleaning to protect fabric color and softness.
            </Text>
          </View>
        )}
      </View>

      {/* ================= 9. BOOKING INTERACTIVE BOX (DATE & TIME PICKER) ================= */}
      <View className="w-full max-w-[1100px] self-center px-4 mb-10">
        <View
          className={`w-full rounded-3xl p-6 sm:p-8 border shadow-xl ${
            isDarkMode
              ? 'bg-slate-900 border-slate-800 shadow-none'
              : 'bg-white border-slate-100 shadow-slate-200/50'
          }`}
        >
          {/* Header Pricing */}
          <Text className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-1">
            BASE SERVICE CHARGE (VISITING FEE)
          </Text>
          <View className="flex-row items-baseline gap-2 mb-4">
            <Text
              className={`text-3xl sm:text-4xl font-black ${
                isDarkMode ? 'text-slate-50' : 'text-[#0F172A]'
              }`}
            >
              ৳{selectedService.price}
            </Text>
            <Text className="text-xs font-semibold text-slate-400">
              One-time visit (Payable Online)
            </Text>
          </View>

          <View className="w-full h-[1px] bg-slate-100 dark:bg-slate-800 mb-6" />

          {/* Date Picker Section */}
          <View className="flex-row items-center gap-2 mb-3">
            <Ionicons name="calendar-outline" size={18} color="#5B46F6" />
            <Text
              className={`text-sm sm:text-base font-black ${
                isDarkMode ? 'text-slate-100' : 'text-slate-800'
              }`}
            >
              Select Service Date
            </Text>
          </View>

          <View className="flex-row flex-wrap justify-between gap-3 mb-6">
            {dateOptions.map((opt, idx) => {
              const isSelected = selectedDateIndex === idx;
              return (
                <TouchableOpacity
                  key={idx}
                  activeOpacity={0.8}
                  onPress={() => setSelectedDateIndex(idx)}
                  className={`w-[48%] sm:w-[23.5%] py-3 px-4 rounded-2xl border items-center justify-center ${
                    isSelected
                      ? 'border-2 border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/60'
                      : isDarkMode
                      ? 'border-slate-800 bg-slate-950'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <Text
                    className={`font-black text-sm mb-0.5 ${
                      isSelected
                        ? 'text-indigo-600 dark:text-indigo-300'
                        : isDarkMode
                        ? 'text-slate-100'
                        : 'text-slate-800'
                    }`}
                  >
                    {opt.label}
                  </Text>
                  <Text className="text-[11px] font-semibold text-slate-400">
                    {opt.date}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Time Slot Picker Section */}
          <View className="flex-row items-center gap-2 mb-3">
            <Ionicons name="time-outline" size={18} color="#5B46F6" />
            <Text
              className={`text-sm sm:text-base font-black ${
                isDarkMode ? 'text-slate-100' : 'text-slate-800'
              }`}
            >
              Select Time Slot
            </Text>
          </View>

          <View className="flex-row flex-wrap justify-between gap-3 mb-6">
            {timeSlots.map((slot, idx) => {
              const isSelected = selectedTimeIndex === idx;
              return (
                <TouchableOpacity
                  key={idx}
                  activeOpacity={0.8}
                  onPress={() => setSelectedTimeIndex(idx)}
                  className={`w-[48%] sm:w-[23.5%] py-3 px-3 rounded-2xl border items-center justify-center ${
                    isSelected
                      ? 'border-2 border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/60'
                      : isDarkMode
                      ? 'border-slate-800 bg-slate-950'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <Text
                    className={`font-black text-xs text-center ${
                      isSelected
                        ? 'text-indigo-600 dark:text-indigo-300'
                        : isDarkMode
                        ? 'text-slate-200'
                        : 'text-slate-800'
                    }`}
                  >
                    {slot}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Free Cancellation Banner */}
          <View className="bg-sky-50/80 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/60 rounded-2xl p-4 flex-row items-center gap-3 mb-5">
            <Ionicons name="shield-checkmark" size={20} color="#0284C7" />
            <Text className="text-xs font-bold text-slate-700 dark:text-slate-300 flex-1 leading-relaxed">
              Free cancellation up to 4 hours before scheduled timing slot. Fully background verified.
            </Text>
          </View>

          {/* Additional Work Billing Warning */}
          <View className="bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 rounded-2xl p-4 flex-row items-start gap-3 mb-6">
            <Ionicons
              name="warning-outline"
              size={20}
              color="#D97706"
              style={{ marginTop: 1 }}
            />
            <View className="flex-1">
              <Text className="text-xs font-black uppercase text-amber-900 dark:text-amber-400 mb-0.5">
                ADDITIONAL WORK BILLING
              </Text>
              <Text className="text-xs font-medium text-amber-800/90 dark:text-amber-300/90 leading-relaxed">
                This is the base visiting fee. Additional labor & parts charge will be calculated by the service pro after inspecting the task at your home.
              </Text>
            </View>
          </View>

          {/* Main Book Service Button */}
          <TouchableOpacity
            activeOpacity={0.88}
            className="w-full bg-[#5B46F6] hover:bg-indigo-600 py-4 rounded-2xl flex-row items-center justify-center gap-2 shadow-lg shadow-indigo-500/40"
          >
            <Ionicons name="bag-handle-outline" size={20} color="#FFFFFF" />
            <Text className="text-white font-black text-base uppercase tracking-wider">
              Book Service Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ================= 10. TRUST BADGES SECTION ================= */}
      <View className="w-full max-w-[1100px] self-center px-4 mb-8">
        <View className="gap-4">
          {/* Card 1 */}
          <View
            className={`w-full rounded-2xl p-5 border flex-row items-center gap-4 ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800'
                : 'bg-slate-50/80 border-slate-100'
            }`}
          >
            <View className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 items-center justify-center">
              <Ionicons name="bus-outline" size={22} color="#059669" />
            </View>
            <View className="flex-1">
              <Text
                className={`text-sm sm:text-base font-black mb-0.5 ${
                  isDarkMode ? 'text-slate-100' : 'text-[#0F172A]'
                }`}
              >
                Express Fast Delivery
              </Text>
              <Text className="text-xs font-medium text-slate-500">
                Swift delivery directly to your doorstep
              </Text>
            </View>
          </View>

          {/* Card 2 */}
          <View
            className={`w-full rounded-2xl p-5 border flex-row items-center gap-4 ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800'
                : 'bg-slate-50/80 border-slate-100'
            }`}
          >
            <View className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 items-center justify-center">
              <Ionicons name="shield-checkmark-outline" size={22} color="#059669" />
            </View>
            <View className="flex-1">
              <Text
                className={`text-sm sm:text-base font-black mb-0.5 ${
                  isDarkMode ? 'text-slate-100' : 'text-[#0F172A]'
                }`}
              >
                100% Genuine & Fresh
              </Text>
              <Text className="text-xs font-medium text-slate-500">
                Directly sourced from verified merchants
              </Text>
            </View>
          </View>

          {/* Card 3 */}
          <View
            className={`w-full rounded-2xl p-5 border flex-row items-center gap-4 ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800'
                : 'bg-slate-50/80 border-slate-100'
            }`}
          >
            <View className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 items-center justify-center">
              <Ionicons name="card-outline" size={22} color="#4F46E5" />
            </View>
            <View className="flex-1">
              <Text
                className={`text-sm sm:text-base font-black mb-0.5 ${
                  isDarkMode ? 'text-slate-100' : 'text-[#0F172A]'
                }`}
              >
                Secure & Easy Payment
              </Text>
              <Text className="text-xs font-medium text-slate-500">
                bKash, Nagad, Cards & Cash on Delivery
              </Text>
            </View>
          </View>

          {/* Card 4 */}
          <View
            className={`w-full rounded-2xl p-5 border flex-row items-center gap-4 ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800'
                : 'bg-slate-50/80 border-slate-100'
            }`}
          >
            <View className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/80 items-center justify-center">
              <Ionicons name="headset-outline" size={22} color="#7C3AED" />
            </View>
            <View className="flex-1">
              <Text
                className={`text-sm sm:text-base font-black mb-0.5 ${
                  isDarkMode ? 'text-slate-100' : 'text-[#0F172A]'
                }`}
              >
                24/7 Dedicated Support
              </Text>
              <Text className="text-xs font-medium text-slate-500">
                Instant support assistance anytime
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
