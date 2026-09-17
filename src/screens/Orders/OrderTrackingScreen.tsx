import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, Image, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { Header } from '../../components/common/Header/Header';
import { AppText as Text } from '../../components/common/AppText';
import { RiderChatModal } from '../../components/order/RiderChatModal';

export const OrderTrackingScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { isDarkMode } = useTheme();
  const { isBangla } = useLanguage();

  const orderId = route.params?.orderId || 'JB-670457';
  const estimatedDelivery = route.params?.estimatedDelivery || (isBangla ? '৪৫ মিনিট' : '45 Minutes');
  const riderName = 'Abul Hasan';
  const riderPhone = '+8801712345678';
  const riderAvatar = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80';

  const [currentStep] = useState<number>(2); // 1 = Confirmed, 2 = Preparing, 3 = Ready, 4 = Out for Delivery, 5 = Delivered
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const handleCallRider = () => {
    Linking.openURL(`tel:${riderPhone}`).catch(() => {
      Alert.alert(
        isBangla ? 'কল করা যাচ্ছে না' : 'Call Rider',
        isBangla ? `রাইডারের নম্বর: ${riderPhone}` : `Rider contact: ${riderPhone}`
      );
    });
  };

  const handleChatRider = () => {
    setIsChatOpen(true);
  };

  const timelineSteps = [
    {
      id: 1,
      title: isBangla ? 'অর্ডার কনফার্মড' : 'Order Confirmed',
      desc: isBangla ? 'আপনার অর্ডারটি সেলার/ভেন্ডর দ্বারা গৃহীত হয়েছে।' : 'Your order has been registered by the vendor.',
    },
    {
      id: 2,
      title: isBangla ? 'প্রিপেয়ারিং (প্যাকেজিং)' : 'Preparing',
      desc: isBangla ? 'পণ্যসমূহ সাজানো এবং নিরাপদে প্যাকিং করা হচ্ছে।' : 'The items are being sorted and packaged.',
    },
    {
      id: 3,
      title: isBangla ? 'রেডি ফর ডিসপ্যাচ' : 'Ready',
      desc: isBangla ? 'ডেলিভারি প্যাকেজ প্রস্তুত এবং রাইডার অ্যাসাইন করা হচ্ছে।' : 'Preparing dispatch packages and assigning rider.',
    },
    {
      id: 4,
      title: isBangla ? 'আউট ফর ডেলিভারি' : 'Out for Delivery',
      desc: isBangla ? 'আমাদের রাইডার পার্টনার আপনার ঠিকানায় রওয়ানা দিয়েছে।' : 'Our rider partner is heading to your address.',
    },
    {
      id: 5,
      title: isBangla ? 'ডেলিভারড' : 'Delivered',
      desc: isBangla ? 'পণ্যসমূহ সফলভাবে পৌঁছে দেওয়া হয়েছে। হ্যাপি শপিং!' : 'Items handed over. Happy shopping!',
    },
  ];

  return (
    <View className={`flex-1 ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 120 }}
      >
        <View className="w-full max-w-lg mx-auto">
          {/* Header Row: Title & Back Button */}
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                ORDER TRACKING
              </Text>
              <Text
                className={`text-lg sm:text-xl font-black ${
                  isDarkMode ? 'text-slate-50' : 'text-slate-900'
                }`}
              >
                Tracking Order: {orderId}
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                } else {
                  navigation.navigate('OrdersTab');
                }
              }}
              className={`flex-row items-center gap-1.5 px-3 py-1.5 rounded-full border ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <Ionicons name="arrow-back" size={16} color={isDarkMode ? '#CBD5E1' : '#475569'} />
              <Text
                className={`text-xs font-bold ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                {isBangla ? 'ব্যাকে যান' : 'Back to Orders'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* 1. ESTIMATED DELIVERY CARD */}
          <View
            className={`p-5 rounded-3xl border mb-4 shadow-sm flex-row items-center justify-between ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 shadow-slate-950/50'
                : 'bg-white border-slate-100 shadow-slate-200/50'
            }`}
          >
            <View>
              <Text className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                ESTIMATED DELIVERY
              </Text>
              <Text
                className={`text-2xl sm:text-3xl font-black tracking-tight ${
                  isDarkMode ? 'text-slate-50' : 'text-slate-900'
                }`}
              >
                {estimatedDelivery}
              </Text>
            </View>

            {/* On Time Pill Badge */}
            <View
              className={`px-3 py-1.5 rounded-full border flex-row items-center gap-1.5 ${
                isDarkMode
                  ? 'bg-emerald-950/60 border-emerald-800'
                  : 'bg-emerald-50 border-emerald-200'
              }`}
            >
              <Ionicons name="time-outline" size={15} color="#10B981" />
              <Text className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                {isBangla ? 'সঠিক সময়ে' : 'On Time'}
              </Text>
            </View>
          </View>

          {/* 2. DELIVERY TIMELINE CARD */}
          <View
            className={`p-5 rounded-3xl border mb-4 shadow-sm ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 shadow-slate-950/50'
                : 'bg-white border-slate-100 shadow-slate-200/50'
            }`}
          >
            <Text className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              DELIVERY TIMELINE
            </Text>

            <View className="gap-6 relative pl-2">
              {/* Timeline Vertical Connecting Bar */}
              <View
                className={`w-0.5 absolute left-[19px] top-3 bottom-4 ${
                  isDarkMode ? 'bg-slate-800' : 'bg-slate-200'
                }`}
              />

              {timelineSteps.map((step) => {
                const isCompleted = step.id < currentStep;
                const isActive = step.id === currentStep;

                return (
                  <View key={step.id} className="flex-row items-start gap-4 z-10">
                    {/* Step Icon / Circle Badge */}
                    <View className="items-center justify-center">
                      {isCompleted ? (
                        <View className="w-6 h-6 rounded-full bg-emerald-500 items-center justify-center shadow-sm">
                          <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                        </View>
                      ) : isActive ? (
                        <View className="w-8 h-8 rounded-full bg-emerald-500 items-center justify-center shadow-md border-4 border-emerald-100 dark:border-emerald-900/60 -ml-1">
                          <Text className="text-white text-xs font-black">{step.id}</Text>
                        </View>
                      ) : (
                        <View
                          className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                            isDarkMode
                              ? 'bg-slate-900 border-slate-700'
                              : 'bg-white border-slate-300'
                          }`}
                        />
                      )}
                    </View>

                    {/* Step Content */}
                    <View className="flex-1 pt-0.5">
                      <Text
                        className={`text-sm sm:text-base font-black ${
                          isActive
                            ? 'text-emerald-700 dark:text-emerald-400'
                            : isCompleted
                            ? 'text-emerald-600 dark:text-emerald-500'
                            : isDarkMode
                            ? 'text-slate-400'
                            : 'text-slate-500'
                        }`}
                      >
                        {step.title}
                      </Text>
                      <Text
                        className={`text-xs font-medium mt-0.5 leading-relaxed ${
                          isDarkMode ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        {step.desc}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          {/* 3 & 4. LIVE GPS ROUTE & RIDER DETAILS (ONLY VISIBLE WHEN OUT FOR DELIVERY) */}
          {currentStep >= 4 ? (
            <>
              {/* 3. LIVE DARK GRID MAP VIEW CARD */}
              <View className="w-full h-60 rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 relative mb-4 p-4 justify-between shadow-lg">
                {/* Grid Pattern Background Lines overlay */}
                <View className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

                {/* Top Map Label */}
                <View className="flex-row items-center justify-between z-10">
                  <View className="flex-row items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800">
                    <Ionicons name="location" size={14} color="#10B981" />
                    <Text className="text-xs font-black text-slate-200">
                      {isBangla ? 'লাইভ জিপিএস রুট' : 'Live GPS Route'}
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-700/60">
                    <View className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <Text className="text-[10px] font-black text-emerald-400 tracking-wider">LIVE</Text>
                  </View>
                </View>

                {/* Route Line with Vendor Pin, Moving Rider & User Pin */}
                <View className="my-auto px-6 relative items-center justify-center">
                  {/* Route Yellow Connection Line */}
                  <View className="w-full h-1 bg-amber-500/80 rounded-full" />

                  {/* Vendor Pin (Left) */}
                  <View className="absolute left-6 w-8 h-8 rounded-full bg-emerald-950 border border-emerald-500 items-center justify-center shadow-md">
                    <Ionicons name="location" size={16} color="#10B981" />
                  </View>

                  {/* Rider Scooter Badge (Middle Line) */}
                  <View className="absolute left-[45%] bg-slate-900 border border-slate-700 px-3 py-1 rounded-full flex-row items-center gap-1.5 shadow-xl">
                    <Ionicons name="bicycle" size={14} color="#38BDF8" />
                    <Text className="text-xs font-black text-white">Rider</Text>
                  </View>

                  {/* Destination Pin (Right) */}
                  <View className="absolute right-6 w-8 h-8 rounded-full bg-emerald-950 border border-emerald-500 items-center justify-center shadow-md">
                    <Ionicons name="location" size={16} color="#10B981" />
                  </View>
                </View>

                {/* Bottom Routing Bar inside Map */}
                <View className="w-full p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex-row items-center justify-between z-10">
                  <Text className="text-xs font-bold text-slate-300">Routing partner...</Text>
                  <Text className="text-[10px] font-black text-emerald-400 tracking-wider">LIVE</Text>
                </View>
              </View>

              {/* 4. ASSIGNED DELIVERY RIDER CARD */}
              <View
                className={`p-5 rounded-3xl border mb-6 shadow-sm ${
                  isDarkMode
                    ? 'bg-slate-900 border-slate-800 shadow-slate-950/50'
                    : 'bg-white border-slate-100 shadow-slate-200/50'
                }`}
              >
                <Text className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">
                  ASSIGNED DELIVERY RIDER
                </Text>

                <View className="flex-row items-center mb-4">
                  <Image
                    source={{ uri: riderAvatar }}
                    className="w-14 h-14 rounded-full border-2 border-slate-200 dark:border-slate-700 mr-3.5 bg-slate-200"
                  />
                  <View className="flex-1">
                    <Text
                      className={`text-base sm:text-lg font-black ${
                        isDarkMode ? 'text-slate-50' : 'text-slate-900'
                      }`}
                    >
                      {riderName}
                    </Text>
                    <Text className="text-[11px] font-extrabold text-slate-400 dark:text-slate-400 tracking-wider mt-0.5">
                      JADUBAZAR DELIVERY PARTNER
                    </Text>
                  </View>
                </View>

                {/* Call & Chat Action Buttons */}
                <View className="flex-row items-center gap-3">
                  {/* Call Rider Button */}
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={handleCallRider}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 py-3.5 rounded-2xl flex-row items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform"
                  >
                    <Ionicons name="call" size={16} color="#FFFFFF" />
                    <Text className="text-white text-xs sm:text-sm font-black">
                      {isBangla ? 'কল রাইডার' : 'Call Rider'}
                    </Text>
                  </TouchableOpacity>

                  {/* Chat Button */}
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={handleChatRider}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 py-3.5 rounded-2xl flex-row items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform"
                  >
                    <Ionicons name="chatbubble" size={16} color="#FFFFFF" />
                    <Text className="text-white text-xs sm:text-sm font-black">
                      {isBangla ? 'চ্যাট করুন' : 'Chat'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : (
            /* JADUBAZAR CUSTOMER SUPPORT & VENDOR PROCESSING CARD (BEFORE OUT FOR DELIVERY) */
            <View
              className={`p-5 rounded-3xl border mb-6 shadow-sm ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-800 shadow-slate-950/50'
                  : 'bg-white border-slate-100 shadow-slate-200/50'
              }`}
            >
              <View className="flex-row items-center gap-3 mb-3">
                <View className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950 items-center justify-center">
                  <Ionicons name="headset" size={20} color="#2563EB" />
                </View>
                <View className="flex-1">
                  <Text className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    JADUBAZAR SUPPORT & PROCESSING
                  </Text>
                  <Text className={`text-base font-black ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                    {isBangla ? 'অর্ডার প্রসেসিং ও প্যাকেজিং চলছে' : 'Order Processing & Packing'}
                  </Text>
                </View>
              </View>

              <Text className={`text-xs font-medium leading-relaxed mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {isBangla
                  ? 'আপনার অর্ডারটি ভেন্ডর কর্তৃক প্রসেসিং হচ্ছে। রাইডার পার্টনার অ্যাসাইন হলে এবং "Out for Delivery" স্ট্যাটাস হলে রাইডার কন্টাক্ট ও লাইভ জিপিএস ম্যাপ চালু হবে।'
                  : 'Your order is currently being processed by the vendor. Once a delivery partner is assigned and status is "Out for Delivery", live GPS map and rider contact details will appear here.'}
              </Text>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => setIsChatOpen(true)}
                className="w-full bg-blue-600 active:bg-blue-700 py-3.5 rounded-2xl flex-row items-center justify-center gap-2 shadow-sm"
              >
                <Ionicons name="chatbubbles" size={16} color="#FFFFFF" />
                <Text className="text-white text-xs sm:text-sm font-black">
                  {isBangla ? 'যাদুবাজার সাপোর্ট সেন্টারে চ্যাট করুন' : 'Contact Jadubazar Support'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {/* RIDER & SUPPORT LIVE CHAT MODAL */}
      <RiderChatModal
        visible={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        orderId={orderId}
        riderName={
          currentStep >= 4
            ? riderName
            : isBangla
            ? 'যাদুবাজার সাপোর্ট টিম'
            : 'Jadubazar Support Team'
        }
        riderPhone={riderPhone}
        riderImage={
          currentStep >= 4
            ? riderAvatar
            : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
        }
      />
    </View>
  );
};
