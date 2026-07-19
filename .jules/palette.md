## 2024-07-19 - Add accessibility attributes to custom category tabs
**Learning:** Custom tab bar implementations in React Native completely lack native accessibility defaults, making them invisible or confusing to screen readers without explicit ARIA-equivalent roles, states, and localized labels.
**Action:** Always manually add `accessibilityRole="tab"`, `accessibilityState={{ selected: isActive }}`, and localized `accessibilityLabel` to interactive components that function as tabs to ensure they are properly identified and their state announced.
