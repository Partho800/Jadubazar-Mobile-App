import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Modal,
  Linking,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useCategory } from '../../context/CategoryContext';
import { requestCallPermission } from '../../utils/permissionHelper';
import { AppText as Text } from '../common/AppText';

export interface ChatMessage {
  id: string;
  sender: 'rider' | 'user';
  text: string;
  time: string;
}

interface RiderChatModalProps {
  visible: boolean;
  onClose: () => void;
  orderId?: string;
  riderName?: string;
  riderPhone?: string;
  riderImage?: string;
}

export const RiderChatModal: React.FC<RiderChatModalProps> = ({
  visible,
  onClose,
  orderId = 'JB-670457',
  riderName = 'Abul Hasan',
  riderPhone = '+8801712345678',
  riderImage = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
}) => {
  const { isDarkMode } = useTheme();
  const { isBangla } = useLanguage();
  const { activeCategoryColor } = useCategory();

  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'rider',
      text: `Assalamu Alaikum! I have picked up your order #${orderId} and I am on the way. Expected arrival: ~15-20 mins. Let me know if you have any delivery instructions.`,
      time: '12:05 PM',
    },
  ]);

  const quickReplies: Array<{
    id: string;
    icon: keyof typeof Ionicons.glyphMap;
    iconColor: string;
    iconBgLight: string;
    iconBgDark: string;
    text: string;
    messageText: string;
  }> = [
    {
      id: 'q1',
      icon: 'location-sharp',
      iconColor: '#EF4444',
      iconBgLight: 'bg-red-50 border-red-100',
      iconBgDark: 'bg-red-950/50 border-red-900/50',
      text: isBangla ? 'আপনি এখন কোথায় আছেন?' : 'Where are you right now?',
      messageText: isBangla ? 'আপনি এখন কোথায় আছেন?' : 'Where are you right now?',
    },
    {
      id: 'q2',
      icon: 'call-sharp',
      iconColor: '#10B981',
      iconBgLight: 'bg-emerald-50 border-emerald-100',
      iconBgDark: 'bg-emerald-950/50 border-emerald-900/50',
      text: isBangla ? 'গেটে পৌঁছালে ফোন দেবেন' : 'Please call when you reach gate',
      messageText: isBangla ? 'গেটে পৌঁছালে ফোন দেবেন' : 'Please call when you reach gate',
    },
    {
      id: 'q3',
      icon: 'shield-checkmark-sharp',
      iconColor: '#F59E0B',
      iconBgLight: 'bg-amber-50 border-amber-100',
      iconBgDark: 'bg-amber-950/50 border-amber-900/50',
      text: isBangla ? 'সিকিউরিটির কাছে রেখে দিন' : 'Leave it with security guard',
      messageText: isBangla ? 'সিকিউরিটির কাছে রেখে দিন' : 'Leave it with security guard',
    },
    {
      id: 'q4',
      icon: 'time-sharp',
      iconColor: '#6366F1',
      iconBgLight: 'bg-indigo-50 border-indigo-100',
      iconBgDark: 'bg-indigo-950/50 border-indigo-900/50',
      text: isBangla ? 'কতক্ষণ লাগবে?' : 'How long will it take?',
      messageText: isBangla ? 'কতক্ষণ লাগবে?' : 'How long will it take?',
    },
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      time: currentTime,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Simulate Rider Auto Response
    setTimeout(() => {
      let riderReplyText = isBangla
        ? 'জি ভাই, আমি ইনশাআল্লাহ খুব দ্রুত পৌঁছাচ্ছি।'
        : 'Sure sir, I am driving safely and will reach your address shortly!';

      if (text.includes('Where') || text.includes('where') || text.includes('কোথায়')) {
        riderReplyText = isBangla
          ? 'আমি মেইন রোডে আছি, আর মাত্র ১.৫ কিমি বাকি।'
          : 'I am on the main road, just ~1.5 km away from your location.';
      } else if (text.includes('call') || text.includes('phone') || text.includes('ফোন')) {
        riderReplyText = isBangla
          ? 'জি অবশ্যই, গেটে এসে আপনাকে কল দিচ্ছি।'
          : 'Understood! I will call you as soon as I arrive at your gate.';
      } else if (text.includes('security') || text.includes('গেটে') || text.includes('সিকিউরিটি')) {
        riderReplyText = isBangla
          ? 'ঠিক আছে স্যার, সিকিউরিটির কাছে জমা দিয়ে ইনভয়েস ছবি তুলে রাখব।'
          : 'Okay sir, I will hand it over to security guard and notify you.';
      }

      const riderMsg: ChatMessage = {
        id: `rider-${Date.now()}`,
        sender: 'rider',
        text: riderReplyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, riderMsg]);
    }, 1200);
  };

  const handleCallRider = async () => {
    const hasPermission = await requestCallPermission(isBangla);
    if (hasPermission) {
      Linking.openURL(`tel:${riderPhone}`).catch((err) => console.log('Call error', err));
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View className="flex-1 bg-black/60 justify-end">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          className={`w-full h-[92%] max-h-[820px] rounded-t-[32px] overflow-hidden border-t shadow-2xl ${
            isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          {/* Top Sheet Drag Pill */}
          <View className={`py-2 items-center border-b ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
            <View className={`w-12 h-1.5 rounded-full ${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'}`} />
          </View>

          {/* TOP RIDER HEADER BAR */}
          <View
            className={`px-4 pt-2 pb-3 border-b flex-row items-center justify-between ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
            }`}
          >
          <View className="flex-row items-center flex-1 mr-2">
            {/* Rider Avatar with Green Online Indicator */}
            <View className="relative mr-3">
              <Image source={{ uri: riderImage }} className="w-11 h-11 rounded-full bg-slate-200" />
              <View className="w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white absolute bottom-0 right-0" />
            </View>

            {/* Rider Info */}
            <View className="flex-1">
              <View className="flex-row items-center gap-2">
                <Text
                  className={`text-base font-black ${
                    isDarkMode ? 'text-slate-50' : 'text-slate-900'
                  }`}
                >
                  {riderName}
                </Text>
                {/* Rating Badge */}
                <View className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex-row items-center gap-0.5">
                  <Text className="text-[10px] font-black text-emerald-600 dark:text-emerald-400">
                    ★ 4.9
                  </Text>
                </View>
              </View>

              <Text
                numberOfLines={1}
                className={`text-xs font-semibold mt-0.5 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {riderName.includes('Support') || riderName.includes('সাপোর্ট')
                  ? isBangla
                    ? `অর্ডার হেল্প ডেস্ক • #${orderId}`
                    : `Order Help Desk • #${orderId}`
                  : `Honda Shine (Dhaka Metro-Ha 45-8921) • ${
                      isBangla ? 'অন দ্য ওয়ে' : 'On the way'
                    }`}
              </Text>
            </View>
          </View>

          {/* Action Buttons: Phone Call & Close */}
          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={handleCallRider}
              className={`w-10 h-10 rounded-full items-center justify-center border shadow-sm ${
                isDarkMode
                  ? 'bg-emerald-950/80 border-emerald-800'
                  : 'bg-emerald-100/90 border-emerald-300'
              }`}
            >
              <Ionicons name="call" size={19} color={isDarkMode ? '#34D399' : '#059669'} />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.75}
              onPress={onClose}
              className={`w-10 h-10 rounded-full items-center justify-center border ${
                isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
              }`}
            >
              <Ionicons name="close" size={20} color={isDarkMode ? '#CBD5E1' : '#475569'} />
            </TouchableOpacity>
          </View>
        </View>

        {/* SUB-HEADER: Order ID & Live Connected Status */}
        <View
          className={`px-4 py-2.5 border-b flex-row items-center justify-between ${
            isDarkMode ? 'bg-slate-900/60 border-slate-800/80' : 'bg-slate-50/80 border-slate-100'
          }`}
        >
          <Text
            className={`text-xs font-bold ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            Order ID: <Text className="font-black">{orderId}</Text>
          </Text>

          <View className="flex-row items-center gap-1.5">
            <View className="w-2 h-2 rounded-full bg-emerald-500" />
            <Text className="text-xs font-black text-emerald-600 dark:text-emerald-400">
              Live Connected
            </Text>
          </View>
        </View>

        {/* MESSAGES LIST AREA */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, paddingBottom: 24, gap: 14 }}
          className="flex-1"
        >
          {/* Centered Today Date Badge */}
          <View className="items-center my-1">
            <View
              className={`px-3 py-1 rounded-full border ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200/60'
              }`}
            >
              <Text
                className={`text-[11px] font-bold ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Today
              </Text>
            </View>
          </View>

          {messages.map((msg) => {
            const isRider = msg.sender === 'rider';
            return (
              <View
                key={msg.id}
                className={`flex-row items-start gap-2.5 ${
                  isRider ? 'justify-start' : 'justify-end'
                }`}
              >
                {isRider && (
                  <Image source={{ uri: riderImage }} className="w-8 h-8 rounded-full bg-slate-200 mt-1" />
                )}

                <View className={`max-w-[82%] ${isRider ? 'items-start' : 'items-end'}`}>
                  <View
                    className={`p-3.5 rounded-2xl border ${
                      isRider
                        ? isDarkMode
                          ? 'bg-slate-900 border-slate-800 text-slate-100'
                          : 'bg-white border-slate-200/80 text-slate-900 shadow-sm'
                        : 'bg-amber-500 border-amber-500'
                    }`}
                  >
                    <Text
                      className={`text-xs sm:text-sm font-semibold leading-relaxed ${
                        isRider
                          ? isDarkMode
                            ? 'text-slate-100'
                            : 'text-slate-900'
                          : 'text-white font-bold'
                      }`}
                    >
                      {msg.text}
                    </Text>
                  </View>
                  <Text
                    className={`text-[10px] font-medium mt-1 px-1 ${
                      isDarkMode ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    {msg.time}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>

        {/* QUICK REPLIES SCROLL CHIPS */}
        <View className="py-2.5 px-3">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10, paddingHorizontal: 4 }}>
            {quickReplies.map((qr) => (
              <TouchableOpacity
                key={qr.id}
                activeOpacity={0.8}
                onPress={() => handleSendMessage(qr.messageText)}
                className={`flex-row items-center gap-2 px-3 py-1.5 rounded-full border shadow-sm ${
                  isDarkMode
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-white border-slate-200/90'
                }`}
              >
                <View
                  className={`w-6 h-6 rounded-full items-center justify-center border ${
                    isDarkMode ? qr.iconBgDark : qr.iconBgLight
                  }`}
                >
                  <Ionicons name={qr.icon} size={12} color={qr.iconColor} />
                </View>
                <Text
                  className={`text-xs font-bold ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-700'
                  }`}
                >
                  {qr.text}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* BOTTOM INPUT & SEND BUTTON */}
        <View
          className={`p-3 border-t flex-row items-center gap-2.5 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
          }`}
        >
          <View
            className={`flex-1 flex-row items-center px-4 h-12 rounded-2xl border ${
              inputText.trim()
                ? 'border-amber-500 bg-amber-500/5'
                : isDarkMode
                ? 'bg-slate-950 border-slate-800'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={() => handleSendMessage()}
              placeholder={isBangla ? 'রাইডারকে মেসেজ পাঠান...' : 'Type a message to rider...'}
              placeholderTextColor={isDarkMode ? '#64748B' : '#94A3B8'}
              className={`flex-1 text-xs sm:text-sm font-semibold ${
                isDarkMode ? 'text-slate-100' : 'text-slate-900'
              }`}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => handleSendMessage()}
            style={{
              backgroundColor: inputText.trim() ? activeCategoryColor : '#F59E0B',
            }}
            className="w-12 h-12 rounded-2xl items-center justify-center shadow-md shadow-amber-500/20 active:scale-95"
          >
            <Ionicons name="send" size={18} color="#FFFFFF" className="ml-0.5" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  </Modal>
);
};
