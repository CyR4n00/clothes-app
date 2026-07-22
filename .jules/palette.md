
## 2024-07-22 - [Proper Accessibility for Custom React Native Tabs]
**Learning:** React Native's `TouchableOpacity` when used in custom tab bar components requires explicit `accessibilityRole="tab"`, an `accessibilityLabel`, and `accessibilityState={{ selected: isActive }}` to ensure proper screen reader support for icon-only buttons.
**Action:** When creating or modifying custom navigational tab buttons in React Native, manually add `accessibilityRole`, localized `accessibilityLabel`s, and `accessibilityState` to properly convey the tab's purpose and state to assistive technologies.
