import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../context/LanguageContext';
import { AppText as Text } from '../common/AppText';

interface ServicesEmergencyExpressProps {
  onBookElectricianPress?: () => void;
  onBookPlumberPress?: () => void;
}

export const ServicesEmergencyExpress: React.FC<ServicesEmergencyExpressProps> = ({
  onBookElectricianPress,
  onBookPlumberPress,
}) => {
  const { t } = useLanguage();

  return (
    <View className="w-full max-w-[1100px] self-center px-4 my-8">
      {/* Outer Glow Card Container */}
      <View className="w-full bg-[#0F142E] rounded-3xl p-6 sm:p-10 border border-indigo-900/60 shadow-2xl relative overflow-hidden">
        {/* Subtle Decorative Background Glow */}
        <View className="absolute -top-20 -right-20 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl" />
        <View className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl" />

        {/* 1. Top Badges Row */}
        <View className="flex-row items-center flex-wrap gap-2.5 mb-5 relative z-10">
          {/* Yellow Express Badge */}
          <View className="bg-amber-400 px-3.5 py-1.5 rounded-full flex-row items-center gap-1.5 shadow-xs">
            <Ionicons name="flash" size={14} color="#0F172A" />
            <Text className="text-slate-950 font-black text-[11px] sm:text-xs uppercase tracking-wider">
              {t('emergencyBadge') !== 'emergencyBadge'
                ? t('emergencyBadge')
                : '30-MIN EMERGENCY EXPRESS'}
            </Text>
          </View>

          {/* Translucent 24/7 Available Badge */}
          <View className="bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full flex-row items-center gap-1.5 border border-white/15">
            <Ionicons name="time-outline" size={14} color="#FFFFFF" />
            <Text className="text-white font-extrabold text-[11px] sm:text-xs">
              {t('available247Badge') !== 'available247Badge'
                ? t('available247Badge')
                : '24/7 Available'}
            </Text>
          </View>
        </View>

        {/* 2. Main Headline */}
        <Text className="text-white font-black text-xl sm:text-2xl lg:text-3xl leading-snug mb-4 relative z-10">
          {t('emergencyHeadline') !== 'emergencyHeadline'
            ? t('emergencyHeadline')
            : 'Sudden Power Outage or Water Pipe Burst? Expert Tech at Your Door in 30 Mins'}
        </Text>

        {/* 3. Description Subtitle */}
        <Text className="text-indigo-200/80 font-medium text-xs sm:text-sm leading-relaxed mb-6 max-w-[800px] relative z-10">
          {t('emergencySub') !== 'emergencySub'
            ? t('emergencySub')
            : 'Certified, background-verified plumbers, electricians, and AC technicians ready for immediate dispatch across Dhaka and Chittagong. 100% upfront pricing.'}
        </Text>

        {/* 4. Features Checklist Row */}
        <View className="flex-row items-center flex-wrap gap-x-6 gap-y-3 mb-8 relative z-10">
          {/* Feature 1 */}
          <View className="flex-row items-center gap-2">
            <Ionicons name="checkmark-circle" size={18} color="#10B981" />
            <Text className="text-white font-bold text-xs sm:text-sm">
              {t('warranty7Days') !== 'warranty7Days'
                ? t('warranty7Days')
                : '7-Day Service Warranty'}
            </Text>
          </View>

          {/* Feature 2 */}
          <View className="flex-row items-center gap-2">
            <Ionicons name="checkmark-circle" size={18} color="#10B981" />
            <Text className="text-white font-bold text-xs sm:text-sm">
              {t('verifiedNID') !== 'verifiedNID'
                ? t('verifiedNID')
                : 'Police & NID Verified'}
            </Text>
          </View>

          {/* Feature 3 */}
          <View className="flex-row items-center gap-2">
            <Ionicons name="checkmark-circle" size={18} color="#10B981" />
            <Text className="text-white font-bold text-xs sm:text-sm">
              {t('noHiddenCharges') !== 'noHiddenCharges'
                ? t('noHiddenCharges')
                : 'No Hidden Charges'}
            </Text>
          </View>
        </View>

        {/* 5. Action Buttons Stack */}
        <View className="w-full gap-3 relative z-10">
          {/* Primary Button */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={onBookElectricianPress}
            className="w-full bg-indigo-600 hover:bg-indigo-500 py-3.5 px-6 rounded-2xl flex-row items-center justify-center gap-2 shadow-lg shadow-indigo-600/40"
          >
            <Text className="text-white font-black text-sm sm:text-base">
              {t('bookElectricianNow') !== 'bookElectricianNow'
                ? t('bookElectricianNow')
                : 'Book Electrician Now'}
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Secondary Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onBookPlumberPress}
            className="w-full bg-slate-800/80 border border-slate-700/80 py-3.5 px-6 rounded-2xl flex-row items-center justify-center gap-2"
          >
            <Text className="text-white font-extrabold text-sm sm:text-base">
              {t('bookEmergencyPlumber') !== 'bookEmergencyPlumber'
                ? t('bookEmergencyPlumber')
                : 'Book Emergency Plumber'}
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
