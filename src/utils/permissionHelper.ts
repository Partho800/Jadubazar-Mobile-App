import { PermissionsAndroid, Platform, Alert } from 'react-native';

/**
 * Requests essential app permissions on app startup or when entering key features.
 * Handles Android runtime permission popups and iOS/Web permission dialogs.
 */
export const requestAppStartupPermissions = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    try {
      const permissionsToRequest: any[] = [
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.CALL_PHONE,
      ];

      // Add camera and storage permissions if available
      if (PermissionsAndroid.PERMISSIONS.CAMERA) {
        permissionsToRequest.push(PermissionsAndroid.PERMISSIONS.CAMERA);
      }
      if (PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE) {
        permissionsToRequest.push(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
      }

      const grantedResults = await PermissionsAndroid.requestMultiple(permissionsToRequest);
      console.log('App Startup Permissions Granted:', grantedResults);

      const isLocationGranted =
        grantedResults[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
          PermissionsAndroid.RESULTS.GRANTED ||
        grantedResults[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] ===
          PermissionsAndroid.RESULTS.GRANTED;

      return isLocationGranted;
    } catch (err) {
      console.warn('Permissions request error:', err);
      return false;
    }
  }

  // iOS / Web geolocation check
  if (typeof navigator !== 'undefined' && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      () => {},
      (err) => console.log('Web/iOS location check:', err.message),
      { timeout: 5000 }
    );
  }

  return true;
};

/**
 * Specifically requests Location permission for Checkout & Delivery Address detection.
 */
export const requestLocationPermission = async (isBangla: boolean = false): Promise<boolean> => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: isBangla ? 'জিপিএস লোকেশন পারমিশন প্রয়োজন' : 'Location Permission Required',
          message: isBangla
            ? 'আপনার অর্ডারের সঠিক ডেলিভারি ঠিকানা সনাক্ত করতে জাদুডিজিটাল-কে লোকেশন পারমিশন দিন।'
            : 'JaduBazar needs access to your location to accurately detect your delivery address.',
          buttonNeutral: isBangla ? 'পরে বলুন' : 'Ask Me Later',
          buttonNegative: isBangla ? 'বাতিল' : 'Cancel',
          buttonPositive: isBangla ? 'অনুমতি দিন' : 'OK',
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        Alert.alert(
          isBangla ? 'পারমিশন দেওয়া হয়নি' : 'Permission Denied',
          isBangla
            ? 'আপনার ঠিকানা অটো ডিটেক্ট করতে সেটিংস থেকে লোকেশন পারমিশন এনাবল করুন।'
            : 'Please enable Location permission in device settings to auto-detect your delivery address.'
        );
        return false;
      }
    } catch (err) {
      console.warn('Location permission error:', err);
      return false;
    }
  }

  return true;
};

/**
 * Specifically requests Phone Call permission for calling support or delivery rider.
 */
export const requestCallPermission = async (isBangla: boolean = false): Promise<boolean> => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CALL_PHONE,
        {
          title: isBangla ? 'ফোন কল পারমিশন প্রয়োজন' : 'Phone Call Permission',
          message: isBangla
            ? 'রাইডার বা হেল্পডেস্কে সরাসরি কল করতে ফোন কল অনুমতি দিন।'
            : 'JaduBazar needs Phone Call permission to connect you with delivery riders and support.',
          buttonPositive: isBangla ? 'অনুমতি দিন' : 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn('Call permission error:', err);
      return false;
    }
  }

  return true;
};
