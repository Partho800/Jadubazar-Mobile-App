import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';

export const ForgotPasswordScreen: React.FC = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.textPrimary }]}>Forgot Password</Text>
      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Enter your email to receive reset instructions</Text>

      <TextInput
        style={[styles.input, { backgroundColor: theme.card, borderColor: theme.cardBorder, color: theme.textPrimary }]}
        placeholder="Email address"
        placeholderTextColor={theme.textSecondary}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]}>
        <Text style={styles.buttonText}>Send Reset Link</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 24,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 15,
  },
  button: {
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
