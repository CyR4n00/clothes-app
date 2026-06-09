import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Defs, Pattern, Path, Rect } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

export const GridBackground = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, { backgroundColor: '#FFFFFF' }]} pointerEvents="none">
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
              stroke="#E5E7EB"
              strokeWidth="1"
            />
          </Pattern>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#grid)" />
      </Svg>
    </View>
  );
};
