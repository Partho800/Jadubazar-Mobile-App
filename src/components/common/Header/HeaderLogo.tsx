import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';

export const HeaderLogo: React.FC = () => {
  const { isDarkMode } = useTheme();

  const logoSource = isDarkMode
    ? require('../../../assets/images/jadubazar-logo-dark.webp')
    : require('../../../assets/images/jadubazar-logo-light.png');

  return (
    <View style={styles.container}>
      <Image
        source={logoSource}
        style={styles.logoImage}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  logoImage: {
    width: 140,
    height: 40,
  },
});
