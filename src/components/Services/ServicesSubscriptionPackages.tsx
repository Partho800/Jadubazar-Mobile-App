import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { AppText as Text } from '../common/AppText';

interface ServicesSubscriptionPackagesProps {
  onSelectMonthlyPlan?: () => void;
  onSelectYearlyPlan?: () => void;
}

export const ServicesSubscriptionPackages: React.FC<ServicesSubscriptionPackagesProps> = ({
  onSelectMonthlyPlan,
  onSelectYearlyPlan,
}) => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();

  const monthlyFeatures = [
    t('mFeature1') !== 'mFeature1' ? t('mFeature1') : '4 customized service visits per month',
    t('mFeature2') !== 'mFeature2' ? t('mFeature2') : 'Base visit price around ৳400/visit included',
    t('mFeature3') !== 'mFeature3' ? t('mFeature3') : 'Technicians can add parts & extra tasks dynamically',
    t('mFeature4') !== 'mFeature4' ? t('mFeature4') : '7-day service warranty for every visit',
    t('mFeature5') !== 'mFeature5' ? t('mFeature5') : 'Verified & background-checked professionals',
    t('mFeature6') !== 'mFeature6' ? t('mFeature6') : 'Free rescheduling & priority bookings',
  ];

  const yearlyFeatures = [
    t('yFeature1') !== 'yFeature1' ? t('yFeature1') : '48 total visits (4 per month for 12 months)',
    t('yFeature2') !== 'yFeature2' ? t('yFeature2') : '10 customizable visits + 38 standard bookings',
    t('yFeature3') !== 'yFeature3' ? t('yFeature3') : 'Base visit price around ৳400/visit included',
    t('yFeature4') !== 'yFeature4' ? t('yFeature4') : 'Technicians can add parts & extra tasks dynamically',
    t('yFeature5') !== 'yFeature5' ? t('yFeature5') : 'Free full-home safety & appliance checkup once a year',
    t('yFeature6') !== 'yFeature6' ? t('yFeature6') : 'Dedicated customer account manager & instant support',
  ];

  return (
    <View className="w-full max-w-[1100px] self-center px-4 my-12">
      {/* 1. Header Section */}
      <View className="items-center mb-10">
        {/* Crown Pill Badge */}
        <View className={`flex-row items-center gap-2 px-4 py-1.5 rounded-full border mb-4 shadow-2xs ${
          isDarkMode
            ? 'bg-slate-900 border-slate-800'
            : 'bg-sky-50/80 border-sky-200/60'
        }`}>
          <Ionicons name="ribbon-outline" size={15} color={isDarkMode ? '#38BDF8' : '#0284C7'} />
          <Text className={`font-black text-[11px] sm:text-xs uppercase tracking-wider ${
            isDarkMode ? 'text-sky-400' : 'text-sky-900'
          }`}>
            {t('subBadgeTag') !== 'subBadgeTag' ? t('subBadgeTag') : 'SERVICE SUBSCRIPTION PACKAGES'}
          </Text>
        </View>

        {/* Main Title */}
        <Text className={`text-2xl sm:text-3xl lg:text-4xl font-black text-center mb-3 tracking-tight ${
          isDarkMode ? 'text-slate-50' : 'text-[#0F172A]'
        }`}>
          {t('subHeadline') !== 'subHeadline' ? t('subHeadline') : 'Build Your Own Service Plan'}
        </Text>

        {/* Subtitle */}
        <Text className={`text-center text-xs sm:text-sm font-medium leading-relaxed max-w-[720px] ${
          isDarkMode ? 'text-slate-400' : 'text-slate-500'
        }`}>
          {t('subSubhead') !== 'subSubhead'
            ? t('subSubhead')
            : 'Flexible subscription plans designed for absolute peace of mind. Choose which services you receive each month with absolute pricing transparency.'}
        </Text>
      </View>

      {/* 2. 2-Card Grid Layout */}
      <View className="flex-col lg:flex-row items-stretch gap-6 w-full">
        {/* ================= CARD 1: MONTHLY SUBSCRIPTION ================= */}
        <View className={`flex-1 rounded-3xl p-6 sm:p-8 border shadow-lg flex-col justify-between ${
          isDarkMode
            ? 'bg-slate-900 border-slate-800 shadow-none'
            : 'bg-white border-slate-200/80 shadow-slate-200/50'
        }`}>
          <View>
            {/* Top Label & Price Header */}
            <View className="flex-row items-start justify-between mb-4">
              <View className="flex-1 mr-2">
                <Text className="text-[11px] font-black tracking-widest text-slate-400 uppercase mb-1">
                  {t('monthlyBilling') !== 'monthlyBilling' ? t('monthlyBilling') : 'MONTHLY BILLING'}
                </Text>
                <Text className={`text-xl sm:text-2xl font-black mb-0.5 ${
                  isDarkMode ? 'text-slate-50' : 'text-[#0F172A]'
                }`}>
                  {t('monthlySubTitle') !== 'monthlySubTitle' ? t('monthlySubTitle') : 'Monthly Subscription'}
                </Text>
                <Text className="text-xs font-semibold text-slate-400">
                  {t('monthlySubDetail') !== 'monthlySubDetail' ? t('monthlySubDetail') : 'Flexible model • Cancel anytime'}
                </Text>
              </View>

              {/* Price */}
              <View className="items-end">
                <Text className={`text-2xl sm:text-3xl font-black ${
                  isDarkMode ? 'text-slate-50' : 'text-[#0F172A]'
                }`}>
                  ৳1,499
                </Text>
                <Text className="text-xs font-semibold text-slate-400">/ month</Text>
              </View>
            </View>

            {/* Inner Flexible Visit Box */}
            <View className={`rounded-2xl p-4 mb-6 border ${
              isDarkMode
                ? 'bg-slate-950/70 border-slate-800'
                : 'bg-slate-50 border-slate-200/60'
            }`}>
              <View className="flex-row items-center gap-1.5 mb-2">
                <Ionicons name="flash-outline" size={15} color={isDarkMode ? '#CBD5E1' : '#1E293B'} />
                <Text className={`text-xs font-black uppercase tracking-wide ${
                  isDarkMode ? 'text-slate-200' : 'text-[#0F172A]'
                }`}>
                  {t('flexVisitHeader') !== 'flexVisitHeader' ? t('flexVisitHeader') : 'FLEXIBLE VISIT MODEL'}
                </Text>
              </View>
              <Text className={`text-xs font-medium leading-relaxed ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                {t('flexVisitText') !== 'flexVisitText'
                  ? t('flexVisitText')
                  : 'Base inspection visit starts at ৳400 per visit (e.g. standard AC checkup or servicing). Any additional components, spare parts, or deep repairs on-site can be added dynamically to your service bill by our technician.'}
              </Text>
            </View>

            {/* Features Checklist */}
            <View className="gap-3.5 mb-6">
              {monthlyFeatures.map((feature, index) => (
                <View key={index} className="flex-row items-start gap-2.5">
                  <Ionicons
                    name="checkmark-circle"
                    size={18}
                    color={isDarkMode ? '#38BDF8' : '#0F172A'}
                    style={{ marginTop: 1 }}
                  />
                  <Text className={`flex-1 text-xs sm:text-sm font-bold leading-snug ${
                    isDarkMode ? 'text-slate-200' : 'text-[#0F172A]'
                  }`}>
                    {feature}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Action Button */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={onSelectMonthlyPlan}
            className="w-full bg-[#0B132B] dark:bg-indigo-600 py-4 px-6 rounded-2xl flex-row items-center justify-center gap-2 mt-4 shadow-md"
          >
            <Text className="text-white font-black text-sm uppercase tracking-wider">
              {t('buyMonthlyPlan') !== 'buyMonthlyPlan' ? t('buyMonthlyPlan') : 'BUY MONTHLY PLAN'}
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* ================= CARD 2: YEARLY SUBSCRIPTION (PREMIUM DARK) ================= */}
        <View className="flex-1 rounded-3xl p-6 sm:p-8 bg-[#0B132B] border border-slate-800 shadow-2xl shadow-indigo-950/60 relative overflow-hidden flex-col justify-between">
          {/* Background Ambient Glow */}
          <View className="absolute -top-16 -right-16 w-56 h-56 bg-indigo-500/20 rounded-full blur-3xl" />

          <View className="relative z-10">
            {/* Top Label, Save Badge & Price Header */}
            <View className="flex-row items-start justify-between mb-4">
              <View className="flex-1 mr-2">
                <View className="flex-row items-center gap-2 mb-1">
                  <Text className="text-[11px] font-black tracking-widest text-slate-400 uppercase">
                    {t('yearlyBilling') !== 'yearlyBilling' ? t('yearlyBilling') : 'ANNUAL BILLING'}
                  </Text>
                  {/* Save 17% Badge */}
                  <View className="bg-white/10 px-2.5 py-0.5 rounded-full border border-white/20">
                    <Text className="text-white font-black text-[10px] uppercase">
                      {t('save17Percent') !== 'save17Percent' ? t('save17Percent') : 'SAVE 17%'}
                    </Text>
                  </View>
                </View>

                <Text className="text-xl sm:text-2xl font-black text-white mb-0.5">
                  {t('yearlySubTitle') !== 'yearlySubTitle' ? t('yearlySubTitle') : 'Yearly Subscription'}
                </Text>
                <Text className="text-xs font-semibold text-slate-400">
                  {t('yearlySubDetail') !== 'yearlySubDetail' ? t('yearlySubDetail') : 'Billed annually • Saves ৳2,989'}
                </Text>
              </View>

              {/* Price */}
              <View className="items-end">
                <Text className="text-2xl sm:text-3xl font-black text-white">৳14,999</Text>
                <Text className="text-xs font-semibold text-slate-400">/ year</Text>
              </View>
            </View>

            {/* Inner Premium Annual Box */}
            <View className="rounded-2xl p-4 mb-6 bg-white/5 border border-white/10">
              <View className="flex-row items-center gap-1.5 mb-2">
                <Ionicons name="flash-outline" size={15} color="#FFFFFF" />
                <Text className="text-xs font-black text-white uppercase tracking-wide">
                  {t('annualCoverageHeader') !== 'annualCoverageHeader' ? t('annualCoverageHeader') : 'PREMIUM ANNUAL COVERAGE'}
                </Text>
              </View>
              <Text className="text-xs text-slate-300 font-medium leading-relaxed">
                {t('flexVisitText') !== 'flexVisitText'
                  ? t('flexVisitText')
                  : 'Base inspection visit starts at ৳400 per visit (e.g. standard AC checkup or servicing). Any additional components, spare parts, or deep repairs on-site can be added dynamically to your service bill by our technician.'}
              </Text>
            </View>

            {/* Features Checklist */}
            <View className="gap-3.5 mb-6">
              {yearlyFeatures.map((feature, index) => (
                <View key={index} className="flex-row items-start gap-2.5">
                  <Ionicons
                    name="checkmark-circle"
                    size={18}
                    color="#FFFFFF"
                    style={{ marginTop: 1 }}
                  />
                  <Text className="flex-1 text-xs sm:text-sm font-bold leading-snug text-white">
                    {feature}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Action Button */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={onSelectYearlyPlan}
            className="w-full bg-white hover:bg-slate-100 py-4 px-6 rounded-2xl flex-row items-center justify-center gap-2 mt-4 shadow-md relative z-10"
          >
            <Text className="text-[#0B132B] font-black text-sm uppercase tracking-wider">
              {t('buyYearlyPlan') !== 'buyYearlyPlan' ? t('buyYearlyPlan') : 'BUY YEARLY PLAN'}
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#0B132B" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
