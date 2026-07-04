## 2024-03-24 - Initial Palette Notes
**Learning:** Found some UX enhancements that could be made, starting with accessibility on icon-only buttons.
**Action:** Let's look for icon-only buttons and ensure they have accessibility labels or roles.
## 2026-07-04 - Add accessibility labels to icon-only buttons
**Learning:** Found multiple instances where icon-only buttons lacked accessibility labels in this React Native app, making them difficult to use with screen readers.
**Action:** Add `accessibilityRole="button"` and `accessibilityLabel` with localized Japanese strings to all icon-only `TouchableOpacity` components to ensure a fully accessible interface.
