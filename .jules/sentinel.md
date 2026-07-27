## 2024-05-27 - 🛡️ Sentinel: [High] Secure Storage for Authentication Tokens
**Learning:** React Native's `AsyncStorage` is an unencrypted, plaintext key-value store. Storing sensitive authentication tokens (like Supabase session tokens) in it exposes them to local access vulnerabilities.
**Action:** Always use a secure storage solution, such as `expo-secure-store`, for sensitive data on native platforms. Since `expo-secure-store` doesn't support web, implement a platform-aware adapter that gracefully falls back to `AsyncStorage` when `Platform.OS === 'web'`.
## 2024-07-27 - 🛡️ Sentinel: [Medium] Missing Promise Returns in Secure Storage Wrapper
**Vulnerability:** The wrapper for `expo-secure-store` used for Supabase auth was not explicitly returning the Promises for `setItemAsync` and `deleteItemAsync`.
**Learning:** Omitting the return statement creates floating promises. Supabase client assumes instantaneous success and ignores potential keystore failures, which can lead to insecure session states or silent token loss.
**Prevention:** Always explicitly return generated Promises when implementing custom secure storage adapters for external clients.
