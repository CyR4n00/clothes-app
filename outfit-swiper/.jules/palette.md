## 2024-03-24 - Initial Palette Notes
**Learning:** Found some UX enhancements that could be made, starting with accessibility on icon-only buttons.
**Action:** Let's look for icon-only buttons and ensure they have accessibility labels or roles.
## 2024-07-20 - Custom Tab Bar Accessibility
**Learning:** Custom UI components like `AnimatedTabBar` lack native accessibility features out of the box, rendering them invisible or confusing to screen readers.
**Action:** When implementing custom tab bars or navigation elements, always manually add `accessibilityRole="tab"`, localized `accessibilityLabel`s, and `accessibilityState={{ selected: isActive }}` to ensure proper screen reader support.
