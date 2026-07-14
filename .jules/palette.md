## 2026-07-14 - Make custom AnimatedTabBar accessible
**Learning:** Custom React Native tab bars require manual ARIA-equivalent roles and states because they lack native defaults.
**Action:** Add accessibilityRole="tab", localized accessibilityLabels, and accessibilityState={{ selected: isActive }} to the tab buttons to ensure proper screen reader support.
