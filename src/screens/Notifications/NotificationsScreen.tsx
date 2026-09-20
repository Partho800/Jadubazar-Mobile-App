import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { Header } from '../../components/common/Header/Header';
import { AppText as Text } from '../../components/common/AppText';

export interface AppNotification {
  id: string;
  title: string;
  time: string;
  message: string;
  icon: keyof typeof Ionicons.glyphMap;
  isRead?: boolean;
}

export const NotificationsScreen: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { isBangla } = useLanguage();
  const navigation = useNavigation<any>();

  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  return (
    <View className={`flex-1 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        {/* Top Sub-Header */}
        <View
          className={`px-4 py-4 border-b flex-row items-center justify-between ${
            isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <View className="flex-row items-center gap-3">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                } else {
                  navigation.navigate('HomeTab');
                }
              }}
              className={`w-9 h-9 rounded-full items-center justify-center border ${
                isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-100 border-slate-200'
              }`}
            >
              <Ionicons
                name="arrow-back"
                size={20}
                color={isDarkMode ? '#F8FAFC' : '#1E293B'}
              />
            </TouchableOpacity>

            <View>
              <View className="flex-row items-center gap-2">
                <Text
                  className={`text-xl font-black ${
                    isDarkMode ? 'text-slate-50' : 'text-slate-900'
                  }`}
                >
                  {isBangla ? 'নোটিফিকেশন' : 'Notifications'}
                </Text>
                <View className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30">
                  <Text className="text-xs font-black text-amber-500">
                    {notifications.length} {isBangla ? 'টি' : 'Total'}
                  </Text>
                </View>
              </View>
              <Text
                className={`text-xs font-medium ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {isBangla ? 'অফার, আপডেট ও অর্ডার ট্র্যাকিং বার্তা' : 'Offers, alerts & tracking logs'}
              </Text>
            </View>
          </View>
        </View>

        {/* Notifications List / Empty State */}
        <View className="p-4">
          {notifications.length === 0 ? (
            <View
              className={`p-8 rounded-3xl items-center justify-center border mt-4 text-center ${
                isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <View className="w-16 h-16 rounded-full bg-amber-500/10 items-center justify-center mb-3">
                <Ionicons name="notifications-outline" size={32} color="#F59E0B" />
              </View>
              <Text
                className={`text-base font-extrabold text-center ${
                  isDarkMode ? 'text-slate-200' : 'text-slate-800'
                }`}
              >
                {isBangla ? 'কোনো নোটিফিকেশন নেই' : 'No notifications yet'}
              </Text>
              <Text
                className={`text-xs font-medium text-center mt-1 leading-relaxed max-w-[260px] ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {isBangla
                  ? 'আপনার জন্য কোনো নতুন নোটিফিকেশন নেই। নতুন অফার ও ট্র্যাকিং আপডেট আসলে এখানে দেখতে পাবেন।'
                  : 'You are all caught up! Promotional offers, coupons, and order logs will arrive here.'}
              </Text>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => navigation.navigate('HomeTab')}
                className="mt-4 px-6 py-2.5 rounded-full bg-amber-500 active:bg-amber-600 shadow-sm shadow-amber-500/30"
              >
                <Text className="text-xs font-black text-slate-900">
                  {isBangla ? 'হোমে ফিরে যান' : 'Go to Home'}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            notifications.map((notif) => (
              <View
                key={notif.id}
                className={`p-4 rounded-2xl border flex-row items-start mb-3 ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <View
                  className={`w-12 h-12 rounded-2xl border items-center justify-center mr-3.5 ${
                    isDarkMode
                      ? 'bg-amber-950/60 border-amber-800'
                      : 'bg-amber-100/70 border-amber-200'
                  }`}
                >
                  <Ionicons name={notif.icon} size={22} color={isDarkMode ? '#FBBF24' : '#D97706'} />
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center justify-between mb-1">
                    <Text
                      className={`text-sm font-black flex-1 mr-2 ${
                        isDarkMode ? 'text-slate-50' : 'text-slate-900'
                      }`}
                    >
                      {notif.title}
                    </Text>
                    <Text className="text-xs font-bold text-slate-400">{notif.time}</Text>
                  </View>
                  <Text
                    className={`text-xs font-semibold leading-relaxed ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {notif.message}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};
