## 2024-07-15 - Add accessibility to custom AnimatedTabBar
**Learning:** Custom tab bars in React Native (e.g. `AnimatedTabBar`) don't have native default accessibility attributes unlike built-in navigation components, and missing them breaks screen reader support for critical navigation.
**Action:** When implementing custom animated navigation components or icon-only tabs, manually add `accessibilityRole="tab"`, localized `accessibilityLabel`, and `accessibilityState={{ selected: isActive }}` to ensure basic screen reader usability.
