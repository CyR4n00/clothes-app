## 2024-06-03 - Accessibility Labels on React Native Icon-Only Buttons
**Learning:** Icon-only buttons (like `TouchableOpacity` with just an `Ionicons` inside) in this React Native app consistently lack `accessibilityRole` and `accessibilityLabel`.
**Action:** When working on UX for React Native apps, proactively search for `TouchableOpacity` components wrapping only icons and ensure they have `accessibilityRole="button"` and a localized `accessibilityLabel` attached to them to improve screen reader compatibility.
