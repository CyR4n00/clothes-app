import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Defs, Pattern, Path, Rect } from 'react-native-svg';

export const GridBackground = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, { backgroundColor: '#FFFFFF' }]} pointerEvents="none">
      <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
        <Defs>
          <Pattern
            id="topography"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(1.5)"
          >
            <Path
              d="M0 25 C 20 20, 40 40, 50 25 C 60 10, 80 30, 100 25"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="1"
            />
            <Path
              d="M0 50 C 25 40, 35 60, 50 50 C 65 40, 75 60, 100 50"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="1"
            />
            <Path
              d="M0 75 C 30 60, 20 90, 50 75 C 80 60, 70 90, 100 75"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="1"
            />
             <Path
              d="M25 0 C 20 20, 40 40, 25 50 C 10 60, 30 80, 25 100"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="1"
            />
             <Path
              d="M75 0 C 60 30, 90 20, 75 50 C 60 80, 90 70, 75 100"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="1"
            />
          </Pattern>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#topography)" />
      </Svg>
    </View>
  );
};
