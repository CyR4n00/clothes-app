import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    return SecureStore.setItemAsync(key, value); // 🛡️ Sentinel: Return promise to prevent insecure session state
  },
  removeItem: (key: string) => {
    return SecureStore.deleteItemAsync(key); // 🛡️ Sentinel: Return promise to prevent insecure session state
  },
};

const storage = Platform.OS === 'web' ? AsyncStorage : ExpoSecureStoreAdapter;

// 🛡️ Sentinel: Prevent hardcoded credentials by using environment variables
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
