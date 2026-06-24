
## 2024-06-24 - Missing Accessibility Labels on Core Navigation Icons
**Learning:** Core icon-only navigation elements (like bottom tabs, settings, and add buttons) often lack accessibility labels. In this specific app, the Japanese localization requirement means that screen reader labels for these icons must be explicitly provided in Japanese (e.g., '設定' for settings, 'コレクションを追加' for adding collections, 'クローゼット' for home tab).
**Action:** When adding new icon-only buttons or reviewing navigation components, always ensure `accessibilityRole="button"` and a localized Japanese `accessibilityLabel` are applied.
