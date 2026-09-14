import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { ShopByCategory } from '../../components/Ecommerce/ShopByCategory';

export const ShopScreen: React.FC = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>Explore Shop</Text>
        <ShopByCategory />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 50,
    paddingBottom: 32,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginHorizontal: 16,
    marginBottom: 16,
  },
});
