import React from 'react';
import { View, Image } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

export interface DefaultUserAvatarProps {
  uri?: string;
  size?: number;
  isDarkMode?: boolean;
  borderColor?: string;
}

export const DefaultUserAvatar: React.FC<DefaultUserAvatarProps> = ({
  uri,
  size = 48,
  isDarkMode = false,
  borderColor,
}) => {
  const resolvedBorderColor =
    borderColor || (isDarkMode ? '#334155' : '#E2E8F0');

  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: 1.5,
          borderColor: resolvedBorderColor,
        }}
      />
    );
  }

  const iconColor = isDarkMode ? '#94A3B8' : '#64748B';
  const bgColor = isDarkMode ? '#1E293B' : '#F1F5F9';

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: bgColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: resolvedBorderColor,
        overflow: 'hidden',
      }}
    >
      <Svg
        width={size * 0.6}
        height={size * 0.6}
        viewBox="0 0 24 24"
        fill="none"
      >
        <Circle cx="12" cy="7.5" r="4.2" fill={iconColor} />
        <Path
          d="M19.5 21C19.5 16.8579 16.1421 13.5 12 13.5C7.85786 13.5 4.5 16.8579 4.5 21"
          stroke={iconColor}
          strokeWidth="1.8"
          strokeLinecap="round"
          fill={iconColor}
          fillOpacity={0.88}
        />
      </Svg>
    </View>
  );
};
