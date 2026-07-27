## 2024-05-24 - [A11y] Screen Reader Support for Custom Animated Tab Bars
**Learning:** Custom interactive components like `AnimatedTabBar` lack native accessibility defaults, making them opaque to screen readers.
**Action:** Manually inject `accessibilityRole="tab"`, localized `accessibilityLabel`s, and `accessibilityState={{ selected: isActive }}` to the custom tab buttons to ensure proper screen reader support.
