import { Platform } from 'react-native';

export interface ThemeColors {
  primary: string;
  primaryForeground: string;
  accent: string;
  accentForeground: string;
  primaryLight: string;
  primaryBorder: string;

  background: string;
  card: string;
  cardBorder: string;

  textPrimary: string;
  textSecondary: string;
  textMuted: string;

  accentBadgeBg: string;
  accentBadgeText: string;

  tabActive: string;
  tabActiveIcon: string;
  tabActivePill: string;
  tabInactive: string;

  statusBarStyle: 'dark' | 'light';
}

// 1. Light Mode (JaduBazar Brand Yellow #fbbf24 & Clean Slate)
export const lightTheme: ThemeColors = {
  primary: '#FBBF24',
  primaryForeground: '#000000',
  accent: '#F59E0B',
  accentForeground: '#FFFFFF',
  primaryLight: '#FEF3C7',
  primaryBorder: '#FDE68A',

  background: '#FFFFFF',
  card: '#FFFFFF',
  cardBorder: '#E2E8F0',

  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#64748B',

  accentBadgeBg: '#FEF3C7',
  accentBadgeText: '#D97706',

  tabActive: '#D97706',
  tabActiveIcon: '#000000',
  tabActivePill: '#FBBF24',
  tabInactive: '#64748B',

  statusBarStyle: 'dark',
};

// 2. Dark Mode (Deep Midnight Navy #090d16 & Amber #fbbf24)
export const darkTheme: ThemeColors = {
  primary: '#FBBF24',
  primaryForeground: '#000000',
  accent: '#F59E0B',
  accentForeground: '#FFFFFF',
  primaryLight: 'rgba(251, 191, 36, 0.15)',
  primaryBorder: 'rgba(251, 191, 36, 0.3)',

  background: '#090D16',
  card: '#0F172A',
  cardBorder: '#1E293B',

  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',

  accentBadgeBg: 'rgba(251, 191, 36, 0.15)',
  accentBadgeText: '#FBBF24',

  tabActive: '#FBBF24',
  tabActiveIcon: '#000000',
  tabActivePill: '#FBBF24',
  tabInactive: '#94A3B8',

  statusBarStyle: 'light',
};

// Global Typography Design Tokens (Geist & Li Ador Noirrit)
export const fonts = {
  // Primary App Font (Geist)
  regular: Platform.select({ ios: 'Geist-Regular', android: 'Geist-Regular', default: 'Geist-Regular, system-ui, sans-serif' }),
  medium: Platform.select({ ios: 'Geist-Medium', android: 'Geist-Medium', default: 'Geist-Medium, system-ui, sans-serif' }),
  semibold: Platform.select({ ios: 'Geist-SemiBold', android: 'Geist-SemiBold', default: 'Geist-SemiBold, system-ui, sans-serif' }),
  bold: Platform.select({ ios: 'Geist-Bold', android: 'Geist-Bold', default: 'Geist-Bold, system-ui, sans-serif' }),

  // Bangla Font (Li Ador Noirrit)
  banglaRegular: Platform.select({ ios: 'LiAdorNoirrit-Regular', android: 'LiAdorNoirrit-Regular', default: 'LiAdorNoirrit-Regular, sans-serif' }),
  banglaSemibold: Platform.select({ ios: 'LiAdorNoirrit-SemiBold', android: 'LiAdorNoirrit-SemiBold', default: 'LiAdorNoirrit-SemiBold, sans-serif' }),
  banglaBold: Platform.select({ ios: 'LiAdorNoirrit-Bold', android: 'LiAdorNoirrit-Bold', default: 'LiAdorNoirrit-Bold, sans-serif' }),
};

export const typography = {
  heading: {
    fontSize: 26,
    fontWeight: '700' as const,
    fontFamily: fonts.bold,
    letterSpacing: -0.5,
  },
  subheading: {
    fontSize: 16,
    fontWeight: '500' as const,
    fontFamily: fonts.medium,
  },
  caption: {
    fontSize: 12,
    fontWeight: '500' as const,
    fontFamily: fonts.regular,
  },
};
