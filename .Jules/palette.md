## 2026-06-17 - [Micro-UX: Accessibility, Input, and State]
**Learning:** React Native modal inputs without `autoFocus` require an extra tap to focus, and icon-only `TouchableOpacity` buttons need explicit `accessibilityRole` and `accessibilityLabel` for screen readers. Buttons relying on form state should have visual disabled cues to prevent confusion.
**Action:** Always add `accessibilityRole="button"` and `accessibilityLabel` (in Japanese per requirements) to icon-only buttons, use `autoFocus` on modal initial inputs, and add conditional `opacity` styles to disabled buttons.
