## 2024-07-30 - Custom Animated Navigation Accessibility
**Learning:** In React Native, custom interactive navigation elements (like `AnimatedTabBar`) lack native defaults for screen readers, rendering them inaccessible by default.
**Action:** Always manually assign `accessibilityRole="tab"`, localized `accessibilityLabel`s, and `accessibilityState={{ selected: isActive }}` to ensure proper focus navigation and state announcement for screen readers.
