import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export const SplashScreen: React.FC = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Image
        source={require('../../assets/images/image.jpeg')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={[styles.title, { color: theme.textPrimary }]}>Jadubazar</Text>
      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Your Ultimate Shopping Destination</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 24,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
  },
});
