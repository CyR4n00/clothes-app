import React from 'react';
import { View, StyleSheet } from 'react-native';
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
            patternTransform="scale(4)"
          >
            {/* Very gentle, flattened curves with ultra-thin stroke */}
            <Path
              d="M0 25 Q 25 22, 50 25 T 100 25"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="0.3"
            />
            <Path
              d="M0 50 Q 25 47, 50 50 T 100 50"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="0.3"
            />
            <Path
              d="M0 75 Q 25 78, 50 75 T 100 75"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="0.3"
            />

            <Path
              d="M25 0 Q 22 25, 25 50 T 25 100"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="0.3"
            />
            <Path
              d="M50 0 Q 53 25, 50 50 T 50 100"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="0.3"
            />
            <Path
              d="M75 0 Q 72 25, 75 50 T 75 100"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="0.3"
            />
          </Pattern>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#topography)" />
      </Svg>
    </View>
  );
};
