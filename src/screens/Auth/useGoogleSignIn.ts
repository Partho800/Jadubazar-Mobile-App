import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';

WebBrowser.maybeCompleteAuthSession();

interface GoogleAuthResult {
  name: string;
  email: string;
  picture?: string;
  given_name?: string;
}

interface UseGoogleSignInOptions {
  onSuccess: (user: GoogleAuthResult) => void;
  onError?: (error: string) => void;
}

const WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;
const IS_CONFIGURED =
  !!WEB_CLIENT_ID &&
  WEB_CLIENT_ID !== 'your-web-client-id.apps.googleusercontent.com';

// Safe placeholder: Google.useAuthRequest must always be called (React hooks rules)
const SAFE_CLIENT_ID = IS_CONFIGURED ? WEB_CLIENT_ID : 'placeholder.apps.googleusercontent.com';

export const useGoogleSignIn = ({ onSuccess, onError }: UseGoogleSignInOptions) => {
  const [, response, promptAsync] = Google.useAuthRequest({
    webClientId: SAFE_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    selectAccount: true,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      if (authentication?.accessToken) {
        fetchUserInfo(authentication.accessToken);
      }
    } else if (response?.type === 'error') {
      onError?.('Google sign-in failed. Please try again.');
    }
  }, [response]);

  const fetchUserInfo = async (accessToken: string) => {
    try {
      const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: 'Bearer ' + accessToken },
      });
      const data: GoogleAuthResult = await res.json();
      onSuccess(data);
    } catch {
      onError?.('Failed to fetch user info from Google.');
    }
  };

  const signIn = () => {
    if (!IS_CONFIGURED) {
      onError?.('GOOGLE_CLIENT_ID_NOT_CONFIGURED');
      return;
    }
    promptAsync();
  };

  return { signIn };
};
