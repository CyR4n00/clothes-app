## 2024-07-16 - Add accessibility to custom AnimatedTabBar
**Learning:** Custom navigation components (like an AnimatedTabBar using TouchableOpacity) in React Native lack native accessibility defaults (unlike standard Tab Navigators). Screen readers won't announce them as tabs or indicate their selected state unless manually configured.
**Action:** Always add `accessibilityRole="tab"`, localized `accessibilityLabel`, and `accessibilityState={{ selected: isActive }}` to interactive tab elements in custom navigation components to ensure full screen reader support.
