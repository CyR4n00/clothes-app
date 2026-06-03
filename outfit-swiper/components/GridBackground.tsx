import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Defs, Pattern, Path, Rect } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export const GridBackground = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, { backgroundColor: '#FFFFFF' }]} pointerEvents="none">
      {/* Nothing Aesthetic Background (Pure White) */}
      <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
        <Defs>
          <Pattern
            id="stripe"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <Rect width="20" height="40" fill="#F0F0F0" />
            <Rect x="20" width="20" height="40" fill="#FFFFFF" />
          </Pattern>
        </Defs>
        {/* Subtle background texture matching the brand style */}
        <Rect width="100%" height="100%" fill="url(#stripe)" opacity={0.3} />
      </Svg>
    </View>
  );
};
