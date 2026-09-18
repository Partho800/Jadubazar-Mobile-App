import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';
import { AppText as Text } from '../../../components/common/AppText';

export const ForgotPasswordScreen: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { isBangla } = useLanguage();
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const logoSource = isDarkMode
    ? require('../../../assets/images/jadubazar-logo-dark.webp')
    : require('../../../assets/images/jadubazar-logo-light.png');

  const handleResetPassword = () => {
    if (!email.trim()) {
      Alert.alert(
        isBangla ? 'ভুল তথ্য' : 'Required Field',
        isBangla ? 'অনুগ্রহ করে আপনার ইমেইল প্রদান করুন।' : 'Please enter your email address.'
      );
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        isBangla ? 'রিসেট লিংক পাঠানো হয়েছে' : 'Reset Link Sent',
        isBangla
          ? 'আপনার ইমেইলে পাসওয়ার্ড রিসেট লিংক পাঠানো হয়েছে।'
          : 'A password reset link has been sent to your email address.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    }, 1000);
  };

  const bg = isDarkMode ? 'bg-slate-950' : 'bg-white';
  const textPrimary = isDarkMode ? 'text-white' : 'text-slate-900';
  const textMuted = isDarkMode ? 'text-slate-400' : 'text-slate-500';
  const inputBg = isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200';
  const inputText = isDarkMode ? 'text-white' : 'text-slate-900';
  const placeholderColor = isDarkMode ? '#64748B' : '#94A3B8';

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        className={`flex-1 ${bg}`}
        contentContainerClassName="flex-grow justify-center px-6 py-10"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Back Button */}
        <TouchableOpacity
          className="absolute top-5 left-5 w-9 h-9 rounded-full justify-center items-center z-10"
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons
            name="arrow-back-outline"
            size={22}
            color={isDarkMode ? '#F8FAFC' : '#0F172A'}
          />
        </TouchableOpacity>

        {/* Logo */}
        <View className="items-center mb-8">
          <Image
            source={logoSource}
            style={{ width: 160, height: 46 }}
            resizeMode="contain"
          />
        </View>

        {/* Heading */}
        <Text className={`text-3xl font-black mb-1.5 ${textPrimary}`}>
          {isBangla ? 'পাসওয়ার্ড ভুলেছেন?' : 'Forgot Password'}
        </Text>
        <Text className={`text-[15px] mb-8 ${textMuted}`}>
          {isBangla
            ? 'রিসেট লিংক পাঠাতে আপনার ইমেইল লিখুন'
            : 'Enter your email to receive reset instructions'}
        </Text>

        {/* Email Input */}
        <View className="mb-6">
          <View className={`flex-row items-center h-14 border rounded-2xl px-4 ${inputBg}`}>
            <Ionicons
              name="mail-outline"
              size={19}
              color={placeholderColor}
              style={{ marginRight: 10 }}
            />
            <TextInput
              className={`flex-1 text-[15px] ${inputText}`}
              placeholder="name@example.com"
              placeholderTextColor={placeholderColor}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          className="h-[54px] bg-[#FFBE00] rounded-2xl justify-center items-center mb-5"
          onPress={handleResetPassword}
          activeOpacity={0.88}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#000000" />
          ) : (
            <Text className="text-black text-base font-black">
              {isBangla ? 'রিসেট লিংক পাঠান' : 'Send Reset Link'}
            </Text>
          )}
        </TouchableOpacity>

        {/* Back to Login */}
        <TouchableOpacity
          className="flex-row items-center justify-center py-2"
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={16} color="#D97706" style={{ marginRight: 6 }} />
          <Text className="text-[14px] font-semibold text-[#D97706]">
            {isBangla ? 'লগইন পেজে ফিরুন' : 'Back to Login'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
