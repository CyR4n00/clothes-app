## 2024-07-29 - Accessible Custom Navigation Tab Bar
**Learning:** Custom implementations of navigation components like animated tab bars in React Native lack native accessibility defaults, making them entirely opaque to screen readers.
**Action:** Always manually add `accessibilityRole="tab"`, localized `accessibilityLabel`s, and `accessibilityState={{ selected: isActive }}` to custom tab buttons to ensure screen reader users can navigate effectively.
