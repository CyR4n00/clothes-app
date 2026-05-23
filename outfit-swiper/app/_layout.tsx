import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { setupRevenueCat } from '../src/lib/revenuecat';

export default function Layout() {
  useEffect(() => {
    setupRevenueCat();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'クローゼット' }} />
        <Stack.Screen name="add-item" options={{ title: '服を追加' }} />
        <Stack.Screen name="macro-settings" options={{ title: '選択順の変更' }} />
        <Stack.Screen name="swipe" options={{ title: '今日の服を選ぶ' }} />
        <Stack.Screen name="final-confirmation" options={{ title: '最終確認' }} />
        <Stack.Screen name="paywall" options={{ presentation: 'modal', headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
