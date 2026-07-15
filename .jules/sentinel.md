## 2024-05-27 - 🛡️ Sentinel: [High] Secure Storage for Authentication Tokens
**Learning:** React Native's `AsyncStorage` is an unencrypted, plaintext key-value store. Storing sensitive authentication tokens (like Supabase session tokens) in it exposes them to local access vulnerabilities.
**Action:** Always use a secure storage solution, such as `expo-secure-store`, for sensitive data on native platforms. Since `expo-secure-store` doesn't support web, implement a platform-aware adapter that gracefully falls back to `AsyncStorage` when `Platform.OS === 'web'`.
