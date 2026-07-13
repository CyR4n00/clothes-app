
## 2024-07-13 - Custom Tab Bar Screen Reader Support
**Learning:** Custom tab bars implemented with `Animated.View` and `TouchableOpacity` in React Native do not have native screen reader defaults. They will not be properly announced to visually impaired users unless manually configured.
**Action:** Always manually add `accessibilityRole="tab"`, localized `accessibilityLabel`s, and `accessibilityState={{ selected: isActive }}` to the custom tab buttons to ensure full accessibility support.
