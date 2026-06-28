## 2024-06-28 - Add Japanese accessibility labels to icon-only buttons
**Learning:** Found a recurring pattern where icon-only `TouchableOpacity` buttons containing `Ionicons` lacked ARIA labels. Since this app requires strict Japanese localization, it's critical to consistently add `accessibilityRole="button"` and `accessibilityLabel="..."` (in Japanese) to these elements for accessibility purposes.
**Action:** Always verify icon-only buttons have descriptive, Japanese `accessibilityLabel` properties in future PRs.
