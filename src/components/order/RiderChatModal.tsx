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
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useCategory } from '../../context/CategoryContext';
import { requestCallPermission } from '../../utils/permissionHelper';
import { AppText as Text } from '../common/AppText';
import { DefaultUserAvatar } from '../common/DefaultUserAvatar';

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
  riderImage,
}) => {
  const { isDarkMode } = useTheme();
  const { isBangla } = useLanguage();
  const { activeCategoryColor } = useCategory();

  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'rider',
      text: isBangla
        ? 'আসসালামু আলাইকুম! আমি আপনার ডেলিভারির উদ্দেশ্যে রওনা হয়েছি।'
        : 'Assalamu Alaikum! I have picked up your order and am on my way.',
      time: '12:45 PM',
    },
    {
      id: '2',
      sender: 'user',
      text: isBangla ? 'ধন্যবাদ ভাই, কতক্ষণ লাগবে?' : 'Thanks! How long will it take?',
      time: '12:47 PM',
    },
    {
      id: '3',
      sender: 'rider',
      text: isBangla
        ? 'আর প্রায় ১০-১৫ মিনিট লাগবে ইনশাআল্লাহ। রোডে কিছুটা ট্রাফিক আছে।'
        : 'About 10-15 minutes inshaAllah. Road has slight traffic.',
      time: '12:48 PM',
    },
  ]);

  const quickReplies = [
    {
      id: 'qr-1',
      icon: 'location-outline' as keyof typeof Ionicons.glyphMap,
      iconColor: isDarkMode ? '#FBBF24' : '#D97706',
      iconBgLight: 'bg-amber-100/70 border-amber-200',
      iconBgDark: 'bg-amber-950/60 border-amber-800',
      text: isBangla ? 'আপনি কোন রোডে আছেন?' : 'Which road are you on?',
      messageText: isBangla
        ? 'ভাই আপনি এখন কোন রোডে আছেন?'
        : 'Brother, which road are you currently on?',
    },
    {
      id: 'qr-2',
      icon: 'call-outline' as keyof typeof Ionicons.glyphMap,
      iconColor: isDarkMode ? '#34D399' : '#059669',
      iconBgLight: 'bg-emerald-100/70 border-emerald-200',
      iconBgDark: 'bg-emerald-950/60 border-emerald-800',
      text: isBangla ? 'গেটে এসে কল দিন' : 'Please call at gate',
      messageText: isBangla
        ? 'গেটে এসে কল দিবেন দয়া করে।'
        : 'Please call me when you reach the gate.',
    },
    {
      id: 'qr-3',
      icon: 'thumbs-up-outline' as keyof typeof Ionicons.glyphMap,
      iconColor: isDarkMode ? '#818CF8' : '#4F46E5',
      iconBgLight: 'bg-indigo-100/70 border-indigo-200',
      iconBgDark: 'bg-indigo-950/60 border-indigo-800',
      text: isBangla ? 'আমি অপেক্ষা করছি' : 'I am waiting',
      messageText: isBangla ? 'আমি অপেক্ষা করছি।' : 'I am waiting here.',
    },
    {
      id: 'qr-4',
      icon: 'cash-outline' as keyof typeof Ionicons.glyphMap,
      iconColor: isDarkMode ? '#38BDF8' : '#0284C7',
      iconBgLight: 'bg-sky-100/70 border-sky-200',
      iconBgDark: 'bg-sky-950/60 border-sky-800',
      text: isBangla ? 'ভাংতি টাকা আছে তো?' : 'Have exact change?',
      messageText: isBangla
        ? 'আপনার কাছে ভাংতি টাকা আছে তো?'
        : 'Do you have change for 1000/500 note?',
    },
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const newMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    if (!textToSend) setInputText('');

    // Simulated Rider reply
    setTimeout(() => {
      const riderReply: ChatMessage = {
        id: `rdr-${Date.now()}`,
        sender: 'rider',
        text: isBangla ? 'ঠিক আছে ভাই, বুঝতে পেরেছি।' : 'Got it brother, noted!',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, riderReply]);
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
      <View className="flex-1 bg-slate-900/25 justify-end">
        <TouchableWithoutFeedback onPress={onClose}>
          <View className="flex-1" />
        </TouchableWithoutFeedback>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          className={`w-full h-[88%] max-h-[760px] rounded-t-[32px] overflow-hidden border-t shadow-lg ${
            isDarkMode
              ? 'bg-[#0F172A] border-slate-800 shadow-black/40'
              : 'bg-white border-slate-100 shadow-slate-900/10'
          }`}
        >
          {/* Top Sheet Drag Pill */}
          <View className="py-2.5 items-center justify-center">
            <View
              className={`w-11 rounded-full ${isDarkMode ? 'bg-slate-700/70' : 'bg-slate-200'}`}
              style={{ height: 5 }}
            />
          </View>

          {/* TOP RIDER HEADER BAR */}
          <View
            className={`px-4 pb-3 pt-1 border-b flex-row items-center justify-between ${
              isDarkMode ? 'bg-[#0F172A] border-slate-800/80' : 'bg-white border-slate-100'
            }`}
          >
            <View className="flex-row items-center flex-1 mr-2">
              {/* Rider Avatar with Green Online Indicator */}
              <View className="relative mr-3">
                <DefaultUserAvatar
                  uri={riderImage}
                  size={44}
                  isDarkMode={isDarkMode}
                  borderColor="#10B981"
                />
                <View className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 absolute bottom-0 right-0" />
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
                  <View className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex-row items-center gap-0.5">
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
                    : `Honda Shine • ${isBangla ? 'অন দ্য ওয়ে' : 'On the way'}`}
                </Text>
              </View>
            </View>

            {/* Header Right Actions: Call + Close */}
            <View className="flex-row items-center gap-2">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleCallRider}
                className="w-9 h-9 rounded-full bg-emerald-500 items-center justify-center shadow-sm"
              >
                <Ionicons name="call" size={16} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={onClose}
                className={`w-8 h-8 rounded-full items-center justify-center ${
                  isDarkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200/80'
                }`}
              >
                <Ionicons name="close" size={18} color={isDarkMode ? '#CBD5E1' : '#64748B'} />
              </TouchableOpacity>
            </View>
          </View>

          {/* SUB-HEADER: Order ID & Live Connected Status */}
          <View
            className={`px-4 py-2 border-b flex-row items-center justify-between ${
              isDarkMode ? 'bg-slate-900/40 border-slate-800/60' : 'bg-slate-50/60 border-slate-100'
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
            contentContainerStyle={{ padding: 16, paddingBottom: 24, gap: 12 }}
            className="flex-1"
          >
            {/* Centered Today Date Badge */}
            <View className="items-center my-1">
              <View
                className={`px-3 py-1 rounded-full ${
                  isDarkMode ? 'bg-slate-800/80' : 'bg-slate-100'
                }`}
              >
                <Text
                  className={`text-[10px] font-bold ${
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
                  className={`flex-row items-start gap-2 ${
                    isRider ? 'justify-start' : 'justify-end'
                  }`}
                >
                  {isRider && (
                    <View className="mt-0.5">
                      <DefaultUserAvatar
                        uri={riderImage}
                        size={28}
                        isDarkMode={isDarkMode}
                        borderColor="#10B981"
                      />
                    </View>
                  )}

                  <View className={`max-w-[82%] ${isRider ? 'items-start' : 'items-end'}`}>
                    <View
                      className={`p-3.5 px-4 rounded-2xl ${
                        isRider
                          ? isDarkMode
                            ? 'bg-slate-800/80 border border-slate-700/60 rounded-bl-sm'
                            : 'bg-slate-50 border border-slate-100 rounded-bl-sm'
                          : 'bg-amber-500 rounded-br-sm shadow-sm'
                      }`}
                    >
                      <Text
                        className={`text-xs font-semibold leading-relaxed ${
                          isRider
                            ? isDarkMode
                              ? 'text-slate-100'
                              : 'text-slate-800'
                            : 'text-white font-bold'
                        }`}
                      >
                        {msg.text}
                      </Text>
                    </View>
                    <Text
                      className={`text-[9px] font-medium mt-1 px-1 ${
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
          <View className="py-2 px-3 border-t border-slate-100 dark:border-slate-800/60">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingHorizontal: 4 }}>
              {quickReplies.map((qr) => (
                <TouchableOpacity
                  key={qr.id}
                  activeOpacity={0.75}
                  onPress={() => handleSendMessage(qr.messageText)}
                  className={`flex-row items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors ${
                    isDarkMode
                      ? 'bg-slate-900/70 border-slate-800 active:bg-slate-800'
                      : 'bg-slate-50/80 border-slate-100 active:bg-slate-100'
                  }`}
                >
                  <View
                    className={`w-5 h-5 rounded-full items-center justify-center ${
                      isDarkMode ? qr.iconBgDark : qr.iconBgLight
                    }`}
                  >
                    <Ionicons name={qr.icon} size={11} color={qr.iconColor} />
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
            className={`p-3 px-4 border-t flex-row items-center gap-2.5 ${
              isDarkMode ? 'bg-[#0F172A] border-slate-800/80' : 'bg-white border-slate-100'
            }`}
          >
            <View
              className={`flex-1 flex-row items-center px-4 h-11 rounded-2xl ${
                inputText.trim()
                  ? 'border border-amber-500/80 bg-amber-500/5'
                  : isDarkMode
                  ? 'bg-slate-900 border border-slate-800'
                  : 'bg-slate-50 border border-slate-100'
              }`}
            >
              <TextInput
                value={inputText}
                onChangeText={setInputText}
                onSubmitEditing={() => handleSendMessage()}
                placeholder={isBangla ? 'রাইডারকে মেসেজ পাঠান...' : 'Type a message to rider...'}
                placeholderTextColor={isDarkMode ? '#64748B' : '#94A3B8'}
                className={`flex-1 text-xs font-semibold py-0 ${
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
              className="w-11 h-11 rounded-2xl items-center justify-center active:scale-95 shadow-sm"
            >
              <Ionicons name="send" size={16} color="#FFFFFF" className="ml-0.5" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};
