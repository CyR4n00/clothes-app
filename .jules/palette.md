## 2024-05-18 - AnimatedTabBar Accessibility
**Learning:** Found custom `AnimatedTabBar` component implementing a custom navigation bar but lacking basic accessibility support for the icon-only buttons.
**Action:** Added `accessibilityRole="tab"`, `accessibilityState={{ selected: isActive }}`, and properly localized `accessibilityLabel` using Japanese text as required by project constraints. Always ensure custom navigational components get native-like ARIA roles and labels.
