import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Defs, Pattern, Path, Rect } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export const GridBackground = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, { backgroundColor: '#FAFBFC' }]} pointerEvents="none">
      <LinearGradient
        colors={['#EAEFF2', '#FAFBFC', '#F0F3F5']}
        style={StyleSheet.absoluteFillObject}
      />
      <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
        <Defs>
          <Pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <Path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(0, 0, 0, 0.05)"
              strokeWidth="1"
            />
          </Pattern>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#grid)" />
      </Svg>
    </View>
  );
};
