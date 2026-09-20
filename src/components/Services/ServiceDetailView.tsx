import React, { useState } from 'react';
import { View, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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
    { label: 'Today', date: 'Aug 15', dayShort: 'THU' },
    { label: 'Tomorrow', date: 'Aug 16', dayShort: 'FRI' },
    { label: 'Monday', date: 'Aug 17', dayShort: 'MON' },
    { label: 'Tuesday', date: 'Aug 18', dayShort: 'TUE' },
  ];

  const timeSlots = [
    { label: '09:00 AM – 12:00 PM', icon: 'sunny-outline' as const },
    { label: '12:00 PM – 03:00 PM', icon: 'partly-sunny-outline' as const },
    { label: '03:00 PM – 06:00 PM', icon: 'cloudy-outline' as const },
    { label: '06:00 PM – 09:00 PM', icon: 'moon-outline' as const },
  ];

  const whatsIncluded = [
    'Home collection & doorstep delivery within 48 Hours',
    'Hygienic wash & softeners treatment',
    'Wrinkle-free steam iron',
    'Up to 10 pieces of clothes per bundle',
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 24, paddingBottom: 40 }}>
      {/* 1. Breadcrumb Path Row */}
      <View className="w-full max-w-[1100px] self-center px-4 mb-2 flex-row items-center flex-wrap gap-1">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={closeServiceDetails}
          className="flex-row items-center gap-1 mr-3 py-1 px-2 rounded-lg bg-slate-100 dark:bg-slate-800"
        >
          <Ionicons name="arrow-back" size={16} color={isDarkMode ? '#F8FAFC' : '#0F172A'} />
          <Text className="text-xs font-black text-slate-800 dark:text-slate-100">Back</Text>
        </TouchableOpacity>

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

      {/* ================= 9. BOOKING BOX — REDESIGNED ================= */}
      <View className="w-full max-w-[1100px] self-center px-4 mb-10">
        <View
          style={[
            styles.bookingCard,
            { borderColor: isDarkMode ? '#334155' : '#E0E7FF' },
          ]}
        >
          {/* ── Gradient Header ── */}
          <LinearGradient
            colors={isDarkMode ? ['#1E1B4B', '#312E81'] : ['#5B46F6', '#7C3AED']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientHeader}
          >
            <Text style={styles.headerLabel}>Base Service Charge (Visiting Fee)</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 10 }}>
              <Text style={styles.priceText}>৳{selectedService.price}</Text>
              <View style={styles.pricePill}>
                <Text style={styles.pricePillText}>One-time visit</Text>
              </View>
            </View>
          </LinearGradient>

          {/* ── Body ── */}
          <View style={[styles.bookingBody, { backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF' }]}>

            {/* Date Picker */}
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionIconBg, { backgroundColor: isDarkMode ? '#1E1B4B' : '#EEF2FF' }]}>
                <Ionicons name="calendar-outline" size={17} color="#5B46F6" />
              </View>
              <Text style={[styles.sectionTitle, { color: isDarkMode ? '#F1F5F9' : '#1E293B' }]}>
                Select Service Date
              </Text>
            </View>

            <View style={styles.tilesRow}>
              {dateOptions.map((opt, idx) => {
                const isSelected = selectedDateIndex === idx;
                return (
                  <TouchableOpacity
                    key={idx}
                    activeOpacity={0.8}
                    onPress={() => setSelectedDateIndex(idx)}
                    style={[
                      styles.dateTile,
                      isSelected
                        ? { borderWidth: 0 }
                        : { borderColor: isDarkMode ? '#334155' : '#E2E8F0', backgroundColor: isDarkMode ? '#1E293B' : '#F8FAFC' },
                    ]}
                  >
                    {isSelected ? (
                      <LinearGradient
                        colors={['#5B46F6', '#7C3AED']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.tileGradientInner}
                      >
                        <Text style={styles.dayShortSelected}>{opt.dayShort}</Text>
                        <Text style={styles.tileLabelSelected}>{opt.label}</Text>
                        <Text style={styles.tileDateSelected}>{opt.date}</Text>
                      </LinearGradient>
                    ) : (
                      <View style={styles.tileInner}>
                        <Text style={[styles.dayShort, { color: isDarkMode ? '#64748B' : '#94A3B8' }]}>{opt.dayShort}</Text>
                        <Text style={[styles.tileLabel, { color: isDarkMode ? '#E2E8F0' : '#1E293B' }]}>{opt.label}</Text>
                        <Text style={[styles.tileDate, { color: isDarkMode ? '#64748B' : '#94A3B8' }]}>{opt.date}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Time Slot Picker */}
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionIconBg, { backgroundColor: isDarkMode ? '#1E1B4B' : '#EEF2FF' }]}>
                <Ionicons name="time-outline" size={17} color="#5B46F6" />
              </View>
              <Text style={[styles.sectionTitle, { color: isDarkMode ? '#F1F5F9' : '#1E293B' }]}>
                Select Time Slot
              </Text>
            </View>

            <View style={styles.tilesRow}>
              {timeSlots.map((slot, idx) => {
                const isSelected = selectedTimeIndex === idx;
                return (
                  <TouchableOpacity
                    key={idx}
                    activeOpacity={0.8}
                    onPress={() => setSelectedTimeIndex(idx)}
                    style={[
                      styles.timeTile,
                      isSelected
                        ? { borderWidth: 0 }
                        : { borderColor: isDarkMode ? '#334155' : '#E2E8F0', backgroundColor: isDarkMode ? '#1E293B' : '#F8FAFC' },
                    ]}
                  >
                    {isSelected ? (
                      <LinearGradient
                        colors={['#5B46F6', '#7C3AED']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.tileGradientInner}
                      >
                        <Ionicons name={slot.icon} size={18} color="rgba(255,255,255,0.9)" style={{ marginBottom: 5 }} />
                        <Text style={styles.timeTextSelected}>{slot.label}</Text>
                      </LinearGradient>
                    ) : (
                      <View style={styles.tileInner}>
                        <Ionicons name={slot.icon} size={18} color={isDarkMode ? '#64748B' : '#94A3B8'} style={{ marginBottom: 5 }} />
                        <Text style={[styles.timeText, { color: isDarkMode ? '#CBD5E1' : '#475569' }]}>{slot.label}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Free Cancellation Banner */}
            <View style={[
              styles.infoBanner,
              { backgroundColor: isDarkMode ? 'rgba(14,165,233,0.08)' : '#F0F9FF', borderColor: isDarkMode ? 'rgba(14,165,233,0.2)' : '#BAE6FD' },
            ]}>
              <View style={[styles.bannerIconCircle, { backgroundColor: isDarkMode ? 'rgba(14,165,233,0.15)' : '#E0F2FE' }]}>
                <Ionicons name="shield-checkmark" size={18} color="#0284C7" />
              </View>
              <Text style={[styles.bannerText, { color: isDarkMode ? '#7DD3FC' : '#0369A1' }]}>
                Free cancellation up to 4 hours before scheduled timing slot. Fully background verified.
              </Text>
            </View>

            {/* Additional Billing Warning */}
            <View style={[
              styles.infoBanner,
              styles.infoBannerAlignStart,
              { backgroundColor: isDarkMode ? 'rgba(217,119,6,0.08)' : '#FFFBEB', borderColor: isDarkMode ? 'rgba(217,119,6,0.25)' : '#FDE68A', marginBottom: 24 },
            ]}>
              <View style={[styles.bannerIconCircle, { backgroundColor: isDarkMode ? 'rgba(217,119,6,0.15)' : '#FEF3C7', marginTop: 2 }]}>
                <Ionicons name="warning-outline" size={18} color="#D97706" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.billingTitle, { color: isDarkMode ? '#FCD34D' : '#92400E' }]}>
                  Additional Work Billing
                </Text>
                <Text style={[styles.billingBody, { color: isDarkMode ? '#FDE68A' : '#78350F' }]}>
                  This is the base visiting fee. Additional labor & parts charge will be calculated by the service pro after inspecting the task at your home.
                </Text>
              </View>
            </View>

            {/* Book CTA */}
            <TouchableOpacity activeOpacity={0.88}>
              <LinearGradient
                colors={['#5B46F6', '#7C3AED']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.bookButton}
              >
                <Ionicons name="bag-handle-outline" size={22} color="#FFFFFF" />
                <Text style={styles.bookButtonText}>Book Service Now</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* ================= 10. TRUST BADGES SECTION ================= */}
      <View className="w-full max-w-[1100px] self-center px-4 mb-8">
        <View style={{ gap: 8 }}>
          {[
            {
              icon: 'bus-outline' as const,
              iconColor: '#059669',
              gradientColors: ['#ECFDF5', '#D1FAE5'] as [string, string],
              gradientColorsDark: ['#022C22', '#064E3B'] as [string, string],
              accentColor: '#059669',
              title: 'Express Fast Delivery',
              subtitle: 'Swift delivery directly to your doorstep',
            },
            {
              icon: 'shield-checkmark-outline' as const,
              iconColor: '#0284C7',
              gradientColors: ['#EFF6FF', '#DBEAFE'] as [string, string],
              gradientColorsDark: ['#0C1A3A', '#1E3A5F'] as [string, string],
              accentColor: '#0284C7',
              title: '100% Genuine & Fresh',
              subtitle: 'Directly sourced from verified merchants',
            },
            {
              icon: 'card-outline' as const,
              iconColor: '#4F46E5',
              gradientColors: ['#EEF2FF', '#E0E7FF'] as [string, string],
              gradientColorsDark: ['#1E1B4B', '#2E2A6B'] as [string, string],
              accentColor: '#4F46E5',
              title: 'Secure & Easy Payment',
              subtitle: 'bKash, Nagad, Cards & Cash on Delivery',
            },
            {
              icon: 'headset-outline' as const,
              iconColor: '#7C3AED',
              gradientColors: ['#F5F3FF', '#EDE9FE'] as [string, string],
              gradientColorsDark: ['#2E1065', '#3B0764'] as [string, string],
              accentColor: '#7C3AED',
              title: '24/7 Dedicated Support',
              subtitle: 'Instant support assistance anytime',
            },
          ].map((badge, idx) => (
            <View
              key={idx}
              style={[
                styles.trustCard,
                {
                  backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF',
                  borderColor: isDarkMode ? '#1E293B' : '#F1F5F9',
                },
              ]}
            >
              {/* Gradient Icon Box */}
              <LinearGradient
                colors={isDarkMode ? badge.gradientColorsDark : badge.gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.trustIconBox}
              >
                <Ionicons name={badge.icon} size={24} color={badge.iconColor} />
              </LinearGradient>

              {/* Text */}
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.trustTitle,
                    { color: isDarkMode ? '#F1F5F9' : '#0F172A' },
                  ]}
                >
                  {badge.title}
                </Text>
                <Text style={styles.trustSubtitle}>{badge.subtitle}</Text>
              </View>

              {/* Right Arrow */}
              <View
                style={[
                  styles.trustArrow,
                  { backgroundColor: isDarkMode ? '#1E293B' : '#F8FAFC' },
                ]}
              >
                <Ionicons
                  name="chevron-forward"
                  size={14}
                  color={badge.accentColor}
                />
              </View>
            </View>
          ))}
        </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bookingCard: {
    borderRadius: 28,
    borderWidth: 1.5,
    overflow: 'hidden',
    shadowColor: '#5B46F6',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 28,
    elevation: 14,
  },
  gradientHeader: {
    padding: 24,
    paddingBottom: 28,
  },
  headerLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  priceText: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: -1,
  },
  pricePill: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  pricePillText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 11,
    fontWeight: '700',
  },
  bookingBody: {
    padding: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  sectionIconBg: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '900',
  },
  tilesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 24,
  },
  dateTile: {
    width: '48%',
    borderRadius: 18,
    borderWidth: 1.5,
    overflow: 'hidden',
    minHeight: 88,
  },
  timeTile: {
    width: '48%',
    borderRadius: 18,
    borderWidth: 1.5,
    overflow: 'hidden',
    minHeight: 80,
  },
  tileGradientInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    minHeight: 80,
  },
  tileInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    minHeight: 80,
  },
  dayShortSelected: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 3,
  },
  dayShort: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 3,
  },
  tileLabelSelected: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 14,
    marginBottom: 3,
  },
  tileLabel: {
    fontWeight: '900',
    fontSize: 14,
    marginBottom: 3,
  },
  tileDateSelected: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 11,
    fontWeight: '600',
  },
  tileDate: {
    fontSize: 11,
    fontWeight: '600',
  },
  timeTextSelected: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12,
    textAlign: 'center',
  },
  timeText: {
    fontWeight: '700',
    fontSize: 12,
    textAlign: 'center',
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  infoBannerAlignStart: {
    alignItems: 'flex-start',
  },
  bannerIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  bannerText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 18,
  },
  billingTitle: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  billingBody: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
  },
  bookButton: {
    borderRadius: 18,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#5B46F6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 18,
    elevation: 12,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  trustCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  trustIconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  trustTitle: {
    fontSize: 14,
    fontWeight: '900',
    marginBottom: 3,
  },
  trustSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#94A3B8',
    lineHeight: 17,
  },
  trustArrow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
});
