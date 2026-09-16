import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { AppText as Text } from '../common/AppText';

interface FoodDeliveryBannerProps {
  onSearchPress?: () => void;
  onLocationPress?: () => void;
  onSearchSubmit?: (query: string) => void;
}

export const FoodDeliveryBanner: React.FC<FoodDeliveryBannerProps> = ({
  onSearchPress,
  onLocationPress,
  onSearchSubmit,
}) => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const [currentAddress, setCurrentAddress] = useState<string>(
    'Parashmoni laboratory school., 16, Road 27, Sector 7, Uttara, Dhaka, 1230, Bangladesh'
  );
  const [isDetecting, setIsDetecting] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleAutoDetect = () => {
    setIsDetecting(true);
    setTimeout(() => {
      setCurrentAddress(
        'Sector 7, Road 27, Uttara, Dhaka, 1230, Bangladesh (GPS Verified)'
      );
      setIsDetecting(false);
    }, 1200);
  };

  return (
    <View style={{ width: '100%', paddingHorizontal: 16, marginVertical: 14, gap: 12 }}>
      {/* 1. DELIVERY LOCATION CARD */}
      <View
        style={{
          width: '100%',
          borderRadius: 18,
          borderWidth: 1.5,
          borderColor: isDarkMode ? '#451A03' : '#FED7AA',
          backgroundColor: isDarkMode ? '#1C1917' : '#FFF7ED',
          padding: 14,
          gap: 10,
        }}
      >
        {/* Upper Row: Location Icon + Title + Address */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onLocationPress}
          style={{ flexDirection: 'row', alignItems: 'center', width: '100%', gap: 10 }}
        >
          <View
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              backgroundColor: '#FFEDD5',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Ionicons name="location" size={20} color="#EA580C" />
          </View>

          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: '900',
                  color: '#EA580C',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
              >
                {t('deliveryLocation')}
              </Text>
              <Ionicons name="chevron-down" size={12} color="#EA580C" />
            </View>

            <Text
              numberOfLines={2}
              style={{
                fontSize: 12,
                fontWeight: '700',
                color: isDarkMode ? '#F8FAFC' : '#0F172A',
                marginTop: 2,
                lineHeight: 16,
              }}
            >
              {isDetecting ? 'Detecting your current location...' : currentAddress}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Lower Row: Auto Detect Location Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleAutoDetect}
          style={{
            width: '100%',
            backgroundColor: '#EA580C',
            borderRadius: 12,
            paddingVertical: 9,
            paddingHorizontal: 14,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}
        >
          <Ionicons
            name={isDetecting ? 'sync-outline' : 'locate-outline'}
            size={16}
            color="#FFFFFF"
          />
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 11,
              fontWeight: '900',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
          >
            {isDetecting ? 'Detecting...' : t('autoDetectLocation')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 2. INTERACTIVE FOOD SEARCH INPUT BAR */}
      <View
        style={{
          width: '100%',
          borderRadius: 25,
          borderWidth: 1.5,
          borderColor: isDarkMode ? '#334155' : '#E2E8F0',
          backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF',
          paddingHorizontal: 16,
          paddingVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <Ionicons name="search-outline" size={20} color="#EA580C" />
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={() => onSearchSubmit?.(searchQuery)}
          placeholder='Search "pizza, biryani, burger, shake, cake"...'
          placeholderTextColor={isDarkMode ? '#64748B' : '#94A3B8'}
          style={{
            flex: 1,
            fontSize: 13,
            fontWeight: '600',
            color: isDarkMode ? '#F8FAFC' : '#0F172A',
            paddingVertical: 0,
            paddingHorizontal: 0,
            borderWidth: 0,
            outlineStyle: 'none' as any,
            outlineWidth: 0 as any,
          }}
        />

        {searchQuery.length > 0 ? (
          <TouchableOpacity activeOpacity={0.7} onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={18} color="#94A3B8" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onSearchPress}
            style={{ backgroundColor: '#FFEDD5', padding: 6, borderRadius: 9999 }}
          >
            <Ionicons name="options-outline" size={16} color="#EA580C" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
