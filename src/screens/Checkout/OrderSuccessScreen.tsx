import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { Header } from '../../components/common/Header/Header';
import { AppText as Text } from '../../components/common/AppText';

export const OrderSuccessScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { isDarkMode } = useTheme();
  const { isBangla } = useLanguage();

  const orderId = route.params?.orderId || 'JB-670457';
  const totalAmount = route.params?.totalAmount || 195;
  const estimatedDelivery = route.params?.estimatedDelivery || (isBangla ? '৪৫ মিনিট' : '45 Minutes');

  const handleTrackOrder = () => {
    try {
      navigation.navigate('OrderTrackingTab', {
        orderId,
        estimatedDelivery,
      });
    } catch (e) {
      console.log('Navigation error:', e);
      navigation.navigate('OrdersTab');
    }
  };

  const handleContinueShopping = () => {
    try {
      navigation.navigate('HomeTab');
    } catch (e) {
      console.log('Navigation error:', e);
    }
  };

  return (
    <View className={`flex-1 ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 120 }}
      >
        <View className="w-full max-w-md mx-auto">
          {/* Main Success Card */}
          <View
            className={`p-6 sm:p-8 rounded-[32px] border items-center shadow-xl ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 shadow-slate-950/80'
                : 'bg-white border-slate-100 shadow-slate-200/70'
            }`}
          >
            {/* Soft Green Halo Circle + Checkmark */}
            <View
              className={`w-20 h-20 rounded-full items-center justify-center mb-5 ${
                isDarkMode ? 'bg-emerald-950/70' : 'bg-emerald-100'
              }`}
            >
              <View className="w-12 h-12 rounded-full bg-emerald-500 items-center justify-center shadow-md shadow-emerald-500/30">
                <Ionicons name="checkmark" size={26} color="#FFFFFF" />
              </View>
            </View>

            {/* Heading */}
            <Text
              className={`text-xl sm:text-2xl font-black text-center mb-2 tracking-tight ${
                isDarkMode ? 'text-slate-50' : 'text-slate-900'
              }`}
            >
              {isBangla ? 'অর্ডার সফলভাবে সম্পন্ন হয়েছে!' : 'Order Placed Successfully!'}
            </Text>

            {/* Subtitle */}
            <Text
              className={`text-xs sm:text-sm font-medium text-center leading-relaxed px-2 mb-6 ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              {isBangla
                ? 'যাদুবাজার-এ কেনাকাটা করার জন্য আপনাকে ধন্যবাদ। আপনার অর্ডারটি সংগৃহীত হয়েছে এবং দ্রুত ডেলিভারির জন্য প্রস্তুত করা হচ্ছে।'
                : 'Thank you for shopping with Jadubazar. Your order has been registered and is being prepared.'}
            </Text>

            {/* Order Info Summary Card */}
            <View
              className={`w-full p-4 rounded-2xl border mb-5 gap-3 ${
                isDarkMode
                  ? 'bg-slate-950/60 border-slate-800'
                  : 'bg-slate-50/80 border-slate-100'
              }`}
            >
              <View className="flex-row items-center justify-between">
                <Text
                  className={`text-xs sm:text-sm font-semibold ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  {isBangla ? 'অর্ডার আইডেন্টিফায়ার' : 'Order ID'}
                </Text>
                <Text
                  className={`text-sm sm:text-base font-black tracking-wide ${
                    isDarkMode ? 'text-slate-100' : 'text-slate-900'
                  }`}
                >
                  {orderId}
                </Text>
              </View>

              <View className="flex-row items-center justify-between">
                <Text
                  className={`text-xs sm:text-sm font-semibold ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  {isBangla ? 'মোট পরিমাণ' : 'Total Amount'}
                </Text>
                <Text
                  className={`text-sm sm:text-base font-black ${
                    isDarkMode ? 'text-slate-100' : 'text-slate-900'
                  }`}
                >
                  ৳{totalAmount}
                </Text>
              </View>

              <View className="flex-row items-center justify-between">
                <Text
                  className={`text-xs sm:text-sm font-semibold ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  {isBangla ? 'সম্ভাব্য ডেলিভারি সময়' : 'Estimated Delivery'}
                </Text>
                <Text
                  className={`text-sm sm:text-base font-black ${
                    isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                  }`}
                >
                  {estimatedDelivery}
                </Text>
              </View>
            </View>

            {/* Confirmation Email Notice Banner */}
            <View
              className={`w-full p-3.5 rounded-2xl border flex-row items-center gap-3 mb-6 ${
                isDarkMode
                  ? 'bg-blue-950/30 border-blue-900/60'
                  : 'bg-blue-50/70 border-blue-200/80'
              }`}
            >
              <View className="w-9 h-9 rounded-xl bg-blue-500/15 items-center justify-center">
                <Ionicons name="clipboard-outline" size={20} color="#2563EB" />
              </View>
              <Text
                className={`flex-1 text-[11px] sm:text-xs font-semibold leading-relaxed ${
                  isDarkMode ? 'text-blue-200' : 'text-slate-700'
                }`}
              >
                {isBangla
                  ? 'আপনার নিবন্ধিত ইমেইলে একটি ইনভয়েস কনফার্মেশন পাঠানো হয়েছে। আপনি লাইভ রিয়েল-টাইম ট্র্যাকিং দেখতে পারেন।'
                  : 'A confirmation invoice has been sent to your registered profile email. You can check order tracking details in real time.'}
              </Text>
            </View>

            {/* Action Buttons */}
            <View className="w-full gap-3">
              {/* Button 1: TRACK YOUR ORDER */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleTrackOrder}
                className="w-full bg-emerald-500 hover:bg-emerald-600 py-3.5 sm:py-4 rounded-2xl flex-row items-center justify-center shadow-lg shadow-emerald-500/25 active:scale-98 transition-transform"
              >
                <Text className="text-white text-xs sm:text-sm font-black uppercase tracking-wider mr-2">
                  {isBangla ? 'অর্ডার ট্র্যাক করুন' : 'TRACK YOUR ORDER'}
                </Text>
                <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
              </TouchableOpacity>

              {/* Button 2: CONTINUE SHOPPING */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleContinueShopping}
                className={`w-full py-3.5 sm:py-4 rounded-2xl items-center justify-center border active:scale-98 transition-transform ${
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700'
                    : 'bg-slate-100 border-slate-200/80'
                }`}
              >
                <Text
                  className={`text-xs sm:text-sm font-black uppercase tracking-wider ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-800'
                  }`}
                >
                  {isBangla ? 'কেনাকাটা চালিয়ে যান' : 'CONTINUE SHOPPING'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
