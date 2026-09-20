import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

export interface SupportAgentAvatarProps {
  size?: number;
  isDarkMode?: boolean;
  color?: string;
  showOnlineDot?: boolean;
}

export const SupportAgentAvatar: React.FC<SupportAgentAvatarProps> = ({
  size = 44,
  isDarkMode = false,
  color = '#2563EB',
  showOnlineDot = false,
}) => {
  const bgColor = isDarkMode ? '#1E293B' : '#EFF6FF';
  const borderColor = isDarkMode ? '#334155' : '#DBEAFE';

  return (
    <View
      style={{
        width: size,
        height: size,
        position: 'relative',
      }}
    >
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.38,
          backgroundColor: bgColor,
          borderWidth: 1.5,
          borderColor: borderColor,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Svg
          width={size * 0.72}
          height={size * 0.72}
          viewBox="0 0 32 32"
          fill="none"
        >
          {/* Headset arc band */}
          <Path
            d="M 9 13.5 C 9 8.2 12.2 5.5 16 5.5 C 19.8 5.5 23 8.2 23 13.5"
            stroke={color}
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Head */}
          <Circle
            cx="16"
            cy="12.5"
            r="4.5"
            fill={color}
            fillOpacity={0.85}
          />

          {/* Left Earpad */}
          <Rect
            x="7.5"
            y="11.5"
            width="3"
            height="5.5"
            rx="1.5"
            fill={color}
          />

          {/* Right Earpad */}
          <Rect
            x="21.5"
            y="11.5"
            width="3"
            height="5.5"
            rx="1.5"
            fill={color}
          />

          {/* Microphone arm and tip */}
          <Path
            d="M 22.5 15.5 C 22.5 19 19.5 20.8 17.2 20.8"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <Circle
            cx="16.5"
            cy="20.8"
            r="1.4"
            fill={color}
          />

          {/* Shoulders / Torso */}
          <Path
            d="M 6.5 27 C 6.5 22 10.5 19.2 16 19.2 C 21.5 19.2 25.5 22 25.5 27"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            fill={color}
            fillOpacity={0.25}
          />
        </Svg>
      </View>

      {/* Online indicator dot */}
      {showOnlineDot && (
        <View
          style={{
            width: Math.max(9, size * 0.28),
            height: Math.max(9, size * 0.28),
            borderRadius: 999,
            backgroundColor: '#10B981',
            borderWidth: 2,
            borderColor: isDarkMode ? '#0F172A' : '#FFFFFF',
            position: 'absolute',
            bottom: -1,
            right: -1,
          }}
        />
      )}
    </View>
  );
};
