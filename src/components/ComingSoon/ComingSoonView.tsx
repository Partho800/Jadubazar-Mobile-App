import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { AppText } from '../common/AppText';
import { typography } from '../../theme/theme';

interface ComingSoonViewProps {
  screenName: string;
  iconName: keyof typeof Ionicons.glyphMap;
  description?: string;
  children?: React.ReactNode;
}

export const ComingSoonView: React.FC<ComingSoonViewProps> = ({
  screenName,
  iconName,
  description,
  children,
}) => {
  const { theme } = useTheme();
  const { isBangla } = useLanguage();

  const defaultDescription = isBangla
    ? 'এই সার্ভিসটি শীঘ্রই আসছে। শিগগিরই আপনারা এই সার্ভিসটি ব্যবহার করতে পারবেন।'
    : 'This section is currently under active development and will be available in an upcoming update.';

  const displayDescription = description || defaultDescription;
  const mainTitle = isBangla ? 'আসছে শীঘ্রই' : 'Coming Soon';
  const statusLabel = isBangla ? 'উন্নয়ন কাজ চলছে' : 'In Development Phase';
  const moduleLabel = isBangla ? `${screenName.toUpperCase()} মডিউল` : `${screenName.toUpperCase()} MODULE`;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.centeredContent}>
        {/* Decorative Icon Container */}
        <View
          style={[
            styles.iconGlowContainer,
            {
              backgroundColor: theme.primaryLight,
              borderColor: theme.primaryBorder,
            },
          ]}
        >
          <View
            style={[
              styles.iconCircle,
              {
                backgroundColor: theme.card,
                borderColor: theme.cardBorder,
                shadowColor: theme.primary,
              },
            ]}
          >
            <Ionicons name={iconName} size={44} color={theme.primary} />
          </View>
        </View>

        {/* Feature Tag */}
        <View
          style={[
            styles.badgeContainer,
            {
              backgroundColor: theme.accentBadgeBg,
              borderColor: theme.primaryBorder,
            },
          ]}
        >
          <AppText style={[styles.badgeText, { color: theme.accentBadgeText }]}>
            {moduleLabel}
          </AppText>
        </View>

        {/* Primary Requirement Title */}
        <AppText style={[styles.mainTitle, { color: theme.textPrimary }]}>{mainTitle}</AppText>

        {/* Subtitle / Context description */}
        <AppText style={[styles.descriptionText, { color: theme.textSecondary }]}>
          {displayDescription}
        </AppText>

        {/* Modular status pill */}
        <View
          style={[
            styles.statusPill,
            {
              backgroundColor: theme.card,
              borderColor: theme.cardBorder,
            },
          ]}
        >
          <View style={styles.statusDot} />
          <AppText style={[styles.statusText, { color: theme.textMuted }]}>
            {statusLabel}
          </AppText>
        </View>

        {/* Optional Custom Controls (e.g., Theme Switch in Profile) */}
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
  },
  centeredContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  iconGlowContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
  },
  badgeContainer: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  mainTitle: {
    ...typography.heading,
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 30,
    fontWeight: '800',
  },
  descriptionText: {
    ...typography.subheading,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 290,
    marginBottom: 20,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#34D399',
    marginRight: 8,
  },
  statusText: {
    ...typography.caption,
    fontSize: 12,
  },
});
