import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { Header } from '../../components/common/Header/Header';
import { AppText as Text } from '../../components/common/AppText';
import { wishlistStore, WishlistItem } from '../../store/wishlistStore';
import { cartStore } from '../../store/cartStore';

// SAMPLE SEED ITEMS IF WISHLIST IS INITIALLY EMPTY
const SEED_WISHLIST_ITEMS: WishlistItem[] = [
  {
    id: 'w-1',
    name: 'Pure Organic Mustard Oil 1L (সরিষার তেল)',
    price: 320,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
    inStock: true,
  },
  {
    id: 'w-2',
    name: 'Fresh Premium Katabon Honey 500g',
    price: 550,
    image: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=400',
    inStock: true,
  },
  {
    id: 'w-3',
    name: 'Wireless Active Noise Canceling Earbuds',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400',
    inStock: true,
  },
  {
    id: 'w-4',
    name: 'Organic Green Tea Leaves 250g',
    price: 280,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400',
    inStock: true,
  },
];

export const WishlistScreen: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { isBangla, t } = useLanguage();
  const navigation = useNavigation<any>();

  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(wishlistStore.getItems());

  useEffect(() => {
    // If store is empty on load, populate with initial seed items for demo
    if (wishlistStore.getItems().length === 0) {
      SEED_WISHLIST_ITEMS.forEach((item) => {
        wishlistStore.toggleWishlist(item);
      });
    }
    setWishlistItems(wishlistStore.getItems());

    return wishlistStore.subscribe(() => {
      setWishlistItems([...wishlistStore.getItems()]);
    });
  }, []);

  const handleAddToCart = (item: WishlistItem) => {
    cartStore.addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    Alert.alert(
      isBangla ? 'কার্টে যোগ করা হয়েছে!' : 'Added to Cart!',
      isBangla
        ? `"${item.name}" আপনার শপিং কার্টে যোগ করা হয়েছে।`
        : `"${item.name}" has been added to your shopping cart.`
    );
  };

  const handleAddAllToCart = () => {
    if (wishlistItems.length === 0) return;
    wishlistItems.forEach((item) => {
      cartStore.addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
      });
    });
    Alert.alert(
      isBangla ? 'সব পণ্য কার্টে যোগ হয়েছে!' : 'All Items Added!',
      isBangla
        ? 'উইশলিস্টের সমস্ত পণ্য আপনার কার্টে সফলভাবে যুক্ত করা হয়েছে।'
        : 'All saved wishlist items have been added to your cart.'
    );
  };

  const handleRemoveItem = (item: WishlistItem) => {
    wishlistStore.toggleWishlist(item);
  };

  const handleClearAll = () => {
    Alert.alert(
      isBangla ? 'উইশলিস্ট খালি করুন' : 'Clear Wishlist',
      isBangla
        ? 'আপনি কি সমস্ত সংরক্ষিত উইশলিস্ট মুছে ফেলতে চান?'
        : 'Are you sure you want to remove all saved items from your wishlist?',
      [
        { text: isBangla ? 'বাতিল' : 'Cancel', style: 'cancel' },
        {
          text: isBangla ? 'হ্যাঁ, মুছুন' : 'Yes, Clear All',
          style: 'destructive',
          onPress: () => {
            wishlistItems.forEach((item) => wishlistStore.toggleWishlist(item));
          },
        },
      ]
    );
  };

  return (
    <View
      className={`flex-1 ${
        isDarkMode ? 'bg-slate-900' : 'bg-slate-50'
      }`}
    >
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        {/* SUB-HEADER BAR WITH BACK BUTTON */}
        <View
          className={`px-4 py-4 border-b flex-row items-center justify-between ${
            isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <View className="flex-row items-center gap-3">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                } else {
                  navigation.navigate('HomeTab');
                }
              }}
              className={`w-9 h-9 rounded-full items-center justify-center border ${
                isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-100 border-slate-200'
              }`}
            >
              <Ionicons
                name="arrow-back"
                size={20}
                color={isDarkMode ? '#F8FAFC' : '#1E293B'}
              />
            </TouchableOpacity>

            <View>
              <View className="flex-row items-center gap-2">
                <Text
                  className={`text-xl font-black ${
                    isDarkMode ? 'text-slate-50' : 'text-slate-900'
                  }`}
                >
                  {isBangla ? 'আমার উইশলিস্ট' : 'My Wishlist'}
                </Text>
                <View className="px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30">
                  <Text className="text-xs font-black text-rose-500">
                    {wishlistItems.length} {isBangla ? 'টি' : 'Items'}
                  </Text>
                </View>
              </View>
              <Text
                className={`text-xs font-medium ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {isBangla ? 'সংরক্ষিত পছন্দের পণ্য তালিকা' : 'Your saved favorite products'}
              </Text>
            </View>
          </View>
        </View>

        {/* TOP BULK ACTIONS BAR (IF WISHLIST HAS ITEMS) */}
        {wishlistItems.length > 0 && (
          <View className="px-4 pt-4 flex-row items-center justify-between gap-3">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleAddAllToCart}
              className="flex-1 bg-amber-500 py-2.5 px-4 rounded-2xl flex-row items-center justify-center gap-2 shadow-sm"
            >
              <Ionicons name="cart" size={16} color="#0F172A" />
              <Text className="text-xs font-black text-slate-900">
                {isBangla ? 'সব কার্টে যোগ করুন' : 'Add All to Cart'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleClearAll}
              className={`py-2.5 px-3.5 rounded-2xl border flex-row items-center gap-1.5 ${
                isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
              }`}
            >
              <Ionicons name="trash-outline" size={15} color="#F43F5E" />
              <Text className="text-xs font-bold text-rose-500">
                {isBangla ? 'মুছুন' : 'Clear'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* WISHLIST ITEMS GRID */}
        <View className="px-4 pt-4">
          {wishlistItems.length === 0 ? (
            <View
              className={`p-10 rounded-3xl items-center justify-center border mt-4 ${
                isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
              }`}
            >
              <View className="w-20 h-20 rounded-full bg-rose-500/10 items-center justify-center mb-4">
                <Ionicons name="heart-dislike-outline" size={40} color="#F43F5E" />
              </View>
              <Text
                className={`text-lg font-black text-center ${
                  isDarkMode ? 'text-slate-100' : 'text-slate-900'
                }`}
              >
                {isBangla ? 'আপনার উইশলিস্ট খালি!' : 'Your Wishlist is Empty!'}
              </Text>
              <Text
                className={`text-xs font-medium text-center mt-1.5 px-6 leading-5 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {isBangla
                  ? 'আপনার পছন্দের পণ্যসমূহ সহজে সংরক্ষণ করতে পণ্যের ওপর হার্ট আইকন ক্লিক করুন।'
                  : 'Save your favorite items by tapping the heart icon on any product page.'}
              </Text>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('HomeTab')}
                className="mt-6 bg-amber-500 px-6 py-3 rounded-2xl flex-row items-center gap-2 shadow-md shadow-amber-500/20"
              >
                <Ionicons name="cart-outline" size={18} color="#0F172A" />
                <Text className="text-xs font-black text-slate-900">
                  {isBangla ? 'পণ্য ব্রাউজ করুন' : 'Start Shopping'}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="gap-3.5">
              {wishlistItems.map((item) => (
                <View
                  key={item.id}
                  className={`p-3.5 rounded-3xl border flex-row items-center gap-3.5 shadow-sm ${
                    isDarkMode
                      ? 'bg-slate-800 border-slate-700'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <View className="relative">
                    <Image
                      source={{ uri: item.image }}
                      className="w-20 h-20 rounded-2xl bg-slate-100"
                    />
                    <View className="absolute top-1 left-1 bg-emerald-500 px-1.5 py-0.5 rounded-md">
                      <Text className="text-[9px] font-black text-white">
                        {isBangla ? 'স্টকে আছে' : 'In Stock'}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-1 justify-between h-20 py-0.5">
                    <View>
                      <Text
                        numberOfLines={2}
                        className={`text-sm font-bold leading-5 ${
                          isDarkMode ? 'text-slate-100' : 'text-slate-900'
                        }`}
                      >
                        {item.name}
                      </Text>
                      <Text className="text-base font-black text-amber-500 mt-1">
                        ৳{item.price}
                      </Text>
                    </View>

                    <View className="flex-row items-center gap-2 mt-2">
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => handleAddToCart(item)}
                        className="flex-1 bg-amber-500 py-2 rounded-xl flex-row items-center justify-center gap-1.5"
                      >
                        <Ionicons name="cart" size={14} color="#0F172A" />
                        <Text className="text-xs font-black text-slate-900">
                          {isBangla ? 'কার্টে যোগ করুন' : 'Add to Cart'}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => handleRemoveItem(item)}
                        className={`w-9 h-9 rounded-xl border items-center justify-center ${
                          isDarkMode
                            ? 'bg-rose-950/40 border-rose-900/60'
                            : 'bg-rose-50 border-rose-200'
                        }`}
                      >
                        <Ionicons name="trash-outline" size={17} color="#F43F5E" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
