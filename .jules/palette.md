## 2024-07-09 - Accessible Custom Navigation Elements
**Learning:** Custom tab bars or navigation elements in React Native (e.g., custom `AnimatedTabBar` without using React Navigation's default bottom tabs) lack native accessibility defaults. Therefore, screen readers cannot properly announce tabs without explicit configuration.
**Action:** Always add `accessibilityRole="tab"`, localized `accessibilityLabel`s (Japanese, per project requirements), and `accessibilityState={{ selected: isActive }}` to custom tab buttons to ensure proper accessibility support.
