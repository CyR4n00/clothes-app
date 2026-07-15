import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GridBackground } from '../components/GridBackground';
import { AnimatedTabBar } from '../components/AnimatedTabBar';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GridBackground />
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: 'transparent' },
          headerStyle: { backgroundColor: 'transparent' },
          headerTintColor: '#111827',
          headerTitleStyle: {
            fontWeight: '900',
            fontSize: 20,
          },
          headerShown: false,
          headerBlurEffect: 'dark', // For iOS transparent header blur
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="add-item" options={{ title: '服を追加' }} />
        <Stack.Screen name="macro-settings" options={{ title: '選択順の変更' }} />
        <Stack.Screen name="swipe" options={{ title: '今日の服を選ぶ' }} />
        <Stack.Screen name="explore" options={{ title: 'みんなのコーデ' }} />
        <Stack.Screen name="final-confirmation" options={{ title: '最終確認' }} />
        <Stack.Screen name="paywall" options={{ presentation: 'modal', headerShown: false }} />
      </Stack>
      <AnimatedTabBar />
    </GestureHandlerRootView>
  );
}
