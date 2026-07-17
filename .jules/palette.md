## 2024-07-17 - [Custom Tab Bar Accessibility]
**Learning:** Custom tab bars in React Native (e.g., using Animated.View and TouchableOpacity) lack native screen reader defaults. They require manual addition of `accessibilityRole="tab"`, `accessibilityState={{ selected: isActive }}`, and localized `accessibilityLabel`s for adequate screen reader support.
**Action:** Always verify custom navigational elements map to expected screen reader paradigms and provide descriptive labels.
