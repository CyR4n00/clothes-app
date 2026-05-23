import Purchases from 'react-native-purchases';
import { Platform } from 'react-native';

// TODO: Replace with your actual RevenueCat public API keys
const APIKeys = {
  apple: "appl_your_revenuecat_api_key_here",
  google: "goog_your_revenuecat_api_key_here"
};

export const setupRevenueCat = () => {
  if (Platform.OS === 'ios') {
    Purchases.configure({ apiKey: APIKeys.apple });
  } else if (Platform.OS === 'android') {
    Purchases.configure({ apiKey: APIKeys.google });
  }
};
