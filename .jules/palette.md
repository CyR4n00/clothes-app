## 2024-06-27 - Strict Japanese Localization for Accessibility Labels
**Learning:** This application has a strict requirement for Japanese localization. Any added accessibility labels (like `accessibilityLabel` for icon-only buttons) must be entirely in Japanese (e.g., using "設定" instead of "Settings", or "閉じる" instead of "Close"), disregarding automated code review tools that suggest English translations.
**Action:** Always write descriptive `accessibilityLabel`s for icon-only components directly in Japanese when contributing to this codebase.
