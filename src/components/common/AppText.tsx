import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { cssInterop } from 'nativewind';
import { useLanguage } from '../../context/LanguageContext';
import { fonts } from '../../theme/theme';

export interface AppTextProps extends RNTextProps {
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
}

const ICON_FONTS = [
  'Ionicons',
  'FontAwesome',
  'Material',
  'Feather',
  'Entypo',
  'AntDesign',
  'Octicons',
  'MaterialIcons',
  'MaterialCommunityIcons',
];

export const AppText: React.FC<AppTextProps> = ({ style, weight, children, ...props }) => {
  const { isBangla } = useLanguage();

  const flattenedStyle = StyleSheet.flatten(style) || {};

  // Preserve vector icon fonts
  const currentFont = flattenedStyle.fontFamily;
  if (currentFont && ICON_FONTS.some((iconFont) => currentFont.includes(iconFont))) {
    return (
      <RNText style={style} {...props}>
        {children}
      </RNText>
    );
  }

  const fw = (weight || flattenedStyle.fontWeight) as any;
  const isBold =
    fw === 'bold' ||
    fw === '700' ||
    fw === '800' ||
    fw === '900' ||
    fw === 'black' ||
    fw === 'extrabold';
  const isSemiBold =
    fw === 'semibold' || fw === '600' || fw === 'medium' || fw === '500';

  let targetFont: string;

  if (isBangla) {
    if (isBold) {
      targetFont = fonts.banglaBold;
    } else if (isSemiBold) {
      targetFont = fonts.banglaSemibold;
    } else {
      targetFont = fonts.banglaSemibold;
    }
  } else {
    if (isBold) {
      targetFont = fonts.bold;
    } else if (isSemiBold) {
      targetFont = fonts.semibold;
    } else {
      targetFont = fonts.regular;
    }
  }

  // Remove numeric/string fontWeight from base style to avoid native Android/iOS font lookup fallback
  const removeFontWeight = (s: any) => {
    if (s && typeof s === 'object') {
      const { fontWeight, ...rest } = s;
      return rest;
    }
    return s;
  };

  const cleanStyle = Array.isArray(style)
    ? style.map(removeFontWeight)
    : removeFontWeight(style);

  return (
    <RNText style={[cleanStyle, { fontFamily: targetFont }]} {...props}>
      {children}
    </RNText>
  );
};

cssInterop(AppText, { className: 'style' });
