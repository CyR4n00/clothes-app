## 2024-07-23 - Accessibility attributes on custom AnimatedTabBar
**Learning:** Custom tab bar implementations using `TouchableOpacity` in React Native lack native screen reader defaults.
**Action:** Always manually add `accessibilityRole="tab"`, localized `accessibilityLabel`s, and `accessibilityState={{ selected: isActive }}` to ensure proper accessibility support on custom navigation elements.
