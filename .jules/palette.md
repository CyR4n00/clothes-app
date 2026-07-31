## 2024-07-31 - [Custom Navigation Accessibility]
**Learning:** Custom React Native navigation implementations (e.g. AnimatedTabBar using TouchableOpacity) lack built-in accessibility defaults for screen readers.
**Action:** Explicitly add accessibilityRole, localized accessibilityLabel, and accessibilityState to custom tab buttons to ensure proper screen reader support.
