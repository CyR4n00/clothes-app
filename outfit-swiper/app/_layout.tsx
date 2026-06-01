import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GridBackground } from '../components/GridBackground';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { AnimatedTabBar } from '../components/AnimatedTabBar';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loaded, error] = useFonts({
    'Orbitron': require('../assets/fonts/Orbitron-Regular.ttf'),
    'Orbitron-Bold': require('../assets/fonts/Orbitron-Bold.ttf'),
    'ZenDots': require('../assets/fonts/ZenDots-Regular.ttf'),
    'DotGothic': require('../assets/fonts/DotGothic16-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GridBackground />
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: 'transparent' },
          headerStyle: { backgroundColor: 'transparent' },
          headerTintColor: '#E0E0E0',
          headerTitleStyle: {
            fontFamily: 'ZenDots',
            fontSize: 20,
          },
          headerTransparent: true,
          headerBlurEffect: 'dark', // For iOS transparent header blur
        }}
      >
        <Stack.Screen name="index" options={{ title: 'クローゼット' }} />
        <Stack.Screen name="add-item" options={{ title: '服を追加' }} />
        <Stack.Screen name="macro-settings" options={{ title: '選択順の変更' }} />
        <Stack.Screen name="swipe" options={{ title: '今日の服を選ぶ' }} />
        <Stack.Screen name="final-confirmation" options={{ title: '最終確認' }} />
        <Stack.Screen name="paywall" options={{ presentation: 'modal', headerShown: false }} />
      </Stack>
      <AnimatedTabBar />
    </GestureHandlerRootView>
  );
}
