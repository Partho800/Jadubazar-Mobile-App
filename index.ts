import './global.css';
import { registerRootComponent } from 'expo';
import { cssInterop } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ImageBackground, Image } from 'react-native';

cssInterop(LinearGradient, {
  className: 'style',
});

cssInterop(Ionicons as any, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      color: true,
    },
  },
});

cssInterop(ImageBackground, {
  className: 'style',
});

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

