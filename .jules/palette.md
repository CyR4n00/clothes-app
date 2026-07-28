## 2024-05-18 - Add accessibility attributes to custom AnimatedTabBar
**Learning:** Custom React Native tab implementations (like AnimatedTabBar) do not natively provide tab accessibility roles, labels, and state to screen readers.
**Action:** Always manually add `accessibilityRole="tab"`, localized `accessibilityLabel`, and `accessibilityState={{ selected: isActive }}` to ensure screen readers can navigate and announce the custom tab correctly.
