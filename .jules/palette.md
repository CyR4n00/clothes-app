## 2024-07-08 - Added accessibility labels to custom TabBar buttons
**Learning:** Custom tab bar implementations (like `AnimatedTabBar`) often lack the default accessibility features provided by native tab bar components, rendering icon-only buttons invisible or confusing to screen readers.
**Action:** Always verify and manually add `accessibilityRole="tab"`, localized `accessibilityLabel`s (Japanese in this project), and `accessibilityState={{ selected: isActive }}` to custom interactive tab buttons.
