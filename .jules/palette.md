## 2024-05-24 - Accessibility labels on icon-only navigation buttons
**Learning:** React Native apps utilizing Expo and `@expo/vector-icons` often lack explicit accessible names for touchable UI elements that use icons without accompanying text, leading to poor screen reader experiences.
**Action:** Always verify that `TouchableOpacity` elements wrapping an `<Ionicons />` child have appropriate `accessibilityRole="button"` and a localized `accessibilityLabel` attribute to clearly describe their intent.
