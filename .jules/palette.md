## 2025-07-25 - Add accessibility to AnimatedTabBar
**Learning:** Custom React Native tab bars lack native screen reader support.
**Action:** Always manually add accessibilityRole="tab", accessibilityLabel, and accessibilityState={{ selected: isActive }} to custom tab buttons to ensure proper screen reader support.
