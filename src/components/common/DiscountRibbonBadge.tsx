import React from 'react';
import { View, Text, StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface DiscountRibbonBadgeProps {
  discountText?: string;
  amount?: string;
  label?: string;
  oldPrice?: number;
  price?: number;
  bgColor?: string;
  width?: number;
  height?: number;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export const DiscountRibbonBadge: React.FC<DiscountRibbonBadgeProps> = ({
  discountText,
  amount,
  label = 'OFF',
  oldPrice,
  price,
  bgColor = '#E11D48',
  width = 40,
  height = 48,
  className = '',
  style,
}) => {
  let displayAmount = amount;
  let displayLabel = label;

  if (oldPrice && price && oldPrice > price && !discountText && !amount) {
    displayAmount = `৳${oldPrice - price}`;
    displayLabel = 'OFF';
  } else if (discountText && !amount) {
    const cleanText = discountText.trim();
    if (cleanText.toUpperCase().endsWith('OFF')) {
      const remaining = cleanText.substring(0, cleanText.length - 3).trim();
      displayAmount = remaining;
      displayLabel = 'OFF';
    } else if (cleanText.includes(' ')) {
      const parts = cleanText.split(/\s+/);
      displayAmount = parts[0];
      displayLabel = parts.slice(1).join(' ');
    } else {
      displayAmount = cleanText;
      displayLabel = 'OFF';
    }
  }

  if (!displayAmount) return null;

  // Ribbon dimensions: width x height
  // Point at bottom center: (width/2, height)
  // Straight sides down to height - 8
  const pCut = 8;
  const pathD = `M 0 0 H ${width} V ${height - pCut} L ${width / 2} ${height} L 0 ${height - pCut} Z`;

  return (
    <View
      style={[{ width, height }, style]}
      className={`relative items-center justify-center ${className}`}
    >
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
        <Path d={pathD} fill={bgColor} />
      </Svg>

      <View className="absolute inset-0 pt-1 pb-2.5 items-center justify-center px-0.5">
        <Text
          numberOfLines={1}
          className="text-white text-[11px] sm:text-[12px] font-black tracking-tighter text-center leading-none"
        >
          {displayAmount}
        </Text>
        <Text
          numberOfLines={1}
          className="text-white text-[8.5px] sm:text-[9.5px] font-extrabold tracking-wider text-center leading-none mt-0.5 uppercase"
        >
          {displayLabel}
        </Text>
      </View>
    </View>
  );
};

export default DiscountRibbonBadge;
