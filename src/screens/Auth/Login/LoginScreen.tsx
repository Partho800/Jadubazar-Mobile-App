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
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';
import { useUser } from '../../../context/UserContext';
import { AppText as Text } from '../../../components/common/AppText';
import { GoogleIcon } from '../../../components/common/GoogleIcon';
import { useGoogleSignIn } from '../useGoogleSignIn';

export const LoginScreen: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { isBangla } = useLanguage();
  const { loginUser } = useUser();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const initialTab = route.params?.tab === 'register' ? 'register' : 'login';

  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { signIn: googleSignIn } = useGoogleSignIn({
    onSuccess: (googleUser) => {
      setIsLoading(false);
      loginUser({
        name: googleUser.name || googleUser.given_name || 'Google User',
        email: googleUser.email,
        avatar: googleUser.picture,
      });
      Alert.alert(
        isBangla ? 'সফল হয়েছে' : 'Success',
        isBangla
          ? `${googleUser.email} দিয়ে সফলভাবে লগইন হয়েছে!`
          : `Signed in as ${googleUser.email}!`,
        [{
          text: 'OK',
          onPress: () => {
            navigation.navigate('MainTabs', {
              screen: 'ProfileTab',
              params: { viewMode: 'dashboard', timestamp: Date.now() },
            });
          },
        }]
      );
    },
    onError: (err) => {
      setIsLoading(false);
      if (err === 'GOOGLE_CLIENT_ID_NOT_CONFIGURED') {
        Alert.alert(
          isBangla ? 'সেটআপ প্রয়োজন' : 'Setup Required',
          isBangla
            ? '.env ফাইলে EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID যোগ করুন।\nGoogle Cloud Console থেকে OAuth Client ID নিন।'
            : 'Please add EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID in your .env file.\nGet it from Google Cloud Console.'
        );
      } else {
        Alert.alert(isBangla ? 'ত্রুটি' : 'Error', err);
      }
    },
  });

  const logoSource = isDarkMode
    ? require('../../../assets/images/jadubazar-logo-dark.webp')
    : require('../../../assets/images/jadubazar-logo-light.png');

  const handleAuthSubmit = () => {
    if (activeTab === 'login') {
      if (!emailOrPhone.trim() || !password.trim()) {
        Alert.alert(
          isBangla ? 'ভুল তথ্য' : 'Required Fields',
          isBangla
            ? 'অনুগ্রহ করে আপনার ইমেইল/ফোন এবং পাসওয়ার্ড প্রদান করুন।'
            : 'Please enter your email/phone and password.'
        );
        return;
      }
    } else {
      if (!fullName.trim() || !emailOrPhone.trim() || !password.trim()) {
        Alert.alert(
          isBangla ? 'ভুল তথ্য' : 'Required Fields',
          isBangla
            ? 'অনুগ্রহ করে সমস্ত প্রয়োজনীয় ঘর পূরণ করুন।'
            : 'Please fill in all required fields.'
        );
        return;
      }
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const isEmail = emailOrPhone.includes('@');
      loginUser(
        activeTab === 'register' && fullName.trim()
          ? { name: fullName, email: isEmail ? emailOrPhone : '', phone: !isEmail ? emailOrPhone : phone || emailOrPhone }
          : { email: isEmail ? emailOrPhone : '', phone: !isEmail ? emailOrPhone : '' }
      );
      Alert.alert(
        isBangla ? 'সফল হয়েছে' : 'Success',
        activeTab === 'login'
          ? isBangla
            ? 'সফলভাবে লগইন হয়েছে!'
            : 'Signed in successfully!'
          : isBangla
          ? 'অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!'
          : 'Account created successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('MainTabs', {
                screen: 'ProfileTab',
                params: { viewMode: 'dashboard', timestamp: Date.now() },
              });
            },
          },
        ]
      );
    }, 1000);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    googleSignIn();
    // Reset loading if signIn doesn't proceed (e.g. client ID not set)
    setTimeout(() => setIsLoading(false), 500);
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
        {navigation.canGoBack() && (
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
        )}

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
          {activeTab === 'login'
            ? isBangla
              ? 'স্বাগতম!'
              : 'Welcome Back'
            : isBangla
            ? 'অ্যাকাউন্ট খুলুন'
            : 'Create Account'}
        </Text>
        <Text className={`text-[15px] mb-8 ${textMuted}`}>
          {activeTab === 'login'
            ? isBangla
              ? 'কেনাকাটা চালিয়ে যেতে সাইন ইন করুন'
              : 'Sign in to continue shopping'
            : isBangla
            ? 'নতুন অ্যাকাউন্ট তৈরি করুন'
            : 'Sign up and start shopping'}
        </Text>

        {/* Tab Switcher */}
        <View
          className={`flex-row rounded-2xl p-1 mb-7 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}
        >
          <TouchableOpacity
            className={`flex-1 h-11 rounded-xl justify-center items-center flex-row ${
              activeTab === 'login'
                ? isDarkMode
                  ? 'bg-slate-700'
                  : 'bg-white'
                : ''
            }`}
            onPress={() => setActiveTab('login')}
            activeOpacity={0.8}
          >
            <Ionicons
              name="log-in-outline"
              size={16}
              color={activeTab === 'login' ? '#FFBE00' : '#94A3B8'}
              style={{ marginRight: 5 }}
            />
            <Text
              className={`text-sm font-bold ${
                activeTab === 'login' ? textPrimary : 'text-slate-400'
              }`}
            >
              {isBangla ? 'লগইন' : 'Login'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 h-11 rounded-xl justify-center items-center flex-row ${
              activeTab === 'register'
                ? isDarkMode
                  ? 'bg-slate-700'
                  : 'bg-white'
                : ''
            }`}
            onPress={() => setActiveTab('register')}
            activeOpacity={0.8}
          >
            <Ionicons
              name="person-add-outline"
              size={16}
              color={activeTab === 'register' ? '#FFBE00' : '#94A3B8'}
              style={{ marginRight: 5 }}
            />
            <Text
              className={`text-sm font-bold ${
                activeTab === 'register' ? textPrimary : 'text-slate-400'
              }`}
            >
              {isBangla ? 'রেজিস্টার' : 'Register'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Full Name (Register only) */}
        {activeTab === 'register' && (
          <View className="mb-4">
            <TextInput
              className={`h-14 border rounded-2xl px-4 text-[15px] ${inputBg} ${inputText}`}
              placeholder={isBangla ? 'আপনার নাম লিখুন' : 'Enter your name'}
              placeholderTextColor={placeholderColor}
              value={fullName}
              onChangeText={setFullName}
            />
          </View>
        )}

        {/* Email / Phone */}
        <View className="mb-4">
          <TextInput
            className={`h-14 border rounded-2xl px-4 text-[15px] ${inputBg} ${inputText}`}
            placeholder={isBangla ? 'ইমেইল অ্যাড্রেস' : 'Email address'}
            placeholderTextColor={placeholderColor}
            keyboardType="email-address"
            autoCapitalize="none"
            value={emailOrPhone}
            onChangeText={setEmailOrPhone}
          />
        </View>

        {/* Phone (Register only) */}
        {activeTab === 'register' && (
          <View className="mb-4">
            <TextInput
              className={`h-14 border rounded-2xl px-4 text-[15px] ${inputBg} ${inputText}`}
              placeholder={isBangla ? 'ফোন নম্বর' : 'Phone number'}
              placeholderTextColor={placeholderColor}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>
        )}

        {/* Password */}
        <View className={`flex-row items-center h-14 border rounded-2xl px-4 mb-2 ${inputBg}`}>
          <TextInput
            className={`flex-1 text-[15px] ${inputText}`}
            placeholder={isBangla ? 'পাসওয়ার্ড' : 'Password'}
            placeholderTextColor={placeholderColor}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} activeOpacity={0.7}>
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#94A3B8"
            />
          </TouchableOpacity>
        </View>

        {/* Forgot Password */}
        {activeTab === 'login' && (
          <TouchableOpacity
            className="self-end mb-6"
            onPress={() => navigation.navigate('ForgotPassword')}
            activeOpacity={0.7}
          >
            <Text className="text-[13px] font-semibold text-[#D97706]">
              {isBangla ? 'পাসওয়ার্ড ভুলে গেছেন?' : 'Forgot password?'}
            </Text>
          </TouchableOpacity>
        )}

        {activeTab === 'register' && <View className="mb-6" />}

        {/* Sign In / Create Account Button */}
        <TouchableOpacity
          className="h-[54px] bg-[#FFBE00] rounded-2xl justify-center items-center mb-6"
          onPress={handleAuthSubmit}
          activeOpacity={0.88}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#000000" />
          ) : (
            <Text className="text-black text-base font-black">
              {activeTab === 'login'
                ? isBangla
                  ? 'সাইন ইন করুন'
                  : 'Sign In'
                : isBangla
                ? 'অ্যাকাউন্ট খুলুন'
                : 'Create Account'}
            </Text>
          )}
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center mb-6">
          <View className={`flex-1 h-[1px] ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />
          <Text className={`text-[11px] font-semibold tracking-widest mx-3 ${textMuted}`}>
            {isBangla ? 'অথবা' : 'OR CONTINUE WITH'}
          </Text>
          <View className={`flex-1 h-[1px] ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />
        </View>

        {/* Google Sign In */}
        <TouchableOpacity
          className={`flex-row items-center justify-center h-14 border rounded-2xl ${
            isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
          }`}
          onPress={handleGoogleSignIn}
          activeOpacity={0.85}
        >
          <GoogleIcon size={20} style={{ marginRight: 10 }} />
          <Text className={`text-[15px] font-semibold ${textPrimary}`}>
            {isBangla ? 'গুগল দিয়ে কন্টিনিউ করুন' : 'Continue with Google'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
