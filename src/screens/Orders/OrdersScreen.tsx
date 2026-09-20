import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { Header } from '../../components/common/Header/Header';
import { AppText as Text } from '../../components/common/AppText';
import { cartStore } from '../../store/cartStore';

export interface OrderProduct {
  id: string;
  name: string;
  nameBn: string;
  quantity: number;
  price: number;
  image: string;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  date: string;
  status: 'PROCESSING' | 'DELIVERED' | 'CANCELLED';
  statusTextEn: string;
  statusTextBn: string;
  items: OrderProduct[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  totalAmount: number;
  paymentMethod: string;
  paymentMethodBn: string;
  deliveryAddress: string;
  expectedDelivery?: string;
}

export const OrdersScreen: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { isBangla, t } = useLanguage();
  const navigation = useNavigation<any>();

  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [activeTab, setActiveTab] = useState<'ALL' | 'PROCESSING' | 'DELIVERED' | 'CANCELLED'>('ALL');
  const [selectedTrackingOrder, setSelectedTrackingOrder] = useState<OrderRecord | null>(null);

  const filteredOrders = orders.filter((order) => {
    if (activeTab === 'ALL') return true;
    return order.status === activeTab;
  });

  const handleReorder = (order: OrderRecord) => {
    order.items.forEach((item) => {
      cartStore.addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
      });
    });
    Alert.alert(
      isBangla ? 'কার্টে যোগ করা হয়েছে!' : 'Added to Cart!',
      isBangla
        ? `অর্ডার #${order.orderNumber} এর পণ্যগুলো কার্টে যোগ করা হয়েছে।`
        : `Items from Order #${order.orderNumber} added to your cart.`
    );
  };

  const handleViewInvoice = (order: OrderRecord) => {
    Alert.alert(
      isBangla ? `ইনভয়েস #${order.orderNumber}` : `Invoice #${order.orderNumber}`,
      isBangla
        ? `তারিখ: ${order.date}\nমোট পরিমাণ: ৳${order.totalAmount}\nপেমেন্ট পদ্ধতি: ${order.paymentMethodBn}\nঠিকানা: ${order.deliveryAddress}`
        : `Date: ${order.date}\nTotal Amount: ৳${order.totalAmount}\nPayment Method: ${order.paymentMethod}\nAddress: ${order.deliveryAddress}`
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
        {/* TOP SUB-HEADER BAR WITH BACK BUTTON */}
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
                  {isBangla ? 'আমার অর্ডারসমূহ' : 'My Orders'}
                </Text>
                <View className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30">
                  <Text className="text-xs font-black text-amber-500">
                    {orders.length} {isBangla ? 'টি' : 'Total'}
                  </Text>
                </View>
              </View>
              <Text
                className={`text-xs font-medium ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {isBangla ? 'আপনার অর্ডার ও ট্র্যাকিং হিস্ট্রি' : 'Track and review your orders'}
              </Text>
            </View>
          </View>
        </View>

        {/* STATUS FILTER PILLS */}
        <View className="px-4 pt-4 pb-2">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
          >
            {[
              { key: 'ALL', labelEn: 'All Orders', labelBn: 'সব অর্ডার', count: orders.length },
              {
                key: 'PROCESSING',
                labelEn: 'In Progress',
                labelBn: 'চলমান',
                count: orders.filter((o) => o.status === 'PROCESSING').length,
              },
              {
                key: 'DELIVERED',
                labelEn: 'Delivered',
                labelBn: 'সম্পন্ন',
                count: orders.filter((o) => o.status === 'DELIVERED').length,
              },
              {
                key: 'CANCELLED',
                labelEn: 'Cancelled',
                labelBn: 'বাতিল',
                count: orders.filter((o) => o.status === 'CANCELLED').length,
              },
            ].map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <TouchableOpacity
                  key={tab.key}
                  activeOpacity={0.8}
                  onPress={() => setActiveTab(tab.key as any)}
                  className={`flex-row items-center px-4 py-2.5 rounded-full border gap-2 ${
                    isActive
                      ? 'bg-amber-500 border-amber-500 shadow-md shadow-amber-500/20'
                      : isDarkMode
                      ? 'bg-slate-800 border-slate-700'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <Text
                    className={`text-xs font-bold ${
                      isActive
                        ? 'text-slate-900 font-black'
                        : isDarkMode
                        ? 'text-slate-300'
                        : 'text-slate-700'
                    }`}
                  >
                    {isBangla ? tab.labelBn : tab.labelEn}
                  </Text>
                  <View
                    className={`px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-slate-900/15'
                        : isDarkMode
                        ? 'bg-slate-700'
                        : 'bg-slate-100'
                    }`}
                  >
                    <Text
                      className={`text-[10px] font-black ${
                        isActive
                          ? 'text-slate-900'
                          : isDarkMode
                          ? 'text-slate-400'
                          : 'text-slate-600'
                      }`}
                    >
                      {tab.count}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* ORDERS LIST */}
        <View className="px-4 pt-2 gap-4">
          {filteredOrders.length === 0 ? (
            <View
              className={`p-8 rounded-3xl items-center justify-center border mt-4 ${
                isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
              }`}
            >
              <View className="w-16 h-16 rounded-full bg-amber-500/10 items-center justify-center mb-3">
                <Ionicons name="cube-outline" size={32} color="#F59E0B" />
              </View>
              <Text
                className={`text-base font-extrabold text-center ${
                  isDarkMode ? 'text-slate-200' : 'text-slate-800'
                }`}
              >
                {isBangla ? 'কোনো অর্ডার পাওয়া যায়নি' : 'No orders found'}
              </Text>
              <Text
                className={`text-xs font-medium text-center mt-1 leading-relaxed max-w-[260px] ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {isBangla
                  ? 'আপনার কোনো অর্ডার হিস্ট্রি নেই। নতুন কেনাকাটা করতে ব্রাউজ করুন।'
                  : 'You do not have any orders yet. Start exploring and placing orders!'}
              </Text>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => navigation.navigate('HomeTab')}
                className="mt-4 px-6 py-2.5 rounded-full bg-amber-500 active:bg-amber-600 shadow-sm shadow-amber-500/30"
              >
                <Text className="text-xs font-black text-slate-900">
                  {isBangla ? 'কেনাকাটা শুরু করুন' : 'Start Shopping'}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            filteredOrders.map((order) => {
              const isProcessing = order.status === 'PROCESSING';

              return (
                <View
                  key={order.id}
                  className={`rounded-3xl border overflow-hidden shadow-sm ${
                    isDarkMode
                      ? 'bg-slate-800 border-slate-700'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  {/* ORDER CARD HEADER */}
                  <View
                    className={`p-4 flex-row items-center justify-between border-b ${
                      isDarkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-slate-50/80 border-slate-100'
                    }`}
                  >
                    <View>
                      <View className="flex-row items-center gap-2">
                        <Text
                          className={`text-base font-black ${
                            isDarkMode ? 'text-slate-100' : 'text-slate-900'
                          }`}
                        >
                          #{order.orderNumber}
                        </Text>
                      </View>
                      <Text
                        className={`text-xs font-medium mt-0.5 ${
                          isDarkMode ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {order.date}
                      </Text>
                    </View>

                    {/* STATUS BADGE */}
                    <View
                      className={`px-3 py-1.5 rounded-full flex-row items-center gap-1.5 ${
                        isProcessing
                          ? isDarkMode
                            ? 'bg-amber-950/80 border border-amber-800/60'
                            : 'bg-amber-100 border border-amber-200'
                          : isDarkMode
                          ? 'bg-emerald-950/80 border border-emerald-800/60'
                          : 'bg-emerald-100 border border-emerald-200'
                      }`}
                    >
                      <Ionicons
                        name={isProcessing ? 'sync' : 'checkmark-circle'}
                        size={14}
                        color={isProcessing ? '#F59E0B' : '#10B981'}
                      />
                      <Text
                        className={`text-xs font-black ${
                          isProcessing
                            ? isDarkMode
                              ? 'text-amber-400'
                              : 'text-amber-700'
                            : isDarkMode
                            ? 'text-emerald-400'
                            : 'text-emerald-700'
                        }`}
                      >
                        {isBangla ? order.statusTextBn : order.statusTextEn}
                      </Text>
                    </View>
                  </View>

                  {/* PRODUCTS LIST INSIDE ORDER */}
                  <View className="p-4 gap-3">
                    {order.items.map((prod) => (
                      <View key={prod.id} className="flex-row items-center gap-3">
                        <Image
                          source={{ uri: prod.image }}
                          className="w-12 h-12 rounded-xl bg-slate-200"
                        />
                        <View className="flex-1">
                          <Text
                            numberOfLines={1}
                            className={`text-sm font-bold ${
                              isDarkMode ? 'text-slate-100' : 'text-slate-800'
                            }`}
                          >
                            {isBangla ? prod.nameBn : prod.name}
                          </Text>
                          <Text
                            className={`text-xs font-medium mt-0.5 ${
                              isDarkMode ? 'text-slate-400' : 'text-slate-500'
                            }`}
                          >
                            ৳{prod.price} x {prod.quantity}
                          </Text>
                        </View>
                        <Text
                          className={`text-sm font-black ${
                            isDarkMode ? 'text-slate-200' : 'text-slate-900'
                          }`}
                        >
                          ৳{prod.price * prod.quantity}
                        </Text>
                      </View>
                    ))}

                    {/* EXPECTED DELIVERY NOTICE IF PROCESSING */}
                    {order.expectedDelivery && (
                      <View
                        className={`p-3 rounded-2xl flex-row items-center gap-2 mt-1 ${
                          isDarkMode ? 'bg-amber-950/40 border border-amber-900/40' : 'bg-amber-50 border border-amber-100'
                        }`}
                      >
                        <Ionicons name="time" size={16} color="#F59E0B" />
                        <Text className="text-xs font-bold text-amber-600 flex-1">
                          {isBangla ? 'সম্ভাব্য ডেলিভারি সময়:' : 'Estimated Delivery:'}{' '}
                          {order.expectedDelivery}
                        </Text>
                      </View>
                    )}

                    {/* ADDRESS & PAYMENT INFO */}
                    <View
                      className={`p-3 rounded-2xl border ${
                        isDarkMode ? 'bg-slate-900/50 border-slate-700/60' : 'bg-slate-50 border-slate-100'
                      }`}
                    >
                      <View className="flex-row items-center gap-2 mb-1">
                        <Ionicons name="location-outline" size={14} color="#F59E0B" />
                        <Text
                          numberOfLines={1}
                          className={`text-xs flex-1 ${
                            isDarkMode ? 'text-slate-300' : 'text-slate-600'
                          }`}
                        >
                          {order.deliveryAddress}
                        </Text>
                      </View>
                      <View className="flex-row items-center justify-between mt-1 pt-1.5 border-t border-slate-200/40 dark:border-slate-800">
                        <Text
                          className={`text-[11px] font-semibold ${
                            isDarkMode ? 'text-slate-400' : 'text-slate-500'
                          }`}
                        >
                          {isBangla ? 'পেমেন্ট পদ্ধতি:' : 'Payment Method:'}{' '}
                          <Text
                            className={`font-bold ${
                              isDarkMode ? 'text-slate-200' : 'text-slate-800'
                            }`}
                          >
                            {isBangla ? order.paymentMethodBn : order.paymentMethod}
                          </Text>
                        </Text>
                        <Text className="text-xs font-black text-amber-500">
                          {isBangla ? 'সর্বমোট:' : 'Grand Total:'} ৳{order.totalAmount}
                        </Text>
                      </View>
                    </View>

                    {/* CARD FOOTER ACTION BUTTONS */}
                    <View className="flex-row items-center gap-2 pt-1">
                      {isProcessing ? (
                        <>
                          <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                              try {
                                navigation.navigate('OrderTrackingTab', {
                                  orderId: order.orderNumber,
                                  estimatedDelivery: order.expectedDelivery || (isBangla ? '৪৫ মিনিট' : '45 Minutes'),
                                });
                              } catch (e) {
                                setSelectedTrackingOrder(order);
                              }
                            }}
                            className="flex-1 bg-amber-500 py-3 rounded-2xl flex-row items-center justify-center gap-2 shadow-sm"
                          >
                            <Ionicons name="navigate" size={16} color="#0F172A" />
                            <Text className="text-xs font-black text-slate-900">
                              {isBangla ? 'অর্ডার ট্র্যাক করুন' : 'Track Live Order'}
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() =>
                              Alert.alert(
                                isBangla ? 'অর্ডার বাতিল' : 'Cancel Order',
                                isBangla
                                  ? 'আপনি কি নিশ্চিত যে এই অর্ডারটি বাতিল করতে চান?'
                                  : 'Are you sure you want to cancel this order?',
                                [
                                  { text: isBangla ? 'না' : 'No', style: 'cancel' },
                                  { text: isBangla ? 'হ্যাঁ, বাতিল করুন' : 'Yes, Cancel', style: 'destructive' },
                                ]
                              )
                            }
                            className={`px-4 py-3 rounded-2xl border items-center justify-center ${
                              isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
                            }`}
                          >
                            <Text
                              className={`text-xs font-bold ${
                                isDarkMode ? 'text-rose-400' : 'text-rose-600'
                              }`}
                            >
                              {isBangla ? 'বাতিল' : 'Cancel'}
                            </Text>
                          </TouchableOpacity>
                        </>
                      ) : (
                        <>
                          <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => handleReorder(order)}
                            className="flex-1 bg-amber-500 py-3 rounded-2xl flex-row items-center justify-center gap-2 shadow-sm"
                          >
                            <Ionicons name="refresh" size={16} color="#0F172A" />
                            <Text className="text-xs font-black text-slate-900">
                              {isBangla ? 'পুনরায় অর্ডার করুন' : 'Re-order Items'}
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => handleViewInvoice(order)}
                            className={`px-4 py-3 rounded-2xl border flex-row items-center gap-1.5 ${
                              isDarkMode
                                ? 'bg-slate-800 border-slate-700'
                                : 'bg-slate-100 border-slate-200'
                            }`}
                          >
                            <Ionicons
                              name="receipt-outline"
                              size={15}
                              color={isDarkMode ? '#94A3B8' : '#475569'}
                            />
                            <Text
                              className={`text-xs font-bold ${
                                isDarkMode ? 'text-slate-200' : 'text-slate-700'
                              }`}
                            >
                              {isBangla ? 'ইনভয়েস' : 'Invoice'}
                            </Text>
                          </TouchableOpacity>
                        </>
                      )}
                    </View>
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>

      {/* TRACKING MODAL */}
      {selectedTrackingOrder && (
        <Modal
          visible={!!selectedTrackingOrder}
          transparent
          animationType="slide"
          onRequestClose={() => setSelectedTrackingOrder(null)}
        >
          <View className="flex-1 bg-black/60 justify-end">
            <View
              className={`rounded-t-[32px] p-6 border-t shadow-2xl ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <View className="flex-row items-center justify-between mb-4">
                <View>
                  <Text
                    className={`text-lg font-black ${
                      isDarkMode ? 'text-slate-50' : 'text-slate-900'
                    }`}
                  >
                    {isBangla ? 'লাইভ অর্ডার ট্র্যাকিং' : 'Live Order Tracking'}
                  </Text>
                  <Text className="text-xs font-bold text-amber-500">
                    Order #{selectedTrackingOrder.orderNumber}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => setSelectedTrackingOrder(null)}
                  className={`w-8 h-8 rounded-full items-center justify-center ${
                    isDarkMode ? 'bg-slate-800' : 'bg-slate-100'
                  }`}
                >
                  <Ionicons
                    name="close"
                    size={20}
                    color={isDarkMode ? '#94A3B8' : '#475569'}
                  />
                </TouchableOpacity>
              </View>

              {/* TRACKING TIMELINE */}
              <View className="gap-5 my-3 px-2">
                {[
                  {
                    step: 1,
                    titleEn: 'Order Confirmed',
                    titleBn: 'অর্ডার কনফার্ম করা হয়েছে',
                    descEn: 'We have received your order.',
                    descBn: 'আপনার অর্ডারটি গ্রহণ করা হয়েছে।',
                    completed: true,
                  },
                  {
                    step: 2,
                    titleEn: 'Packed & Ready',
                    titleBn: 'প্যাকেজিং সম্পন্ন',
                    descEn: 'Your item is safely packed in store.',
                    descBn: 'পণ্য নিরাপদে প্যাকেজিং শেষ হয়েছে।',
                    completed: true,
                  },
                  {
                    step: 3,
                    titleEn: 'Out for Delivery',
                    titleBn: 'ডেলিভারিম্যান রাস্তায় রয়েছে',
                    descEn: 'Delivery agent Md. Karim is on the way.',
                    descBn: 'ডেলিভারিম্যান মোঃ করিম আপনার ঠিকানায় আসছে।',
                    completed: true,
                    active: true,
                  },
                  {
                    step: 4,
                    titleEn: 'Delivered',
                    titleBn: 'ডেলিভারি সম্পন্ন',
                    descEn: 'Reaching your address shortly.',
                    descBn: 'শীঘ্রই আপনার ঠিকানায় পৌঁছাবে।',
                    completed: false,
                  },
                ].map((item, idx) => (
                  <View key={idx} className="flex-row gap-4 items-start relative">
                    <View className="items-center">
                      <View
                        className={`w-8 h-8 rounded-full items-center justify-center ${
                          item.completed
                            ? 'bg-amber-500'
                            : isDarkMode
                            ? 'bg-slate-800 border border-slate-700'
                            : 'bg-slate-200'
                        }`}
                      >
                        <Ionicons
                          name={item.completed ? 'checkmark' : 'time-outline'}
                          size={16}
                          color={item.completed ? '#0F172A' : '#94A3B8'}
                        />
                      </View>
                      {idx < 3 && (
                        <View
                          className={`w-0.5 h-8 mt-1 ${
                            item.completed ? 'bg-amber-500' : isDarkMode ? 'bg-slate-800' : 'bg-slate-200'
                          }`}
                        />
                      )}
                    </View>

                    <View className="flex-1">
                      <Text
                        className={`text-sm font-black ${
                          item.active
                            ? 'text-amber-500'
                            : isDarkMode
                            ? 'text-slate-100'
                            : 'text-slate-900'
                        }`}
                      >
                        {isBangla ? item.titleBn : item.titleEn}
                      </Text>
                      <Text
                        className={`text-xs mt-0.5 ${
                          isDarkMode ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {isBangla ? item.descBn : item.descEn}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                onPress={() => setSelectedTrackingOrder(null)}
                className="w-full bg-amber-500 py-3.5 rounded-2xl items-center mt-4"
              >
                <Text className="text-sm font-black text-slate-900">
                  {isBangla ? 'বন্ধ করুন' : 'Close Tracking'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};
