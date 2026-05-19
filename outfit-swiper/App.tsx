import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ClosetScreen } from './src/screens/ClosetScreen';
import { MacroSettingsScreen } from './src/screens/MacroSettingsScreen';
import { SwipeScreen } from './src/screens/SwipeScreen';
import { FinalConfirmationScreen } from './src/screens/FinalConfirmationScreen';
import { AddItemScreen } from './src/screens/AddItemScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Closet" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Closet" component={ClosetScreen} />
            <Stack.Screen name="MacroSettings" component={MacroSettingsScreen} />
            <Stack.Screen name="Swipe" component={SwipeScreen} />
            <Stack.Screen name="FinalConfirmation" component={FinalConfirmationScreen} />
            <Stack.Screen name="AddItem" component={AddItemScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
