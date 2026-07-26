## 2024-07-26 - Added Japanese Accessibility Labels to AnimatedTabBar
**Learning:** Custom tab bars in React Native (e.g., AnimatedTabBar) lack native screen reader defaults and must explicitly include `accessibilityRole="tab"`, localized `accessibilityLabel`s, and `accessibilityState={{ selected: isActive }}`. In this app, accessibility attributes for navigation must adhere to Japanese localization requirements.
**Action:** Always verify custom interactive components like icon-only buttons include the necessary ARIA/accessibility props with correct localization for screen reader support.
