## 2024-07-18 - [Add accessibilityRole to custom tabs]
**Learning:** Custom tab implementations in React Native (using Touchables or Animated views) require manual additions of `accessibilityRole="tab"` and `accessibilityState={{ selected: isActive }}` to ensure proper screen reader support, since they lack native ARIA default properties.
**Action:** Always add these accessibility properties when creating non-standard navigation elements.
