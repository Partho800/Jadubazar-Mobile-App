import React, { useState, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useCategory } from '../../context/CategoryContext';
import { AppText as Text } from './AppText';
import { SupportAgentAvatar } from './SupportAgentAvatar';

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
  const scrollViewRef = useRef<ScrollView>(null);
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
      icon: 'cube-outline' as const,
      iconColor: '#2563EB',
      iconBg: '#EFF6FF',
      darkIconBg: '#1E3A8A35',
      reply: isBangla
        ? 'আপনার অর্ডারের সর্বশেষ তথ্য দেখতে "My Account > Delivery Man" বা "Orders" পেজে যান।'
        : 'To track your latest order status, please visit "My Account > Delivery Man" or your "Orders" tab.',
    },
    {
      id: 'q2',
      label: isBangla ? 'পেমেন্ট ও রিফান্ড সংক্রান্ত' : 'Payment & Refund issue',
      icon: 'card-outline' as const,
      iconColor: '#059669',
      iconBg: '#ECFDF5',
      darkIconBg: '#064E3B35',
      reply: isBangla
        ? 'পেমেন্ট ব্যর্থ হলে বা রিফান্ড সংক্রান্ত অনুসন্ধানের জন্য আমাদের হেল্পলাইন +8809612345678-এ যোগাযোগ করুন।'
        : 'For payment failures or refund inquiries, our financial team is available 24/7 at +8809612345678.',
    },
    {
      id: 'q3',
      label: isBangla ? 'রাইডারের সাথে যোগাযোগ' : 'Rider Contact',
      icon: 'bicycle-outline' as const,
      iconColor: '#D97706',
      iconBg: '#FFFBEB',
      darkIconBg: '#78350F35',
      reply: isBangla
        ? 'আপনার অর্ডারে অ্যাসাইনড রাইডারের সাথে সরাসরি মাস্কড কলে কথা বলতে "Delivery Partners & Rider Hub"-এ ক্লিক করুন।'
        : 'You can directly call or message your assigned rider via "Delivery Partners & Rider Hub" under Account menu.',
    },
    {
      id: 'q4',
      label: isBangla ? 'সরাসরি প্রতিনিধির সাথে কথা' : 'Speak to Representative',
      icon: 'headset-outline' as const,
      iconColor: '#7C3AED',
      iconBg: '#F5F3FF',
      darkIconBg: '#4C1D9535',
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

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

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
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1000);
  };

  return (
    <>
      {/* FLOATING CHAT BUTTON */}
      <View style={styles.floatingContainer} pointerEvents="box-none">
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={() => setIsOpen(true)}
          style={[
            styles.floatingButton,
            {
              backgroundColor: activeCategoryColor,
            },
          ]}
          className="cursor-pointer active:scale-95 transition-all items-center justify-center shadow-lg"
        >
          <Ionicons name="chatbubbles" size={23} color="#FFFFFF" />
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
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          {/* Soft clean backdrop (reduced darkness and harsh shadows) */}
          <View className="flex-1 bg-slate-900/25 justify-end">
            <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
              <View className="flex-1" />
            </TouchableWithoutFeedback>

            {/* Modal Bottom Sheet Container */}
            <View
              className={`w-full h-[85%] max-h-[720px] rounded-t-[32px] overflow-hidden border-t shadow-lg ${
                isDarkMode
                  ? 'bg-[#0F172A] border-slate-800 shadow-black/40'
                  : 'bg-white border-slate-100 shadow-slate-900/10'
              }`}
            >
              {/* Top Sheet Drag Pill */}
              <View className="py-2.5 items-center justify-center">
                <View
                  className={`w-11 h-1.2 rounded-full ${
                    isDarkMode ? 'bg-slate-700/70' : 'bg-slate-200'
                  }`}
                  style={{ height: 5 }}
                />
              </View>

              {/* HEADER BAR */}
              <View
                className={`px-4 pb-3 pt-1 border-b flex-row items-center justify-between ${
                  isDarkMode ? 'border-slate-800/80 bg-[#0F172A]' : 'border-slate-100 bg-white'
                }`}
              >
                {/* Support Agent Info */}
                <View className="flex-row items-center flex-1 mr-2">
                  <View className="mr-3">
                    <SupportAgentAvatar
                      size={44}
                      isDarkMode={isDarkMode}
                      color={activeCategoryColor}
                      showOnlineDot={true}
                    />
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
                      <View className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
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
                  activeOpacity={0.7}
                  onPress={() => setIsOpen(false)}
                  className={`w-8 h-8 rounded-full items-center justify-center ${
                    isDarkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200/80'
                  }`}
                >
                  <Ionicons name="close" size={18} color={isDarkMode ? '#CBD5E1' : '#64748B'} />
                </TouchableOpacity>
              </View>

              {/* CHAT MESSAGES BODY */}
              <ScrollView
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 24 }}
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
                        <View className="mr-2 self-end mb-0.5">
                          <SupportAgentAvatar
                            size={28}
                            isDarkMode={isDarkMode}
                            color={activeCategoryColor}
                            showOnlineDot={false}
                          />
                        </View>
                      )}

                      <View
                        style={{
                          backgroundColor: isUser
                            ? activeCategoryColor
                            : isDarkMode
                            ? '#1E293B'
                            : '#F8FAFC',
                        }}
                        className={`max-w-[82%] p-3.5 px-4 rounded-2xl ${
                          isUser
                            ? 'rounded-br-sm'
                            : isDarkMode
                            ? 'rounded-bl-sm border border-slate-800/80'
                            : 'rounded-bl-sm border border-slate-100'
                        }`}
                      >
                        <Text
                          className={`text-xs font-semibold leading-relaxed ${
                            isUser
                              ? 'text-white'
                              : isDarkMode
                              ? 'text-slate-100'
                              : 'text-slate-800'
                          }`}
                        >
                          {msg.text}
                        </Text>
                        <Text
                          className={`text-[9px] font-bold mt-1 self-end ${
                            isUser
                              ? 'text-white/75'
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
                  <View className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                    <Text className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2.5 px-1">
                      {isBangla ? 'দ্রুত প্রশ্ন সমাধান:' : 'FREQUENTLY ASKED:'}
                    </Text>
                    <View className="gap-2">
                      {quickQuestions.map((q) => (
                        <TouchableOpacity
                          key={q.id}
                          activeOpacity={0.75}
                          onPress={() => handleSend(q.reply)}
                          className={`p-2.5 px-3 rounded-xl border flex-row items-center justify-between transition-colors ${
                            isDarkMode
                              ? 'bg-slate-900/60 border-slate-800/80 active:bg-slate-800'
                              : 'bg-slate-50/70 border-slate-100 active:bg-slate-100'
                          }`}
                        >
                          <View className="flex-row items-center gap-2.5 flex-1 mr-2">
                            <View
                              style={{
                                backgroundColor: isDarkMode ? q.darkIconBg : q.iconBg,
                              }}
                              className="w-7 h-7 rounded-lg items-center justify-center"
                            >
                              <Ionicons
                                name={q.icon}
                                size={15}
                                color={q.iconColor}
                              />
                            </View>
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
                className={`p-3 px-4 border-t flex-row items-center gap-2.5 ${
                  isDarkMode
                    ? 'bg-[#0F172A] border-slate-800/80'
                    : 'bg-white border-slate-100'
                }`}
              >
                <View
                  className={`flex-1 flex-row items-center px-3.5 h-11 rounded-2xl ${
                    isDarkMode
                      ? 'bg-slate-900 border border-slate-800'
                      : 'bg-slate-50 border border-slate-100'
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
                  className="w-11 h-11 rounded-2xl items-center justify-center active:scale-95 shadow-sm"
                >
                  <Ionicons name="send" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
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
    width: 50,
    height: 50,
    borderRadius: 25,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
});
