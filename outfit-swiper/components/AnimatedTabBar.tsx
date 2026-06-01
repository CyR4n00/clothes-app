import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';

const { width } = Dimensions.get('window');
const TAB_BAR_WIDTH = width * 0.9;
const TAB_WIDTH = TAB_BAR_WIDTH / 3;

const TABS = [
  { route: '/', icon: 'shirt-outline', activeColor: '#E0E0E0' },
  { route: '/swipe', icon: 'layers-outline', activeColor: '#E0E0E0' },
  { route: '/macro-settings', icon: 'options-outline', activeColor: '#E0E0E0' },
];

export const AnimatedTabBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const activeIndex = TABS.findIndex((tab) => tab.route === pathname);
  const safeActiveIndex = activeIndex >= 0 ? activeIndex : 0; // fallback if on another screen

  const translateX = useSharedValue(safeActiveIndex * TAB_WIDTH);

  useEffect(() => {
    if (activeIndex >= 0) {
      translateX.value = withSpring(activeIndex * TAB_WIDTH, {
        damping: 15,
        stiffness: 150,
      });
    }
  }, [activeIndex, translateX]);

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>

        {/* Animated Background Cutout / Indicator */}
        <Animated.View style={[styles.activeIndicatorContainer, animatedIndicatorStyle]}>
           {/* Outer black overlay to create the curve effect */}
           <View style={styles.curveLeft} />
           <View style={styles.curveRight} />

           {/* The floating green circle */}
           <View style={styles.floatingCircle} />
        </Animated.View>

        {TABS.map((tab, index) => {
          const isActive = pathname === tab.route;
          return (
            <TouchableOpacity
              key={tab.route}
              style={styles.tabButton}
              onPress={() => router.push(tab.route as any)}
            >
              <Ionicons
                name={tab.icon as any}
                size={24}
                color={isActive ? '#000' : '#888'} // Black icon when active (inside white circle)
                style={[
                   styles.icon,
                   isActive && styles.activeIcon
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    width: TAB_BAR_WIDTH,
    height: 60,
    backgroundColor: '#1E1E1E', // Dark grey/black matching the image
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  tabButton: {
    width: TAB_WIDTH,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  icon: {
    marginTop: 0,
  },
  activeIcon: {
    transform: [{ translateY: -12 }], // Move up to align with floating circle
    zIndex: 3,
  },
  activeIndicatorContainer: {
    position: 'absolute',
    top: -20,
    left: 0,
    width: TAB_WIDTH,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  floatingCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0', // White/Silver
    transform: [{ translateY: -5 }],
    shadowColor: '#FFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  curveLeft: {
    position: 'absolute',
    top: 20,
    left: -20,
    width: 20,
    height: 20,
    backgroundColor: 'transparent',
    borderBottomRightRadius: 20,
    shadowColor: '#1E1E1E',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  curveRight: {
    position: 'absolute',
    top: 20,
    right: -20,
    width: 20,
    height: 20,
    backgroundColor: 'transparent',
    borderBottomLeftRadius: 20,
    shadowColor: '#1E1E1E',
    shadowOffset: { width: -10, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 0,
  }
});
