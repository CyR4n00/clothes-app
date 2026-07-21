## 2024-03-24 - Initial Palette Notes
**Learning:** Found some UX enhancements that could be made, starting with accessibility on icon-only buttons.
**Action:** Let's look for icon-only buttons and ensure they have accessibility labels or roles.
## 2024-07-21 - Custom Tab Bar Accessibility
**Learning:** Custom interactive components like `AnimatedTabBar` lack native accessibility features, meaning screen readers won't announce them correctly without explicit `accessibilityRole="tab"`, localized `accessibilityLabel`, and `accessibilityState`.
**Action:** Always manually add these ARIA-equivalent props when creating custom navigation or touchable elements to ensure full accessibility support.
