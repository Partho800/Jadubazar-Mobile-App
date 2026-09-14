import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ComingSoonView } from '../../components/ComingSoon/ComingSoonView';
import { useTheme } from '../../context/ThemeContext';

export const ProfileScreen: React.FC = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();

  return (
    <ComingSoonView
      screenName="Profile"
      iconName="person-outline"
      description="Manage account details, security settings, preferences, and personal information."
    >
      {/* Theme Toggle Card on Profile Screen */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={toggleTheme}
        style={[
          styles.themeToggleCard,
          {
            backgroundColor: theme.card,
            borderColor: theme.cardBorder,
          },
        ]}
      >
        <View style={styles.leftSection}>
          <View
            style={[
              styles.iconWrapper,
              { backgroundColor: theme.primaryLight },
            ]}
          >
            <Ionicons
              name={isDarkMode ? 'moon' : 'sunny'}
              size={20}
              color={theme.primary}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.titleText, { color: theme.textPrimary }]}>
              {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </Text>
            <Text style={[styles.subText, { color: theme.textMuted }]}>
              {isDarkMode ? 'Tap to switch to Light Theme' : 'Tap to switch to Dark Theme'}
            </Text>
          </View>
        </View>

        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          trackColor={{ false: '#CBD5E1', true: '#FDE68A' }}
          thumbColor={isDarkMode ? '#FBBF24' : '#FFFFFF'}
        />
      </TouchableOpacity>
    </ComingSoonView>
  );
};

const styles = StyleSheet.create({
  themeToggleCard: {
    marginTop: 28,
    width: '100%',
    maxWidth: 320,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  iconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '700',
  },
  subText: {
    fontSize: 11,
    marginTop: 2,
  },
});
