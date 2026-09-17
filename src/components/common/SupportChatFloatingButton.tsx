import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useCategory } from '../../context/CategoryContext';
import { AppText as Text } from './AppText';

export interface SupportChatMessage {
  id: string;
  sender: 'support' | 'user';
  text: string;
  time: string;
}

export const SupportChatFloatingButton: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { isBangla } = useLanguage();
  const { activeCategoryColor } = useCategory();

  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<SupportChatMessage[]>([
    {
      id: 'supp-1',
      sender: 'support',
      text: isBangla
        ? 'জাদুডিজিটাল হেল্পডেস্কে আপনাকে স্বাগতম। আমরা কীভাবে আপনাকে সাহায্য করতে পারি?'
        : 'Welcome to JaduBazar Live Support 24/7. How can we help you today?',
      time: '12:00 PM',
    },
  ]);

  const quickQuestions = [
    {
      id: 'q1',
      label: isBangla ? 'আমার অর্ডার কোথায়?' : 'Where is my order?',
      reply: isBangla
        ? 'আপনার অর্ডারের সর্বশেষ তথ্য দেখতে "My Account > Delivery Man" বা "Orders" পেজে যান।'
        : 'To track your latest order status, please visit "My Account > Delivery Man" or your "Orders" tab.',
    },
    {
      id: 'q2',
      label: isBangla ? 'পেমেন্ট ও রিফান্ড সংক্রান্ত' : 'Payment & Refund issue',
      reply: isBangla
        ? 'পেমেন্ট ব্যর্থ হলে বা রিফান্ড সংক্রান্ত অনুসন্ধানের জন্য আমাদের হেল্পলাইন +8809612345678-এ যোগাযোগ করুন।'
        : 'For payment failures or refund inquiries, our financial team is available 24/7 at +8809612345678.',
    },
    {
      id: 'q3',
      label: isBangla ? 'রাইডারের সাথে চ্যাট' : 'Rider Contact',
      reply: isBangla
        ? 'আপনার অর্ডারে অ্যাসাইনড রাইডারের সাথে সরাসরি মাস্কড কলে কথা বলতে "Delivery Partners & Rider Hub"-এ ক্লিক করুন।'
        : 'You can directly call or message your assigned rider via "Delivery Partners & Rider Hub" under Account menu.',
    },
    {
      id: 'q4',
      label: isBangla ? 'সরাসরি প্রতিনিধির সাথে কথা' : 'Speak to Representative',
      reply: isBangla
        ? 'আমাদের গ্রাহক সেবা প্রতিনিধি আপনার প্রশ্নের উত্তর দিতে যুক্ত হচ্ছেন, অনুগ্রহ করে লাইনে থাকুন...'
        : 'A customer support representative is connecting to your chat, please hold on tight...',
    },
  ];

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    setHasInteracted(true);

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: SupportChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      time: currentTime,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Auto bot / support response
    setTimeout(() => {
      let replyText = isBangla
        ? 'ধন্যবাদ! আপনার বার্তাটি আমাদের কাস্টমার সাপোর্ট টিমের নিকট পৌঁছানো হয়েছে।'
        : 'Thank you! Your query has been logged. Our support representative will assist you shortly.';

      const lower = text.toLowerCase();
      if (lower.includes('order') || lower.includes('অর্ডার')) {
        replyText = isBangla
          ? 'আপনার অর্ডারের বিস্তারিত তথ্য "My Orders" সেকশনে রয়েছে।'
          : 'You can review all active order logs and tracking details under your Profile > Orders tab.';
      } else if (lower.includes('refund') || lower.includes('রিফান্ড')) {
        replyText = isBangla
          ? 'রিফান্ড প্রসেস সাধারণত ২৪-৪৮ ঘণ্টার মধ্যে সম্পন্ন হয়।'
          : 'Standard refund processing takes 24-48 business hours back to your original payment method.';
      }

      const botMsg: SupportChatMessage = {
        id: `supp-${Date.now()}`,
        sender: 'support',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <>
      {/* FLOATING CHAT BUTTON (Bottom Right, placed above bottom navigation bar) */}
      <View style={styles.floatingContainer} pointerEvents="box-none">
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setIsOpen(true)}
          style={[
            styles.floatingButton,
            {
              backgroundColor: activeCategoryColor,
              shadowColor: activeCategoryColor,
            },
          ]}
          className="cursor-pointer active:scale-95 transition-all shadow-xl items-center justify-center"
        >
          <Ionicons name="chatbubbles" size={24} color="#FFFFFF" />
          {/* Online green indicator dot */}
          <View className="w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white absolute top-0.5 right-0.5" />
        </TouchableOpacity>
      </View>

      {/* LIVE SUPPORT CHAT MODAL */}
      <Modal
        visible={isOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsOpen(false)}
      >
        <View className="flex-1 bg-black/60 justify-end">
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            className={`w-full h-[90%] max-h-[780px] rounded-t-[32px] overflow-hidden border-t shadow-2xl ${
              isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            {/* Top Sheet Drag Indicator Bar */}
            <View
              className={`py-2 items-center border-b ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
              }`}
            >
              <View
                className={`w-12 h-1.5 rounded-full ${
                  isDarkMode ? 'bg-slate-700' : 'bg-slate-300'
                }`}
              />
            </View>

            {/* HEADER BAR */}
            <View
              className={`px-4 py-3 border-b flex-row items-center justify-between ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
              }`}
            >
              {/* Support Agent Info */}
              <View className="flex-row items-center flex-1 mr-2">
                <View className="relative mr-3">
                  <View
                    style={{ backgroundColor: `${activeCategoryColor}20` }}
                    className="w-11 h-11 rounded-2xl items-center justify-center border border-amber-400/30"
                  >
                    <Ionicons name="headset" size={22} color={activeCategoryColor} />
                  </View>
                  <View className="w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white absolute bottom-0 right-0" />
                </View>

                <View className="flex-1">
                  <View className="flex-row items-center gap-2">
                    <Text
                      className={`text-base font-black ${
                        isDarkMode ? 'text-slate-50' : 'text-slate-900'
                      }`}
                    >
                      {isBangla ? 'জাদুলাইভ সাপোর্ট' : 'JaduBazar Support'}
                    </Text>
                    <View className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                      <Text className="text-[10px] font-black text-emerald-600 dark:text-emerald-400">
                        Live 24/7
                      </Text>
                    </View>
                  </View>
                  <Text
                    className={`text-xs font-semibold mt-0.5 ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {isBangla ? '২৪/৭ গ্রাহক সেবা হেল্পডেস্ক' : 'Always here to help you'}
                  </Text>
                </View>
              </View>

              {/* Close Button */}
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => setIsOpen(false)}
                className={`w-9 h-9 rounded-full items-center justify-center border ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
                }`}
              >
                <Ionicons name="close" size={20} color={isDarkMode ? '#CBD5E1' : '#475569'} />
              </TouchableOpacity>
            </View>

            {/* CHAT MESSAGES BODY */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 20 }}
              className="flex-1"
            >
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <View
                    key={msg.id}
                    className={`flex-row ${isUser ? 'justify-end' : 'justify-start'} mb-1`}
                  >
                    {!isUser && (
                      <View
                        style={{ backgroundColor: `${activeCategoryColor}18` }}
                        className="w-8 h-8 rounded-full items-center justify-center mr-2 border border-amber-400/30 self-end mb-1"
                      >
                        <Ionicons name="headset" size={15} color={activeCategoryColor} />
                      </View>
                    )}

                    <View
                      style={{
                        backgroundColor: isUser
                          ? activeCategoryColor
                          : isDarkMode
                          ? '#1E293B'
                          : '#FFFFFF',
                      }}
                      className={`max-w-[80%] p-3.5 rounded-2xl border shadow-sm ${
                        isUser
                          ? 'rounded-br-none border-transparent'
                          : isDarkMode
                          ? 'rounded-bl-none border-slate-800'
                          : 'rounded-bl-none border-slate-200'
                      }`}
                    >
                      <Text
                        className={`text-xs font-semibold leading-relaxed ${
                          isUser
                            ? 'text-white font-bold'
                            : isDarkMode
                            ? 'text-slate-200'
                            : 'text-slate-800'
                        }`}
                      >
                        {msg.text}
                      </Text>
                      <Text
                        className={`text-[9px] font-bold mt-1.5 self-end ${
                          isUser
                            ? 'text-white/80'
                            : isDarkMode
                            ? 'text-slate-400'
                            : 'text-slate-400'
                        }`}
                      >
                        {msg.time}
                      </Text>
                    </View>
                  </View>
                );
              })}

              {/* QUICK QUESTIONS PROMPTS */}
              {!hasInteracted && (
                <View className="mt-2 pt-3 border-t border-slate-200/60 dark:border-slate-800">
                  <Text className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2.5 px-1">
                    {isBangla ? 'দ্রুত প্রশ্ন সমাধান:' : 'FREQUENTLY ASKED:'}
                  </Text>
                  <View className="gap-2">
                    {quickQuestions.map((q) => (
                      <TouchableOpacity
                        key={q.id}
                        activeOpacity={0.8}
                        onPress={() => handleSend(q.reply)}
                        className={`p-3 rounded-2xl border flex-row items-center justify-between ${
                          isDarkMode
                            ? 'bg-slate-900 border-slate-800 active:bg-slate-800'
                            : 'bg-white border-slate-200 active:bg-slate-100 shadow-sm'
                        }`}
                      >
                        <View className="flex-row items-center gap-2 flex-1 mr-2">
                          <Ionicons
                            name="chatbubble-ellipses-outline"
                            size={15}
                            color={activeCategoryColor}
                          />
                          <Text
                            className={`text-xs font-bold ${
                              isDarkMode ? 'text-slate-200' : 'text-slate-700'
                            }`}
                          >
                            {q.label}
                          </Text>
                        </View>
                        <Ionicons
                          name="chevron-forward"
                          size={14}
                          color={isDarkMode ? '#64748B' : '#94A3B8'}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            </ScrollView>

            {/* INPUT FOOTER */}
            <View
              className={`p-3 px-4 border-t flex-row items-center gap-2 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <View
                className={`flex-1 flex-row items-center px-3.5 h-12 rounded-2xl border ${
                  isDarkMode
                    ? 'bg-slate-950 border-slate-800'
                    : 'bg-slate-50 border-slate-200 shadow-sm'
                }`}
              >
                <TextInput
                  value={inputText}
                  onChangeText={setInputText}
                  placeholder={
                    isBangla
                      ? 'আপনার মেসেজ লিখুন...'
                      : 'Type your message here...'
                  }
                  placeholderTextColor={isDarkMode ? '#64748B' : '#94A3B8'}
                  className={`flex-1 text-xs font-semibold py-0 ${
                    isDarkMode ? 'text-slate-100' : 'text-slate-900'
                  }`}
                  onSubmitEditing={() => handleSend()}
                />
              </View>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => handleSend()}
                style={{ backgroundColor: activeCategoryColor }}
                className="w-12 h-12 rounded-2xl items-center justify-center shadow-lg active:scale-95"
              >
                <Ionicons name="send" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 96 : 88,
    right: 16,
    zIndex: 9999,
  },
  floatingButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 10,
  },
});
